const amqplib = require('amqplib');

const { MB_URL } = require('../config');

const queue = 'process-cart';
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

const notifyCartProcessed = async (cart) => {
  if (!brokerConnection) {
    brokerConnection = await initBroker(MB_URL);
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
