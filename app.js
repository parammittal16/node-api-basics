const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
mongoose.connect('mongodb://node-shop-app:node-shop-app@node-rest-shop-shard-00-00-bv6tv.mongodb.net:27017,node-rest-shop-shard-00-01-bv6tv.mongodb.net:27017,node-rest-shop-shard-00-02-bv6tv.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
	const e = new Error('Yaar Not Found');
	e.status = 404;
	next(e);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: {
			message: err.message
		}
	});
});

module.exports = app;