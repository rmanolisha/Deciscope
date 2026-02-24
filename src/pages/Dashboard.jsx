import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Tooltip, 
  CircularProgress,
  LinearProgress,
  Box,
  Typography
} from '@mui/material';
import { 
  Brain, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import Layout from '../components/Layout';
import AIChatAssistant from '../components/AIChatAssistant';

const Dashboard = () => {
  const location = useLocation();
  const [decision, setDecision] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (location.state?.decisionText) {
      setDecision(location.state.decisionText);
    }
  }, [location.state]);

  const handleAnalyze = async () => {
    if (!decision.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Mock API call based on the requirement
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockResult = {
        summary: "Your decision to pivot the project seems well-intentioned but needs more data validation.",
        biases: ["Sunk Cost Fallacy", "Confirmation Bias", "Optimism Bias"],
        missingConsiderations: [
          "Impact on current team morale",
          "Long-term maintenance costs",
          "Alternative market opportunities"
        ],
        reframingQuestions: [
          "If you started from scratch today, would you choose this path?",
          "What is the worst-case scenario you haven't accounted for?",
          "How would a competitor react to this decision?"
        ],
        reasoningScore: 68
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleAnalyze();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [decision]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#4ade80'; // Green
    if (score >= 50) return '#facc15'; // Yellow
    return '#f472b6'; // Pink
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Decision Dashboard</h1>
            <p className="text-slate-500">Analyze your thoughts and decide with confidence.</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
            JD
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card !p-6"
            >
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Brain size={20} />
                <h2 className="font-semibold text-lg text-slate-700">What's on your mind?</h2>
              </div>
              <textarea 
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="Describe your decision here... e.g., 'I am thinking about quitting my job to start a bakery business...'"
                className="w-full h-48 p-4 rounded-xl border border-blue-100 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Press CTRL + ENTER to analyze</span>
                <Tooltip title={!decision.trim() ? "Please describe your decision first" : "Analyze your decision"} arrow>
                  <span>
                    <button 
                      onClick={handleAnalyze}
                      disabled={!decision.trim() || isAnalyzing}
                      className="btn-primary flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <CircularProgress size={20} color="inherit" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <span>Analyze Decision</span>
                          <ChevronRight size={18} />
                        </>
                      )}
                    </button>
                  </span>
                </Tooltip>
              </div>
            </motion.div>

            {/* Skeleton UI / Loading State */}
            {isAnalyzing && (
              <div className="space-y-4">
                <div className="h-32 bg-slate-200/50 animate-pulse rounded-2xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-slate-200/50 animate-pulse rounded-2xl"></div>
                  <div className="h-40 bg-slate-200/50 animate-pulse rounded-2xl"></div>
                </div>
              </div>
            )}

            {/* Results Section */}
            <AnimatePresence>
              {result && !isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Summary Card */}
                  <div className="glass-card !p-6 border-l-4 border-blue-400">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Analysis Summary</h3>
                    <p className="text-slate-600 leading-relaxed">{result.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Biases */}
                    <div className="glass-card !p-6">
                      <div className="flex items-center gap-2 mb-4 text-pink-500">
                        <AlertTriangle size={18} />
                        <h3 className="font-bold text-slate-800">Detected Biases</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.biases.map((bias, i) => (
                          <span key={i} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
                            {bias}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Considerations */}
                    <div className="glass-card !p-6">
                      <div className="flex items-center gap-2 mb-4 text-green-500">
                        <Lightbulb size={18} />
                        <h3 className="font-bold text-slate-800">Missing Considerations</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.missingConsiderations.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Reframing Questions */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-700 ml-1">Reframing Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {result.reframingQuestions.map((q, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ y: -5 }}
                          className="bg-white/60 p-4 rounded-xl border border-white/40 shadow-sm"
                        >
                          <p className="text-sm text-slate-600 italic">"{q}"</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Reasoning Score */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card !p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Reasoning Score
                <Tooltip title="This score represents the logical strength and breadth of your decision considering potential biases.">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-[10px] flex items-center justify-center cursor-help text-slate-500">?</div>
                </Tooltip>
              </h3>
              
              <div className="flex flex-col items-center mb-8">
                <div className="relative flex items-center justify-center">
                  <CircularProgress 
                    variant="determinate" 
                    value={result ? result.reasoningScore : 0} 
                    size={120}
                    thickness={4}
                    sx={{ color: result ? getScoreColor(result.reasoningScore) : '#e2e8f0' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-700">{result ? result.reasoningScore : '--'}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Logic Depth</span>
                  <span>{result ? "High" : "--"}</span>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={result ? 85 : 0} 
                  sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#60a5fa' } }} 
                />

                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Bias Mitigation</span>
                  <span>{result ? "Medium" : "--"}</span>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={result ? 45 : 0} 
                  sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#f472b6' } }} 
                />
              </div>

              {result && (
                <button 
                  onClick={() => {
                    setDecision('');
                    setResult(null);
                  }}
                  className="mt-8 w-full py-3 px-4 rounded-xl border-2 border-dashed border-blue-200 text-blue-400 hover:text-blue-500 hover:border-blue-300 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <RefreshCw size={16} />
                  New Analysis
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <AIChatAssistant />
    </Layout>
  );
};

export default Dashboard;
