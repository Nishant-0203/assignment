import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Sparkles, Calendar, Target, IndianRupee, ArrowRight, ArrowLeft, Loader2, Info } from 'lucide-react';

const ZODIACS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const GOALS = [
  { value: 'Wealth', label: 'Wealth & Prosperity', description: 'Attract financial stability and business growth' },
  { value: 'Career', label: 'Career & Success', description: 'Enhance professional opportunities and authority' },
  { value: 'Love', label: 'Love & Relationships', description: 'Foster marital harmony and attract romance' },
  { value: 'Health', label: 'Health & Vitality', description: 'Improve physical strength and resolve long-standing issues' },
  { value: 'Confidence', label: 'Confidence & Courage', description: 'Alleviate fear, shyness, and project leadership' },
  { value: 'Education', label: 'Education & Intellect', description: 'Sharpen public speaking, memory, and study focus' },
  { value: 'Spiritual Growth', label: 'Spiritual Growth & Peace', description: 'Promote deep meditation and calm mental anxiety' }
];

const BUDGETS = [
  { value: 'Below ₹1000', label: 'Budget Range', detail: 'Below ₹1,000 (Substitutes like Amethyst/Garnet)' },
  { value: '₹1000–₹5000', label: 'Standard Range', detail: '₹1,000 – ₹5,000 (Pearl, Coral, Aquamarine)' },
  { value: '₹5000–₹10000', label: 'Premium Range', detail: '₹5,000 – ₹10,000 (Emerald, Opal)' },
  { value: 'Above ₹10000', label: 'Luxury Gems', detail: 'Above ₹10,000 (Ruby, Sapphire, Diamond)' }
];

const RecommendForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [dob, setDob] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [lifeGoal, setLifeGoal] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill user name if logged in
  useEffect(() => {
    if (user?.name && !name) {
      setName(user.name);
    }
  }, [user, name]);

  // Helper: Get Zodiac Sign & Month from DOB
  const calculateZodiacAndMonth = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth(); // 0-indexed
    
    // Set birth month automatically
    setBirthMonth(MONTHS[monthIndex]);

    // Calculate zodiac sign
    let zodiac = '';
    const month = monthIndex + 1; // 1-indexed

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = 'Aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = 'Taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = 'Gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = 'Cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = 'Leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = 'Virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = 'Libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = 'Scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = 'Sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = 'Capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = 'Aquarius';
    else zodiac = 'Pisces';

    setZodiacSign(zodiac);
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);
    calculateZodiacAndMonth(value);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!name) {
        setError('Please enter your name');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!zodiacSign || !birthMonth) {
        setError('Please select Zodiac Sign and Birth Month');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lifeGoal || !budgetRange) {
      setError('Please select your Life Goal and Budget Preference');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/recommend', {
        name,
        dob,
        zodiacSign,
        birthMonth,
        lifeGoal,
        budgetRange
      });

      if (response.data.success) {
        // Send recommendation result to results page
        navigate('/results', { state: { result: response.data.data, searchInputs: { name, dob, zodiacSign, birthMonth, lifeGoal, budgetRange } } });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate gemstone. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-3xl shadow-xl overflow-hidden transition-colors duration-200">
        
        {/* Header banner */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6 sm:p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Gemstone Compatibility Form</h2>
            <p className="text-amber-100 text-sm mt-1">Provide your credentials to discover your celestial match.</p>
          </div>
          <Sparkles className="h-10 w-10 text-white/40 shrink-0 hidden sm:block animate-pulse-slow" />
        </div>

        {/* Multi-step progress tracker */}
        <div className="flex border-b border-gray-200 dark:border-darkborder bg-gray-50/50 dark:bg-darkbg/50 px-6 py-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center justify-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 dark:bg-darkborder text-gray-400 dark:text-gray-500'
                }`}
              >
                {s}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  step >= s ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {s === 1 ? 'Personal Details' : s === 2 ? 'Astrological Factors' : 'Destiny & Budget'}
              </span>
              {s < 3 && <div className="h-0.5 w-1/4 bg-gray-200 dark:bg-darkborder mx-2 hidden sm:block"></div>}
            </div>
          ))}
        </div>

        {/* Form area */}
        <div className="p-6 sm:p-10 space-y-6">
          
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-500 border border-red-500/20">
              <Info className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="h-4.5 w-4.5 text-gray-400" />
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={handleDobChange}
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-darkborder bg-transparent rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                  />
                  {dob && (
                    <p className="text-xs text-amber-500 font-semibold mt-1">
                      ℹ️ Magically derived Zodiac and Birth Month from DOB. You can review them in the next step.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Astrological Factors */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Zodiac Sign Selection */}
                <div>
                  <label htmlFor="zodiac" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Zodiac Sign (Rashi) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="zodiac"
                    value={zodiacSign}
                    onChange={(e) => setZodiacSign(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-darkborder bg-white dark:bg-darkcard rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                  >
                    <option value="">-- Select Zodiac --</option>
                    {ZODIACS.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                {/* Birth Month Selection */}
                <div>
                  <label htmlFor="month" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Birth Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="month"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-darkborder bg-white dark:bg-darkcard rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                  >
                    <option value="">-- Select Month --</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Destiny & Budget */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Life Goal Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                  <Target className="h-4.5 w-4.5 text-gray-400" />
                  Select Your Primary Life Goal <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.value}
                      type="button"
                      onClick={() => setLifeGoal(goal.value)}
                      className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                        lifeGoal === goal.value
                          ? 'bg-amber-500/10 border-amber-500 text-gray-900 dark:text-white ring-2 ring-amber-500/20'
                          : 'border-gray-200 dark:border-darkborder text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-darkborder/30'
                      }`}
                    >
                      <span className="font-bold text-sm dark:text-white">{goal.label}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">{goal.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                  <IndianRupee className="h-4.5 w-4.5 text-gray-400" />
                  Select Budget Range <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BUDGETS.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setBudgetRange(budget.value)}
                      className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                        budgetRange === budget.value
                          ? 'bg-amber-500/10 border-amber-500 text-gray-900 dark:text-white ring-2 ring-amber-500/20'
                          : 'border-gray-200 dark:border-darkborder text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-darkborder/30'
                      }`}
                    >
                      <span className="font-bold text-sm dark:text-white">{budget.value}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">{budget.detail}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-darkborder">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-darkborder px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkborder/50 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div></div> // Empty div for flex justification
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-amber-600 transition-all"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Evaluating Crystals...
                  </>
                ) : (
                  <>
                    Find My Gemstone
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecommendForm;
