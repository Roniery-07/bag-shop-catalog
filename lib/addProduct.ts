import fs from "fs/promises"
import path from "path";

export async function addProduct(data: string){
  try{
    console.log("adding product")

    const pathToWrite = path.join(process.cwd(), "storage", "index.ts")
    await fs.writeFile(pathToWrite, data)
  }
  catch(err){
    console.error(err)
  }
}
