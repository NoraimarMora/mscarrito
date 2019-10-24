const amqplib = require('amqplib');

const { MB_URL } = require('../config');

const queue = 'process-cart';
let brokerConnection = null;

const initBroker = (url) => new Promise(async (resolve, reject) => {
  try {
    const connection = await amqplib.connect(url);
    resolve(connection);
  } catch (error) {
    console.warn(error);
    reject(error);
  }
});

const notifyCartProcessed = async (cart) => {
  if (!brokerConnection) {
    try {
      brokerConnection = await initBroker(MB_URL); 
    } catch (error) {
      console.error('Failed to connect to broker');
      return;
    }
  }

  await brokerConnection.createChannel()
    .then(ch => ch.assertQueue(queue)
      .then(() => {
        const cartObj = JSON.stringify({cart: cart});
        ch.sendToQueue(queue, Buffer.from(cartObj));
      })
    ).catch(console.warn);
}

module.exports = {
  initBroker,
  notifyCartProcessed
};
