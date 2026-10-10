import { Coach } from '../types';

export const OFFICIAL_COACHES: Coach[] = [
  {
    id: "coach_1",
    realName: "Ted Lasso",
    name: "Ted Mustache",
    difficulty: "Tutorial (Easy)",
    level: 1,
    tacticDescription: "Plays randomly. Perfect for learning the game rules and a relaxed start.",
    avatarBg: "from-yellow-400 to-amber-600",
    emoji: "🥸",
    image: "/treneri/Ted Lasso.webp",
    quotes: {
      start: "Tie up those laces fellas, football is a beautiful game! Believe in miracles!",
      winRound: "I just love that enthusiasm! Way to go, team!",
      loseRound: "No worries, be like a goldfish – forget the loss in 10 seconds!",
      doubleUp: "Hey, you played that as a tandem! Outstanding team spirit!",
      shootout: "Penalties! My heart is skipping beats with excitement!",
      matchWin: "Football brought us together! Thanks for a great match!",
      matchLose: "You are a true champion! Hearty congratulations!"
    }
  },
  {
    id: "coach_2",
    realName: "Jose Businho",
    name: "Special Bus",
    difficulty: "Groups (Medium)",
    level: 2,
    tacticDescription: "Defensive tactics (prefers DEF cards). Master of 'parking the bus'.",
    avatarBg: "from-slate-700 to-slate-950",
    emoji: "🤫",
    image: "/treneri/Mourinho.webp",
    quotes: {
      start: "I am not one of many, I am a Special One. Possession doesn't interest me.",
      winRound: "Tactics are everything. Six players defending in the penalty box.",
      loseRound: "The referee made a mistake! This is a conspiracy against my team!",
      doubleUp: "Where is VAR?! How is this combo move allowed?!",
      shootout: "Penalties are a complete lottery, but my goalkeepers know all the tricks.",
      matchWin: "The score is 1:0. The bus has been successfully parked.",
      matchLose: "You got lucky. I still have trophies in my cabinet."
    }
  },
  {
    id: "coach_3",
    realName: "Jurgen Kloppo",
    name: "Giga Smile Kloppo",
    difficulty: "Quarterfinals (Medium)",
    level: 3,
    tacticDescription: "Gegenpressing aggression! Picks highest Rating cards right from the start.",
    avatarBg: "from-red-600 to-rose-950",
    emoji: "😁",
    image: "/treneri/Klop.webp",
    quotes: {
      start: "BOOM! I want heavy-metal football! We run until our legs give out!",
      winRound: "YES! That's the tempo I adore! Shut down the opponent!",
      loseRound: "The wind at the stadium was too strong today, we move on stronger!",
      doubleUp: "Unbelievable! Excellent counter-pressing on your part!",
      shootout: "This is dramatic! The fans are roaring from the stands!",
      matchWin: "What a spectacle! I love these boys!",
      matchLose: "Deserved! Your team was flying on the pitch today!"
    }
  },
  {
    id: "coach_4",
    realName: "Don Carlo",
    name: "Mr. Eyebrow",
    difficulty: "Semifinals (Hard)",
    level: 4,
    tacticDescription: "Looks for Brazilian (BRA) and Spanish (ESP) synergies. Calmest in high drama.",
    avatarBg: "from-blue-800 to-indigo-950",
    emoji: "🤨",
    image: "/treneri/Ancelotti.webp",
    quotes: {
      start: "*Left eyebrow raised* Chewing gum in, Champions League in DNA.",
      winRound: "Elegance and individual quality settle the duel.",
      loseRound: "No panic. The match lasts 90 minutes.",
      doubleUp: "Interesting move. But we have a deeper bench.",
      shootout: "Penalties in Madrid? We were born for these moments.",
      matchWin: "Another title. Thanks to the players for their composure.",
      matchLose: "Congratulations. Sometimes football brings surprises."
    }
  },
  {
    id: "coach_5",
    realName: "Pep Guardiola",
    name: "Professor Baldy",
    difficulty: "Final (Very Hard)",
    level: 5,
    tacticDescription: "Absolute genius! Saves strongest cards for the finish and plays Double Up perfectly.",
    avatarBg: "from-sky-500 to-blue-900",
    emoji: "🧠",
    image: "/treneri/Gvardiola.webp",
    quotes: {
      start: "I want 1000 passes before shooting! Space is alive, rotate full-backs into midfield!",
      winRound: "That's the geometry of space we practiced in training!",
      loseRound: "We must analyze this pass angle, it was short by 2 centimeters.",
      doubleUp: "Aha! You applied an inverted triangle in the center! Genius!",
      shootout: "Statistics say goalkeepers dive left in 54% of cases.",
      matchWin: "This team is a masterpiece of modern positional football.",
      matchLose: "You are an amazing tactician. Tonight you outsmarted even me."
    }
  },
  {
    id: "coach_6",
    realName: "Hansi Flick",
    name: "Fast Flick",
    difficulty: "Elite Groups (Hard)",
    level: 6,
    tacticDescription: "Offensive pressing! Plays aggressively and forces ATT cards for quick goals.",
    avatarBg: "from-amber-600 to-red-800",
    emoji: "🥶",
    image: "/treneri/flick.webp",
    quotes: {
      start: "Fast transition, high press! I want a goal in the first 5 seconds!",
      winRound: "That's it! The pressure paid off, pure offensive class!",
      loseRound: "We forgot our defensive line. We must recover faster!",
      doubleUp: "Wow, what a combination! That's what you call a blitzkrieg!",
      shootout: "Penalties? Concentration boys, shoot hard under the crossbar!",
      matchWin: "Perfect execution. Our pressing destroyed the opponent!",
      matchLose: "Congrats, your attack was faster than our pressing."
    }
  },
  {
    id: "coach_7",
    realName: "Diego Cholo",
    name: "Cholo Warrior",
    difficulty: "Cholo Style (Aggressive)",
    level: 7,
    tacticDescription: "Iron defense! Picks best DEF cards and counterattacks relentlessly.",
    avatarBg: "from-zinc-800 to-black",
    emoji: "🖤",
    image: "/treneri/Simeone.webp",
    quotes: {
      start: "No surrender! Fight for every blade of grass on the pitch!",
      winRound: "That's a fight! Defense is the foundation of every great victory!",
      loseRound: "Where was the block?! We can't leave this much open space!",
      doubleUp: "This is zonal defense! Double block on the ball!",
      shootout: "Now we see character! Brave and manly in penalties!",
      matchWin: "Pure victory of character and tactics. We conceded zero goals!",
      matchLose: "Today you were hungrier for victory. Hats off to your fighting spirit."
    }
  },
  {
    id: "coach_8",
    realName: "Luis Enrique",
    name: "Lucho Streamer",
    difficulty: "Tiki-Taka (Hard)",
    level: 8,
    tacticDescription: "Possession and control in midfield. Saves MID cards and looks for Double Up synergies.",
    avatarBg: "from-emerald-700 to-slate-900",
    emoji: "🤳",
    image: "/treneri/Enrike.webp",
    quotes: {
      start: "We have the ball, we control destiny! Hello to my stream!",
      winRound: "Over 30 passes before the goal! That's tiki-taka perfection!",
      loseRound: "Losing possession cost us dearly. We must control the tempo better!",
      doubleUp: "What a sublime triangle in the middle! Streamers, did you see this?!",
      shootout: "Penalties are a test of calmness. Inhale deeply and choose a corner.",
      matchWin: "Absolute dominance through possession. Thanks to everyone who watched us!",
      matchLose: "Deserved win. Today your direct football defeated my possession game."
    }
  },
  {
    id: "coach_9",
    realName: "Thomas Tuchel",
    name: "Tuchel System",
    difficulty: "Systematic (Expert)",
    level: 9,
    tacticDescription: "Surgically precise tactics! Reacts to your moves with mathematical precision.",
    avatarBg: "from-indigo-900 to-zinc-950",
    emoji: "📐",
    image: "/treneri/Tuchel.webp",
    quotes: {
      start: "Every detail is planned. Our tactical system is flawless.",
      winRound: "The system works exactly as designed. Spotless!",
      loseRound: "This was an anomaly in the structure. I must correct the formation immediately.",
      doubleUp: "Interesting move. But my system adapts rapidly!",
      shootout: "We analyzed all your penalties. We know where you'll shoot.",
      matchWin: "Mathematically precise victory. Tactics solved the match.",
      matchLose: "Outstanding! You managed to find a loophole in my system."
    }
  },
  {
    id: "coach_10",
    realName: "Mauricio Pochettino",
    name: "Poch Builder",
    difficulty: "Ultimate Challenge",
    level: 10,
    tacticDescription: "The best of everything! Balanced high-tier play that saves the strongest cards for the finish.",
    avatarBg: "from-cyan-700 to-blue-950",
    emoji: "🏗️",
    image: "/treneri/Pochetino.webp",
    quotes: {
      start: "We have built great chemistry in the team. Ready for the ultimate challenge!",
      winRound: "Fantastic team action! We are projecting our path to the very top!",
      loseRound: "No matter, we build team spirit and learn from every defeat.",
      doubleUp: "Great team cohesion! This is the fruit of hard work in training!",
      shootout: "Courage and belief in yourselves! You are heroes regardless of the result!",
      matchWin: "This is the crown of our work. We built a championship team!",
      matchLose: "Congrats. You are an exceptional leader and your team deserved this success."
    }
  }
];
