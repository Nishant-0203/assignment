const Gemstone = require('../models/Gemstone');
const User = require('../models/User');

const defaultGemstones = [
  {
    name: 'Ruby (Manik)',
    zodiacSigns: ['Aries', 'Leo'],
    birthMonths: ['July'],
    suitableGoals: ['Career', 'Confidence', 'Health'],
    description: 'A glowing red gemstone symbolizing passion, power, and courage. Known as the king of gemstones, Ruby represents the sun and channels vibrant, leadership-focused solar energy.',
    benefits: [
      'Boosts self-confidence and authority',
      'Fosters leadership traits and career success',
      'Improves cardiovascular strength and blood circulation',
      'Dispels depression and brings positive motivation'
    ],
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Above ₹10000',
    careInstructions: 'Clean gently using a soft toothbrush and warm, soapy water. Avoid steam cleaners and harsh chemical exposure.'
  },
  {
    name: 'Emerald (Panna)',
    zodiacSigns: ['Taurus', 'Gemini', 'Virgo'],
    birthMonths: ['May'],
    suitableGoals: ['Education', 'Career', 'Wealth'],
    description: 'A gorgeous bright green gem representing Mercury. Emerald promotes wisdom, intellect, and memory, and is highly sought after by students, professionals, and writers.',
    benefits: [
      'Sharpen intellect, memory, and concentration',
      'Enhances public speaking and articulation skills',
      'Attracts commercial success and financial opportunities',
      'Relieves stress and brings mental tranquility'
    ],
    color: 'Green',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600',
    priceRange: '₹5000–₹10000',
    careInstructions: 'Wipe with a soft microfibre cloth. Never place in ultrasonic cleaners or expose to high heat as it can damage its oils.'
  },
  {
    name: 'Pearl (Moti)',
    zodiacSigns: ['Cancer'],
    birthMonths: ['June'],
    suitableGoals: ['Love', 'Health', 'Spiritual Growth'],
    description: 'A serene white organic gemstone formed inside oysters. Ruled by the Moon, Pearl controls emotional stability, love, and mental calmness.',
    benefits: [
      'Soothes anger and calms erratic emotions',
      'Fosters peaceful and harmonious romantic relations',
      'Helps maintain fluid balance and treats sleep issues',
      'Enhances maternal instincts and inner peace'
    ],
    color: 'White',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600',
    priceRange: '₹1000–₹5000',
    careInstructions: 'Pearls are sensitive to chemicals. Put them on AFTER applying perfumes or cosmetics. Clean with a damp cloth.'
  },
  {
    name: 'Diamond (Heera)',
    zodiacSigns: ['Libra'],
    birthMonths: ['April'],
    suitableGoals: ['Love', 'Wealth', 'Career'],
    description: 'The hardest known substance, reflecting pure luxury and beauty. Ruled by Venus, Diamond attracts wealth, romance, artistic skills, and premium quality of life.',
    benefits: [
      'Attracts wealth, prosperity, and premium luxuries',
      'Enhances creative intelligence and artistic expression',
      'Improves relationship intimacy and marital bliss',
      'Fosters vitality and removes feelings of self-doubt'
    ],
    color: 'Colorless',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Above ₹10000',
    careInstructions: 'Clean with warm water and a drop of dish soap using a soft brush. Keep separated from other stones to avoid scratches.'
  },
  {
    name: 'Red Coral (Moonga)',
    zodiacSigns: ['Scorpio', 'Aries'],
    birthMonths: ['October'],
    suitableGoals: ['Health', 'Confidence', 'Career'],
    description: 'A semi-precious deep red gemstone formed in deep waters. Representing Mars, Red Coral infuses the wearer with tremendous energy, physical strength, and courage.',
    benefits: [
      'Overcomes administrative and professional obstacles',
      'Cures lethargy and boosts physical stamina',
      'Fosters confidence and victory over competitors',
      'Helps alleviate bone, muscle, and blood-related issues'
    ],
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    priceRange: '₹1000–₹5000',
    careInstructions: 'Corals are porous and soft. Clean only with warm soapy water and a soft cloth. Keep away from household cleaners.'
  },
  {
    name: 'Yellow Sapphire (Pukhraj)',
    zodiacSigns: ['Sagittarius', 'Pisces'],
    birthMonths: ['November'],
    suitableGoals: ['Wealth', 'Education', 'Spiritual Growth'],
    description: 'A brilliant yellow sapphire representing Jupiter, the planet of wisdom. It is highly valued for bringing sound judgment, spiritual connection, and immense fortune.',
    benefits: [
      'Brings extraordinary luck, wealth, and commercial success',
      'Enhances philosophical knowledge and spiritual maturity',
      'Aids in academics and high-level educational success',
      'Promotes liver health and general body immunity'
    ],
    color: 'Yellow',
    image: 'https://images.unsplash.com/photo-1615655096345-61a54750068d?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Above ₹10000',
    careInstructions: 'Soak in warm soapy water for a few minutes and gently scrub with a soft-bristled toothbrush to maintain its shine.'
  },
  {
    name: 'Blue Sapphire (Neelam)',
    zodiacSigns: ['Capricorn', 'Aquarius'],
    birthMonths: ['September'],
    suitableGoals: ['Career', 'Wealth', 'Health'],
    description: 'A striking royal blue gemstone ruled by Saturn. Renowned for its rapid results, Blue Sapphire protects wearers and channels extreme focus, professional success, and discipline.',
    benefits: [
      'Brings extremely fast growth in career and businesses',
      'Protects against theft, accidents, and negative forces',
      'Clears confusion and brings razor-sharp decision-making capability',
      'Alleviates nerve pain, arthritis, and chronic fatigue'
    ],
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Above ₹10000',
    careInstructions: 'Safe to clean with warm soapy water. Avoid exposure to high heat and direct chemical cleaners.'
  },
  {
    name: 'Amethyst (Jamunia)',
    zodiacSigns: ['Aquarius', 'Pisces'],
    birthMonths: ['February'],
    suitableGoals: ['Spiritual Growth', 'Health', 'Love'],
    description: 'A mesmerizing violet quartz that channels soothing energies. Ideal for stress relief, meditation, and raising spiritual consciousness.',
    benefits: [
      'Soothes stress and alleviates anxiety and insomnia',
      'Deepens meditation practices and triggers intuition',
      'Protects against psychic attacks and bad dreams',
      'Helps overcome addictions and cleanses negative habits'
    ],
    color: 'Purple',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Below ₹1000',
    careInstructions: 'Keep out of direct sunlight for long durations as it can fade the purple hue. Clean with lukewarm water.'
  },
  {
    name: 'Garnet (Raktamani)',
    zodiacSigns: ['Capricorn', 'Aries'],
    birthMonths: ['January'],
    suitableGoals: ['Health', 'Confidence', 'Love'],
    description: 'A deep crimson crystal that instills high energy, physical vitality, and safety. A great protective stone that grounds energies and fuels passion.',
    benefits: [
      'Invigorates physical energy, metabolic speed, and libido',
      'Dispels dark feelings, fear, and boosts self-worth',
      'Ignites romantic commitment, love, and emotional loyalty',
      'Protects the wearer during travels and journeys'
    ],
    color: 'Dark Red',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Below ₹1000',
    careInstructions: 'Clean with warm soapy water. Garnets are durable but can be damaged by sudden thermal changes.'
  },
  {
    name: 'Aquamarine',
    zodiacSigns: ['Pisces', 'Libra'],
    birthMonths: ['March'],
    suitableGoals: ['Health', 'Love', 'Education'],
    description: 'A beautiful sea-blue gemstone that reflects calmness, clarity of communication, and absolute truth. Widely used to calm hyperactive minds.',
    benefits: [
      'Brings deep emotional cooling and releases stress',
      'Promotes clear, logical communication and speech skills',
      'Encourages empathy, understanding, and trust in partnerships',
      'Soothes sore throats, swollen glands, and thyroid issues'
    ],
    color: 'Light Blue',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    priceRange: '₹1000–₹5000',
    careInstructions: 'Very durable. Wash with mild soap and warm water. Store away from diamonds to prevent scratches.'
  },
  {
    name: 'Opal',
    zodiacSigns: ['Libra', 'Taurus'],
    birthMonths: ['October'],
    suitableGoals: ['Love', 'Wealth', 'Confidence'],
    description: 'A magical gemstone reflecting a play-of-color. Opal represents art, beauty, and emotional expression, helping wearers feel and project aesthetic brilliance.',
    benefits: [
      'Amplifies artistic talents, creativity, and self-expression',
      'Attracts luxurious items, wealth, and legal successes',
      'Brings intense romance, affection, and happiness in marriage',
      'Boosts skin health and balances endocrine hormones'
    ],
    color: 'Multicolor',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600',
    priceRange: '₹5000–₹10000',
    careInstructions: 'Opals contain water. Avoid extremely dry environments, hot blow-dryers, and ultrasonic cleaners. Clean only with warm soapy water.'
  },
  {
    name: 'Citrine (Sunela)',
    zodiacSigns: ['Sagittarius', 'Leo'],
    birthMonths: ['November'],
    suitableGoals: ['Wealth', 'Confidence', 'Career'],
    description: 'The golden crystal of manifestation and abundance. Famously called the "Merchant\'s Stone," Citrine holds no negative energy and works continuously to bring positivity.',
    benefits: [
      'Magnetizes financial prosperity and business profits',
      'Enhances stamina, will-power, and inner solar plexus energy',
      'Disseminates joy, optimism, and warm creative confidence',
      'Supports healthy digestion and detoxification processes'
    ],
    color: 'Yellow',
    image: 'https://images.unsplash.com/photo-1615655096345-61a54750068d?auto=format&fit=crop&q=80&w=600',
    priceRange: 'Below ₹1000',
    careInstructions: 'Wipe down with a damp cloth. Citrine is sturdy, but prolonged strong heat may fade its rich yellow color.'
  }
];

const seedData = async () => {
  try {
    // 1. Seed Gemstones
    const gemCount = await Gemstone.countDocuments({});
    if (gemCount === 0) {
      console.log('Seeding default gemstones...');
      await Gemstone.insertMany(defaultGemstones);
      console.log('Gemstones successfully seeded!');
    } else {
      console.log('Gemstones already exist. Seeding skipped.');
    }

    // 2. Seed Users
    const userCount = await User.countDocuments({});
    if (userCount === 0) {
      console.log('Seeding default accounts...');
      
      // Admin Account
      await User.create({
        name: 'Admin User',
        email: 'admin@gemfinder.com',
        password: 'adminpassword123',
        role: 'admin',
      });

      // Regular User Account
      await User.create({
        name: 'John Doe',
        email: 'user@gemfinder.com',
        password: 'userpassword123',
        role: 'user',
      });

      console.log('Demo user and admin accounts successfully seeded!');
      console.log('--- DEFAULT CREDENTIALS ---');
      console.log('Admin: admin@gemfinder.com / adminpassword123');
      console.log('User:  user@gemfinder.com / userpassword123');
      console.log('---------------------------');
    } else {
      console.log('Users already exist. User seeding skipped.');
    }
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  }
};

module.exports = seedData;
