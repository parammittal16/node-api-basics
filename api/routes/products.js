const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
	Product.find()
	.exec()
	.then(doc => {
		if(doc){res.status(200).json(doc);}
		else{res.status(400).json({message: "Product Not found"})}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product
	.save()
	.then(result => {
		res.status(201).json({
		message:"posting products",
		createdProduct: result
	});
	}).catch(err => 
	res.status(500).json({
		message: err
	}));
	
	
});

router.get('/:id', (req, res, next) => {
	const productId = req.params.id;
	Product.findById(productId)
	.exec()
	.then(doc => {
		if(doc){res.status(200).json(doc);}
		else{res.status(400).json({message: "Product Not found"})}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.patch('/:id', (req, res, next) => {
	res.status(200).json({
		message:"updating product"
	});
});

router.delete('/:id', (req, res, next) => {
	res.status(200).json({
		message:"delete product"
	});
});


module.exports = router;