const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', (req,res,next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >= 1){
			return res.status(409).json({
				message: "try aother email"
			});
		} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
		if(err) {
			return res.status(500).json({
				error: err
			});
		} else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				email: req.body.email,
				password: hash
			});
			user.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'User Created'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
		}
	}); 
		}
	})
	.catch();
});

router.delete("/:userId", (req,res,next) => {
	User.findOneAndRemove({_id: req.params.userId})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "User deleted"
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

router.get('/', (req, res, next) => {
	User.find()
	.select('email _id')
	.exec()
	.then(doc => {
		const response = {
			count: doc.length,
			products: doc.map(doc => {
				return {
					email: doc.email,
					_id: doc._id,
					request: {
						type: "GET"
					}
				};
			})
		};
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

module.exports = router;