# elastic_node_dummy

### preconditions: 
npm install @elastic/elasticsearch

download es_connect.js and es_utils.js

### how to use:
const { checkNodeHealth, queryDoc } = require('./es_utils');

checkNodeHealth();

queryDoc('test_0419', { match: { "Name": 'test1005' } }, '');
