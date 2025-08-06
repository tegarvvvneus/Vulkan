import fs from 'fs';

export async function handler(event) {
  if(event.httpMethod !== "POST") 
    return { statusCode: 405, body: "Method Not Allowed" };

  const { key, maxDevice, expireDays } = JSON.parse(event.body);
  let keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));

  const newKey = {
    key,
    maxDevice,
    usedDevice: [],
    created: new Date().toISOString().split("T")[0],
    expireDays
  };

  keys.push(newKey);
  fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));

  return { statusCode: 200, body: JSON.stringify({ message: "Key ditambahkan", key: newKey }) };
}