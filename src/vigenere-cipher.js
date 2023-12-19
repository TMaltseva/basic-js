const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  processText(text, key, encrypt) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result = [];
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();

      if (alphabet.includes(char)) {
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyShift = alphabet.indexOf(keyChar);
        const charIndex = alphabet.indexOf(char);

        if (encrypt) {
          result.push(alphabet[(charIndex + keyShift) % 26]);
        } else {
          result.push(alphabet[(charIndex - keyShift + 26) % 26]);
        }

        keyIndex++;
      } else {
        result.push(text[i]);
      }
    }

    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  encrypt(message, key) {
    return this.processText(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    return this.processText(encryptedMessage, key, false);
  }
}

module.exports = {
  VigenereCipheringMachine
};
