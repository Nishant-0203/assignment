/**
 * Core recommendation engine for GemFinder Pro.
 * Evaluates candidates based on Zodiac Sign, Birth Month, Life Goal, and Budget.
 */

const evaluateRecommendation = (gemstones, inputs) => {
  const { name, zodiacSign, birthMonth, lifeGoal, budgetRange } = inputs;
  
  const results = gemstones.map((gem) => {
    let score = 0;
    const matches = {
      zodiac: false,
      birthMonth: false,
      lifeGoal: false,
      budget: false,
    };

    // 1. Zodiac Match (40 pts)
    if (gem.zodiacSigns && gem.zodiacSigns.some(z => z.toLowerCase() === zodiacSign.toLowerCase())) {
      score += 40;
      matches.zodiac = true;
    }

    // 2. Birth Month Match (30 pts)
    if (gem.birthMonths && gem.birthMonths.some(m => m.toLowerCase() === birthMonth.toLowerCase())) {
      score += 30;
      matches.birthMonth = true;
    }

    // 3. Life Goal Match (20 pts)
    if (gem.suitableGoals && gem.suitableGoals.some(g => g.toLowerCase() === lifeGoal.toLowerCase())) {
      score += 20;
      matches.lifeGoal = true;
    }

    // 4. Budget Match (10 pts)
    if (gem.priceRange && gem.priceRange === budgetRange) {
      score += 10;
      matches.budget = true;
    }

    // Generate custom reason sentences
    const reasonParts = [];
    if (matches.zodiac) {
      reasonParts.push(`acts as a powerful protector for your zodiac sign (${zodiacSign})`);
    }
    if (matches.birthMonth) {
      reasonParts.push(`resonates deeply with your birth month of ${birthMonth}`);
    }
    if (matches.lifeGoal) {
      reasonParts.push(`is traditionally believed to channel energies to aid in ${lifeGoal}`);
    }
    if (matches.budget) {
      reasonParts.push(`fits perfectly within your budget preference of ${budgetRange}`);
    }

    let recommendationReason = '';
    if (reasonParts.length > 0) {
      recommendationReason = `${gem.name} is recommended because it ` + 
        reasonParts.slice(0, -1).join(', ') + 
        (reasonParts.length > 1 ? ', and ' : '') + 
        reasonParts[reasonParts.length - 1] + '.';
    } else {
      recommendationReason = `We recommend ${gem.name} to balance your spiritual and emotional energies.`;
    }

    return {
      gemstone: gem,
      score,
      recommendationReason,
    };
  });

  // Sort by score descending. If score is equal, prioritize Zodiac Match, then any match.
  results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie-breaker: Zodiac match priority
    const aZodiac = a.gemstone.zodiacSigns.some(z => z.toLowerCase() === zodiacSign.toLowerCase());
    const bZodiac = b.gemstone.zodiacSigns.some(z => z.toLowerCase() === zodiacSign.toLowerCase());
    if (aZodiac && !bZodiac) return -1;
    if (!aZodiac && bZodiac) return 1;
    return 0;
  });

  return results[0]; // Return the highest matching score recommendation details
};

module.exports = {
  evaluateRecommendation,
};
