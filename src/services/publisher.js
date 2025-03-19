const amqp = require("amqplib");
const config = require("../config/config");

class Publisher {
  channel;

  async createConnection() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createConnection();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    const exchangeType = config.rabbitMQ.exchangeType;
    await this.channel.assertExchange(exchangeName, exchangeType, {
      durable: true,
    });

    const logDetails = {
      OrderID: message.order_id,
      UserID: message.user_id,
      Content: message.content,
      Timestamp: message.timestamp,
    };

    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );
   

  }
  
}

module.exports = Publisher;
