const API_BASE = "/.netlify/functions";

async function fetchKeys() {
  const res = await fetch(API_BASE + "/getKeys");
  const data = await res.json();
  renderTable(data);
}

function renderTable(keys){
  const table = document.getElementById('keyTable');
  table.innerHTML = `<tr>
    <th>Key</th>
    <th>Max Device</th>
    <th>Used</th>
    <th>Expire (Hari)</th>
    <th>Aksi</th>
  </tr>`;
  
  keys.forEach((k)=>{
    table.innerHTML += `<tr>
      <td>${k.key}</td>
      <td>${k.maxDevice}</td>
      <td>${k.usedDevice.length}</td>
      <td>${k.expireDays}</td>
      <td><button onclick="deleteKey('${k.key}')">Hapus</button></td>
    </tr>`;
  });
}

async function addKey(){
  const keyName = document.getElementById('keyName').value;
  const maxDevice = document.getElementById('maxDevice').value;
  const expireDays = document.getElementById('expireDays').value;

  if(keyName && maxDevice && expireDays){
    await fetch(API_BASE + "/addKey", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ key:keyName, maxDevice:parseInt(maxDevice), expireDays:parseInt(expireDays) })
    });
    fetchKeys();
  } else {
    alert("Isi semua data key!");
  }
}

async function deleteKey(name){
  await fetch(API_BASE + "/deleteKey?key=" + name, { method:"DELETE" });
  fetchKeys();
}

document.addEventListener("DOMContentLoaded", fetchKeys);