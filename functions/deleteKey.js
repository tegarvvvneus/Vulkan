import fs from 'fs';

export async function handler(event) {
  if(event.httpMethod !== "DELETE") 
    return { statusCode: 405, body: "Method Not Allowed" };

  const keyName = event.queryStringParameters.key;
  let keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));
  keys = keys.filter(k => k.key !== keyName);

  fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));
  return { statusCode: 200, body: JSON.stringify({ message: "Key dihapus" }) };
}