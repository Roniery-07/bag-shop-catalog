import { cn } from "@/lib/utils";

interface BagCardProps{
  name: string;
  description: string;
  price: string;
  code: number;
  imageUrl: string;
  className?: string
}

export const BagCard = ({name, description, price, code, imageUrl, className} : BagCardProps) => {
  return (
    <div className={`${cn(className)} shadow p-4 rounded-md flex flex-col h-full bg-white`}>
      <img src={imageUrl} className="rounded-md w-full object-cover" alt={name}/>
      <h1 className="font-semibold mt-4 text-lg">{name}</h1>
      <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-row justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <span className="font-bold text-green-700">{price}</span>
        <span className="text-xs text-gray-400">cod: {code}</span>
      </div>
    </div>
  )
}