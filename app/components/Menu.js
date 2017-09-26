// import React from 'react';
 import {NavLink,Link} from 'react-router-dom';
//  class Menu extends React.Component {
// 	render() {
// 		return (
// 			<div className="list-group">
			  
			 
// 			  <Link to="/" className="list-group-item">TRANG CHỦ</Link>
// 			  <Link to="#" className="list-group-item">BẢNG HOẠT ĐỘNG WEBSITES</Link>
// 			  <Link to="/eventLog" className="list-group-item">SỰ KIỆN LOGS</Link>
// 			  <Link to="#" className="list-group-item">CẢNH BÁO</Link>
// 			  <Link to="#" className="list-group-item">QUẢN LÝ SENSORS</Link>
// 		   </div>
// 		);
// 	}
// }
//  module.exports = Menu;
// @flow weak

// import React from 'react';
// import PropTypes from 'prop-types';

// import List, { ListItem, ListItemText } from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import Divider from 'material-ui/Divider';
// import FolderIcon from 'material-ui-icons/Folder';
// import ImageIcon from 'material-ui-icons/Image';



// class InsetDividers extends React.Component {
// 	render(){
// 		  return (
// 		    <List className="">
// 		      <ListItem button>
// 		        <Avatar>
// 		          <FolderIcon />
// 		        </Avatar>
		       
// 		      </ListItem>
// 		      <Divider inset />
// 		      <ListItem button>
// 		        <Avatar>
// 		          <ImageIcon />
// 		        </Avatar>
		        
// 		      </ListItem>
// 		    </List>
// 		  );
// 		}
// }



// module.exports= InsetDividers;
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
 import MapsHome from 'material-ui-icons/Home';
 import MapsGroupWork from 'material-ui-icons/GroupWork';
  import MapsEvent from 'material-ui-icons/Event';
  import MapsWarning from 'material-ui-icons/Warning';

 class ListMenu extends React.Component{
   constructor(props){
		super(props);
		this.state ={
			list:[
				{text:"TRANG CHỦ",url:"/home",icon:<MapsHome style={{fill:"black"}} />},
				{text:"BẢNG HOẠT ĐỘNG WEBSITES",url:"/",icon:<MapsGroupWork style={{fill:"rgb(232, 130, 50)"}} />},
				{text:"SỰ KIỆN LOGS",url:"/eventLog",icon:<MapsEvent style={{fill:"rgba(44, 152, 210, 0.83)"}}  />},
				{text:"CẢNH BÁO",url:"/",icon:<MapsWarning style={{fill:"yellow"}}  />}
			


			]
		}

	}
 	render() {
	    return (
	    	   <List>
          		  <Subheader style={{backgroundColor:"#00bcd4",fontWeight:"bold",color:"white"}}><Link style={{color:"white"}} to="/dashboard">WebAsistant</Link></Subheader>
                   {this.state.list.map((item,index)=>{
                   	 return(
	                   	      <ListItem key={index} style={{fontSize:"11px",fontWeight:"bold",    color: "rgb(0, 150, 136)"}} primaryText={item.text}  containerElement={ <Link to={item.url} />}  leftIcon={item.icon } />
	                   	  )
	                   })
              	 }
          	  </List>
	    	)
     }
 }
 class ListExampleNested extends React.Component {

  state = {
    open: true,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    return (
      <div>
       
        <br />
          <ListMenu />
        
     
      </div>
    );
  }
}
module.exports = ListExampleNested;
  // <List>
          //   <Subheader >WebAsistant</Subheader>
          //   <ListItem style={{fontSize:"14px"}} primaryText="SỰ KIỆN LOGS"  containerElement={ <Link to="/eventLog" />}  leftIcon={<ContentSend />} />
          //   <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
          //   <ListItem
          //     primaryText="Inbox"
          //     leftIcon={<ContentInbox />}
          //     initiallyOpen={true}
          //     primaryTogglesNestedList={true}
          //     nestedItems={[
          //       <ListItem
          //         key={1}
          //         primaryText="Starred"
          //         leftIcon={<ActionGrade />}
          //       />,
          //       <ListItem
          //         key={2}
          //         primaryText="Sent Mail"
          //         leftIcon={<ContentSend />}
          //         disabled={true}
          //         nestedItems={[
          //           <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
          //         ]}
          //       />,
          //       <ListItem
          //         key={3}
          //         primaryText="Inbox"
          //         leftIcon={<ContentInbox />}
          //         open={this.state.open}
          //         onNestedListToggle={this.handleNestedListToggle}
          //         nestedItems={[
          //           <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
          //         ]}
          //       />,
          //     ]}
          //   />
          // </List>