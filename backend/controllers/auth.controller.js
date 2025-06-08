const User = require('../models/users.model'); //the User model

const bcrypt = require('bcryptjs');

const genTokenSetCookie = require('../utils/genTokenSetCookie.util');

exports.authenticationSignUp = async (req, res, next) => {
	try {
		const { fullname, username, password, confirmPassword } = req.body;

		//confirm passwords
		if (password != confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		//check for existing users
		const user = await User.findOne({ username });
		if (user) {
			return res.staus(400).json({ error: 'User already exists.' });
		}

		//hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//create new user
		const newUser = new User({
			fullname: fullname,
			username: username,
			password: hashedPassword,
		});

		//save new user to database
		if (newUser) {
			genTokenSetCookie(newUser._id, res);

			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullname: newUser.fullname,
				password: newUser.password,
			});
		}
	} catch (error) {
		console.log('Error in AUTHCTRL: SIGNUP: ', error.message);
		res.status(500).json({ error: 'Internal Server Error, AUTHCRTL: SIGNUP' });
	}
};
