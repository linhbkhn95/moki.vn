import React from 'react'

module.exports = ({ match  }) => {
    console.log(match);
    return (
   
      <div className="">
        <div className="row">
         
         <div className="col-md-6">
            <div className="col-md-4">ảnh liên quan</div>
            <div className="col-md-8">ảnh chính </div>
         </div>
         <div className="col-md-6">
            <div className="col-md-12">
                <h2 className="name-product">Thìa cho trẻ ăn</h2>
                <div className="vote">
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                 </div>
            </div>
            
          </div>
      </div>
    </div>
  )
}