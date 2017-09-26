var data={
     backgroupNav:"#00bcd4",
     backgroupSlideMenu:"White",
     backgroupBody:"White",
     colorNav:"white",
     nameHeader:"WebAssitant"
}


var settings = (state = data, action) => {
    switch (action.type) {
      case 'BACKGROUP_NAV':
        return {...state,backgroupNav: action.backgroupNav};
      case 'BACKGROUP_SLIDE_MENU':
        return  {...state,backgroupSlideMenu: action.backgroupSlideMenu};
      case 'BACKGROUP_BODY':
        return  {...state,backgroupBody: action.backgroupBody};
      case 'COLOR_NAV':
        return  {...state,COLOR_NAV: action.colorNav};
      case 'NAME_HEADER':
        return  {...state,nameHeader: action.nameHeader};
      default:
        return state;
    }
  }
  module.exports = settings;
  