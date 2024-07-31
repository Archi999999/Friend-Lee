import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (key) {
    res.setHeader('Set-Cookie', `key=${key}; HttpOnly; Path=/`);
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
