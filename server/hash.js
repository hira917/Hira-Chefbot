// hash.js
const bcrypt = require('bcryptjs');

const password = 'AyeshaSohail90';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Original Password:', password);
console.log('Hashed Password:', hashedPassword);