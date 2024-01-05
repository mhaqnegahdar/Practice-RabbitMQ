const amqp = require("amqplib/callback_api");

const header = process.argv.slice(2)
const account = header[0] || 'new'
const method = header[1] || 'facebook'


amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queueName = "wjd";
    let exchangeName = "headers_logs";
    let msg = "Log";

    // Assert Queue
    channel.assertExchange(exchangeName, "headers", { durable: false });
    
    // Send Message
    channel.publish(exchangeName,'' , Buffer.from(msg),{headers:{method,account}});

    console.log("[X] Sent %s", msg);
  });

  //   Close Connection
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
