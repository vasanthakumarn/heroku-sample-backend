import express = require('express');

const server = express();

server.get('/', (request: express.Request, response: express.Response) => {
    response.status(200).send('hello world - sample!!!');
});
console.log('Server is listening...');
module.exports = server.listen(process.env.PORT || 3000);