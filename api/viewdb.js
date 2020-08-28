import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS
});

export default async (req, res) => {
  client.LRANGE("list", 0, -1, (err, reply) => {
    res.json(reply);
  });
};
