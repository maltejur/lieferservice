import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  url: process.env.REDIS
});

export default async (req, res) => {
  await client.RPUSH("list", "xd");

  res.json({
    body: JSON.stringify(true)
  });
};
