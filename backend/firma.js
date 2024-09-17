const crypto = require('crypto');

// Datos de la transacción
const reference = 'TTUPtdnVugyU40XlkhixhhGE6uYV2gh88';
const amountInCents = '3000000';
const currency = 'COP';
const expirationTime = '2024-09-14T22:28:50.000Z';  // Incluido
const integrityKey = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';

// Concatenar los valores en el orden correcto
const concatenatedString = `${reference}${amountInCents}${currency}${expirationTime}${integrityKey}`;

// Generar el hash SHA256
const signature = crypto.createHash('sha256').update(concatenatedString).digest('hex');

console.log('Generated Signature:', signature);
