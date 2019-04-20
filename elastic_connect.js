const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: 'http://localhost:9200',
  maxRetries: 3,
  requestTimeout: 30000,
  sniffOnStart: true
})

module.exports = client;
