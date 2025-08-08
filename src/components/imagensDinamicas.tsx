import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export function ImagensDinamicas() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "imagens" });

  const imagens = watch("imagens") || [];

  const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
  if (!imagens) return setPreviews([]);

  const newPreviews = imagens.map((file: File) => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  });

  setPreviews(newPreviews.filter(Boolean));

  return () => {
    newPreviews.forEach((url: string) => url && URL.revokeObjectURL(url));
  };
}, [JSON.stringify(imagens)]);

  return (
    <div>
        <div className="flex flex-wrap gap-4">
            {fields.map((field, index) => (
                <div key={field.id} className="relative w-32 h-32 rounded-lg">
                    <Controller
                        key={field.id}
                        control={control}
                        name={`imagens.${index}`}
                        render={({ field: { onChange } }) => (
                            <input
                                className="absolute inset-0 opacity-0 cursor-pointer rounded-lg"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    onChange(file);
                                }}
                            />
                        )}
                    />
                    {previews[index] ? (
                        <img
                            src={previews[index]}
                            alt={`Imagem ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex text-center items-center justify-center h-full rounded-lg bg-gray-200 text-gray-500 text-sm">
                            Clique para selecionar
                        </div>
                    )}

                     <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        title="Remover imagem"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>

        <button
            type="button"
            onClick={() => append(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
            Adicionar Imagem
        </button>
    </div>
  );
}
