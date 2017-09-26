/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
   
    sails.io.on('connect', function (socket){
    var time = new Date().toLocaleString();
    console.log('co ket noi ' + socket.id);
    socket.on("sendlog",()=>{
    	 var log=	{
					timelocal:time,host_name:"localhost1337",brower:"IE",os:"win",bytes_tx:"681",referer:".",country:"local",country_code:"Lan",remote_host:"185.22.12.2",remote_user:".",method:"GET",query:".",url:"/timetable.aspx",http_version:"1.0",status_code:"200",time:"3-8-2017 22:25:21"
				}
	     setInterval(function(){console.log('sendlog');socket.broadcast.emit('sendlog',log)},4000);
	    })
   
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
