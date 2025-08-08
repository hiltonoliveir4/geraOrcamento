import { useFieldArray, useFormContext } from "react-hook-form";

export function ItensDinamicos() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  return (
    <div className="rounded-lg mb-6">
      <h2 className="font-bold mb-4 text-gray-400">Itens</h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-2 mb-2 items-center bg-gray-100 p-5 rounded-2xl relative"
        >
            <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white w-6 h-6 rounded-full absolute -top-2 -right-2 font-bold"
            >
                ×
            </button>
            <div className="flex w-full gap-3">
                <input
                    {...register(`itens.${index}.item`)}
                    placeholder="Item"
                    className="border-2 border-gray-400 focus:outline-0 rounded px-2 py-1 w-full"
                />
                <input
                    type="text"
                    {...register(`itens.${index}.unidade`)}
                    placeholder="Unidade"
                    className="border-2 border-gray-400 focus:outline-0 rounded px-2 py-1 w-full"
                />
                <input
                    type="text"
                    {...register(`itens.${index}.quantidade`)}
                    placeholder="Quantidade"
                    className="border-2 border-gray-400 focus:outline-0 rounded px-2 py-1 w-full"
                />
                <input
                    type="number"
                    {...register(`itens.${index}.total`)}
                    placeholder="Total"
                    className="border-2 border-gray-400 focus:outline-0 rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex w-full gap-3">
                <textarea 
                    {...register(`itens.${index}.descricao`)}
                    placeholder="Descrição"
                    className="border-2 border-gray-400 focus:outline-0 rounded px-2 py-1 flex-1 w-full"
                ></textarea>
            </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ item: "", descricao: "", unidade: "", quantidade: "", total: "" })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Adicionar Item
      </button>
    </div>
  );
}
