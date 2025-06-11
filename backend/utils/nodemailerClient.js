import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { GMAIL_USER, GMAIL_APP_PASS } = process.env;

export default function createTransporter() {
	return nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: GMAIL_USER,
			pass: GMAIL_APP_PASS,
		},
	});
}
