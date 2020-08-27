import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  url: process.env.REDIS
});

export default async (req, res) => {
  const ret = await client.APPEND("list", "xd");

  res.json({
    body: JSON.stringify(ret)
  });
};
