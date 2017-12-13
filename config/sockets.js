/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * These settings provide transparent access to the options for Sails'
 * encapsulated WebSocket server, as well as some additional Sails-specific
 * configuration layered on top.
 *
 * For more information on sockets configuration, including advanced config options, see:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.sockets.html
 */

const jwt = require('jsonwebtoken');
const { key, survival_time } = {
    key: "nhom4",
    survival_time: 60 * 60 * 24 * 60
}

module.exports.sockets = {


    /***************************************************************************
    *                                                                          *
    * Node.js (and consequently Sails.js) apps scale horizontally. It's a      *
    * powerful, efficient approach, but it involves a tiny bit of planning. At *
    * scale, you'll want to be able to copy your app onto multiple Sails.js    *
    * servers and throw them behind a load balancer.                           *
    *                                                                          *
    * One of the big challenges of scaling an application is that these sorts  *
    * of clustered deployments cannot share memory, since they are on          *
    * physically different machines. On top of that, there is no guarantee     *
    * that a user will "stick" with the same server between requests (whether  *
    * HTTP or sockets), since the load balancer will route each request to the *
    * Sails server with the most available resources. However that means that  *
    * all room/pubsub/socket processing and shared memory has to be offloaded  *
    * to a shared, remote messaging queue (usually Redis)                      *
    *                                                                          *
    * Luckily, Socket.io (and consequently Sails.js) apps support Redis for    *
    * sockets by default. To enable a remote redis pubsub server, uncomment    *
    * the config below.                                                        *
    *                                                                          *
    * Worth mentioning is that, if `adapter` config is `redis`, but host/port  *
    * is left unset, Sails will try to connect to redis running on localhost   *
    * via port 6379                                                            *
    *                                                                          *
    ***************************************************************************/
    // adapter: 'memory',

    //
    // -OR-
    //

    // adapter: 'socket.io-redis',
    // host: '127.0.0.1',
    // port: 6379,
    // db: 0,
    // pass: '<redis auth password>',



    /***************************************************************************
     *                                                                          *
     * Whether to expose a 'get /__getcookie' route with CORS support that sets *
     * a cookie (this is used by the sails.io.js socket client to get access to *
     * a 3rd party cookie and to enable sessions).                              *
     *                                                                          *
     * Warning: Currently in this scenario, CORS settings apply to interpreted  *
     * requests sent via a socket.io connection that used this cookie to        *
     * connect, even for non-browser clients! (e.g. iOS apps, toasters, node.js *
     * unit tests)                                                              *
     *                                                                          *
     ***************************************************************************/

    // grant3rdPartyCookie: true,



    /***************************************************************************
    *                                                                          *
    * `beforeConnect`                                                          *
    *                                                                          *
    * This custom beforeConnect function will be run each time BEFORE a new    *
    * socket is allowed to connect, when the initial socket.io handshake is    *
    * performed with the server.                                               *
    *                                                                          *
    * By default, when a socket tries to connect, Sails allows it, every time. *
    * (much in the same way any HTTP request is allowed to reach your routes.  *
    * If no valid cookie was sent, a temporary session will be created for the *
    * connecting socket.                                                       *
    *                                                                          *
    * If the cookie sent as part of the connection request doesn't match any   *
    * known user session, a new user session is created for it.                *
    *                                                                          *
    * In most cases, the user would already have a cookie since they loaded    *
    * the socket.io client and the initial HTML page you're building.         *
    *                                                                          *
    * However, in the case of cross-domain requests, it is possible to receive *
    * a connection upgrade request WITHOUT A COOKIE (for certain transports)   *
    * In this case, there is no way to keep track of the requesting user       *
    * between requests, since there is no identifying information to link      *
    * him/her with a session. The sails.io.js client solves this by connecting *
    * to a CORS/jsonp endpoint first to get a 3rd party cookie(fortunately this*
    * works, even in Safari), then opening the connection.                     *
    *                                                                          *
    * You can also pass along a ?cookie query parameter to the upgrade url,    *
    * which Sails will use in the absence of a proper cookie e.g. (when        *
    * connecting from the client):                                             *
    * io.sails.connect('http://localhost:1337?cookie=smokeybear')              *
    *                                                                          *
    * Finally note that the user's cookie is NOT (and will never be) accessible*
    * from client-side javascript. Using HTTP-only cookies is crucial for your *
    * app's security.                                                          *
    *             
    */

    // This custom onDisconnect function will be run each time a socket disconnects

    afterDisconnect: function (session, socket, cb) {
        try {
            // Look up the user ID using the connected socket
            //console.log(socket)
            let socketId = sails.sockets.getId(socket)
            // Get the user instance
            let user = session[socketId];
            if (!user) {
                return cb();
            }
            let user_id = user.id;
            UserM.findOne({ user_id: user_id }).exec(function (err, user) {
                if (err || !user) { return cb(); }
                let notify = false;

                if (user.sockets.length == 1) {
                    notify = true;
                    UserM.destroy({ user_id: session.user_id }).exec(function (err) {
                        if (err) {
                            console.log(err)
                            return cb();
                        }
                        // Publish the destroy event to every socket subscribed to this user instance
                        return cb();
                    });
                } else {
                    let socketIdsNew = user.sockets.filter((id) => {
                        return id !== socketId;
                    })
                    UserM.update({ user_id: session.user_id }, { sockets: socketIdsNew }).exec(function afterwards(err, user) {
                        return cb();
                    });
                }

                StoredProcedure.query('call get_list_rooms(?)', [user_id], (err, [data, server_status]) => {
                    if (!!err) {
                        console.log(err)
                        return cb();
                    }

                    data.forEach(room => {
                        sails.sockets.leave(socket, room.r_id, function (err) {
                            if (notify) {
                                sails.sockets.broadcast(room.r_id, {
                                    type: 'leave',
                                    user: user,
                                    room: {
                                        id: room.r_id,
                                        name: room.r_name,
                                        create: room.r_fromdate,
                                        product_id: room.r_product_id
                                    }
                                })
                            }
                        });
                    });
                })
            })
        } catch (e) {
            console.log("Error in onDisconnect: ", e);
            return cb();
        }

    },


    /*
    ***************************************************************************/
    onConnect: function (session, socket, cb) {
        // `true` allows the connection
        // console.log(socket.conn)
        // console.log("------------------")
        // console.log(socket.handshake.query.token)
        // console.log("------------------")
        // console.log(socket.handshake.headers)
        // console.log("------------------")
        // console.log(socket.conn.id)
        // console.log("------------------")
        
        // console.log("Socket--", sails.sockets.getId(socket))
        // console.log(handshake.headers)
        // console.log("------------------")
        // console.log(handshake._query)
        // console.log("------------------")
        // console.log(handshake.socket)
        // console.log("------------------")
        //console.log(handshake.socket._httpMessage)

        // let test = cb(null, true);
        // console.log("------------------")
        // console.log(test)

        var token = socket.handshake.query.token;
        var user_agent = socket.handshake.headers['user-agent'];
        let check = false;
        jwt.verify(token, key, function (err, decoded) {
            if (!err) {
                check = true
                data = decoded.data

            }
        })
        let self = this;
        if (check) {
            var { user_id, user_code, type } = data;
            session.user_id = user_id
            session[user_id] = socket;
            var socketId = sails.sockets.getId(socket);
            StoredProcedure.query('call moki.connect(?, ?)', [user_id, user_agent], function (err, [data, server_status]) {
                if (err) {
                    return;
                }

                if (!data || data.length == 0) {
                    // res.status(401);
                    // res.json({
                    //     code: "1009",
                    //     message: "Not access."
                    // })
                    return ;
                }

                var req = {};
                var res = {}
                req.socket = socket
                req.session = session;
                UserM.findOne({ user_id: user_id }).exec(function (err, user) {
                    if (!!user) {
                        if (!user.sockets.find(socket => { return socket == socketId })) {
                            user.sockets.push(socketId);
                            UserM.update({ user_id: user_id }, { sockets: user.sockets }).exec(function afterwards(err, user) {
                                
                            });
                            req.user = {
                                id: user_id,
                                name: data[0].ui_name,
                                avartar: data[0].ui_avartar,
                            }
                            req.session[socketId] = req.user;
                            self.joinRoom(req, res);
                        }
                    } else {
                        UserM.create({
                            user_id: user_id,
                            name: data[0].ui_name,
                            avartar: data[0].ui_avartar,
                            sockets: [socketId]
                        }).exec(function (err, user) {
                            if (err) {
                                return ;
                            }
                            req.user = {
                                id: user_id,
                                name: data[0].ui_name,
                                avartar: data[0].ui_avartar,
                            }
                            req.session[socketId] = req.user;
                            self.joinRoom(req, res, true);
                            
                        });
                    }


                })
            });
        }










        //return cb(null, true);

        // (`false` would reject the connection)
    },

    joinRoom: function (req, res, notify = true) {

        var socket = req.socket;
        let user_id = req.session.user_id;

        StoredProcedure.query('call get_list_rooms(?)', [user_id], (err, [data, server_status]) => {
            if (!!err) {
                console.log(err)
                return;
            }

            data.forEach(room => {
                console.log("notify")
                sails.sockets.join(req.socket, room.r_id, function (err) {
                    console.log("notify", room.r_id)
                    if (notify) {
                        sails.sockets.broadcast(room.r_id, {
                            type: 'join',
                            user: req.user,
                            room: {
                                id: room.r_id,
                                name: room.r_name,
                                create: room.r_fromdate,
                                product_id: room.r_product_id
                            }
                        })
                        //console.log(sails.sockets.socketRooms(req.socket))
                    }
                });
            });
        })
    },

    /***************************************************************************
    *                                                                          *
    * `afterDisconnect`                                                        *
    *                                                                          *
    * This custom afterDisconnect function will be run each time a socket      *
    * disconnects                                                              *
    *                                                                          *
    ***************************************************************************/
    // afterDisconnect: function(session, socket, cb) {
    //   // By default: do nothing.
    //   return cb();
    // },

    /***************************************************************************
    *                                                                          *
    * `transports`                                                             *
    *                                                                          *
    * A array of allowed transport methods which the clients will try to use.  *
    * On server environments that don't support sticky sessions, the "polling" *
    * transport should be disabled.                                            *
    *                                                                          *
    ***************************************************************************/
    // transports: ["polling", "websocket"]

};
