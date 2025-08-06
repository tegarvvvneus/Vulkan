import fs from 'fs';

export async function handler() {
  const data = fs.readFileSync("keys.json", "utf8");
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: data
  };
}