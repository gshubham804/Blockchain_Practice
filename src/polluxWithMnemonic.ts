import * as bip39 from "bip39";
import hdkey from "hdkey";
import { ec as EC } from "elliptic";
import CryptoJS from "crypto-js";
import bs58 from "bs58";

// Initialize the elliptic curve secp256k1
const ec = new EC("secp256k1");

// Generate a mnemonic
const mnemonic = bip39.generateMnemonic();
console.log("Mnemonic:", mnemonic);
console.log("-----------------------");

// Convert mnemonic to seed
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log("seed", seed);
console.log("-----------------------");

// Create HD wallet from seed (BIP32)
const root = hdkey.fromMasterSeed(seed);
console.log("root", root);
console.log("-----------------------");

// Derive a path (POX usually follows the Ethereum path, but change as needed)
// m/44'/195'/0'/0/0 is the standard POX path
const path = "m/44'/195'/0'/0/0";
const child = root.derive(path);

// Get the private key from the derived key
const privateKey = child.privateKey.toString("hex");
console.log("privateKey",privateKey);
console.log("-----------------------");

// Generate the public key from the private key
const keyPair = ec.keyFromPrivate(privateKey);
const publicKey = keyPair.getPublic("hex").slice(2); // Remove the leading '04'

// Hash the public key using Keccak256 (Ethereum-like hashing)
const publicKeyBytes = CryptoJS.enc.Hex.parse(publicKey);
const keccak256 = CryptoJS.SHA3(publicKeyBytes, {
  outputLength: 256,
}).toString();

// The POX address is the last 20 bytes of the Keccak256 hash with '37' prefixed
const poxAddressHex = "37" + keccak256.substring(24);
console.log("publickey",poxAddressHex);
