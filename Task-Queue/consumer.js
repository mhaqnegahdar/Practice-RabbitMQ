const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queueName = "Tasks";

    // Assert Queue
    channel.assertQueue(queueName, { durable: true });
    channel.prefetch(1);
    console.log(
      "[*] Waiting for messages in %s. To exit press CTRL+C",
      queueName
    );

    // Consume

    channel.consume(
      queueName,
      (msg) => {
        var secs = msg.content.toString().split(".").length - 1;
        setTimeout(function () {
          console.log(" [x] Done", secs);
          channel.ack(msg);
        }, secs * 1000);
      },
      { noAck: false } // Acknowledge Manually
    );
  });
});
