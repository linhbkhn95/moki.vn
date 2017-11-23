var admin = require('firebase-admin')

var serviceAccount = require("../../moki-a4048-firebase-adminsdk-k9f29-87babff8ce.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moki-a4048.firebaseio.com"
});



// This registration token comes from the client FCM SDKs.
var registrationToken = "dAk3C1romUY:APA91bElDZRIjBWKT8EX5tEiOHQhiKbMa-pljZqUN8pWt8Pg_hlK09kH6zWdriH--3xMqmq3zeWbxpRa7F6I3w-W_MJ3K7HEKn8y2Weu5f2BRkbs7aEBMc_DNZKTyhVbN2bCw6PmYwqD";

// See the "Defining the message payload" section above for details
// on how to define a message payload.


module.exports = {
    pushNotify: function (title, body, data) {

        var payload = {
            notification: {
                title: title,
                body: body
            },
            data: data
        };

        // Set the message as high priority and have it expire after 24 hours.
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        // Send a message to the device corresponding to the provided
        // registration token with the provided options.
        admin.messaging().sendToDevice(registrationToken, payload, options)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }
}


