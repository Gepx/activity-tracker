import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faStar,
  faStarHalfAlt,
  faChevronLeft,
  faChevronRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const partnerLogosRef = useRef(null);

  // Partner company logos
  const partnerLogos = [
    { name: "Udemy", logo: "/logos/udemy.png" },
    { name: "Coursera", logo: "/logos/coursera.png" },
    { name: "Skillshare", logo: "/logos/skillshare.png" },
    { name: "edX", logo: "/logos/edx.png" },
    { name: "LinkedIn Learning", logo: "/logos/linkedin-learning.png" },
    { name: "Pluralsight", logo: "/logos/pluralsight.png" },
    { name: "Datacamp", logo: "/logos/datacamp.png" },
    { name: "Codecademy", logo: "/logos/codecademy.png" },
  ];

  // Features we're good at
  const features = [
    {
      title: "Smart Time Tracking",
      description:
        "Automatically track and categorize your activities with our intelligent system",
      icon: "⏱️",
    },
    {
      title: "Detailed Analytics",
      description:
        "Get insights into your productivity patterns with comprehensive reports",
      icon: "📊",
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with shared projects and real-time updates",
      icon: "👥",
    },
  ];

  // Navigation links for footer
  const footerLinks = {
    Product: ["Features", "Pricing", "Integrations", "Enterprise"],
    Company: ["About Us", "Careers", "Blog", "Press"],
    Resources: ["Documentation", "Community", "Support", "API"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  useEffect(() => {
    // Fetch testimonials from backend
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Use dummy data if fetch fails
        setTestimonials([
          {
            name: "John Doe",
            role: "Software Developer",
            rating: 5,
            text: "This tool has completely transformed how I track my daily activities. The insights are invaluable!",
            image: "/testimonials/user1.jpg",
          },
          {
            name: "Sarah Smith",
            role: "Project Manager",
            rating: 4.5,
            text: "The team collaboration features are outstanding. It has made our remote work so much more efficient.",
            image: "/testimonials/user2.jpg",
          },
          {
            name: "Michael Brown",
            role: "Freelancer",
            rating: 4.8,
            text: "As a freelancer, tracking time accurately is crucial. This platform makes it effortless.",
            image: "/testimonials/user3.jpg",
          },
          {
            name: "Emily Chen",
            role: "UX Designer",
            rating: 5,
            text: "The interface is intuitive and the analytics help me understand my work patterns better.",
            image: "/testimonials/user4.jpg",
          },
          {
            name: "David Wilson",
            role: "Marketing Director",
            rating: 4.7,
            text: "Great for tracking team productivity and project timelines. Highly recommended!",
            image: "/testimonials/user5.jpg",
          },
          {
            name: "Lisa Anderson",
            role: "Content Creator",
            rating: 4.9,
            text: "The detailed reports have helped me optimize my content creation workflow significantly.",
            image: "/testimonials/user6.jpg",
          },
        ]);
      }
    };

    fetchTestimonials();

    // Auto-scroll partner logos
    const scrollLogos = () => {
      if (partnerLogosRef.current) {
        if (
          partnerLogosRef.current.scrollLeft >=
          partnerLogosRef.current.scrollWidth -
            partnerLogosRef.current.clientWidth
        ) {
          partnerLogosRef.current.scrollLeft = 0;
        } else {
          partnerLogosRef.current.scrollLeft += 1;
        }
      }
    };

    const scrollInterval = setInterval(scrollLogos, 30);
    return () => clearInterval(scrollInterval);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className="text-yellow-400"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <img
                src="/hero-image.png"
                alt="Activity Tracking"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="w-full lg:w-1/2 lg:pl-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Track Your Activities,
                <br />
                <span className="text-blue-600">Boost Your Productivity</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Take control of your time with our intuitive activity tracking
                platform. Monitor, analyze, and optimize your daily routines
                effortlessly.
              </p>
              <div className="flex space-x-4">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-12">
            Trusted by Leading Companies
          </h2>
          <div
            ref={partnerLogosRef}
            className="overflow-hidden whitespace-nowrap">
            <div className="inline-flex space-x-12 animate-scroll">
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <img
                  key={index}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Empowering Your Productivity Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We believe in making time management effortless and insightful. Our
            platform helps you understand and optimize your daily activities,
            leading to better productivity and work-life balance.
          </p>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Advanced Analytics at Your Fingertips
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Get detailed insights into your productivity patterns with our
                advanced analytics dashboard. Visualize your time usage and make
                data-driven decisions to optimize your workflow.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Real-time activity tracking
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Custom reports and analytics
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Team collaboration tools
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/analytics-dashboard.png"
                alt="Analytics Dashboard"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Users Say
          </h2>
          <div className="relative">
            <button
              onClick={() =>
                setCurrentTestimonialIndex((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              />
            </button>
            <button
              onClick={() =>
                setCurrentTestimonialIndex((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              />
            </button>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 100}%)`,
                }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 dark:text-white font-semibold mr-2">
                            {testimonial.rating}
                          </span>
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Logo and Contact */}
            <div className="lg:col-span-2">
              <img
                src="/logo.png"
                alt="Activity Tracker"
                className="h-8 w-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                Track your activities, boost your productivity.
              </p>
              <p className="text-gray-400">
                Email: support@activitytracker.com
              </p>
            </div>

            {/* Navigation Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Activity Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
