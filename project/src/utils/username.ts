const adjectives = [
  'Silent', 'Hidden', 'Mystic', 'Shadow', 'Secret', 'Veiled', 'Phantom', 'Ghost',
  'Enigma', 'Stealth', 'Masked', 'Unknown', 'Covert', 'Obscure', 'Anonymous'
];

const nouns = [
  'Whisper', 'Echo', 'Spirit', 'Shade', 'Mist', 'Cipher', 'Raven', 'Phoenix',
  'Dragon', 'Wolf', 'Tiger', 'Eagle', 'Hawk', 'Owl', 'Fox'
];

export function generateRandomUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
}