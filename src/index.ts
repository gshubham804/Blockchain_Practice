// import * as ed from "@noble/ed25519";

// async function main() {
//   const privateKey = ed.utils.randomPrivateKey();
//   console.log("privateKey", privateKey);

//   const message = new TextEncoder().encode("hello shubh");
//   console.log("message", message);

//   const publicKey = await ed.getPublicKeyAsync(privateKey);
//   console.log("publicKey", publicKey);

//   const signature = await ed.signAsync(message, privateKey);
//   console.log("signature", signature);

//   const isValid = await ed.verifyAsync(signature, message, publicKey);

//   console.log(isValid);
// }

// main();

import {generateMnemonic, mnemonicToSeedSync} from "bip39";
import nacl from "tweetnacl";
import {derivePath} from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js"; 
import bs58 from "bs58";
 
const mnemonic =  generateMnemonic(256);
  // "stool corn flight sand fashion library boring duck catch gospel stable exclude"

const seed = mnemonicToSeedSync(mnemonic);

console.log(seed);
console.log("-----------------------");

for(let i=0;i<4;i++){
  const path = `m/44'/501'/${i}'/0'`;
  const deriveSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
  console.log("public key",Keypair.fromSecretKey(secret).publicKey.toBase58());
  console.log("private key",bs58.encode(Keypair.fromSecretKey(secret).secretKey))
  console.log("-----------------------");
}

// Generate public and privte key pair

// const keypair = Keypair.generate();

// const publicKey = keypair.publicKey.toString();
// const privateKey = keypair.secretKey

// console.log(publicKey, privateKey)









