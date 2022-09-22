// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  fromHexString,
  toHexString,
  verifyMessage,
} from "@andreivcodes/spacemeshlib";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { text, signature, publicKey } = req.query;

  console.log("=================================");
  console.log(text);
  console.log(signature);
  console.log("0x" + String(publicKey).slice(26));

  console.log("=================================");

  const verify = await verifyMessage(
    String(publicKey).slice(2),
    String(text),
    String(signature).slice(2)
  ).catch((e) => console.log(e));

  console.log(verify);

  let result = {
    name: "Signature Verification Result",
    result: Boolean(verify),
  };

  console.log(result);
  console.log("=================================");
  res.status(200).json(result);
}
