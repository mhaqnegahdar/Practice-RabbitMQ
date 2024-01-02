const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queueName = "wjd";
    let msg = "How Is It Going Wjd";

    // Assert Queue
    channel.assertQueue(queueName, { durable: false });

    // Send Message
    channel.sendToQueue(queueName, Buffer.from(msg));
    console.log("[X] Sent %s", msg);
  });

  //   Close Connection
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
