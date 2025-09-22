export function generateRandomPassword(length: number = 8): string {
  if (length < 5) {
    throw new Error('Password length must be at least 5 characters');
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '@#$%^&*()_[]{}|<>';

  const allChars = lowercase + uppercase + numbers + specialChars;

  const getRandomChar = (charSet: string): string => {
    return charSet[Math.floor(Math.random() * charSet.length)];
  };

  let password = '';
  password += getRandomChar(numbers);
  password += getRandomChar(specialChars);

  for (let i = password.length; i < length; i++) {
    password += getRandomChar(allChars);
  }

  const shuffleString = (str: string): string => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  return shuffleString(password);
}


console.log(generateRandomPassword());
