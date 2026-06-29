"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProductModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="w-full max-w-lg bg-[#0f1a0f] border border-white/10 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Nuevo producto
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Nombre"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          />

          <input
            placeholder="Categoría"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          />

          <input
            placeholder="Stock"
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          />

          <input
            placeholder="Precio"
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          />

        </div>

        <div className="flex justify-end gap-2 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 rounded-lg"
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-[#2d6b2d] rounded-lg"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>
  );
}