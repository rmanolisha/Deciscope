import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Mascot from '../components/Mascot';
import Layout from '../components/Layout';
import AIChatAssistant from '../components/AIChatAssistant';

const Home = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Deciscope?",
      answer: "Deciscope is an AI-powered decision intelligence platform designed to help you think through complex choices with clarity and calm."
    },
    {
      question: "How AI helps decisions?",
      answer: "Our AI identifies cognitive biases, suggests missing perspectives, and provides a structured reasoning score to help you make more objective decisions."
    },
    {
      question: "Is it safe?",
      answer: "Your privacy is our priority. Your decision data is processed securely and is never used to train public models without your explicit consent."
    },
    {
      question: "How reasoning score works?",
      answer: "The reasoning score evaluates the depth of your consideration, the presence of biases, and the logical consistency of your decision-making process."
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-800 mb-4"
          >
            Welcome to Deciscope AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500"
          >
            A calmer way to think. A smarter way to decide.
          </motion.p>
        </header>

        <main className="flex flex-col items-center mb-20">
          <div className="relative mb-8">
            <Mascot />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-12 -right-24 glass p-4 max-w-[200px] z-10"
            >
              <p className="text-slate-700 font-medium">
                Hi! I’m your Deciscope assistant 🌈 Let’s think clearly together.
              </p>
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white/40 rotate-45 border-r border-b border-white/20"></div>
            </motion.div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-lg px-12 py-4"
          >
            Go to Dashboard
          </motion.button>
        </main>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Accordion 
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px !important',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    mb: 1
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="font-semibold text-slate-700">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="text-slate-600">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <AIChatAssistant />
    </Layout>
  );
};

export default Home;
