export const fetchQuestions = async (url) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return [];
  }
};

export const shuffleArray = (array) => {
  // Create a copy so the original array isn’t mutated
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const selectQuestions = (questions, limit) =>
  shuffleArray(questions).slice(0, limit);

export const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  let formatted = "";
  if (hrs > 0) {
    formatted += `${hrs}h `;
  }
  if (mins > 0 || hrs > 0) {
    formatted += `${mins}m `;
  }
  formatted += `${secs}s`;
  return formatted;
};
