import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS
});

export default async (req, res) => {
  if (req.query.name == undefined) {
    res.status(400).send("Invalid query");
    return;
  }

  await client.RPUSH("list", req.query.name);

  res.send("OK");
};
