// utils/motivationUtils.js
export const motivationalQuotes = [
    "You’re doing better than you think.",
    "Small steps lead to big results.",
    "Progress, not perfection.",
    "Rest is productive too.",
    "You are building a better you.",
    "Consistency beats intensity.",
    "Every day is a fresh start.",
    "Your effort matters more than you know.",
    "Keep going – you’re getting stronger.",
    "You’ve got this!"
  ];
  
  export const getRandomQuote = () => {
    const index = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[index];
  };
  
