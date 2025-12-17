import { NextRequest, NextResponse } from "next/server";
import { Infer, validator } from "@/lib/validator";
import fs from 'fs/promises'
import { addProduct } from "@/lib/addProduct";

const productSchema = validator.object({
  name: validator.string(),
  price: validator.number(), 
  code: validator.number(),
  description: validator.string()
});

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const data = productSchema.parse(body)

    console.log("Produto validado:", data);
    await addProduct(data.name)

    return NextResponse.json({ 
      message: "Produto criado com sucesso",
      product: data 
    }, { status: 201 });
    //eslint-disable-next-line
  } catch(err : any){
      return NextResponse.json(
      { error: "Erro de validação", details: err.message },
      { status: 400 }
    );
  }
}