/**
 * UserM
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
    connection: 'memory',
    migrate: 'drop',
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,
    // Subscribers only get to hear about update and destroy events.
    // This lets us keep our "UserMs online" list accurate, while avoiding
    // sending private messages to anyone but the intended recipient.
    // To get chat messages for a UserM, you subscribe to the `message`
    // context explicitly.
    attributes: {
        id_user: 'integer',
        avartar: 'string',
        name: 'string',
        sockets: 'array'
    },
};