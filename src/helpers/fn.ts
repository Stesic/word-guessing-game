export function countCharacters(str: string) {
  var charCount = {} as any;

  if (!str) return {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }

  return charCount;
}

export function getIndexesOfChar(str: string, char: string) {
  const indexes = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      indexes.push(i);
    }
  }

  return indexes;
}

export function validateLetter(char: string) {
  const regex = /^[A-Za-z]$/;
  return regex.test(char);
}
