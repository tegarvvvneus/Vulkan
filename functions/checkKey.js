import fs from 'fs';

export async function handler(event) {
  const { key, device } = event.queryStringParameters;
  if (!key || !device) return { statusCode: 400, body: "Missing key/device" };

  let keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));
  const foundKey = keys.find(k => k.key === key);
  if (!foundKey) return { statusCode: 200, body: JSON.stringify({ status: "invalid" }) };

  // Cek expired
  const created = new Date(foundKey.created);
  const now = new Date();
  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  if (diffDays >= foundKey.expireDays)
    return { statusCode: 200, body: JSON.stringify({ status: "expired" }) };

  // Cek device
  if (!foundKey.usedDevice.includes(device)) {
    if (foundKey.usedDevice.length >= foundKey.maxDevice)
      return { statusCode: 200, body: JSON.stringify({ status: "limit reached" }) };

    foundKey.usedDevice.push(device);
    fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "valid", expireIn: foundKey.expireDays - diffDays })
  };
}