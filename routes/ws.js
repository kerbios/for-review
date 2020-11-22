const ws = require('express-ws');
const { Message, User } = require('../services/postgres');

module.exports = app => {
    ws(app);

    const connections = new Set();

    const handleWebsocketConnection = (client) => {
        connections.add(client);
        console.log(client);

        client.on('connection', (ws) => {
            console.log('Connected:', ws.id);
            //client.id = ws.id;
        });

        client.on('message', (msgStr) => {
            console.log('message', msgStr);
            
            const msg = JSON.parse(msgStr);

            switch (msg.type) {
                case 'NEW_MESSAGE':
                    // here need to handle error
                    Message.create({
                        from: msg.from,
                        to: msg.to,
                        message: msg.message
                    });
                    break;
                default:
                    console.log('strange type:', msg.type);
            };

            User.findOne({ googleId: msg.from })
                .then((user) => {
                    console.log('user?', user);
                    msg.from = `${user.firstName} ${user.lastName}`;
                    const message = JSON.stringify(msg);
                    connections.forEach((conn) => conn.send(message));
                })
                .catch((err) => { /* handle error */ });
        });

        client.on('close', () => {
            connections.delete(client);
        });

        setInterval(() => {
            connections.forEach((conn) => {
              conn.send(new Date().toTimeString());
            });
        }, 30000);
    };

    app.ws('/channel', handleWebsocketConnection);
};