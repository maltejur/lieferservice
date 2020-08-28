import { createClient } from "redis";

export default async (req, res) => {
  const client = createClient({
    url: process.env.REDIS
  });

  if (req.query.index == undefined) {
    res.status(400).send("Invalid query");
    return;
  }

  client.LSET("list", Number(req.query.index), '["DELETED"]', () => {
    client.LREM("list", 1, '["DELETED"]', () => {
      client.quit();

      res.send("OK");
    });
  });
};
