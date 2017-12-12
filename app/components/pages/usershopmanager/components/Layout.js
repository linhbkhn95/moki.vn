import React from 'react';
import { connect } from 'react-redux';
import { login } from 'app/action/actionUserName';
import { Link } from 'react-router-dom'
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect } from 'react-router-dom';
import { removeCart } from 'app/action/actionShoppingCart';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class Layout extends React.Component {


    render() {
        return (
            <section>
                <Tabs>
                    <Tab icon={<FontIcon className="material-icons">phone</FontIcon>} label="RECENTS" >
                        <div className="manager-user-shopcart">
                            <div className="container conetent-manager">
                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="menu-manager">
                                            <div className="headings">
                                                <h5 style={{ fontWeight: "bold" }}>Tài khoản của bạn</h5>
                                            </div>


                                            <div className="content-menu">
                                                <ul>
                                                    <li><Link to="/user_shop/manager/accountsetting" className="">Quản lý tài khoản</Link></li>
                                                    {/* <li><Link to="/user_shop/manager/order" className="active">Đơn hàng của tôi</Link></li> */}
                                                    <li><Link to="/user_shop/manager/changepass" className="">Đổi mật khẩu</Link></li>
                                                </ul>
                                                <img style={{ width: "100%" }} src="/../../images/banner/Layer 32.png" alt="" />
                                                <div className="download">
                                                    <a href="http://bit.ly/moki_ios"><img src="/../../images/banner/appstore130.png" alt="" /></a>
                                                    <a href="http://bit.ly/moki_android"><img src="/../../images/banner/chplay130.png" alt="" /></a>
                                                    <a href="https://www.microsoft.com/vi-vn/store/p/moki-mua-ban-tren-di-%C4%90ong-cho-me-va-be/9nblggh4wz0j"><img src="/../../images/banner/windowphone130.png" alt="" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">

                                        {this.props.children}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Item Two" >
                        <div>
                            <h2 style={styles.headline}>Tab Two</h2>
                            <p>
                                This is another example tab.
        </p>
                        </div>
                    </Tab>
                    <Tab
                        label="onActive"
                        data-route="/home"
                    >
                        <div>
                            <h2 style={styles.headline}>Tab Three</h2>
                            <p>
                                This is a third example tab.
        </p>
                        </div>
                    </Tab>
                </Tabs>

            </section>

        )
    }
}

module.exports = Layout;
