import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, Target, IndianRupee, Sparkles, ChevronDown, ChevronUp, Loader2, BookOpen } from 'lucide-react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/api/recommend/history');
        if (data.success) {
          setHistory(data.data);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to retrieve history logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const loadDetailedResult = (item) => {
    // Reconstruct results parameter map and navigate to results page
    const mockResult = {
      recommendedGemstone: item.gemstoneId,
      score: calculateMockScore(item.inputs, item.gemstoneId),
      recommendationReason: item.recommendationReason,
      saved: true,
      recommendationId: item._id,
    };
    navigate('/results', { state: { result: mockResult, searchInputs: item.inputs } });
  };

  // Helper to calculate score for mock result mapping on history load
  const calculateMockScore = (inputs, gem) => {
    let score = 0;
    if (gem.zodiacSigns.some(z => z.toLowerCase() === inputs.zodiacSign.toLowerCase())) score += 40;
    if (gem.birthMonths.some(m => m.toLowerCase() === inputs.birthMonth.toLowerCase())) score += 30;
    if (gem.suitableGoals.some(g => g.toLowerCase() === inputs.lifeGoal.toLowerCase())) score += 20;
    if (gem.priceRange === inputs.budgetRange) score += 10;
    return score || 70; // Fallback to 70% if empty
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
          <p className="text-sm text-gray-500">Retrieving celestial history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Gemstone History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review your previous gemstone mappings and cosmic alignment details.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div className="border border-dashed border-gray-300 dark:border-darkborder rounded-3xl p-12 text-center bg-white dark:bg-darkcard space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold dark:text-white">No history records found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              You haven't requested any gemstone recommendations while logged in yet. Try out the questionnaire now!
            </p>
          </div>
          <button
            onClick={() => navigate('/recommend')}
            className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-amber-600 transition-all"
          >
            Get Recommendation
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const isExpanded = expandedId === item._id;
            const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div
                key={item._id}
                className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                
                {/* Collapsed Top Header */}
                <div
                  onClick={() => toggleExpand(item._id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.gemstoneId?.image || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=150'}
                      alt={item.gemstoneId?.name || 'Gemstone'}
                      className="h-12 w-12 object-cover rounded-xl border border-gray-200 dark:border-darkborder"
                    />
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {item.gemstoneId?.name || 'Unknown Gemstone'}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Mapped on {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block rounded-xl bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                      {item.inputs.zodiacSign}
                    </span>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>

                {/* Expanded Details body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-darkborder/50 bg-gray-50/50 dark:bg-darkbg/20 space-y-4 animate-in slide-in-from-top-1 duration-200">
                    
                    {/* Inputs panel */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-white dark:bg-darkcard border border-gray-200/60 dark:border-darkborder p-4 rounded-xl">
                      <div>
                        <span className="block text-gray-400 font-bold uppercase">Name</span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.inputs.name}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase flex items-center gap-0.5">
                          <Calendar className="h-3 w-3" /> DOB
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.inputs.dob || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase flex items-center gap-0.5">
                          <Target className="h-3 w-3" /> Life Goal
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.inputs.lifeGoal}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase flex items-center gap-0.5">
                          <IndianRupee className="h-3 w-3" /> Budget
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.inputs.budgetRange}</span>
                      </div>
                    </div>

                    {/* Recommendation Reason */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Astrological Reason</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                        "{item.recommendationReason}"
                      </p>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => loadDetailedResult(item)}
                        className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-500 transition-all"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        View Full Details Report
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default HistoryPage;
