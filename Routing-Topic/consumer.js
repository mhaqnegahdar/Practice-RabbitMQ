const amqp = require("amqplib/callback_api");

const routingKeys = process.argv.slice(2)


const queueName = routingKeys.reduce((accumulator, currentElement) => {

  return `${accumulator}${accumulator??'-'}${currentElement}`;// Create queueName from routing keys
}, '');


amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel(async(err1, channel) => {
    if (err1) throw err1;

    let exchangeName = "topic_logs";

    // Assert Exchange
    channel.assertExchange(exchangeName, "topic", { durable: false });

    // Assert Queue
    channel.assertQueue(queueName, { durable: false ,exclusive: true});

    // Bind Queues to routing keys
    routingKeys.forEach((routingKey)=>{

      channel.bindQueue(queueName, exchangeName, routingKey);
    })


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
