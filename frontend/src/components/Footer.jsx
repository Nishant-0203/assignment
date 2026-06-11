import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-darkbg dark:border-darkborder transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md">
                <Gem className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-extrabold tracking-tight dark:text-white">
                GemFinder<span className="font-light text-amber-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Discover your ideal Vedic and astronomical gemstones. Our intelligent scoring engine maps your zodiac, birth month, and life goals to premium natural stones to bring prosperity, health, and harmony.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/recommend" className="text-sm text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors">
                  Get Recommended Gem
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Vedic Astrology
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-1">
                <span>Rashi & Planetary Energies</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Goal-based Crystals</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Gemstone Care Guides</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-darkborder mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {currentYear} GemFinder Pro. All rights reserved. Designed for spiritual growth, prosperity, and wellness.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
            <span>Disclaimer: Gemstone recommendations are based on traditional Vedic beliefs. Individual results may vary.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
