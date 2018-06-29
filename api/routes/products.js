const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
	Product.find()
	.select('name price _id')
	.exec()
	.then(doc => {
		if(doc){res.status(200).json(doc);}
		else{
			const response = {
				count: doc.length,
				products: doc
			}
			res.status(400).json(response);
		}
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
	const productId = req.params.id;
	const updateOps = {};
	for(const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: productId},{ $set: updateOps})
	.exec()
	.then(result => {
		if(result){
			res.status(200).json({
				message: "Product Updated",
				info: result
			});
		}
		else{
			res.status(404).json({
				message: "not found invalid Product"
			});
		}
	})
	.catch(err => {
		res.status(500).json({
			message: "Some error"
		});
	})
});

router.delete('/:id', (req, res, next) => {
	const productId = req.params.id;
	Product.findOneAndRemove({_id: productId})
	.exec()
	.then(result => {
		if(result){
			res.status(200).json({
				message:"product deleted",
				info:result
			});
		}
		else{
			res.status(404).json({
				message: "producat not found"
			});
		}
	})
	.catch(err => {
		res.status(500).json({
			no: "no",
			message: err
		});
	});
});


module.exports = router;