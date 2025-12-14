import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 15,
  skipSuccessfulRequests: true,
})

export default limiter;
