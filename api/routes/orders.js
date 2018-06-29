const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {

	Order
	.find()
	.populate('product', 'name')
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => res.status(500).json(err));
});

router.post('/', (req, res, next) => {
	Product.findById({_id: req.body.productId})
	.then(pro => {
		if(!pro){
			return res.status(404).json({
				message: 'Product not found'
			});
		}
		const order = new Order({
			_id: mongoose.Types.ObjectId(),
			quantity: req.body.quantity,
			product: req.body.productId
		});
		return order.save();
	})
	.then(result => {
		res.status(201).json(result);
	})
	.catch(err => {
		res.status(500).json(err);
	});
});

router.get('/:orderId', (req, res, next) => {
	Order.findById(req.params.orderId)
	.exec()
	.then(doc => {
		if(doc){
			res.status(200).json(doc);
		}
		else{
			res.status(404).json({
				message: 'order not found'
			});
		}
	})
	.catch(err => {
		res.status(500).json(err);
	})
});

router.delete('/:orderId', (req, res, next) => {
	Order.findOneAndRemove({_id: req.params.orderId})
	.populate('product', 'name')
	.exec()
	.then(order => {
		if(!order){
			res.status(404).json({
				message: 'Order not found and connot del'
			})
		}
		else{
			res.status(200).json({
				message: 'order deleted',
				info: order
			});
		}
	})
	.catch(err => {
		res.status(500).json(err);
	});
});

module.exports = router;