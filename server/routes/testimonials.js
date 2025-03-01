const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

router.get("/", Testimonial.getAllTestimonials);
router.post("/", Testimonial.createTestimonial);

module.exports = router;
