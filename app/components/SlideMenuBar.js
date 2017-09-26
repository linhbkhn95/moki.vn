 import React from 'react';
// import { render } from 'react-dom';
// import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

//  class SlideMenuBar extends React.Component{
//  	render(){
//  		const items = [
// 			  <SidebarItem>Dashboard</SidebarItem>,
// 			  <SidebarItem>Profile</SidebarItem>,
// 			  <SidebarItem>Settings</SidebarItem>,
// 			];
//  		return(

//               <Sidebar  content={items}>
// 			    {this.props.children}
// 			  </Sidebar>
//  			)
//  	}
//  }

//  module.exports = SlideMenuBar;

// import { slide as Menu } from 'react-burger-menu'
 
// class Example extends React.Component {
//   showSettings (event) {
//     event.preventDefault();
   
//   }
 
//   render () {
//   	var styles = {
//   bmBurgerButton: {
//     position: 'fixed',
//     width: '36px',
//     height: '30px',
//     left: '36px',
//     top: '36px'
//   },
//   bmBurgerBars: {
//     background: '#373a47'
//   },
//   bmCrossButton: {
//     height: '24px',
//     width: '24px'
//   },
//   bmCross: {
//     background: '#bdc3c7'
//   },
//   bmMenu: {
//     background: '#373a47',
//     padding: '2.5em 1.5em 0',
//     fontSize: '1.15em'
//   },
//   bmMorphShape: {
//     fill: '#373a47'
//   },
//   bmItemList: {
//     color: '#b8b7ad',
//     padding: '0.8em'
//   },
//   bmOverlay: {
//     background: 'rgba(0, 0, 0, 0.3)'
//   }
// }
//     return (
//       <Menu styles={ styles }>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </Menu>
//     );
//   }
// }

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const BadgeExampleSimple = () => (
  <div>
    <Badge
      badgeContent={4}
      primary={true}
    >
      <NotificationsIcon />
    </Badge>
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);



  module.exports = BadgeExampleSimple;