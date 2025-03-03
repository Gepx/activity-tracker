const Testimonial = require('../models/TestimonialsModel');

// Get all testimonials
module.exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(6);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new testimonial (protected route - add authentication middleware as needed)
module.exports.createTestimonial = async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    role: req.body.role,
    rating: req.body.rating,
    text: req.body.text,
    image: req.body.image,
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
