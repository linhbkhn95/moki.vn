import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, NavLink, Link } from 'react-router-dom';

import React from 'react';
import axios from 'axios';
// Import React Table
import ModalAddProduct from './product/ModalAddProduct.js';
import ModalEditProduct from './product/ModalEditProduct.js';

import OrderWait from './order/OrderWait.js';
import OrderFail from './order/OrderFails.js';
import moment from 'moment';
import OrderSuccess from './order/OrderSuccess.js';
import IconButton from 'material-ui/IconButton';

import { Col, FormControl, Checkbox } from 'react-bootstrap';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { CSVLink, CSVDownload } from 'react-csv';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui-icons/Close';
import PlaylistAddCheck from 'material-ui-icons/PlaylistAddCheck';
import AirportShuttle from 'material-ui-icons/AirportShuttle';
import Check from 'material-ui-icons/Check';
const IntlPolyfill = require('intl');
const DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/vi.js');
//
// const requestData = (pageSize, page, sorted, filtered) => {

class TableDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'ENABLE',
            data: [],
            from: new Date(),
            thru: new Date(),
            status: 'ENABLE'
        };
        this.getViewOrByShop = this.getViewOrByShop.bind(this);
        this.handleChangeThruDate = this.handleChangeThruDate.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.renderOrderDetail = this.renderOrderDetail.bind(this);
        this.changeStatusOrder = this.changeStatusOrder.bind(this);
    }

    changeStatusOrder(ord_id, status, order_id) {
        var that = this;

        axios.post('/api/set_status_product_order', {ord_id: ord_id, status: status})
            .then(function (res) {
                if(status !== that.state.status) {
                    let orders = that.state.data;
                    let new_orders = orders.map((order, index) => {
                        if(order.id == order_id) {
                            let order_detail = [];
                            order.order.forEach((ord) => {
                                if(ord.id!==ord_id) {
                                    order_detail.push(ord)
                                }
                            })
                            order.order = order_detail;
                        }
                        return order;
                    })
                    that.setState({ data: new_orders });
                }
                
            })
    }

    handleChangeFromDate(event, date) {
        let that = this;
        this.setState({ from: date }, () => {
            that.getViewOrByShop();
        });
    }

    handleChangeThruDate(event, date) {
        let that = this;
        this.setState({ thru: date }, () => {
            that.getViewOrByShop();
        });
    }

    handleChangeStatus(event, index, value) {

        let that = this;
        this.setState({ status: value }, () => {
            that.getViewOrByShop();
        });


    }

    componentDidMount() {
        this.getViewOrByShop();
    }

    componentWillReceiveProps(nextProps) {
        this.getViewOrByShop();
    }

    getViewOrByShop() {
        var that = this;

        axios.post('/api/get_list_order_shop', { from: this.state.from, thru: this.state.thru, status: this.state.status })
            .then(function (res) {
                that.setState({ data: res.data.data });
            })
    }

    renderOrderDetail(orders, product_id) {
        if (orders.length > 0) {
            return (
                orders.map((order, index) => {
                    return (
                        <tr key={`order-sell-${order.id}-${order.user.id}`} className="ng-scope">
                            <td className="coupon">
                                <p className="name ng-binding">{moment(order.created).format('DD/MM/YYYY HH:mm:ss')}</p>
                            </td>
                            <td className="name">
                                <img style={{ width: "50px", height: "50px" }} className="img-responsive btn-block ng-scope" src={order.user.avartar || "https://moki.vn/files/product/images/o/bc41109667a4180814ce96793c899498.jpg"} />
                            </td>
                            <td className="noname">
                                <p className="name ng-binding">{order.user.name}</p>
                            </td>
                            <td className="noname">
                                <p className="name ng-binding">{order.user.phone}</p>
                            </td>
                            <td className="coupon">
                                <p className="name ng-binding">{moment(order.user.created).lang('vi').fromNow()}</p>
                            </td>
                            <td className="coupon">
                                <p className="name ng-binding">{order.number}</p>
                            </td>
                            <td >
                                {parseInt(order.price_total).toLocaleString('VND') + "đ"}
                            </td>
                            <td className="coupon" style={{ minWidth: "115px" }}>
                                {this.state.status == "ENABLE" ?
                                    <IconButton onClick={() => {this.changeStatusOrder(order.id, "APPROVED", product_id)}}>
                                        <PlaylistAddCheck
                                        />
                                    </IconButton>
                                    : null}
                                {this.state.status == "APPROVED" ?
                                    <IconButton onClick={() => {this.changeStatusOrder(order.id, "SUCCESS", product_id)}}>
                                        <Check
                                        />
                                    </IconButton>
                                    : null}
                                {this.state.status !== "SUCCESS" || this.state.status !== "UNENABLE"?
                                    <IconButton onClick={() => {this.changeStatusOrder(order.id, "UNENABLE", product_id)}}>
                                        <Close
                                        />
                                    </IconButton>
                                    : null}
                            </td>
                        </tr>
                    )
                })
            )
        }
        else {
            return (
                <tr>
                    <td>
                        <div style={{ paddingLeft: "20px", color: "#b3aa9e" }}>Không có ai mua sản phẩm</div>
                    </td>
                </tr>
            )
        }
    }

    handleChange = (event, index, value) => this.setState({ value });
    render() {
        const prettyLink = {
            backgroundColor: '#8dc63f',
            fontSize: 14,
            fontWeight: 500,
            height: 52,
            padding: '0 48px',
            borderRadius: 5,
            color: '#fff'
        };
        const { data, pages, loading } = this.state;



        return (
            <div>
                <div className="title-tab-admin-shop">Quản lý đơn hàng</div>


                <div className="col-md-12 tab-order">
                    <DatePicker
                        onChange={this.handleChangeFromDate}
                        autoOk={true}
                        floatingLabelText="Từ ngày"
                        DateTimeFormat={DateTimeFormat}
                        defaultDate={this.state.from}
                        locale="vi"
                        style={{ display: 'inline-block' }}

                    />
                    <DatePicker
                        onChange={this.handleChangeThruDate}
                        autoOk={true}
                        floatingLabelText="Đến ngày"
                        DateTimeFormat={DateTimeFormat}
                        locale="vi"
                        style={{ display: 'inline-block' }}
                        defaultDate={this.state.thru}
                    />
                    <SelectField
                        floatingLabelText="Trạng thái"
                        value={this.state.status}
                        onChange={this.handleChangeStatus}
                        style={{ position: "absolute" }}
                    >
                        <MenuItem value={'ENABLE'} primaryText="Chờ xử lý" />
                        <MenuItem value={'APPROVED'} primaryText="Chấp nhận" />
                        <MenuItem value={'SUCCESS'} primaryText="Thành công" />
                        <MenuItem value={'UNENABLE'} primaryText="Huỷ bỏ" />
                    </SelectField>
                    <br />
                </div>
                <div className="col-md-12">
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{ padding: "5px" }}>Mã sản phẩm</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: "5px" }}>Ảnh</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: "5px" }}>Tên sản phẩm</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: "5px" }}>Giá</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: "5px" }}>Khuyến mại</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: "5px" }}>Đăng lúc</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>
                    {!this.state.data || this.state.data.length == 0 ? "Không có ai đặt hàng" :
                        <List key="order-sell-manager">
                            {
                                this.state.data.map((product) => {
                                    return (
                                        <ListItem
                                            onClick={(e) => { let open = {}; open[product.code] = !this.state[product.code]; this.setState(open) }}
                                            autoGenerateNestedIndicator={false}
                                            primaryTogglesNestedList={true}
                                            key={product.code}
                                            open={this.state[product.code] || false}
                                            nestedItems={[
                                                <ListItem key={[product.code, 1].join("-")} disabled={true}>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead id="tableheader">
                                                                <tr>
                                                                    <td>Đặt lúc</td>
                                                                    <td>Avartar</td>
                                                                    <td>Tên</td>
                                                                    <td>Số DT</td>
                                                                    <td>Tham gia</td>
                                                                    <td>Số lượng</td>
                                                                    <td className="price">
                                                                        Giá
                                                                    </td>
                                                                    <td style={{ minWidth: "115px" }}></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="ng-scope">
                                                                {this.renderOrderDetail(product.order, product.id)}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </ListItem>
                                            ]}
                                        >
                                            <Table onCellClick={(e) => { let open = {}; open[product.code] = !this.state[product.code]; this.setState(open) }} selectable={false} style={{ "backgroundColor": "transparent" }}>
                                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                                </TableHeader>
                                                <TableBody displayRowCheckbox={false} deselectOnClickaway={false} preScanRows={false}>
                                                    <TableRow>
                                                        <TableRowColumn style={{ padding: "5px" }}>{product.code}</TableRowColumn>
                                                        <TableRowColumn style={{ padding: "5px" }}>
                                                            <NavLink to={"/category/product/" + product.name.replace(/-/g, ' ').replace(/\s\s+/g, ' ').split(' ').join('-') + "--" + product.id + ".html"}>
                                                                <img style={{ width: "70px", height: "70px" }} className="img-responsive btn-block ng-scope" src={product.image.length !== 0 ? (product.image[0].url) : "https://moki.vn/files/product/images/o/bc41109667a4180814ce96793c899498.jpg"} />
                                                            </NavLink>
                                                        </TableRowColumn>
                                                        <TableRowColumn style={{ padding: "5px", whiteSpace: "pre-wrap" }}><span title={`${product.name}`}>{product.name}</span></TableRowColumn>
                                                        <TableRowColumn style={{ padding: "5px" }}>{product.price}</TableRowColumn>
                                                        <TableRowColumn style={{ padding: "5px" }}>{product.price_percent < 100 ? product.price_percent + "%" : ((product.price_percent).toLocaleString('VND') + "đ")}</TableRowColumn>
                                                        <TableRowColumn style={{ padding: "5px" }}>{moment(product.p_fromdate).lang('vi').fromNow()}</TableRowColumn>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    }
                </div>

                {/* <CSVLink filename="Danh sách sách đơn hàng" data={this.state.data } style={prettyLink} >CSV ⬇</CSVLink> */}
                {/*                  
                <ul className="nav nav-pills">
  
  <li role="presentation" className=""><a href="#"> link</a></li>
  <li role="presentation" className=""><a href="#">Disabled link</a></li>
</ul> */}
                {/* <Route exact path="/shop/admin/order/" component={OrderWait} />
                <Route exact path="/shop/admin/order/wait" component={OrderWait} />
                <Route path="/shop/admin/order/success" component={OrderSuccess} />
                <Route path="/shop/admin/order/fail" component={OrderFail} /> */}

            </div>
        )
    }







}


module.exports = TableDemo;
    //      onChange={this.fetchData} // Request new data when things change
