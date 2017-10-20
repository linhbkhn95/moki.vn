/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const response = require('../util/response');

module.exports = {
    getProducts: async function (req, res) {
        let categoryId = req.param('category_id') || 1;
        let lastId = req.param('last_id') || 1;
        let sort = req.param('sort') || 'p_fromdate';
        let typeSort = req.param('typeSort') || 1; //0: DESC, 1: ASC
        let count = req.param('count') || 20; //default 20

        let products = await this.listProduct(req.allParams())

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

    getProduct: async function (req, res) {
        let product_id = parseInt(req.param("product_id"));

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
        let productId = req.param('productId');
        StoredProcedure.query('call getCommentsProduct(?)', [productId], function (err, rawResult) {
            let result = {
                code: "",
                message: "",
                data: ""
            }

            if (err) {
                //console.log("err", err)
                result.code = 9993;
                result.message = 'Code verify is incorrect';
                result.data = err;
                res.status(500);
                return res.json(result)
            }

            result.code = 1000;
            result.message = 'OK';
            result.data = rawResult;
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

    search: function (req, res) {

        let keyword = req.param('keyword');
        let category_id = req.param('category_id');
        let product_size_id = req.param('product_size_id');
        let price_min = req.param('price_min');
        let price_max = req.param('price_max');
        let condition_id = req.param('condition_id');
        let index = req.param('index');
        let count = req.param('count');

        let productQ = Product.find();
        if(!!keyword) {
            keywordS = "%" + keyword.split(' ').join("%") + "%";
            productQ = productQ.findLike(
                {
                    name: keywordS
                },
                {
                    described: keywordS
                }
            )
        }

        if(!!price_min) {
            let price_minQ = parseInt(price_min);
            if(typeof price_minQ == "number") {
                productQ = productQ.where(
                    {
                        price: "> " + (price_minQ - 1)
                    }
                )
            }
        }

        if(!!price_max) {
            let price_maxQ = parseInt(price_max);
            if(typeof price_maxQ == "number") {
                productQ = productQ.where(
                    {
                        price: "< " + (price_maxQ + 1)
                    }
                )
            }
        }

        if(!!condition_id) {
            let condition_idQ = parseInt(condition_id);
            if(typeof condition_idQ == "number") {
                productQ = productQ.find({
                    condition_id: condition_idQ
                })
            }
        }

        if(!!category_id) {
            let category_idQ = parseInt(category_id);
            if(typeof category_idQ == "number") {
                productQ = productQ.find({
                    category_id: category_idQ
                })
            }
        }

        if(!!index) {
            index = parseInt(index);
            if(typeof index != "number") {
                index = 0;
            }
        } else {
            index = 0
        }

        if(!!count) {
            count = parseInt(count);
            if(typeof count != "number") {
                count = 20;
            }
        } else {
            count = 20
        }

        
        Product
            .find({ id: 3 })
            .limit(12)
            .exec(function (err, products) {
                if (err) {
                    return res.json(err)
                }
                return res.json(products)
            })
    },

    listProduct: function (params) {
        let categoryId = params['category_id'] || 1;
        let lastId = params['last_id'] || 1;
        let sort = params['sort'] || 'p_id';
        let typeSort = params['typeSort'] || 1; //0: DESC, 1: ASC
        let count = params['count'] || 5000; //default 20
        let status = 'ENABLE';
        let token = params['token']
        var self = this;
        return new Promise((resolve, reject) => {
            StoredProcedure.query('call moki.getListProduct(?, ?, ?, ?, ?, ?)', [categoryId, lastId, sort, typeSort, count, status], function (err, [data, server_status]) {
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
                            is_liked: await isLike(product.ui_userid, product.p_id),
                            is_blocked: 0,
                            can_edit: 0,
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
                            brand: 0,//Thương hiệu
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
                                listing: product.s_listing
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
    }
};

