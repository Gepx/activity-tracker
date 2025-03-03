const express = require('express');
const router = express.Router();
const Testimonial = require('../controllers/TestimonialsController');

router.get('/', Testimonial.getAllTestimonials);
router.post('/', Testimonial.createTestimonial);

module.exports = router;
