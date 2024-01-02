# RabbitMQ Practice

These are some basic projects for practicing and learning **RabbitMQ**. 



## Technologies

- Node.js
- **Packages:** amqplib


## Features

- **Hello World:**: Send & Recive Messages
- **Task Queue**: First Simple Socket.io Server

## Installation (locally)

First add your **RabbitMQ** connection link in code.

In each project Install **Packages** with npm

###### Check

```shell
npm install

node publisher
node reciever
```
## If Using Docker:
```shell
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

<!-- ## Installation (Production)

[Deployment Guid](https://dev.to/kunalukey/how-to-setup-and-deploy-a-mern-stack-project-for-free-5acl)

## Screenshots

![Cover](./cover.png) -->