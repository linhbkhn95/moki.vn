import React from 'react';
var Recharts = require('recharts');
import axios from 'axios'
import { Modal, Button, Checkbox, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Paper from 'material-ui/Paper';
import * as CharJs from 'react-chartjs'
import moment from 'moment'

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    id: 1,
                    name: "Miễn phí",
                    count: 5
                },
                {
                    id: 2,
                    name: "Bé ăn",
                    count: 2
                },
                {
                    id: 3,
                    name: "Bé mặc",
                    count: 7
                },
                {
                    id: 4,
                    name: "Bé ngủ",
                    count: 10
                }
            ],

            orders: [
                {
                    date: "1/2017",
                    total_price: "20000"
                },
                {
                    date: "2/2017",
                    total_price: "40000"
                },
                {
                    date: "3/2017",
                    total_price: "30000"
                },
                {
                    date: "4/2017",
                    total_price: "10000"
                },
                {
                    date: "5/2017",
                    total_price: "100000"
                },
                {
                    date: "6/2017",
                    total_price: "70000"
                }
            ],

            colors: [{ color: "#f44336", highlight: "#ff7961" }, { color: "#e91e63", highlight: "#ff6090" }, { color: "#ffeb3b", highlight: "#ffff72" }, { color: "#00bcd4", highlight: "#62efff" }, { color: "#9c27b0", highlight: "#d05ce3" }, { color: "#607d8b", highlight: "#8eacbb" }, { color: "#673ab7", highlight: "#9a67ea" }, { color: "#3f51b5", highlight: "#757de8" }, { color: "#2196f3", highlight: "#6ec6ff" }, { color: "#009688", highlight: "#52c7b8" }, { color: "#4caf50", highlight: "#80e27e" }, { color: "#8bc34a", highlight: "#bef67a" }, { color: "#cddc39", highlight: "#ffff6e" }, { color: "#ffc107", highlight: "#fff350" }, { color: "#ff9800", highlight: "#ffc947" }, { color: "#ff5722", highlight: "#ff8a50" }, { color: "#795548", highlight: "#a98274" }, { color: "#9e9e9e", highlight: "#cfcfcf" },]
        };

    }

    componentDidMount() {
        var that = this;

        axios.post('/api/statistics_product_category_shop', { from: this.state.from, thru: this.state.thru, status: this.state.status })
            .then(function (res) {
                that.setState({ categories: res.data.data });
            })

        axios.post('/api/statistics_shop_revenue', { fromdate: moment(new Date()).subtract(6, 'month'), thrudate: new Date() })
            .then(function (res) {
                that.setState({
                    orders: res.data.data.map((order) => {
                        return {
                            date: [order.month, order.year].join("/"),
                            total_price: order.total
                        }
                    })
                });
            })
    }

    componentWillReceiveProps(nextProps) {
        var that = this;

        axios.post('/api/statistics_product_category_shop', { from: this.state.from, thru: this.state.thru, status: this.state.status })
            .then(function (res) {
                that.setState({ categories: res.data.data });
            })

        axios.post('/api/statistics_shop_revenue', { fromdate: moment(new Date()).subtract(6, 'month'), thrudate: new Date() })
            .then(function (res) {
                that.setState({
                    orders: res.data.data.map((order) => {
                        return {
                            date: [order.month, order.year].join("/"),
                            total_price: order.total
                        }
                    })
                });
            })
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="title-tab-admin-shop">Thống kê báo cáo</div>
                <div className="col-md-12" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
                    <div className="col-md-6">
                        <Paper zDepth={1} style={{ height: "300px" }}>
                            <div style={{ textAlign: "center", "fontSize": "16px", marginBottom: "30px" }}>Biểu đồ phân bố sản phẩm</div>
                            <div style={{ marginLeft: "15px" }}>Tổng số lượng sản phầm: {this.state.categories.reduce((acc, curr) => { return acc + curr.count }, 0)}</div>
                            <div style={{ marginLeft: "15px" }}>Phân bố {this.state.categories.length} danh mục</div>
                            <br />
                            <br />
                            <CharJs.Pie data={this.state.categories.map((category, index) => {
                                return {
                                    color: this.state.colors[index].color,
                                    highlight: this.state.colors[index].highlight,
                                    label: category.name,
                                    value: category.count
                                }
                            })} redraw />
                        </Paper>


                    </div>
                    <div className="col-md-6">
                        <Paper zDepth={1} style={{ height: "300px" }}>
                            <div style={{ textAlign: "center", "fontSize": "16px", marginBottom: "30px" }}>Biểu đồ doanh thu</div>
                            <div style={{ marginLeft: "15px" }}>Tổng doanh thu 6 tháng: {(this.state.orders.reduce((acc, curr) => { return acc + parseInt(curr.total_price) }, 0)).toLocaleString('VND') + "đ"}</div>
                            <br />
                            <br />
                            <br />
                            <CharJs.Bar
                                data={{
                                    labels: this.state.orders.map((order) => {
                                        return order.date
                                    }),
                                    datasets: [
                                        {
                                            label: "My First dataset",
                                            fillColor: "#63ccff",
                                            strokeColor: "#039be5",
                                            pointColor: "#039be5",
                                            pointStrokeColor: "#f16e8e",
                                            pointHighlightFill: "#f16e8e",
                                            pointHighlightStroke: "#039be5",
                                            data: this.state.orders.map((order, index) => {
                                                return order.total_price
                                            })
                                        }
                                    ]
                                }}
                                options={{
                                    scaleGridLineColor: "#f16e8e",
                                    scaleShowVerticalLines: false,
                                    scaleShowHorizontalLines: false,
                                    bezierCurve: false,
                                    datasetFill: true,
                                }}
                                redraw
                            />
                        </Paper>
                    </div>

                </div>

                {/* <div className="col-md-4">
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Chọn thống kê</ControlLabel>
                        <FormControl  onChange={this.handleCatChange.bind(this)} ref="type" componentClass="select" placeholder="Thống kê theo">
                            <option value="/api/statistics_product_buy">Sản phẩm bán chạy</option>
                            <option value="/api/statistics_shop_revenue">Doanh thu </option>
                            <option value="/api/statistics_user_buy">Top người dùng mua thường xuyên</option>
                            <option value="/api/statistics_product_like">Sản phẩm yêu thích</option>
                            <option value="/api/statistics_product_inventory">Sản phẩm tồn kho</option>
                        </FormControl>
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                    <div className="col-md-6">
                                <h5 className="col-xs-5">Từ ngày</h5>
                                <div className="col-xs-6 col-xs-pull-1">
                                <DatePicker dateFormat="DD/MM/YYYY" className="form-control" selected={this.state.startDate}
            placeholder="12/12/2017" onChange={this._onChangeStart.bind(this)} />

                                </div>
                    </div>
                    <div className="col-md-6">
                                <h5 className="col-xs-5">Đến ngày</h5>
                                <div className="col-xs-6 col-xs-pull-1">
                                <DatePicker dateFormat="DD/MM/YYYY" className="form-control" selected={this.state.finishDate}
            placeholder="12/12/2017" onChange={this._onChangeFinish.bind(this)} />

                                </div>
                    </div>
                    </div>
                    <div className="col-md-12">
                            <div style={{textAlign:"center",paddingTop:"20px"}}><button onClick={this.report.bind(this)} className="btn btn-lg btn-primary">Xem Thống kê</button></div>
                    </div>
                    <div className="col-md-12">
                          
                          <div style={{display:this.state.reportUrl=='/api/statistics_product_inventory'? 'block':'none'}} >  <ReChart data={this.state.data} /> </div>
                          <div style={{display:this.state.reportUrl=='/api/statistics_shop_revenue'?'block':'none'}} >  <DoanhThu  data = {this.state.data} /> </div>

                    </div> */}
            </div>
        )
    }
}
module.exports = Report;