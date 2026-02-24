import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Rocket, 
  GraduationCap, 
  Heart,
  ChevronRight
} from 'lucide-react';
import Layout from '../components/Layout';
import AIChatAssistant from '../components/AIChatAssistant';

const Explore = () => {
  const navigate = useNavigate();

  const examples = [
    {
      title: "Career Choice",
      description: "Should I accept the promotion or move to a startup?",
      icon: <Briefcase className="text-blue-500" />,
      text: "I am debating whether to stay at my current stable corporate job with a recent promotion offer, or join a high-growth fintech startup that offers more equity but less job security. I value professional growth but I am also concerned about financial stability."
    },
    {
      title: "Startup Idea",
      description: "Is now the right time to launch my SaaS venture?",
      icon: <Rocket className="text-pink-500" />,
      text: "I have been working on a prototype for an AI-powered personal productivity tool. I am considering quitting my full-time job to launch it next month. Market competition is increasing, but I believe my unique focus on cognitive load management sets me apart."
    },
    {
      title: "Higher Studies",
      description: "Should I pursue an MBA or continue working?",
      icon: <GraduationCap className="text-green-500" />,
      text: "I have 4 years of experience in marketing. I am considering applying for a top-tier MBA program. It would require a significant financial investment and 2 years away from the workforce, but it could pivot my career into consulting."
    },
    {
      title: "Life Decisions",
      description: "Moving to a new city for a lifestyle change.",
      icon: <Heart className="text-purple-500" />,
      text: "I have lived in New York for 10 years. I am thinking about moving to a smaller, more nature-oriented city like Boulder, Colorado. I want a better work-life balance and access to outdoors, but I worry about leaving my social circle and networking opportunities."
    }
  ];

  const handleSelect = (text) => {
    navigate('/dashboard', { state: { decisionText: text } });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Explore Examples</h1>
          <p className="text-slate-500 text-lg">See how Deciscope can help you think through different scenarios.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleSelect(example.text)}
              className="glass-card !p-6 cursor-pointer group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center mb-4 shadow-sm group-hover:bg-white transition-colors">
                  {example.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{example.title}</h3>
                <p className="text-slate-600 mb-4 font-medium">{example.description}</p>
                <p className="text-slate-400 text-sm italic line-clamp-3">"{example.text}"</p>
              </div>
              <div className="mt-6 flex items-center text-blue-500 font-semibold text-sm">
                Try this example <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AIChatAssistant />
    </Layout>
  );
};

export default Explore;
