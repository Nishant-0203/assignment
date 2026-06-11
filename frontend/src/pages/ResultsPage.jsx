import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Calendar, Target, IndianRupee, Heart, ShieldAlert, ArrowLeft, RefreshCw, LogIn } from 'lucide-react';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const stateData = location.state;
  const result = stateData?.result;
  const inputs = stateData?.searchInputs;

  // Redirect to form if no state data is present
  useEffect(() => {
    if (!result) {
      navigate('/recommend');
    }
  }, [result, navigate]);

  if (!result) return null;

  const { recommendedGemstone, score, recommendationReason, saved } = result;

  const getGlowClass = (gemName) => {
    const name = gemName.toLowerCase();
    if (name.includes('ruby') || name.includes('coral')) return 'glow-ruby';
    if (name.includes('emerald')) return 'glow-emerald';
    if (name.includes('sapphire') && name.includes('blue')) return 'glow-sapphire';
    if (name.includes('sapphire') && name.includes('yellow')) return 'glow-gold';
    if (name.includes('citrine')) return 'glow-gold';
    if (name.includes('amethyst')) return 'glow-amethyst';
    return 'shadow-xl';
  };

  const getThemeColor = (gemName) => {
    const name = gemName.toLowerCase();
    if (name.includes('ruby') || name.includes('coral')) return 'from-rose-500 to-red-600 text-red-500';
    if (name.includes('emerald')) return 'from-emerald-500 to-green-600 text-green-500';
    if (name.includes('sapphire') && name.includes('blue')) return 'from-blue-600 to-indigo-700 text-blue-500';
    if (name.includes('sapphire') && name.includes('yellow')) return 'from-amber-400 to-yellow-500 text-amber-500';
    if (name.includes('citrine')) return 'from-yellow-400 to-amber-500 text-amber-500';
    if (name.includes('amethyst')) return 'from-purple-500 to-violet-600 text-purple-500';
    return 'from-gray-700 to-gray-900 text-gray-700';
  };

  const gradientClass = getThemeColor(recommendedGemstone.name).split(' ')[0] + ' ' + getThemeColor(recommendedGemstone.name).split(' ')[1];
  const colorText = getThemeColor(recommendedGemstone.name).split(' ')[2];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/recommend"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questionnaire
        </Link>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Evaluated on {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Main Results Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Image Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`relative w-full overflow-hidden rounded-3xl bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-4 ${getGlowClass(recommendedGemstone.name)} transition-all duration-300`}>
            
            {/* Glowing background halo */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none"></div>

            {/* Large Image */}
            <img
              src={recommendedGemstone.image || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600'}
              alt={recommendedGemstone.name}
              className="h-80 w-full object-cover rounded-2xl shadow-inner hover:scale-[1.03] transition-all duration-300"
            />
            
            {/* Gem Spec Panel */}
            <div className="mt-4 flex justify-between items-center px-2">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Color Variant</span>
                <h4 className="text-base font-bold dark:text-white capitalize">{recommendedGemstone.color}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Class Type</span>
                <h4 className="text-base font-bold dark:text-white">Natural Mineral</h4>
              </div>
            </div>
          </div>

          {/* User Input summary tag */}
          {inputs && (
            <div className="w-full mt-4 bg-gray-100 dark:bg-darkcard/50 border border-gray-200 dark:border-darkborder/50 p-4 rounded-2xl text-xs space-y-2">
              <h5 className="font-bold text-gray-500 uppercase tracking-wider">Search Parameters Log</h5>
              <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                <div>Name: <span className="font-semibold text-gray-900 dark:text-white">{inputs.name}</span></div>
                <div>Zodiac: <span className="font-semibold text-gray-900 dark:text-white">{inputs.zodiacSign}</span></div>
                <div>Birth Month: <span className="font-semibold text-gray-900 dark:text-white">{inputs.birthMonth}</span></div>
                <div>Life Goal: <span className="font-semibold text-gray-900 dark:text-white">{inputs.lifeGoal}</span></div>
                <div className="col-span-2">Budget: <span className="font-semibold text-gray-900 dark:text-white">{inputs.budgetRange}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Content details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Panel */}
          <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Celestial Match Recommendation</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {recommendedGemstone.name}
                </h1>
              </div>
              
              {/* Compatibility Score */}
              <div className="text-center bg-gray-50 dark:bg-darkborder/30 border border-gray-200 dark:border-darkborder px-4 py-2.5 rounded-2xl">
                <span className="text-xs font-bold text-gray-500 uppercase">Match Score</span>
                <h3 className="text-2xl font-black text-amber-500">{score}%</h3>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-darkborder/50 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-1000`}
                style={{ width: `${score}%` }}
              ></div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {recommendedGemstone.description}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Heart className="h-5 w-5 text-red-500" />
              Astrological Benefits & Vibrations
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendedGemstone.benefits.map((benefit, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-darkborder/30 p-3 rounded-xl border border-gray-100 dark:border-transparent">
                  <span className={`font-bold ${colorText}`}>✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engine Reason & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Reason Box */}
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 rounded-3xl space-y-2.5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Astrological Reason</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
                {recommendationReason}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 rounded-3xl space-y-2 text-center flex flex-col justify-center items-center shadow-sm">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Estimated Price Class</h4>
              <div className="flex items-center gap-1 text-2xl font-black text-amber-500 my-1">
                <IndianRupee className="h-6 w-6" />
                <span>{recommendedGemstone.priceRange}</span>
              </div>
              <span className="text-xs text-gray-400">Based on standard market indices for raw cuts.</span>
            </div>

          </div>

          {/* Care Guidelines */}
          {recommendedGemstone.careInstructions && (
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-6 rounded-3xl space-y-2.5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
                Care & Maintenance Rules
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {recommendedGemstone.careInstructions}
              </p>
            </div>
          )}

          {/* Saved Status Notification Box */}
          <div className="border border-dashed border-gray-300 dark:border-darkborder p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-gray-50/50 dark:bg-darkcard/20">
            {saved ? (
              <div>
                <h4 className="text-sm font-bold text-green-600 dark:text-green-400">✓ Recommendation Saved</h4>
                <p className="text-xs text-gray-500 mt-0.5">This query report is registered. You can review it inside My History.</p>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-bold text-amber-600 dark:text-amber-500">Guest Recommendation Report</h4>
                <p className="text-xs text-gray-500 mt-0.5">This report is not recorded. Create an account or log in to store reports!</p>
              </div>
            )}

            <div className="flex gap-2">
              {saved ? (
                <Link
                  to="/history"
                  className="rounded-xl bg-gray-100 dark:bg-darkborder hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 transition-all"
                >
                  View My History
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all"
                >
                  <LogIn className="h-3 w-3" />
                  Sign In to Save
                </Link>
              )}
              <Link
                to="/recommend"
                className="inline-flex items-center gap-1 rounded-xl border border-gray-300 dark:border-darkborder px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkborder/50 transition-all"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
