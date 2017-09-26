var BACKGROUP_NAV="BACKGROUP_NAV";
var NAME_HEADER="NAME_HEADER";
var BACKGROUP_BODY="BACKGROUP_BODY";
function setBackgroup_Nav(backgroupNav){
    
   return{type:BACKGROUP_NAV,backgroupNav};
 }
 function setTitleHeader_Nav(nameHeader){
    
   return{type:NAME_HEADER,nameHeader};
 }
 function setBackgroup_Body(backgroupBody){
    
   return{type:BACKGROUP_BODY,backgroupBody};
 }
 module.exports = {setBackgroup_Nav,setTitleHeader_Nav,setBackgroup_Body};
 