import fs from "fs/promises"
import path from "path";

const product = {
  code: 101,
  name: "Bolsa Meraki",
  description: "Espaçosa e elegante, ideal para o dia a dia no escritório com compartimento para notebook.",
  price: "R$ 259,90",
  slug: "bolsa-meraki"
}

try{
  const pathToWrite = path.join(process.cwd(), "storage", product.slug, "index.ts")
  await fs.writeFile(pathToWrite, "oiiiii tudo bem?")
}
catch(err){
  console.error(err)
}
