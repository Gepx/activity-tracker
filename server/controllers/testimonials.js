const Testimonial = require("../models/Testimonial");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new testimonial (protected route - add authentication middleware as needed)
router.post("/", async (req, res) => {
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
});

module.exports = router;
