import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS
});

export default async (req, res) => {
  if (req.query.name == undefined) {
    res.status(400);
    res.send("Invalid query");
  }

  await client.RPUSH("list", req.query.name);

  res.send("OK");
};
