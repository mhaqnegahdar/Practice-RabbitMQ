const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queueName = "wjd";

    // Assert Queue
    channel.assertQueue(queueName, { durable: false });

    console.log(
      "[*] Waiting for messages in %s. To exit press CTRL+C",
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
