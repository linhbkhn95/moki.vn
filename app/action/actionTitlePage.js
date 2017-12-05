var SET_TITLE_PAGE = "SET_TITLE_PAGE"
 function setTitle(title){
    console.log(title)
   return{type:SET_TITLE_PAGE,title};
 }
 module.exports = {setTitle};
 