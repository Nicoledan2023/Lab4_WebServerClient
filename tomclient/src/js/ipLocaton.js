//https://api.ipgeolocation.io/ipgeo?apiKey=3fd5e9586dc143fea6e30d1d1c286f29
export default async () => {
  let res = await fetch("https://localhost:9000/geo");
  return res.json();
};
