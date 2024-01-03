const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel(async(err1, channel) => {
    if (err1) throw err1;

    let queueName = "wjd";
    let exchangeName = "Logs";

    // Assert Exchange
    channel.assertExchange(exchangeName, "fanout", { durable: false });
    // Assert Queue
    const q =  channel.assertQueue('', { durable: false ,exclusive: true});
    // Bind Queue
    channel.bindQueue(q.queue, exchangeName, '');


    console.log(
      "[*] Waiting for messages in %s. To exit press CTRL+C",
      q.queueName
    );
// console.log(q)
    // Consume
    channel.consume(
      q.queue,
      (msg) => {
        console.log("[X] Recieved  %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
