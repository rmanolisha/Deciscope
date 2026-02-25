import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  ShieldCheck, 
  Activity, 
  Layers,
  ArrowRight
} from 'lucide-react';
import Layout from '../components/Layout';
import AIChatAssistant from '../components/AIChatAssistant';

const About = () => {
  const cards = [
    {
      title: "What is Deciscope?",
      description: "A digital sanctuary for complex decision-making, combining AI intelligence with human intuition.",
      icon: <Layers className="text-blue-500" />
    },
    {
      title: "Our Mission",
      description: "To reduce cognitive load and decision fatigue by providing a clear, structured path through complexity.",
      icon: <Target className="text-pink-500" />
    },
    {
      title: "How it works",
      description: "We use advanced linguistic analysis to identify cognitive biases and suggest missing perspectives.",
      icon: <Activity className="text-green-500" />
    },
    {
      title: "Privacy First",
      description: "Your decisions are private. We don't use your personal data to train public AI models.",
      icon: <ShieldCheck className="text-purple-500" />
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-4">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-slate-800 mb-4"
          >
            About Deciscope AI
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We believe that clarity is the foundation of confidence. Our platform is designed to help you step back, breathe, and think clearly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card !p-8 flex gap-6 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card !bg-blue-50/50 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to think clearly?</h2>
          <p className="text-slate-600 mb-8">Join thousands of users who trust Deciscope for their most important life choices.</p>
          <button className="btn-primary inline-flex items-center gap-2">
            Start Deciding Now <ArrowRight size={18} />
          </button>
        </motion.section>
      </div>
      <AIChatAssistant />
    </Layout>
  );
};

export default About;
