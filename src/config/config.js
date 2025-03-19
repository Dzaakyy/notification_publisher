module.exports = {
    rabbitMQ: {
        Port: "8081",
        url: "amqp://admin:admin12345@8.215.73.55:5672/",
        exchangeName: "notifications",
        exchangeType: "fanout"
        
        // amqp://guest:guest@localhost:5672/
        // amqp://admin:admin12345@8.215.73.55:5672/
    }
};