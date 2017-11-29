import React from 'react';
import {Modal,Button,Checkbox, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }


class ModalEditProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listComment:[],
            comment:"",
        }
    }

    onChange(event) {
        this.setState({comment: event.target.value});
    }
  
    comment(){
        
        console.log('comment');
        let now = new Date();
        var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
        axios.post('/commentproduct/add',{productId:this.props.productId,userId:this.props.userId,text:this.state.comment,date:datetime})
        .then(function(res){
            console.log(res.data);
           
        })
        this.setState({comment:""});
    }
    close(){
      this.props.close();
    }

    renderListComment(listComment){
        var that =this;

        if (listComment==="undefind"||listComment.length===0) {
            
                  return <p className="no-comments">Chưa có bình luận</p>
            
            
                } else {
                     
                    return(
                        listComment.map(function(comment,index){
                            console.log(comment);
                            return(
                                //     <div key={index} className="text-comment parent">
                                //         <div className="avatar">
                                //             {/* <img className="img-avatar" src={that.props.auth.isAuthenticatec?that.props.auth.user.avatar:"../images/avatar.png"}/> */}
                                //            <img className="img-avatar" src={comment.poster.avatar}/>

                                //         </div>
                                        
                                //         <div className="sub-content">
                                //             <span>Bởi </span> 
                                //             <a className="sub">{comment.poster.name}</a> 
                                //             <span> lúc </span> 
                                //             <a className="sub">{comment.created}</a>
                                    
                                        
                                //         </div>
                                //         <p className="content"> {comment.comment} </p>
                                // </div>
                                <div className="col-md-12 alert-message">
                                    <div className="col-md-2 row"><img className="avatar-alert" src={comment.poster.avatar}/></div>
                                    <div className=" col-md-9 row">
                                        <strong style={{color: "#d558a5"}}>{comment.poster.name}</strong> {comment.comment} 
                                        <br />
                                        <p className="time-alert">{moment(comment.created).lang('vi').fromNow()}</p>
                                    </div>
                                    <div className="col-md-1"> 
                                    <div><button style={{     fontSize: "11px", padding: "4px 10px"}} className="btn btn-danger">Xóa </button></div>
                                    </div>
                            </div>
                            )
                          })
            
                )
               }
    }
    componentDidMount(){
         var that = this;
        // axios.post('/api/get_products',{id:3})
        // .then(function(res){
        //     console.log(res.data.data);
        //     // that.setState({listComment:res.data});
        //     that.setState({data:res.data.data[0]});
        // })
        axios.post('/api/get_comment_products',{product_id:3})
        .then(function(res){
            console.log(res.data.data);
            // that.setState({listComment:res.data});
            that.setState({listComment:res.data.data});
        })


    }
    render(){
      return (
        <Modal   show={this.props.show}
        onHide={this.close.bind(this)} 
        bsSize="large"
       aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div className="title-add-product col-md-4">Chi tiết sản phẩm</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
                    <div className="col-md-12">
                        <div className="title-moduleadd-product" >Mô tả sản phẩm</div>
                        <div className="col-md-12">
                          <div className="col-md-7">
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Tên sản phẩm"
                                placeholder="Nhập tên sản phẩm..."
                            />
                          </div>
                          <div className="col-md-3">
                          <FieldGroup
                              id="formControlsText"
                              type="number"
                              label="Giá sản phẩm"
                              placeholder="nhập gía sản phẩm..."
                              help="(VNĐ)"
                          />
                        
                        </div>
                      <div className="col-md-12">
                       
                            <FieldGroup
                            id="formControlsFile"
                            type="file"
                            label="Ảnh sản phẩm"
                            help="Chọn ảnh sản phẩm để đăng bán"
                            />
                       
                      </div>
                      </div>
                        <div className="col-md-12">
                          <div className="col-md-12">
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Mô tả sản phẩm</ControlLabel>
                          <FormControl componentClass="textarea" placeholder="Nhập mô tả về sản phẩm cuả bạn..." />
                          </FormGroup>
                            </div>
                          
                        </div>
                      <div className="col-md-12 ">
                          <div className="col-md-12 col-md-push-1">
                            <FormGroup>
                            <Checkbox inline>
                              Miễn phí
                            </Checkbox>
                            {' '}
                            <Checkbox inline>
                              Bán nhanh
                            </Checkbox>
                            {' '}
                            <Checkbox inline>
                              Cho phép mặc cả
                            </Checkbox>
                          </FormGroup>
                        </div>
                      <div>
                     
                      </div>
                    </div>
                    </div>
                    <div className="col-md-12">
                      <div className="title-moduleadd-product">Chi tiết sản phẩm</div>
                       <div className="col-md-12">
                        <div className="col-md-7">
                          <FormGroup controlId="formControlsSelect">
                              <ControlLabel>Danh mục sản phẩm</ControlLabel>
                              <FormControl componentClass="select" placeholder="chọn danh mục">
                                <option value="select">Mũ </option>
                                <option value="other">Quần tây</option>
                              </FormControl>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Trạng thái</ControlLabel>
                                <FormControl componentClass="select" placeholder="chọn danh mục">
                                  <option value="select">Đóng </option>
                                  <option value="other">Đang bán</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                       </div>
                    </div>
                    <div className="col-md-12">
                    <div className="title-moduleadd-product">Vận chuyển</div>
                     <div className="col-md-12">
                      
                      <div className="col-md-12">
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Nơi bán</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Nhập nơi bán của bạn.." />
                            </FormGroup>
                        </div>
                       </div>
                       
                    </div>
                    <div className="col-md-12">
                      <div className="title-moduleadd-product">Danh sách comment</div>
                       <div className="col-md-12">
                       
                       <div className="post-comment">
                       {/* <p className="no-comments">Chưa có bình luận </p> */}
                            <div id="commentDiv">
                                {this.renderListComment(this.state.listComment)}
                                
                                    
                            </div>
                            <p className="section">Viết phản hồi:  </p>
                            <div className="comment-form">
                                <div className="avatar-me">
                                        <img style={{width:"55px"}} className="img-avatar" src={this.props.auth?this.props.auth.user.avatar:"../images/avatar.jpg"}/>
                                </div>
                                <div className="box-comment">
                                    <textarea onChange={this.onChange.bind(this)} value={this.state.comment} className="form-control" placeholder="Ý kiến của bạn...." id="text-comment" rows="3"></textarea>
                                    <div className="btn-comment"><button onClick={this.comment.bind(this)} className="btn btn-success" disabled={this.state.comment ?"":"disabled"} >Gửi</button></div>
                                </div>
                            </div>
                        </div>
               </div>    
                       
                    </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalEditProduct;