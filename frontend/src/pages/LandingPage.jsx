import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gem, Target, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden transition-colors duration-200">
      
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/5"></div>
      <div className="absolute top-1/3 right-1/10 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl dark:bg-yellow-500/5"></div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3.5 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-4 w-4" />
                <span>100% Vedic & Rule-Based Matchmaking</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl leading-tight">
                Unlock Your Destiny with{' '}
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  GemFinder Pro
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Discover the gemstones that align perfectly with your unique Zodiac profile, birth month, and financial budget. Supercharge your energy to achieve success in career, wealth, love, and health.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/recommend"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-7 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] hover:from-amber-600 hover:to-yellow-600 transition-all"
                >
                  Get Your Gemstone Recommendation
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-darkborder px-7 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkborder/50 transition-all"
                >
                  Create Free Account
                </Link>
              </div>
            </div>

            {/* Hero Visual Element */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative animate-float-slow">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-30 blur-2xl dark:opacity-20"></div>
                
                {/* Visual Card */}
                <div className="relative bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-8 rounded-3xl shadow-2xl max-w-sm flex flex-col items-center">
                  <div className="h-44 w-44 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/10 flex items-center justify-center border border-amber-500/30 mb-6">
                    <Gem className="h-24 w-24 text-amber-500 animate-pulse-slow" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">Celestial Alignment</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                    Every natural crystal holds precise vibration patterns that interact with your aura. GemFinder Pro decodes this cosmic correlation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features / Benefits Section */}
      <section className="py-20 bg-gray-100/50 dark:bg-darkcard/20 border-y border-gray-200 dark:border-darkborder">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Gemstone Alignment Matters
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Aligning gemstones with your energy vectors is an ancient practice that helps harmonize spiritual blockages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.01] space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Gem className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold dark:text-white">Rashi & Zodiac Synergy</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Matches the astrological planetary rulers of your Zodiac and birth month, targeting the cosmic forces that influence your life's path.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.01] space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold dark:text-white">Targeted Life Goals</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allows customizing recommendations to support your immediate goal: whether that is accumulating wealth, securing a job, or strengthening health.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.01] space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold dark:text-white">Detailed Care Guides</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive customized clean, store, and wear parameters for each gemstone. Preserves the mineral shine and long-term energetic charge.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discovering your gemstone takes less than a minute. Follow these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Steps Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 dark:bg-darkborder -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-white dark:bg-darkcard border-4 border-amber-500 flex items-center justify-center text-lg font-bold dark:text-white shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold dark:text-white">Provide Astrological Info</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Fill in your basic credentials, including Date of Birth, Zodiac sign, birth month, and financial budget range.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-white dark:bg-darkcard border-4 border-amber-500 flex items-center justify-center text-lg font-bold dark:text-white shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold dark:text-white">Rule-based scoring</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Our rule-based engine scores suitable gemstones based on direct astronomical alignments and price compatibility.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-white dark:bg-darkcard border-4 border-amber-500 flex items-center justify-center text-lg font-bold dark:text-white shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold dark:text-white">Get Recommendation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                View your gemstone with an extensive breakdown of physical color, benefits, cosmic reasons, and care manuals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-12 sm:px-12 sm:py-16 shadow-xl text-center text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
                Ready to Find Your Astrological Match?
              </h2>
              <p className="text-amber-100 max-w-xl mx-auto text-base">
                Sign up today to save your recommendation reports, access history logs, and unlock user dashboard privileges.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/recommend"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-amber-600 shadow-md hover:bg-gray-50 hover:scale-[1.02] transition-all"
                >
                  Start Recommendation Form
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl border border-white bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  Register Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
