
import bs58 from "bs58";
import { PublicKey, Keypair } from "@solana/web3.js";
import fs from 'fs';

const convert = () => {
  const userKeypair = Keypair.fromSecretKey(bs58.decode(""));
  console.log(userKeypair.publicKey.toBase58());

  let str = "[";
  for (let i = 0; i < userKeypair.secretKey.length; i++) {
    let v = userKeypair.secretKey.at(i);
    str += v;
    if (i != userKeypair.secretKey.length - 1) {
      str += ',';
    }
  }
  str += ']';

  fs.writeFileSync("keypair.json", str);
}

const deconvert = () => {
  let str = fs.readFileSync("keypair.json")?.toString();
  if (str[0] != '[' || str[str.length - 1] != ']') {
    console.log("Invalid keypair");
    return;
  }

  str = str.substring(1, str.length - 1);
  const splitStr = str.split(',');
  let secretKey = new Array(64);
  for (let i = 0; i < splitStr.length; i++) {
    const num = Number(splitStr[i]);
    secretKey[i] = num;
  }
  
  const privKey = bs58.encode(secretKey);
  console.log('privKey:', privKey);
}

// convert();
deconvert();
