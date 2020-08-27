import { createClient } from "redis";
import { promisify } from "util";

export default async (req, res) => {
  const client = createClient({
    // eslint-disable-next-line no-undef
    url: REDIS
  });
  const incrAsync = promisify(client.incr).bind(client);
  const count = await incrAsync("count");

  client.quit();

  res.json({
    body: JSON.stringify(count)
  });
};
