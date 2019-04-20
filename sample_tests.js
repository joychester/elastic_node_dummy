const ESclient = require('./elastic_connect.js');

//Function: check current status of your cluster
const checkHealth = function() {
	ESclient.cluster.health({},function(err,resp,status) {  
  		console.log("-- Client Health --",resp);
  	})
}

//checkHealth();

// Function: Create a new index and indexing(stroing documents in an index)
const createIndx = function() {
	ESclient.indices.create({
	    index: 'test_0418'
    }, function(err, resp, status) {
    	if(err) {
		    console.log(err);
	    } else {
		    console.log("create ", resp)
	    }
    });
}

//createIndx();

// Function: Delete a index
const deleteIndx = function() {
	ESclient.indices.delete({
		index: 'tobedeleted'
	}, function(err, resp, status) {
		if(err) {
			console.log(err);
		} else {
			console.log("deleted ", resp)
		}

	});
}

//deleteIndx();

// Function: Insert a Document to index
const insertDoc = function() {
	ESclient.index({
		index: 'test_0417',
		//id: '1',  //id will be generated automatically if not specify
		type: 'dummy', //a class of similar documents
		body: {
			"Name": "test1003",
			"ID": "1003",
			"ValueA": "1234000",
			"ValueB": "2345000",
		}
	}, function(err, resp, status){
		console.log(resp);
	});
}

//insertDoc();

// Function: Delete a document
const deleteDocById = function(doc_id) {
	ESclient.delete({
		index: 'test_0417',
		id: doc_id,
		type: 'dummy'
	}, function(err, resp, status) {
		console.log(resp);
	});
}

// deleteDocById('CChmNGoBsa07q8U00cFd');

// Function: Bulk Insert Documents
const bulkInsertDoc = function() {
	ESclient.bulk({
		index: 'test_0417',
		type: 'bulk',
		body: [
			{ index: {_index: 'test_0419', _type: 'bulk', _id: 5 } },
			{
			  'Name': 'test1005',
			  'ID': '1005',
			  'ValueA': '55555555',
			  'ValueB': '55555555'
			},
			{ index: {_index: 'test_0419', _type: 'bulk', _id: 6 } },
			{
			  'Name': 'test1006',
			  'ID': '1006',
			  'ValueA': '66666666',
			  'ValueB': '66666666'
			},
		      ]
		}, function(err, resp, status) {
		   if(err) {
		    console.log(err);
		   } else {
		    console.log(resp);
		   }
		});
}

//bulkInsertDoc();

// Function: Search document by query string
const queryDoc = function(idx_name, query_obj, type_name) {
  ESclient.search({
    index: idx_name,
    type: type_name,
    body: {
      query: query_obj,
    }
  }).then(function(resp) {
    resp.body.hits.hits.forEach(function(hit) {
      console.log(hit._source);
    });
  }, function(err) {
    console.trace(err.message);
  });
}

//queryDoc('test_0419', { match: { "Name": 'test1005' } }, '');
