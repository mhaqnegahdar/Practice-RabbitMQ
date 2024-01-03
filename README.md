# RabbitMQ Practice

These are some basic projects for practicing and learning **RabbitMQ** base on their own [doc](https://www.rabbitmq.com/getstarted.html). 



## Technologies

- Node.js
- **Packages:** amqplib


## Features

- **Hello World:**: Send & Recive Messages

- **Task Queue**: For Time Consuming Tasks
    - noAke, durable, persistent : true & false differences
    - channel.prefetch(1) & channel.acke(msg)

- **Pub/Sub (Fanout)**: Beoadcast Messages
    - exclusive: true : remove queue when reciever is done

- **Routing (Direct)**: Direct Messages
    - Sending Messages With **Routing Keys**

- **Routing (Topic)**: Filtering Messages
    - Sending Messages With **Routing Keys** : "us.main.*" of "#.error"


## Installation (locally)

First add your **RabbitMQ** connection link in code.

Install **Packages** with npm in roote

```shell
npm install

```
###### Running Each Project

```shell
node publisher.js task...

node reciever.js
```
## If Using Docker:
```shell
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

<!-- ## Installation (Production)

[Deployment Guid](https://dev.to/kunalukey/how-to-setup-and-deploy-a-mern-stack-project-for-free-5acl)

## Screenshots

![Cover](./cover.png) -->