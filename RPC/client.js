const amqp = require("amqplib/callback_api");
const { v4: uuid } = require("uuid");

const resQueueName = "Res-Queue";
const reqQueueName = "Req-Queue";

const num = process.argv.slice(2)[0];
if (!num) process.exit(1);

const correlationId = uuid();

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    // Assert Res-Queue
    channel.assertQueue(resQueueName, { exclusive: true });

    // Send Task To Server (Req-Queue)
    // - This queue will be asserted server side
    // - If didn't exist means there's no server
    channel.sendToQueue(reqQueueName, Buffer.from(num), {
      persistent: true, //Save in Disk
      replyTo: resQueueName,
      correlationId,
    });
    console.log("[X] Requested for Fib %s", num);

    // Consume Response
    channel.consume(
      resQueueName,
      (msg) => {
        console.log(`[Res] Fib ${num} is equal to ${msg.content.toString()}` );

        channel.ack(msg);

        //   Close Connection
        setTimeout(function () {
          connection.close();
          process.exit(0);
        }, 500);
      },
      { noAck: false } // Acknowledge Manually
    );
  });
});
