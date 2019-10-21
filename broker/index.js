const amqplib = require('amqplib');

const { MB_HOST, MB_PORT } = require('../config');

let brokerConnection = null;

const initBroker = () => new Promise(async (resolve, reject) => {
  try {
    const connection = await amqplib.connect(url);
    resolve(connection);
  } catch (error) {
    console.warning(error);
    reject(error);
  }
});

const notifyCartProcessed = async (queue, cart) => {
  if (!brokerConnection) {
    brokerConnection = await initBroker("amqp://" + MB_HOST + ":" + MB_PORT);
  }

  await brokerConnection.createChannel()
    .then(ch => ch.assertQueue(queue)
      .then(() => {
        const cartObj = JSON.stringify(cart);
        ch.sendToQueue(queue, Buffer.from(cartObj));
      })
    ).catch(console.warning);
}

module.exports = {
  notifyCartProcessed
};
