
import bs58 from "bs58";
import { PublicKey, Keypair } from "@solana/web3.js";
import fs from 'fs';

const userKeypair = Keypair.fromSecretKey(bs58.decode(""));

const main = () => {
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

  fs.writeFileSync("deploy-keypair.json", str);
}

main();