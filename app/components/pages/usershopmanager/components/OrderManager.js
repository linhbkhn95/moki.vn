import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, Link, NavLink } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import axios from 'axios'
import RemoveShoppingCart from 'material-ui-icons/RemoveShoppingCart'
import moment from 'moment'

import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class OrderManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        var that = this;

        axios.post('/api/view_order')
            .then(function (res) {
                that.setState({ orders: res.data.data });
            })
    }

    renderCart(cart) {
        if (cart.length > 0) {
            return (
                cart.map(function (product, index) {
                    let name = product.name.replace(/-/g, ' ').replace(/\s\s+/g, ' ');

                    let priceSale = product.price_percent < 100 ? product.price_percent * product.price / 100 : product.price_percent;
                    let price = (
                        <td className="price">
                            <p className="price ng-binding">{(product.price - priceSale).toLocaleString('VND') + "đ"}</p>
                            {priceSale == 0 ? "" : <p className="ori_price ng-scope"><s><span className="line ng-binding">{(product.price).toLocaleString('VND') + "đ"}</span></s>&nbsp;&nbsp;&nbsp;<span className="percent ng-binding">KM {(priceSale).toLocaleString('VND') + "đ"}</span></p>}
                        </td>
                    );

                    return (
                        <tr key={index} className="ng-scope">
                            <td className="name">
                                <NavLink to={"/category/product/" + name.split(' ').join('-') + "--" + product.id + ".html"}>
                                    <img style={{ width: "50px", height: "50px" }} className="img-responsive btn-block ng-scope" src={product.image.length !== 0 ? (product.image[0].url) : "https://moki.vn/files/product/images/o/bc41109667a4180814ce96793c899498.jpg"} />
                                </NavLink>
                            </td>
                            <td className="noname">
                                <p className="name ng-binding">{product.name}</p>
                                <p className="shopname">Shop <NavLink to={"/shopMK." + product.seller.id + ".html"} className="ng-binding">{product.seller.user_name}</NavLink></p>
                            </td>
                            {price}
                            <td className="coupon">
                                <p className="name ng-binding">{product.number}</p>
                            </td>
                            <td className="coupon">
                                <p className="name ng-binding">{product.status}</p>
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
                        <div style={{ paddingLeft: "20px", color: "#b3aa9e" }}>Không có sản phẩm nào được mua </div>
                    </td>
                </tr>
            )
        }
    }

    render() {
        if (this.state.orders.length == 0) {
            return (
                <RemoveShoppingCart style={{
                    color: "rgba(123, 121, 121, 0.84)",
                    "height": "200px",
                    "width": "100%",
                    "margin": "50px"
                }} />
            )
        } else {
            return (
                <div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Mã đơn hàng</TableHeaderColumn>
                                <TableHeaderColumn>Thời gian đặt hàng</TableHeaderColumn>
                                <TableHeaderColumn>Số mặt hàng</TableHeaderColumn>
                                <TableHeaderColumn>Tổng số tiền</TableHeaderColumn>
                                <TableHeaderColumn>Trạng thái</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>
                    <List key="order-buyer-manager">
                        {
                            this.state.orders.map((order) => {
                                return (
                                    <ListItem
                                        onClick={(e) => { let open = {}; open[order.code] = !this.state[order.code]; this.setState(open) }}
                                        autoGenerateNestedIndicator={false}
                                        primaryTogglesNestedList={true}
                                        key={order.code}
                                        open={this.state[order.code] || false}
                                        nestedItems={[
                                            <ListItem key={[order.code, 1].join("-")} disabled={true}>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead id="tableheader">
                                                            <tr>
                                                                <td colSpan="2"><p>Sản phẩm</p></td>
                                                                <td className="price">
                                                                    <p style={{ width: "113px" }}>Giá</p>
                                                                </td>
                                                                <td className="coupon">
                                                                    <p>Số lượng</p>
                                                                </td>
                                                                <td className="coupon">
                                                                    <p style={{ width: "124px" }}>Trạng thái</p>
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="ng-scope">
                                                            {this.renderCart(order.products)}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </ListItem>
                                        ]}
                                    >
                                        <Table onCellClick={(e) => { let open = {}; open[order.code] = !this.state[order.code]; this.setState(open) }} selectable={false} style={{ "backgroundColor": "transparent" }}>
                                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                            </TableHeader>
                                            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} preScanRows={false}>
                                                <TableRow>
                                                    <TableRowColumn>{order.code}</TableRowColumn>
                                                    <TableRowColumn>{moment(order.create).format('DD/MM/YYYY HH:mm:ss')}</TableRowColumn>
                                                    <TableRowColumn>{order.products.length}</TableRowColumn>
                                                    <TableRowColumn>{(order.total_price).toLocaleString('VND') + "đ"}</TableRowColumn>
                                                    <TableRowColumn>{order.status}</TableRowColumn>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>

            )
        }


        // <div>
        //     <div className="order">
        //         <div className="col-md-12 ">
        //             <div className="noidung">
        //                 <div className="headings color-heading">
        //                     <h5>Quản lý đơn hàng</h5>
        //                 </div>
        //                 <div className="tabsbutton">
        //                     <ul>
        //                         <li className="active">
        //                             <Link to="/user_shop/manager/order/process">Đang xử lý</Link>
        //                         </li>
        //                         <li className="">
        //                             <Link to="/user_shop/manager/order/success">Hoàn thành</Link>
        //                         </li>
        //                         <li className="">
        //                             <Link to="/user_shop/manager/order/fail">Đã hủy</Link>
        //                         </li>
        //                     </ul>
        //                 </div>

        //             </div>
        //             <div style={{ paddingTop: "15px" }}>
        //                 <Route exact path="/user_shop/manager/order" component={OrderProcess} />
        //                 <Route path="/user_shop/manager/order/process" component={OrderProcess} />
        //                 <Route path="/user_shop/manager/order/success" component={OrderSuccess} />
        //                 <Route path="/user_shop/manager/order/fail" component={OrderFail} />
        //             </div>
        //         </div>
        //     </div>
        // </div>

    }
}

module.exports = connect(function (state) { return { user: state.auth.user } })(OrderManager);
