## Routing - Topic (Usage Help)

After Running RabbitMQ using docker go with bellow:

###### Running Consumer

```shell
node consumer.js *.main.info
node consumer.js \#.error
node consumer.js us.main.*

```

###### Running Emmiter

```shell
node emitter.js us.main.info
```
