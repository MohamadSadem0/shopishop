import CryptoJS from 'crypto-js'; // Import for decryption

/**
 * Decrypts the JWT token stored in sessionStorage.
 * @returns {string} The decrypted JWT token.
 */
const getDecryptedToken = () => {
  const encryptedToken = sessionStorage.getItem('authToken');
  if (!encryptedToken) return null;

  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8); // Decrypted JWT token
  } catch (error) {
    console.error('Error decrypting token:', error);
    return null;
  }
};

export default getDecryptedToken;