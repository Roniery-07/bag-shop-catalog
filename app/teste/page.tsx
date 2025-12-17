import fs from 'fs/promises'
import path from 'path'

export default async function TestePage() {
  const data = await fs.readFile(path.join(process.cwd(), "storage/index.ts"), 'utf-8')
  console.log(data)
  return (
    <div>
      {data}
    </div>
  )
}