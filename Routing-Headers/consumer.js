const amqp = require("amqplib/callback_api");

const header = process.argv.slice(2)
const xMatch = header[0] || 'any'
const account = header[1] || 'new'
const method = header[2] || 'facebook'


const queueName = header.reduce((accumulator, currentElement) => {

  return `${accumulator}${!accumulator?'':'-'}${currentElement}`;// Create queueName from routing keys
}, '');




amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel(async(err1, channel) => {
    if (err1) throw err1;

    let exchangeName = "headers_logs";

    // Assert Exchange
    channel.assertExchange(exchangeName, "headers", { durable: false });

    // Assert Queue
    channel.assertQueue(queueName, { durable: false ,exclusive: true});

    // Bind Queue to header
    channel.bindQueue(queueName, exchangeName, '',{"x-match":xMatch,"account":account,"method":method});
 


    console.log(
      "[*] Listening On *%s*",
      queueName
    );

    // Consume
    channel.consume(
      queueName,
      (msg) => {
        console.log("[X] Recieved  %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
