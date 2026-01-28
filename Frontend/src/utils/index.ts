export const isValidEmail = (email = '') => {
  if (!email) return false;

  const value = email.trim().toLowerCase();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(value);
};