import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
class UserForm extends React.Component{
    render(){
        return(
             <div className="col-md-8 col-xs-12 col-sm-8">
                <Card>
                    <CardHeader
                    title={this.props.username}
                    subtitle={this.props.username}
                    avatar={"images/"+this.props.username+".jpg"}
                    />

                    <CardMedia
                    style={{backgroud:"none"}}
                    overlay={<div className="rows avatar">
                              <div className="col-md-3 col-xs-4">
                                <Avatar style={{width:"160px",height:"160px"}} src={"images/anhdaidien"+this.props.username+".jpg"}/>
                              </div>
                              <div className="col-md-9 col-xs-8"> 
                                <div style={{fontSize:"30px",fontWeight:"bold",color:"white",marginTop:"45px"}}>{this.props.username} </div>
                             </div>
                            </div>
                        }
                    >
                    
                    <img src={"images/"+this.props.username+".jpg"} alt="" />
                    </CardMedia>
                    <CardTitle title={this.props.username} subtitle="Ảnh đại diện" />
                    <CardActions>
                
                    </CardActions>
                </Card>
            </div>
        )
    }
}

module.exports = UserForm;