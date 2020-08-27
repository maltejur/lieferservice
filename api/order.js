import { createClient } from "redis";

export default async (req, res) => {
  const client = createClient({
    url: process.env.REDIS
  });

  if (req.body == undefined) {
    res.status(400).send("Invalid body");
    return;
  }

  client.RPUSH("list", JSON.stringify(req.body), () => {
    client.quit();

    res.json(req.body);
  });
};
