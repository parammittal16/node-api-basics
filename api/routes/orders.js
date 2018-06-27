const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "orders were fetched"
	});
});

router.post('/', (req, res, next) => {
	const order = {
		productId: req.body.productId,
		quantity: req.body.quantity
	};
	res.status(201).json({
		message: "order was created",
		orderDetails: order
	});
});

router.get('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: `order with id ${req.params.orderId} fetched`
	});
});

router.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: `order with id ${req.params.orderId} deleted`
	});
});

module.exports = router;