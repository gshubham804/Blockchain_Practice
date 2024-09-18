const EC = require("elliptic").ec;
const CryptoJS = require("crypto-js");

// Initialize the elliptic curve secp256k1
const ec = new EC("secp256k1");

// Generate a random private key
const keyPair = ec.genKeyPair();
console.log("keypair", keyPair);
console.log("-----------------------");

const privateKey = keyPair.getPrivate("hex");
console.log("PrivateKey", privateKey);
console.log("-----------------------");

// Get the public key in uncompressed format
const publicKey = keyPair.getPublic("hex").slice(2); // Remove the leading '04'
console.log("publickey", publicKey);
console.log("-----------------------");


// Hash the public key using Keccak256 (same as Ethereum)
const publicKeyBytes = CryptoJS.enc.Hex.parse(publicKey);
console.log("publicKeyBytes", publicKeyBytes)
console.log("-----------------------");

const keccak256 = CryptoJS.SHA3(publicKeyBytes, {
  outputLength: 256,
}).toString();
console.log("keccak256", keccak256);
console.log("-----------------------");

// The POX address is the last 20 bytes of the Keccak256 hash with '37' prefixed
const poxAddressHex = "37" + keccak256.substring(24);
console.log("poxAddressHex",poxAddressHex);
console.log("privateKey",privateKey);
console.log("-----------------------");