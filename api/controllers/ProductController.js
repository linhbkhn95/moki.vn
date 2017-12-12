/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const response = require('../util/response');
const pushnotify = require('../util/pushnotify');

module.exports = {
    getNewProducts: function (req, res) {
        let params = req.allParams();
        let index = params['index'] || 0;
        let sort = params['sort'] || 'p_id';
        let typeSort = params['typeSort'] || 1; //0: DESC, 1: ASC
        let count = params['count'] || 10; //default 20
        let status = 'ENABLE';
        let token = req.headers['authorization'];

        var self = this;

        if (count > 200) {
            count = 200;
        }

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.getListProductNew(?, ?, ?, ?, ?, '23:00:00')", [index, sort, typeSort, count, status], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                let user_id = req.session.user_id;
                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;
                    let isLike = self.isLike;
                    let ui_userid = product.ui_name;
                    let can_edit = 0;
                    if (!!token && (ui_userid == user_id || req.session.type == 'ADMIN')) {
                        can_edit = 1;
                    }

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            code: product.p_code,
                            name: product.p_name,
                            image: await listImages(product.p_id),
                            video: await listVideos(product.p_id),
                            price: product.p_price,
                            price_percent: product.p_price_percent,
                            brand: product.pb_name,//Thương hiệu
                            described: product.p_description,
                            created: product.ui_fromdate,
                            number: product.p_number,
                            like: product.p_nlike,
                            comment: product.p_ncomment,
                            is_liked: !!token ? 0 : await isLike(req.session.user_id, product.p_id),
                            is_blocked: 0,
                            can_edit: can_edit,
                            banned: 0, //khoá user
                            seller: {
                                id: product.ui_userid,
                                username: product.ui_name,
                                avatar: product.ui_avartar,
                            }
                        })
                    })
                })).then((products) => {
                    let result = response.OK;
                    result.data = products;
                    res.json(result);
                    resolve(products)
                })
            })
        })
    },

    get_count_product_shop: function (req, res) {
        let user_id = req.session.user_id

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.get_count_product_shop()", [], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                StoredProcedure.query("call moki.get_category_parent()", [], function (err, [categories, server_status]) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    categories = categories.map((category)=> {
                        return {
                            id: category.pc_id,
                            name: category.pc_name,
                            count: 0
                        }
                    });

                    Promise.all(data.map((shop) => {
                        return new Promise((resolve, reject) => {
                            StoredProcedure.query("call moki.statistics_product_category_shop(?)", [shop.s_user_id], function (err, [data, server_status]) {
                                if (err) {
                                    reject(err)
                                    return;
                                }

                                let s = {
                                    id: shop.s_user_id,
                                    shop_name: shop.s_shop_name,
                                    count: shop.count
                                }
                                s.categories = data.map((category)=> {
                                    return {
                                        id: category.pc_id,
                                        name: category.pc_name,
                                        count: category.count
                                    }
                                })
                                let ca = [];
                                categories.forEach((category) => {
                                    let temp = s.categories.find((c) => {
                                        return c.id == category.id
                                    })

                                    if(!!temp) {
                                        ca.push(temp);
                                    } else {
                                        ca.push(category)
                                    }
                                })

                                s.categories = ca;

                                resolve(s)
                            })
                        })
                    })).then((shops) => {
                        let result = response.OK;
                        result.data = shops;
                        res.json(result);  
                    })
                })
            })
        })
    },

    statistics_shop_revenue: function (req, res) {
        let user_id = req.session.user_id
        let fromdate = req.param('fromdate')
        let thrudate = req.param('thrudate');

        if(!fromdate || !thrudate) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.statistics_shop_revenue(?, ?, ?)", [user_id, fromdate, thrudate], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                let result = response.OK
                result.data = data
                return res.json(result)
            })
        })
    },

    statistics_product_inventory: function (req, res) {
        let user_id = req.session.user_id

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.statistics_product_inventory(?)", [user_id], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                let result = response.OK
                result.data = data.map((product) => {
                    return {
                        id: product.p_id,
                        code: product.p_code,
                        name: product.p_name,
                        price: product.p_price,
                        price_percent: product.p_price_percent,
                        brand: product.pb_name,//Thương hiệu
                        category: product.pc_name,
                        condition: product.cond_name,
                        number: product.p_number,
                        described: product.p_description,
                        created: product.p_fromdate,
                        like: product.p_nlike,
                        comment: product.p_ncomment,
                    }
                })
                return res.json(result)
            })
        })
    },

    searchAnyWhere: function (req, res) {
        let keyword = req.param('keyword');

        let index = req.param('index') || 0;
        let count = req.param('count') || 10;
        let token = req.headers['authorization'];
        let self = this;
        if (count > 200) {
            count = 200;
        }

        StoredProcedure.query('call moki.search_any_where(?, ?, ?)', [keyword, index, count], function (err, [data, server_status]) {
            if (err) {
                reject(err)
                return;
            }
            //console.log(data)

            let user_id = req.session.user_id;
            Promise.all(data.map((product) => {
                let listImages = self.listImages;
                let listVideos = self.listVideos;
                let isLike = self.isLike;
                let ui_userid = product.ui_name;
                let can_edit = 0;
                if (!!token && (ui_userid == user_id || req.session.type == 'ADMIN')) {
                    can_edit = 1;
                }

                return new Promise(async (resolve, reject) => {
                    resolve({
                        id: product.p_id,
                        code: product.p_code,
                        name: product.p_name,
                        image: await listImages(product.p_id),
                        video: await listVideos(product.p_id),
                        price: product.p_price,
                        price_percent: product.p_price_percent,
                        described: product.p_description,
                        created: product.ui_fromdate,
                        like: product.p_nlike,
                        number: product.p_number,
                        comment: product.p_ncomment,
                        is_liked: !!token ? 0 : await isLike(req.session.user_id, product.p_id),
                        is_blocked: 0,
                        can_edit: can_edit,
                        banned: 0, //khoá user
                        seller: {
                            id: product.ui_userid,
                            username: product.ui_name,
                            avatar: product.ui_avartar,
                        }
                    })
                })
            })).then((products) => {
                let result = response.OK;
                result.data = {};
                if (products.length > 0) {
                    result.data.products = products
                    result.data.new_items = 0;
                    result.data.last_id = products[products.length - 1].id;
                }
                res.json(result);
            })
        })
    },

  
    setOrder: function (req, res) {
        let user_id = req.session.user_id;
        let order_detail = req.param('order_detail');
        let address = req.param('address');
        let paid = req.param('paid') || 0;
        let phone = req.param('phone');
        let city = req.param('city');

        if (!order_detail || !(order_detail instanceof Array) || order_detail.length == 0 || !address || !phone || !city) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.createOrder(?, ?, ?, ?, ?)", [user_id, address, paid, phone, city], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                let order_id = data[0].new_id;

                Promise.all(order_detail.map((product) => {
                    return new Promise((resolve, reject) => {
                        StoredProcedure.query("call moki.addProductToOrder(?, ?, ?)", [order_id, product.product_id, product.number], function (err, [data, server_status]) {
                            resolve(data[0]);
                        })
                    })
                })).then((orders) => {
                    let result = response.OK;
                    result.data = {
                        id: orders[orders.length - 1].o_id,
                        code: orders[orders.length - 1].o_code,
                        create: orders[orders.length - 1].o_fromdate,
                        address: orders[orders.length - 1].o_address,
                        total_price: orders[orders.length - 1].o_total_price,
                        phone: orders[orders.length - 1].o_phone,
                        city: orders[orders.length - 1].city
                    };
                    res.json(result);
                    resolve(products)
                })
            })
        })
    },

    viewOrder: function (req, res) {
        let user_id = req.session.user_id;

        let order_id = req.param('order_id');
        let status = req.param('status') || 'ENABLE';
        let self = this;

        StoredProcedure.query("call moki.viewOrderByUsernameId(?, ?)", [user_id, status], function (err, [data, server_status]) {
            if (err) {
                reject(err)
                return;
            }
            if (!!order_id) {
                data = data.find((order) => {
                    return order.o_id == order_id;
                })
                if (!data) {
                    res.json(response.PARAMETER_VALUE_IS_INVALID);
                    return;
                } else {
                    data = [data];
                }
            }


            Promise.all(data.map((order) => {
                return new Promise((resolve, reject) => {
                    StoredProcedure.query("call moki.viewOrderDetail(?)", [order.o_id], function (err, [data, server_status]) {
                        resolve({ data, order });
                    })
                })
            })).then((orders) => {
                Promise.all(orders.map(({ data, order }) => {
                    return new Promise((resolve, reject) => {
                        Promise.all(
                            data.map((p) => {
                                return new Promise(async (resolve, reject) => {
                                    resolve(
                                        {
                                            id: p.ord_p_id,
                                            code: p.ord_p_code,
                                            image: await self.listImages(p.ord_p_id),
                                            video: await self.listVideos(p.ord_p_id),
                                            name: p.ord_p_name,
                                            number: p.ord_number,
                                            price: p.ord_p_price,
                                            price_percent: p.ord_p_price_percent,
                                            seller: {
                                                id: p.ui_userid,
                                                user_name: p.ui_name,
                                                avatar: p.ui_avartar
                                            },
                                            status: p.ord_status
                                        }
                                    )
                                })
                            })
                        ).then((products) => {
                            resolve({
                                id: order.o_id,
                                code: order.o_code,
                                create: order.o_fromdate,
                                address: order.o_address,
                                total_price: order.o_total_price,
                                phone: order.o_phone,
                                city: order.city,
                                status: order.o_statusid,
                                products: products
                            })
                        })
                    })
                })).then((orders) => {
                    let result = response.OK;
                    result.data = orders;
                    res.json(result);
                })
            });
        })
    },

    viewListOrder: function (req, res) {
        let user_id = req.session.user_id;

        let index = req.param('index') || 0;
        let count = req.param('count') || 10; //default 10
        let status = req.param('status');
        let fromdate = req.param('fromdate');
        let thrudate = req.param('thrudate');
        let order_id = req.param('order_id');

        var self = this;

        if (count > 200) {
            count = 200;
        }


        let query = `call moki.get_list_order(?, ?, ${fromdate ? '"' + fromdate + '"' : 'NULL'},${thrudate ? '"' + thrudate + '"' : 'NULL'},${status ? '"' + status + '"' : 'NULL'})`;
        console.log(query)
        StoredProcedure.query(query, [index, count], function (err, [data, server_status]) {
            if (err) {
                reject(err)
                return;
            }
            if (!!order_id) {
                data = data.find((order) => {
                    return order.o_id == order_id;
                })
                if (!data) {
                    res.json(response.PARAMETER_VALUE_IS_INVALID);
                    return;
                } else {
                    data = [data];
                }
            }

            Promise.all(data.map((order) => {
                return new Promise((resolve, reject) => {
                    StoredProcedure.query("call moki.viewOrderDetail(?)", [order.o_id], function (err, [data, server_status]) {
                        StoredProcedure.query("call moki.get_user_information(?, 'ENABLE')", [order.o_user_id], function (err, [user, server_status]) {
                            resolve({ data, order, user });
                        })
                    })
                })
            })).then((orders) => {
                Promise.all(orders.map(({ data, order, user }) => {
                    return new Promise((resolve, reject) => {
                        Promise.all(
                            data.map((p) => {
                                return new Promise(async (resolve, reject) => {
                                    resolve(
                                        {
                                            id: p.ord_p_id,
                                            code: p.ord_p_code,
                                            image: await self.listImages(p.ord_p_id),
                                            video: await self.listVideos(p.ord_p_id),
                                            name: p.ord_p_name,
                                            number: p.ord_number,
                                            price: p.ord_p_price,
                                            price_percent: p.ord_p_price_percent,
                                            status: p.ord_status
                                        }
                                    )
                                })
                            })
                        ).then((products) => {
                            resolve({
                                id: order.o_id,
                                code: order.o_code,
                                create: order.o_fromdate,
                                address: order.o_address,
                                total_price: order.o_total_price,
                                phone: order.o_phone,
                                city: order.city,
                                status: order.o_statusid,
                                user: {
                                    id: user[0].ui_userid,
                                    name: user[0].ui_name,
                                    phone: user[0].ui_phone,
                                    avartar: user[0].ui_avartar
                                },
                                products: products
                            })
                        })
                    })
                })).then((orders) => {
                    let result = response.OK;
                    result.data = orders;
                    res.json(result);
                })
            });
        })
    },

    viewOrderByShop: function (req, res) {
        let user_id = req.session.user_id;
        console.log(user_id)
        let status = req.param('status') || 'ENABLE';
        let self = this;

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.viewOrderOfShop(?, ?)", [user_id, status], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                Promise.all(data.map((order) => {
                    return new Promise((resolve, reject) => {
                        StoredProcedure.query("call moki.get_user_information(?, 'ENABLE')", [order.o_user_id], function (err, [data, server_status]) {
                            resolve({ data, order });
                        })
                    })
                })).then((orders) => {
                    console.log(orders)
                    let result = response.OK;
                    result.data = orders.map(({ data, order }) => {
                        return {
                            id: order.ord_id,
                            id_p: order.ord_p_id,
                            code: order.ord_p_code,
                            name: order.ord_p_name,
                            number: order.ord_number,
                            price: order.ord_p_price,
                            price_percent: order.ord_p_price_percent,
                            status: order.ord_status,
                            create: order.ord_p_fromdate,
                            user: {
                                id: data[0].ui_userid,
                                name: data[0].ui_name,
                                phone: data[0].ui_phone,
                                avartar: data[0].ui_avartar
                            }
                        }
                    });
                    res.json(result);
                    resolve(result)
                    Promise.all(orders.map(({ data, order }) => {
                        return new Promise(async (resolve, reject) => {
                            resolve(
                                {
                                    id: order.ord_id,
                                    id_p: order.ord_p_id,
                                    code: order.ord_p_code,
                                    name: order.ord_p_name,
                                    number: order.ord_number,
                                    price: order.ord_p_price,
                                    image: await self.listImages(order.ord_p_id),
                                    video: await self.listVideos(order.ord_p_id),
                                    price_percent: order.ord_p_price_percent,
                                    status: order.ord_status,
                                    create: order.ord_p_fromdate,
                                    user: {
                                        id: data[0].ui_userid,
                                        name: data[0].ui_name,
                                        phone: data[0].ui_phone,
                                        address: order.o_address,
                                        city: order.o_city,
                                        avartar: data[0].ui_avartar
                                    }
                                }
                            )
                        })
                    })).then((orders) => {
                        let result = response.OK;
                        result.data = orders;
                        res.json(result);
                    })
                })
            })
        })
    },

    setStatusProductOrder: function (req, res) {
        let user_id = req.session.user_id;

        let status = req.param('status');

        switch (status) {
            case 'ENABLE':
                status = "ENABLE";
                break;
            case 'APPROVED':
                status = "APPROVED";
                break;
            case 'UNENABLE':
                status = "UNENABLE";
                break;

            default:
                return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }

        let ord_id = req.param('ord_id');
        if (!ord_id || isNaN(ord_id) || parseInt(ord_id) < 0) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.setStatusProductOrder(?, ?, ?)", [ord_id, status, user_id], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return res.json(response.NOT_ACCESS);
                }

                if (data.length < 1) {
                    return res.json(response.NOT_ACCESS);
                }

                Promise.all(data.map((order) => {
                    return new Promise((resolve, reject) => {
                        StoredProcedure.query("call moki.get_user_information(?, 'ENABLE')", [order.ord_p_user_id], function (err, [data, server_status]) {
                            resolve({ data, order });
                        })
                    })
                })).then((orders) => {
                    let result = response.OK;
                    result.data = orders.map(({ data, order }) => {
                        return {
                            id: order.ord_id,
                            id_p: order.ord_p_id,
                            code: order.ord_p_code,
                            name: order.ord_p_name,
                            number: order.ord_number,
                            price: order.ord_p_price,
                            price_percent: order.ord_p_price_percent,
                            status: order.ord_status,
                            create: order.ord_p_fromdate,
                            user: {
                                id: data[0].ui_userid,
                                name: data[0].ui_name,
                                phone: data[0].ui_phone,
                                avartar: data[0].ui_avartar
                            }
                        }
                    });
                    res.json(result);
                    resolve(result)
                })
            })
        })
    },

    setOrderStatus: function (req, res) {
        let user_id = req.session.user_id;

        let status = req.param('status');

        switch (status) {
            case 'ENABLE':
                status = "ENABLE";
                break;
            case 'APPROVED':
                status = "APPROVED";
                break;
            case 'UNENABLE':
                status = "UNENABLE";
                break;

            default:
                return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }

        let order_id = req.param('order_id');
        if (!order_id || isNaN(order_id) || parseInt(order_id) < 0) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }

        return new Promise((resolve, reject) => {
            StoredProcedure.query("call moki.setStatusOrder(?, ?)", [order_id, status], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                Promise.all(data.map((order) => {
                    return new Promise((resolve, reject) => {
                        StoredProcedure.query("call moki.viewOrderDetail(?)", [order.o_id], function (err, [data, server_status]) {
                            resolve({ data, order });
                        })
                    })
                })).then((orders) => {
                    let result = response.OK;
                    result.data = orders.map(({ data, order }) => {
                        return {
                            id: order.o_id,
                            code: order.o_code,
                            create: order.o_fromdate,
                            address: order.o_address,
                            total_price: order.o_total_price,
                            phone: order.o_phone,
                            city: order.city,
                            status: order.o_statusid,
                            products: data.map((p) => {
                                return {
                                    id: p.ord_p_id,
                                    code: p.ord_p_code,
                                    name: p.ord_p_name,
                                    number: p.ord_number,
                                    price: p.ord_p_price,
                                    price_percent: p.ord_p_price_percent,
                                    status: p.ord_status
                                }
                            })
                        }
                    });
                    res.json(result);
                    resolve(result)
                })
            })
        })
    },

    getProducts: async function (req, res) {
        console.log(req.param('category_id'));
        let categoryId = req.param('category_id') || 'ALL';
        let index = req.param('index') || 0;
        let sort = req.param('sort') || 'p_fromdate';
        let typeSort = req.param('typeSort') || 1; //0: DESC, 1: ASC
        let count = req.param('count') || 10; //default 20

        let products = await this.listProduct(req.allParams(), req);

        let result = response.OK;
        result.data = {
            products: [],
            new_items: 0,
            last_id: 0
        }

        if (products.length > 0) {
            result.data.products = products
            result.data.new_items = 0;
            result.data.last_id = products[products.length - 1].id;
        }

        res.status(200);
        res.json(result)

        return res;
    },

    addProduct: async function (req, res) {
        let self = this;
        let user_id = req.session.user_id;

        let name = req.param('name');
        let price = req.param('price');
        let product_size_id = req.param('product_size_id');
        let brand_id = req.param('brand_id');
        let category_id = req.param('category_id');
        let image = req.param('image');
        let video = req.param('video');
        let thumb = req.param('thumb');
        let described = req.param('described');
        let ships_from = req.param('ships_from');
        let ships_from_id = req.param('ships_from_id');
        let condition = req.param('condition');
        let dimension = req.param('dimension');
        let weight = req.param('weight');

        // param chưa có
        let price_new = req.param('price_new') || price;
        let price_percent = req.param('price_percent') || 0;
        let number = req.param('number') || 0;
        let idAddress = await this.getIdAddress(ships_from, user_id);
        let condition_id = req.param('condition_id') || 1;

        StoredProcedure.query('call moki.addProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, user_id, price, price_percent, number, described, idAddress, category_id, price_new, 0, condition_id], async function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                console.log("err", err)
                result.code = 9993;
                result.message = 'Code verify is incorrect';
                result.data = err;
                res.status(500);
                return res.json(result)
            }
            //console.log(data)
            let id_product = data[0].product_id;
            if (!!weight) {
                let id_condition = await self.addAdditional(id_product, undefined, 'weight', weight);
            }

            if (!!dimension) {
                let id_condition = await self.addAdditional(id_product, undefined, 'dimension', dimension);
            }

            let imageFile = req.file('image');
            let imageUrl = await self.upload(imageFile, 'image', id_product);



            let thumbFile = req.file('thumb');
            let thumbUrl = await self.upload(thumbFile, 'thumb', id_product);
            if (thumbUrl != 0) {
                let videoFile = req.file('video');
                let videoUrl = await self.upload(videoFile, 'video', id_product, thumbUrl);
            }

            result.data = {
                id: id_product
            }
            res.status(200);



            if (parseInt(user_id) !== response.me) {
                pushnotify.pushNotify("New Product", "Có một sản phẩm mới", { "product_id": id_product.toString() })
            }


            return res.json(result);

        });
    },

    like: function (req, res) {
        let user_id = req.session.user_id;
        let product_id = req.param('product_id');

        if (!user_id && !product_id && typeof product_id != 'number') {
            let result = response.PARAMETER_TYPE_IS_INVALID;
            res.status(402);
            res.json(result)

            return res;
        }

        StoredProcedure.query('call likeProduct(?, ?)', [product_id, user_id], function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                //console.log("err", err)
                result = response.CODE_VERIFY_IS_INCORRECT;
                res.status(500);
                return res.json(result)
            }

            result.data = {
                like: data[0].like
            }


            res.status(200);
            res.json(result);
            return res;

        });
    },
    setRates: function (req, res) {
        let user_id = req.session.user_id;
        let product_id = req.param('product_id');
        let stars = req.param('stars');

        if (!stars && !user_id && !product_id && typeof product_id != 'number') {
            let result = response.PARAMETER_TYPE_IS_INVALID;
            res.status(402);
            res.json(result)

            return res;
        }

        StoredProcedure.query('call updateRating(?,?,?)', [product_id, stars, user_id], function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                //console.log("err", err)
                result = response.CODE_VERIFY_IS_INCORRECT;
                res.status(500);
                return res.json(result)
            }

            result.data = {
                rates: data[0].p_rating
            }


            res.status(200);
            res.json(result);
            return res;

        });
    },

    getProduct: async function (req, res) {
        let product_id = parseInt(req.param("id"));

        if (!product_id || typeof product_id != "number") {
            let result = response.PARAMETER_TYPE_IS_INVALID;
            res.status(500);
            return res.json(result);
        }

        let products = await this.productDetail({ product_id: product_id })

        let result = response.OK;
        result.data = products;

        res.status(200);
        res.json(result)

        return res;
    },

    getComments: function (req, res) {
        let productId = req.param('product_id');
        if(isNaN(productId)) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID);
        }
        StoredProcedure.query('call moki.getCommentsProduct(?, NULl)', [productId], function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                //console.log("err", err)
                result = response.CODE_VERIFY_IS_INCORRECT;
                res.status(500);
                return res.json(result)
            }


            result.data = data.map(function (cmt) {

                return {
                    id: cmt.cmt_id,
                    comment: cmt.cmt_content,
                    created: cmt.cmt_fromdate,
                    poster: {
                        id: cmt.cmt_user_id,
                        name: cmt.ui_name,
                        avatar: cmt.ui_avartar
                    }
                }
            })

            res.status(200);
            res.json(result);
            return res;

        });
    },

    setComments: function (req, res) {
        let user_id = req.session.user_id;
        let productId = req.param('product_id');
        let comment = req.param('comment');
        let last_id = req.param('last_id');
        console.log(productId, comment, user_id, last_id)
        StoredProcedure.query('call setComment(?, ?, ?, ?)', [productId, comment, user_id, last_id], function (err, [data, server_status]) {
            if (err) {
                let result = response.CODE_VERIFY_IS_INCORRECT;
                result.data = err;
                res.status(500);
                return res.json(result)
            }

            let result = response.OK;
            result.data = data.map(function (cmt) {
                return {
                    id: cmt.cmt_id,
                    comment: cmt.cmt_content,
                    created: cmt.cmt_fromdate,
                    poster: {
                        id: cmt.cmt_user_id,
                        name: cmt.ui_name,
                        avatar: cmt.ui_avartar
                    }
                }
            })
            res.status(200);
            return res.json(result);

        });
    },

    deleteComments: function (req, res) {
        let cmt_id = req.param('cmt_id');
        StoredProcedure.query('call deleteComment(?)', [cmt_id], function (err, [data, server_status]) {
            if (err) {
                let result = response.CODE_VERIFY_IS_INCORRECT;
                result.data = err;
                res.status(500);
                return res.json(result)
            }

            let result = response.OK;
            res.status(200);
            return res.json(result);

        });
    },

    getList: function (req, res) {

        Product
            .find({ id: 3 })
            .limit(12)
            .populate("sell")
            .populate("comments")
            .exec(function (err, products) {
                if (err) {
                    return res.json(err)
                }
                return res.json(products)
            })
    },

    search: async function (req, res) {

        let keyword = req.param('keyword');
        let category_id = req.param('category_id');
        let product_size_id = req.param('product_size_id');
        let price_min = req.param('price_min');
        let price_max = req.param('price_max');
        let condition_id = req.param('condition_id');
        let index = req.param('index');
        let count = req.param('count');

        let products = await this.searchListProduct(req)

        let result = response.OK;
        result.data = {
            products: [],
            new_items: 0,
            last_id: 0
        }

        if (products.length > 0) {
            result.data.products = products
            result.data.new_items = 0;
            result.data.last_id = products[products.length - 1].id;
        }

        res.status(200);
        res.json(result)

        return res;
    },

    searchListProduct: function (req) {
        let keyword = req.param('keyword');
        let category_id = req.param('category_id');
        let brand_id = req.param('brand_id');
        let product_size_id = req.param('product_size_id');
        let price_min = req.param('price_min');
        let price_max = req.param('price_max');
        let condition_id = req.param('condition_id');
        let index = req.param('index') || 0;
        let count = req.param('count') || 10;
        let token = req.headers['authorization'];
        let self = this;
        if (count > 200) {
            count = 200;
        }


        return new Promise((resolve, reject) => {
            let query = `call moki.searchListProduct(${keyword ? '"' + keyword + '"' : 'NULL'},${category_id ? '"' + category_id + '"' : 'NULL'},${brand_id ? '"' + brand_id + '"' : 'NULL'},${product_size_id ? '"' + product_size_id + '"' : 'NULL'}, ${price_min ? '"' + price_min + '"' : 'NULL'}, ${price_max ? '"' + price_max + '"' : 'NULL'}, ?, ?, 'ENABLE')`;
            console.log(query)


            StoredProcedure.query(query, [index, count], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                let user_id = req.session.user_id;
                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;
                    let isLike = self.isLike;
                    let ui_userid = product.ui_name;
                    let can_edit = 0;
                    if (!!token && (ui_userid == user_id || req.session.type == 'ADMIN')) {
                        can_edit = 1;
                    }

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            code: product.p_code,
                            name: product.p_name,
                            image: await listImages(product.p_id),
                            video: await listVideos(product.p_id),
                            price: product.p_price,
                            price_percent: product.p_price_percent,
                            described: product.p_description,
                            created: product.ui_fromdate,
                            like: product.p_nlike,
                            comment: product.p_ncomment,
                            is_liked: !!token ? 0 : await isLike(req.session.user_id, product.p_id),
                            is_blocked: 0,
                            can_edit: can_edit,
                            banned: 0, //khoá user
                            seller: {
                                id: product.ui_userid,
                                username: product.ui_name,
                                avatar: product.ui_avartar,
                            }
                        })
                    })
                })).then((products) => {
                    resolve(products)
                })
            })
        })
    },

    listMyLike: async function (req, res) {

        let products = await this.getListMyLike(req)

        let result = response.OK;
        result.data = {
            products: []
        }

        if (products.length > 0) {
            result.data.products = products
        }

        res.status(200);
        res.json(result)

        return res;
    },



    getListMyLike: function (req) {
        let index = req.param('index') || 0;
        let count = req.param('count') || 10;
        let user_id = req.session.user_id;


        let self = this;
        if (count > 200) {
            count = 200;
        }

        return new Promise((resolve, reject) => {

            StoredProcedure.query('call moki.getListMyLike(?, ?, ?)', [user_id, index, count], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;
                    let isLike = self.isLike;

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            code: product.p_code,
                            name: product.p_name,
                            image: await listImages(product.p_id),
                            video: await listVideos(product.p_id),
                            price: product.p_price,
                            price_percent: product.p_price_percent,
                            brand: 0,//Thương hiệu
                            described: product.p_description,
                            created: product.ui_fromdate,
                            like: product.p_nlike,
                            comment: product.p_ncomment,
                            seller: {
                                id: product.ui_userid,
                                username: product.ui_name,
                                avatar: product.ui_avartar,
                            }
                        })
                    })
                })).then((products) => {
                    resolve(products)
                })
            })
        })
    },

    listProduct: function (params, req) {
        let categoryId = params['category_id'] || 0;
        let index = params['index'] || 1;
        let sort = params['sort'] || 'p_id';
        let typeSort = params['typeSort'] || 1; //0: DESC, 1: ASC
        let count = params['count'] || 10; //default 20
        let status = 'ENABLE';
        let token = req.headers['authorization'];
        var self = this;

        if (count > 200) {
            count = 200;
        }
        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getListProduct(?, ?, ?, ?, ?, ?)', [categoryId, index, sort, typeSort, count, status], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                let user_id = req.session.user_id;
                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;
                    let isLike = self.isLike;
                    let ui_userid = product.ui_name;
                    let can_edit = 0;
                    if (!!token && (ui_userid == user_id || req.session.type == 'ADMIN')) {
                        can_edit = 1;
                    }

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            code: product.p_code,
                            name: product.p_name,
                            image: await listImages(product.p_id),
                            video: await listVideos(product.p_id),
                            price: product.p_price,
                            price_percent: product.p_price_percent,
                            brand: product.pb_name,//Thương hiệu
                            described: product.p_description,
                            created: product.ui_fromdate,
                            like: product.p_nlike,
                            number: product.p_number,
                            comment: product.p_ncomment,
                            is_liked: !!token ? 0 : await isLike(req.session.user_id, product.p_id),
                            is_blocked: 0,
                            can_edit: can_edit,
                            banned: 0, //khoá user
                            seller: {
                                id: product.ui_userid,
                                username: product.ui_name,
                                avatar: product.ui_avartar,
                            }
                        })
                    })
                })).then((products) => {
                    resolve(products)
                })
            })
        })
    },

    productDetail: function (params) {
        return new Promise((resolve, reject) => {
            let product_id = params['product_id'];
            let status = 'ENABLE';
            let self = this;

            if (!product_id) {
                reject()
                return;
            }

            StoredProcedure.query('call moki.getProductDetail(?, ?)', [product_id, status], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;
                    let isLike = self.isLike;
                    let listAdditionals = self.listAdditionals;
                    let categoryChild = self.categoryChild;

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            code: product.p_code,
                            name: product.p_name,
                            image: await listImages(product_id),
                            video: await listVideos(product_id),
                            additionals: await listAdditionals(product_id),
                            price: product.p_price,
                            price_percent: product.p_price_percent,
                            brand: product.pb_name,//Thương hiệu
                            described: product.p_description,
                            ships_from_id: product.pa_id,
                            ships_from: product.pa_address,
                            condition: product.cond_name,
                            created: product.ui_fromdate,
                            like: product.p_nlike,
                            comment: product.p_ncomment,
                            is_liked: await isLike(product.ui_userid, product.p_id),
                            is_blocked: 0,
                            can_edit: 0,
                            banned: 0, //khoá user
                            seller: {
                                id: product.ui_userid,
                                name: product.ui_name,
                                avatar: product.ui_avartar,
                                score: product.s_score,
                                listing: product.s_listing,
                                created: product.ui_fromdate
                            },
                            category: await categoryChild(product.p_category_id)
                        })
                    })
                })).then((products) => {
                    resolve(products)
                })
            })
        })
    },

    listComment: function (params) {
        let productId = params['product_id'] || 0;

        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getCommentsProduct(?)', [productId], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                let comments = data.map((comment) => {
                    return {
                        id: comment.cmt_id,
                        content: comment.cmt_content,
                        create: comment.cmt_fromdate,
                        poster: {
                            id: comment.cmt_user_id,
                            name: comment.ui_name,
                            avartar: comment.ui_avartar,

                        }
                    }
                })

                resolve(comments)
            })
        })
    },

    likeProduct: function (user_id, product_id) {

        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.likeProduct(?, ?)', [product_id, user_id], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(data)
            })
        })
    },

    unLikeProduct: function (user_id, product_id) {

        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.unLikeProduct(?, ?)', [product_id, user_id], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(data)
            })
        })
    },

    listImages: function (productId) {

        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getImagesProduct(?)', [productId], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                let images = data.map((image) => {
                    return {
                        id: image.pi_id,
                        url: image.pi_url,
                        create: image.pi_fromdate
                    }
                })

                resolve(images)
            })
        })
    },

    listVideos: function (productId) {
        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getVideoProduct(?)', [productId], function (err, [data, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }

                let videos = data.map((video) => {
                    return {
                        id: video.pv_id,
                        url: video.pv_url,
                        create: video.pv_fromdate,
                        thumb: video.pv_thumb
                    }
                })

                resolve(videos)
            })
        })
    },

    listAdditionals: function (product_id) {

        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getAdditionalsProduct(?)', [product_id], function (err, [data, server_status]) {

                if (err) {
                    reject(err)
                    return;
                }

                let additionals = data.map((additional) => {
                    return {
                        id: additional.pa_id,
                        name: additional.infa_name,
                        value: additional.pa_content,
                        description: additional.infa_description
                    }
                })

                resolve(additionals)
            })
        })
    },

    isLike: function (user_id, product_id) {

        return new Promise((resolve, reject) => {
            StoredProcedure.query('select moki.isLike(?, ?)', [product_id, user_id], function (err, [check, server_status]) {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(check == 1 ? 1 : 0)
            })
        })
    },

    categoryChild: function (category_id) {
        return new Promise((resolve, reject) => {
            if (!category_id || typeof category_id != "number") {
                reject();
                return;
            }

            Product_Category.find({ pc_id: category_id })
                .populate("children")
                .exec(function (err, categories) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(categories)
                })
        })
    },

    getIdAddress: function (address, user_id) {
        console.log(address, user_id)
        return new Promise((resolve, reject) => {
            StoredProcedure.query('select moki.getIdAddress(?, ?) as idAddress', [address, user_id], function (err, data) {
                if (err) {
                    reject(err)
                    console.log(737, err)
                    return;
                }

                console.log(558, data)

                resolve(data[0].idAddress)
            })
        })
    },

    addAdditional: function (productId, pa_type_id, pa_type_name, pa_content) {

        return new Promise((resolve, reject) => {
            let query = `call moki.addAdditional( ?, ${pa_type_id ? '"' + pa_type_id + '"' : 'NULL'},${pa_type_name ? '"' + pa_type_name + '"' : 'NULL'}, ?)`;
            StoredProcedure.query(query, [productId, pa_content], function (err, [data, server_status]) {
                if (err) {
                    console.log(err)
                    reject(err)
                    return;
                }
                console.log(data)
                resolve(data[0].id_condition)
            })
        })
    },

    addVideo: function (productId, pv_url, pv_thumb) {
        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.product_video(?, ?, ?)', [productId, pv_url, pv_thumb], function (err, data) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(data[0].idVideo)
            })
        })
    },

    addImage: function (productId, pi_url) {
        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.product_image(?, ?)', [productId, pi_url], function (err, data) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(data[0].idImage)
            })
        })
    },

    get_list_brands: function (req, res) {

        Product_Brand.find()
            .exec(function (err, brands) {
                if (err) {
                    return res.json(err)
                }

                let resuilt = response.OK;

                resuilt.data = brands.map((brand) => {
                    return {
                        id: brand.id,
                        brand_name: brand.name
                    }
                })

                res.json(resuilt);

                return res
            })
    },

    get_list_sizes: function (req, res) {

        Product_Size.find()
            .exec(function (err, sizes) {
                if (err) {
                    return res.json(err)
                }

                let resuilt = response.OK;

                resuilt.data = sizes.map((size) => {
                    return {
                        id: size.id,
                        size_name: size.name
                    }
                })

                res.json(resuilt);

                return res
            })
    },

    get_list_conditions: function (req, res) {

        Condition.find()
            .exec(function (err, conditions) {
                if (err) {
                    return res.json(err)
                }

                let resuilt = response.OK;

                resuilt.data = conditions.map((condition) => {
                    return {
                        id: condition.cond_id,
                        condition_name: condition.cond_name
                    }
                })

                res.json(resuilt);

                return res
            })
    },

    get_size_new_item: function (req) {
        let categoryId = params['category_id'] || 0;
        let index = params['index'] || 1;
        let sort = params['sort'] || 'p_id';
        let typeSort = params['typeSort'] || 1; //0: DESC, 1: ASC
        let count = params['count'] || 10; //default 20
        let status = 'ENABLE';
        let token = req.headers['authorization'];


        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getNewItemProduct(1, 0, ?, 0, 20, "ENABLE", 57)', [productId, pi_url], function (err, data) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(data[0].idImage)
            })
        })
    },

    set_save_search: function (req, res) {
        let user_id = req.session.user_id;

        let keyword = req.param('keyword');
        let category_id = req.param('category_id');
        let brand_id = req.param('brand_id');
        let product_size_id = req.param('product_size_id');
        let price_min = req.param('price_min');
        let price_max = req.param('price_max');
        let condition_id = req.param('condition_id');

        let check = false;

        if (!!keyword || !!category_id || !!brand_id || !!product_size_id || !!price_min || !!price_max || !!condition_id) {
            check = true;
        }

        if (!check) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        let query = `call moki.set_save_search(${keyword ? '"' + keyword + '"' : 'NULL'},${category_id ? '"' + category_id + '"' : 'NULL'},${brand_id ? '"' + brand_id + '"' : 'NULL'},${product_size_id ? '"' + product_size_id + '"' : 'NULL'}, ${price_min ? '"' + price_min + '"' : 'NULL'}, ${price_max ? '"' + price_max + '"' : 'NULL'}, ${condition_id ? '"' + condition_id + '"' : 'NULL'}, ?)`;

        StoredProcedure.query(query, [user_id], async function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                return res.json(response.NO_DATA_OR_END_OF_LIST_DATA)
            }

            result.data = {
                id_new: data[0].id_new_save_search
            }

            res.status(200);
            return res.json(result);
        });
    },

    get_list_save_search: function (req, res) {
        let user_id = req.session.user_id;

        StoredProcedure.query('call get_list_save_search(?)', [user_id], async function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                return res.json(response.NO_DATA_OR_END_OF_LIST_DATA)
            }

            result.data = data.map((search) => {
                return {
                    id: search.ss_id,
                    keyword: search.ss_keyword,
                    Category: {
                        id: search.cond_id,
                        name: search.cond_name
                    },
                    Brand: {
                        id: search.pb_id,
                        brand_name: search.pb_name
                    },
                    Product_Size: {
                        id: search.pz_id,
                        size_name: search.pz_name
                    },
                    price_min: search.ss_price_min,
                    price_max: search.ss_price_max,
                    condition: {
                        id: search.cond_id,
                        name: search.cond_name
                    }
                }
            })

            res.status(200);
            return res.json(result);
        });
    },

    user_listings: async function (req, res) {
        let user_id = req.session.user_id;
        console.log(user_id)
        let count = req.param('count') || 10;
        let index = req.param('index') || 0;
        let keyword = req.param('keyword');
        let category_id = req.param('category_id');
        let status = 'ENABLE';
        if (!user_id) {
            user_id = req.param('user_id')
        }

        if (!user_id) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        let products = await this.get_user_listings(index, count, keyword, category_id, status, user_id, req.param('token'));

        let result = response.OK;
        result.data = products

        res.json(result)

        return res;

    },

    get_user_listings: function (index, count, keyword, category_id, status, user_id, token) {
        if (count > 200) {
            count = 200;
        }

        let query = `call moki.get_user_listing(?, ?, ?, ${keyword ? '"' + keyword + '"' : 'NULL'},${category_id ? '"' + category_id + '"' : 'NULL'}, ?)`;
        let self = this;
        return new Promise((resolve, reject) => {
            StoredProcedure.query(query, [index, count, user_id, status], async function (err, [data, server_status]) {
                let result = response.OK;

                if (err) {
                    resolve()
                    return;
                }

                Promise.all(data.map((product) => {
                    let listImages = self.listImages;
                    let listVideos = self.listVideos;

                    return new Promise(async (resolve, reject) => {
                        resolve({
                            id: product.p_id,
                            name: product.p_name,
                            price: product.p_price,
                            price_new: product.p_price_new,
                            price_percent: product.p_price_percent,
                            image: await listImages(product.p_id),
                            video: await listVideos(product.p_id),
                            like: product.p_nlike,
                            comment: product.p_ncomment,
                            is_liked: !token ? 0 : await isLike(req.session.user_id, product.p_id),
                            banned: 0,
                            created: product.p_fromdate
                        })
                    })
                })).then((products) => {
                    resolve(products)
                })
            })
        })
    },

    upload: function (uploadFile, type, id_product, thumb) {

        let dirname = '';
        switch (type) {
            case 'image':
                dirname = 'images';
                break;
            case 'video':
                dirname = 'videos';
                break;
            case 'thumb':
                dirname = 'thumbs';
                break;
            default:
                return;
        }

        if (!id_product) {
            return;
        }

        /*
        if (req.method === 'GET')
            return res.json({ 'status': 'GET not allowed' });
        //	Call to /upload via GET is error

        var uploadFile = req.file('uploadFile');
        console.log(uploadFile);
        */

        //Use this to upload to custom folder
        //If you don't want this remove {dirname: ''}
        //There are other options also .Check at skipper docs

        //If dirname is not set the upload will be done to ./tmp/uploads	
        return new Promise((resolve, reject) => {
            uploadFile.upload({ dirname: `../../assets/${dirname}`, maxBytes: 20000000 }, function onUploadComplete(err, files) {
                // Files will be uploaded to /assets/images/
                // Access the files via localhost:1337/images/yourfilename

                if (err) {
                    reject(err);
                    return;
                }
                console.log('file', files.length)
                //	IF ERROR Return and send 500 error with error
                if (files.length === 0) {
                    resolve(0);
                    return;
                }
                let baseUrl = sails.getBaseUrl();
                let fileUrl = files[0].fd.split(/\/|\/\/|\\/i);
                fileUrl = fileUrl[fileUrl.length - 1]
                fileUrl = `${baseUrl}/${dirname}/${fileUrl}`;

                switch (type) {
                    case 'image':
                        StoredProcedure.query('call moki.add_images(?, ?)', [id_product, fileUrl], async function (err, [data, server_status]) {
                            resolve(fileUrl);
                        })
                        break;
                    case 'video':
                        StoredProcedure.query('call moki.add_videos(?, ?, ?)', [id_product, fileUrl, thumb], async function (err, [data, server_status]) {
                            resolve(fileUrl);
                        })
                        break;
                    default:
                        resolve(fileUrl);
                        return;
                }
            });
        })
    },
};

