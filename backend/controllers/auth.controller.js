const User = require('../models/users.model'); //the User model

const bcrypt = require('bcryptjs');

const genTokenSetCookie = require('../utils/genTokenSetCookie.util');

exports.authenticationSignUp = async (req, res, next) => {
	try {
		const { fullname, username, password, confirmPassword, email } = req.body;

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
			email: email,
		});

		//save new user to database
		if (newUser) {
			genTokenSetCookie(newUser._id, res);

			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullname: newUser.fullname,
				password: newUser.password,
				email: newUser.email,
			});
		}
	} catch (error) {
		console.log('Error in AUTHCTRL: SIGNUP: ', error.message);
		res.status(500).json({ error: 'Internal Server Error, AUTHCRTL: SIGNUP' });
	}
};

exports.authenticationLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		//get user from database
		const user = await User.findOne({ username });

		//check if password matches
		const isPassCorrect = await bcrypt.compare(password, user?.password || '');

		//error if no user or incorrect password
		if (!user || !isPassCorrect) {
			return res.status(400).json({ error: 'Invalid login credentials.' });
		}

		//Generate jwt token and set cookie for 15 days.
		genTokenSetCookie(user._id, res);

		//return succesfull login
		res.status(200).json({
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
		});
	} catch (error) {
		console.log('Error in AUTHCTRL: LOGIN: ', error.message);
		res.status(500).json({ error: 'Internal Server Error: AUTHCTRL: LOGIN' });
	}
};

exports.authenticationLogout = async (req, res, next) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Logged Out Succesfully' });
	} catch (error) {
		console.log('Error in AUTHCTRL: LOGOUT: ', error.message);
		res.status(500).json({ error: 'Error at AUTHCTRL: LOGOUT' });
	}
};
