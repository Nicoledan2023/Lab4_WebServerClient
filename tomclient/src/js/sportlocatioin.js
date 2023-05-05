export default async () => {
  let res = await fetch("https://localhost:9000/sport");
  return res.json();
};
