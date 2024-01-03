const amqp = require("amqplib/callback_api");

const routingKey = process.argv.slice(2)[0]

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queueName = "wjd";
    let exchangeName = "topic_logs";
    let msg = "Log";

    // Assert Queue
    channel.assertExchange(exchangeName, "topic", { durable: false });
    
    // Send Message
    channel.publish(exchangeName,routingKey , Buffer.from(msg));

    console.log("[X] Sent %s", msg);
  });

  //   Close Connection
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
