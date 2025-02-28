import { useState } from "react";
import {
  faSearch,
  faRocket,
  faUserGear,
  faCreditCard,
  faShieldHalved,
  faQuestionCircle,
  faChevronDown,
  faComments,
  faBook,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const supportCategories = [
    {
      icon: faRocket,
      title: "Getting Started",
      description: "Start off on the right foot with our beginner guides",
      link: "#getting-started",
    },
    {
      icon: faUserGear,
      title: "Account Settings",
      description: "Manage your account and preferences",
      link: "#account",
    },
    {
      icon: faCreditCard,
      title: "Billing",
      description: "View and manage your subscriptions",
      link: "#billing",
    },
    {
      icon: faShieldHalved,
      title: "Security",
      description: "Keep your account safe and secure",
      link: "#security",
    },
  ];

  const faqQuestions = [
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply create an account, complete your profile, and start tracking your activities. Our intuitive interface will guide you through the process.",
    },
    {
      question: "What features are included in the free plan?",
      answer:
        "The free plan includes basic activity tracking, calendar view, and up to 3 projects. For additional features, check out our premium plans.",
    },
    {
      question: "How do I track my daily activities?",
      answer:
        'You can track your activities by clicking the "Add Task" button on your dashboard. Fill in the task details, set a duration, and assign it to a project if needed.',
    },
    {
      question: "Can I export my activity data?",
      answer:
        "Yes! Premium users can export their activity data in various formats including CSV and PDF. This feature is great for reporting and analysis.",
    },
    {
      question: "How do I change my account settings?",
      answer:
        "Navigate to Settings in your dashboard menu. From there, you can update your profile, notification preferences, and security settings.",
    },
    {
      question: "What if I need additional help?",
      answer:
        "Our support team is available 24/7. You can reach us through the contact form below or by emailing support@activitytracker.com.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto h-[calc(100vh-10rem)] no-scrollbar">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-blue-100 mb-8 text-lg">
            Search our knowledge base or browse categories below
          </p>
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full px-6 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportCategories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-200">
                  <FontAwesomeIcon
                    icon={category.icon}
                    className="text-blue-600 dark:text-blue-400 text-2xl group-hover:text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find quick answers to common questions
          </p>
        </div>
        <div className="space-y-4">
          {faqQuestions.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-gray-500 transform transition-transform duration-200 ${
                    activeQuestion === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeQuestion === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Help Section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get in touch with our support team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="#contact"
              className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
              <FontAwesomeIcon
                icon={faComments}
                className="text-4xl text-blue-600 dark:text-blue-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chat with our support team
              </p>
            </a>
            <a
              href="#documentation"
              className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
              <FontAwesomeIcon
                icon={faBook}
                className="text-4xl text-blue-600 dark:text-blue-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Documentation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse detailed guides
              </p>
            </a>
            <a
              href="#ticket"
              className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
              <FontAwesomeIcon
                icon={faGear}
                className="text-4xl text-blue-600 dark:text-blue-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Submit Ticket
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Open a support ticket
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
