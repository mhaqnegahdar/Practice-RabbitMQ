const amqp = require("amqplib/callback_api");

// const resQueueName = "Res-Queue";
const reqQueueName = "Req-Queue";

// program to display fibonacci sequence using recursion
function fibonacci(num) {
  if (num < 2) return num;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

amqp.connect("amqp://localhost", async (err0, connection) => {
  if (err0) throw err0;

  //   Create Channgel (Exchange)
  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    // Assert Request Queue
    channel.assertQueue(reqQueueName, { durable: true });
    channel.prefetch(1);
    console.log("[*] Waiting for tasks in %s.", reqQueueName);

    // Consume
    channel.consume(
      reqQueueName,
      (msg) => {

        console.log('[P] Processing Fib %s',msg.content)
        const resQueueName = msg.properties.replyTo
        const replyTo = msg.properties.replyTo
        const correlationId = msg.properties.correlationId

        //  Process Fibonacci
        const fibNum = fibonacci(parseInt(msg.content.toString()));
        // Send Response
        channel.sendToQueue(resQueueName, Buffer.from(fibNum.toString()), {
          replyTo,
          correlationId,
        });
        console.log('Sent Processed Response')
        channel.ack(msg);

      },
      { noAck: false } // Acknowledge Manually
    );
  });
});
