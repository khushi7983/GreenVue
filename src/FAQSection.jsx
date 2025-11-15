import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, CheckCircle } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What are ESG funds, and how do they work?",
    answer:
      "ESG funds invest in companies that meet environmental, social, and governance standards, ensuring responsible and sustainable business practices while generating financial returns.",
  },
  {
    id: 2,
    question: "Are ESG funds as profitable as traditional investments?",
    answer:
      "Yes, many ESG funds have shown competitive or even higher returns than traditional investments due to strong governance, ethical practices, and resilience against economic risks.",
  },
  {
    id: 3,
    question: "How can ESG funds benefit the environment and society?",
    answer:
      "ESG funds support businesses that reduce carbon footprints, promote fair labor policies, and follow ethical corporate governance, contributing to a more sustainable future.",
  },
  {
    id: 4,
    question: "Are ESG investments regulated or government-supported?",
    answer:
      "Yes, many governments encourage ESG investing through policies, tax benefits, and regulations to promote sustainability and responsible investing.",
  },
  {
    id: 5,
    question: "How can I start investing in ESG funds?",
    answer:
      "You can invest in ESG mutual funds, ETFs, or green bonds through financial institutions, stock markets, or investment platforms that offer ESG-focused portfolios.",
  },
];

const FAQItem = ({ question, answer, isOpen, toggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative border border-slate-700/50 rounded-2xl hover:border-green-500/50 
              transition-all duration-500 group backdrop-blur-sm bg-slate-800/30
              hover:shadow-lg hover:shadow-green-500/10 overflow-hidden"
  >
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <button
      className="w-full text-left p-6 transition-all duration-300 flex justify-between items-center 
                 group-hover:bg-slate-800/50 relative z-10"
      onClick={toggle}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 
                      transition-colors duration-300 border border-green-500/20">
          <HelpCircle className="w-5 h-5 text-green-400 group-hover:text-green-300" />
        </div>
        <span className="font-semibold text-lg text-white group-hover:text-green-300 
                       transition-colors duration-300 flex-1">
          {question}
        </span>
      </div>
      
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-green-500/20 
                   transition-colors duration-300 border border-slate-600/50 group-hover:border-green-500/30"
      >
        <ChevronDown className="w-5 h-5 text-green-400 group-hover:text-green-300" />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 relative z-10">
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-1.5 rounded-lg bg-green-500/10 mt-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

      <section className="relative bg-transparent text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 
                         bg-gradient-to-r from-green-400 to-green-600 
                         bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Everything you need to know about sustainable investing and ESG funds
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === faq.id}
                toggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                index={index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
