import React from 'react';
import { Modal, Button, Checkbox, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios'
import 'react-select/dist/react-select.css';
import * as validator from 'validator'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import { CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
class ModalAddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brands: [],
            conditons: [],
            categories: []
        }
        this.handleChangeBrands = this.handleChangeBrands.bind(this);
        this.handleChangeCondition = this.handleChangeCondition.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }
    close() {
        this.props.close();
    }

    componentWillReceiveProps(nextProps) {
        // var that = this;
        // that.setState({ loading_product_category: true });
        // axios.post('/api/get_user_listings', { user_id: nextProps.user_id })
        //     .then(res => {
        //         if (res.data.code == 1000) {
        //             let data = res.data.data || [];
        //             let _continueProduct = true;
        //             if (data.length == 0) {
        //                 _continueProduct = false;
        //             }
        //             that.setState({ data: data });
        //             that.setState({ _continueProduct: _continueProduct, loading_product_category: false });
        //         }
        //     });

        // window.addEventListener('scroll', this.handleScroll);
    }
    componentDidMount() {
        var that = this;

        axios.post('/api/get_list_brands')
            .then(res => {
                if (res.data.code == 1000) {
                    that.setState({ brands: res.data.data, choose_brands: res.data.data[0] });
                }
            });

        axios.post('/api/get_list_conditions')
            .then(res => {
                if (res.data.code == 1000) {
                    that.setState({ conditons: res.data.data, choose_condition: res.data.data[0] });
                }
            });

        axios.post('/api/get_categories')
            .then(res => {
                let categories = res.data;
                let _categories = []
                categories.forEach((category) => {
                    if (!category.children || category.children.length == 0) {
                        _categories.push(category)
                    } else {
                        category.children.forEach((category) => {
                            if (!category.children || category.children.length == 0) {
                                _categories.push(category)
                            }
                        })
                    }
                })
                console.log(_categories)
                that.setState({ categories: _categories, choose_category: _categories[0] });
            });



        // axios.post('/api/get_shop_infor', { user_id: this.props.user_id })
        //     .then(res => {
        //         if (res.data.code == 1000) {

        //             that.setState({ shop_info: res.data.data });
        //         }
        //     });
        // window.addEventListener('scroll', this.handleScroll);
    }

    handleChangeBrands(choose_brands) {
        this.setState({ choose_brands });
    }

    handleChangeCondition(choose_condition) {
        this.setState({ choose_condition });
    }

    handleChangeCategory(choose_category) {
        this.setState({ choose_category });
    }

    addProduct() {

        let name = document.getElementById("name_new_product").value;
        let number = document.getElementById("number_new_product").value;
        let price = document.getElementById("price_new_product").value;
        let image = document.getElementById("image_new_product").files;
        let described = document.getElementById("description_new_product").value;
        let ships_from = document.getElementById("address_new_product").value;
        let brand_id = this.state.choose_brands.id;
        let category_id = this.state.choose_category.id;
        let condition_id = this.state.choose_condition.id;

        //name = validator.escape(name);

        if (validator.isEmpty(name)) {
            alert("Bạn chưa nhập tên sản phẩm");
            return;
        }

        if (!(validator.isNumeric(number) && parseInt(number) > 0)) {
            alert("Số lượng sản phẩm phải lớn hơn 0");
            return;
        }

        if (!(validator.isNumeric(price) && parseInt(price) > 0)) {
            alert("Giá sản phẩm phải lớn hơn 0");
            return;
        }

        if (image.length < 1) {
            alert("Bạn chưa đăng ảnh sản phẩm");
            return;
        } else {
            image = image[0];
        }

        //described = validator.escape(described);

        if (validator.isEmpty(described)) {
            alert("Bạn chưa điền mô tả sản phẩm");
            return;
        }

        //ships_from = validator.escape(ships_from);

        if (validator.isEmpty(ships_from)) {
            alert("Bạn chưa điền nơi bán");
            return;
        }
        this.setState({loading: true})
        this.props.addProduct(name, number, price, image, described, ships_from, brand_id, category_id, condition_id).then((res) => {
            if(res.data.code==1000) {
                this.props.close();
            } else {
                alert("Gặp lỗi khi thêm sản phẩm mới");
            }
            this.setState({loading: false})
        })
    }


    render() {
        return (
            <Modal show={this.props.show}
                onHide={this.close.bind(this)}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg"><div className="title-add-product col-md-4">Thêm sản phẩm</div></Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {
                            this.state.loading ?
                                (
                                    <Paper style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", zIndex: "100000000", backgroundColor: "rgba(0, 0, 0, 0.1)" }} zDepth={1} >
                                        <CircularProgress style={{ left: "50%", top: "50%" }} />
                                    </Paper>
                                )
                            :null
                        }

                        <div className="col-md-12">
                            <div className="title-moduleadd-product" >Mô tả sản phẩm</div>
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <FieldGroup
                                        id="name_new_product"
                                        type="text"
                                        label="Tên sản phẩm"
                                        placeholder="Nhập tên sản phẩm..."
                                    />
                                </div>
                                <div className="col-md-3">
                                    <FieldGroup
                                        id="number_new_product"
                                        type="number"
                                        label="Số lượng sản phẩm"
                                        placeholder="Nhập số lượng sản phẩm..."
                                    />

                                </div>
                                <div className="col-md-3">
                                    <FieldGroup
                                        id="price_new_product"
                                        type="number"
                                        label="Giá sản phẩm"
                                        placeholder="Nhập giá sản phẩm..."
                                        help="(VNĐ)"
                                    />

                                </div>
                                <div className="col-md-12">

                                    <FieldGroup
                                        id="image_new_product"
                                        type="file"
                                        label="Ảnh sản phẩm"
                                        help="Chọn ảnh sản phẩm để đăng bán"
                                        accept="image/*"
                                    />

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <FormGroup controlId="description_new_product">
                                        <ControlLabel>Mô tả sản phẩm</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Nhập mô tả về sản phẩm cuả bạn..." />
                                    </FormGroup>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="title-moduleadd-product">Chi tiết sản phẩm</div>
                            <div className="col-md-12">
                                <div className="col-md-4">
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Danh mục sản phẩm</ControlLabel>
                                        <Select
                                            value={this.state.choose_category}
                                            options={this.state.categories}
                                            onChange={this.handleChangeCategory}
                                            valueKey={"id"}
                                            labelKey={"name"}
                                            simpleValue
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Nhãn hiệu sản phẩm</ControlLabel>
                                        <Select
                                            value={this.state.choose_brands}
                                            options={this.state.brands}
                                            onChange={this.handleChangeBrands}
                                            valueKey={"id"}
                                            labelKey={"brand_name"}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Trạng thái</ControlLabel>
                                        <Select
                                            value={this.state.choose_condition}
                                            options={this.state.conditons}
                                            onChange={this.handleChangeCondition}
                                            valueKey={"id"}
                                            labelKey={"condition_name"}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="title-moduleadd-product">Vận chuyển</div>
                            <div className="col-md-12">

                                <div className="col-md-12">
                                    <FormGroup controlId="address_new_product">
                                        <ControlLabel>Nơi bán</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Nhập nơi bán của bạn.." />
                                    </FormGroup>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => { this.addProduct(); }} className="btn btn-primary">Thêm</button>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

module.exports = ModalAddProduct;