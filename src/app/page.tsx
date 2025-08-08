"use client";

import { ImagensDinamicas } from "@/components/imagensDinamicas";
import { ItensDinamicos } from "@/components/itensDinamicos";
import { gerarPDF } from "@/utils/gerarPdf";
import { useForm, FormProvider } from "react-hook-form";

export default function Home() {
  const methods = useForm();

  return (
    <div className="w-[800px] h-dvh m-auto">
      <h1 className="font-bold text-4xl text-center pt-4">Me paga, veaco </h1>
      <h1 className="font-bold text-2xl text-center py-7">Gerar Orçamento</h1>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-3 py-7" onSubmit={methods.handleSubmit(gerarPDF)}>
          <div className="flex w-full gap-3">
            <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
              <span className="font-bold text-gray-400">IMPIC</span>
              <input {...methods.register("impic")} className="w-full focus:outline-0" type="text" />
            </div>
            <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
              <span className="font-bold text-gray-400">Orçamento</span>
              <input {...methods.register("orcamento")} className="w-full focus:outline-0" type="text" />
            </div>
            <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
              <span className="font-bold text-gray-400">Data</span>
              <input {...methods.register("data")} className="w-full focus:outline-0" type="date" />
            </div>
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400">Cliente</span>
            <input {...methods.register("cliente")} className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400">Morada</span>
            <input {...methods.register("morada")} className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400">Obra</span>
            <input {...methods.register("obra")} className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Valor IVA</span>
            <input {...methods.register("valor_iva")} defaultValue="6" className="w-full focus:outline-0" type="number" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Pagamento</span>
            <textarea {...methods.register("pagamento")} className="w-full focus:outline-0"></textarea>
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Validade do orçamento</span>
            <input {...methods.register("validade")} className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Prazo</span>
            <input {...methods.register("prazo")} className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">IBAN</span>
            <input {...methods.register("iban")} defaultValue="PT50 0007 0000 0084 5085 2442 3" className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Seguro</span>
            <input {...methods.register("seguro")} defaultValue="" className="w-full focus:outline-0" type="text" />
          </div>
          <div className="flex w-full gap-3 items-center border-2 border-gray-400 px-2 py-2 rounded-lg">
            <span className="font-bold text-gray-400 whitespace-nowrap">Exclusões</span>
            <input {...methods.register("exclusoes")} 
              defaultValue="É da responsabilidade do dono da obra o fornecimento de água e eletricidade durante os trabalhos." 
              className="w-full focus:outline-0" type="text" />
          </div>

          <ItensDinamicos />
          
          <ImagensDinamicas />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
          >
            Gerar PDF
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
