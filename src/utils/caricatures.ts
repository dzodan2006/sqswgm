// Puppet Soccer style big-head caricature generator

export interface CaricatureProps {
  head: string;
  hair?: string;
  accessory?: string;
  mouth?: string;
  style?: string;
}

const PLAYER_CARICATURES: Record<string, CaricatureProps> = {
  // Messi parody (Lio Pessi)
  p1: { head: '🧔‍♂️', accessory: '🐐', mouth: '🏆', style: 'scale-110' },
  // Ronaldo parody (CR7 / Penaldo)
  p2: { head: '🧑‍🦱', accessory: '💎', mouth: 'Siuuu!', style: 'rotate-3' },
  // Mbappe parody (Donatello)
  p3: { head: '🐢', accessory: '⚡', mouth: '💨', style: '-rotate-6' },
  // Haaland parody (Majin Buu)
  p4: { head: '👱‍♂️', accessory: '🤖', mouth: '🦾', style: 'scale-125' },
  // De Bruyne parody (Kev)
  p5: { head: '👨‍🦰', accessory: '🎯', mouth: '🧠', style: 'rotate-6' },
  // Modric parody (Luka)
  p6: { head: '🧑‍🦳', accessory: '🪄', mouth: '👑', style: 'scale-105' },
  // Bellingham parody (Jude)
  p7: { head: '🧑🏾‍🦱', accessory: '👐', mouth: '🌟', style: '-rotate-3' },
  // Vinicius parody (Vini)
  p8: { head: '🕺🏽', accessory: '⚡', mouth: '😜', style: 'rotate-12' },
  // Kane parody (Harry)
  p9: { head: '👱‍♂️', accessory: '🎯', mouth: '⚽', style: 'scale-110' },
  // Rodri parody
  p10: { head: '🧑🏻', accessory: '🛡️', mouth: '🧱', style: 'scale-105' },
  // Van Dijk parody (Virgil)
  p11: { head: '🧔🏾‍♂️', accessory: '🏔️', mouth: '🚷', style: 'scale-120' },
  // Salah parody (Mo)
  p12: { head: '🧑🏽‍🦱', accessory: '👑', mouth: '🇪🇬', style: 'rotate-6' },
  // Neymar parody (Ney)
  p13: { head: '🧑🏽‍🎤', accessory: '🎭', mouth: '🤕', style: '-rotate-12' },
  // Lewandowski parody (Lewy)
  p14: { head: '🧑🏼', accessory: '🕺', mouth: '🔥', style: 'scale-110' },
  // Yamal parody (Lamine)
  p15: { head: '🧒🏽', accessory: '🎒', mouth: '⚡', style: '-rotate-6' },
  // Maradona retro
  p16: { head: '🧑🏻‍🦱', accessory: '✋', mouth: '🏆', style: 'scale-115' },
  // Pele retro
  p17: { head: '🤴🏾', accessory: '🌟', mouth: '👑', style: 'scale-120' },
  // Zidane retro (Zizou)
  p18: { head: '🦲', accessory: '🪄', mouth: '💥', style: 'scale-110' },
  // Maldini retro
  p19: { head: '🧑🏻‍🦱', accessory: '🛡️', mouth: '🇮🇹', style: 'scale-115' },
  // Yashin retro
  p20: { head: '🧢', accessory: '🕷️', mouth: '🧤', style: 'scale-110' },
};

export function getPlayerCaricature(id: string, position: string): CaricatureProps {
  let key = id;
  if (id === 'c_001') key = 'p1';
  else if (id === 'c_003') key = 'p2';
  else if (id === 'c_002') key = 'p3';
  else if (id === 'c_045') key = 'p4';
  else if (id === 'c_007') key = 'p5';
  else if (id === 'c_011') key = 'p6';
  else if (id === 'c_006') key = 'p7';
  else if (id === 'c_005') key = 'p8';
  else if (id === 'c_004') key = 'p9';
  else if (id === 'c_028') key = 'p10';
  else if (id === 'c_012') key = 'p11';
  else if (id === 'c_054') key = 'p12';
  else if (id === 'r_001') key = 'p17';
  else if (id === 'r_002') key = 'p16';
  else if (id === 'r_003') key = 'p18';
  else if (id === 'r_004') return { head: '🤙', accessory: '🪄', mouth: '😁', style: 'scale-110' };
  else if (id === 'r_005') return { head: '👱‍♂️', accessory: '📐', mouth: '🎯', style: 'scale-105' };

  if (PLAYER_CARICATURES[key]) {
    return PLAYER_CARICATURES[key];
  }
  // Fallbacks by position
  switch (position) {
    case 'ATT':
      return { head: '😜', accessory: '⚡', mouth: '👟⚽' };
    case 'MID':
      return { head: '😎', accessory: '🎯', mouth: '🧠' };
    case 'DEF':
      return { head: '🤨', accessory: '🛡️', mouth: '🧱' };
    default:
      return { head: '🙂', accessory: '⚽', mouth: '🔥' };
  }
}
