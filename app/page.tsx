import { BagCard } from "@/components/bag-card";

export default function Home() {
  return (
    <div className="md:max-w-5xl w-full h-full m-auto p-4 pt-6 box-border"> 
      <h1 className="mb-4 text-2xl font-semibold text-center">Catálogo</h1>
      <div className="grid grid-cols-4 gap-4">
        Aqui ficará os cards de items
      </div>
    </div>
  );
}
