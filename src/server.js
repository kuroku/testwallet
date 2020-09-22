import sirv from 'sirv';
import express from 'express'
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from './api'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use('/api', api)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
