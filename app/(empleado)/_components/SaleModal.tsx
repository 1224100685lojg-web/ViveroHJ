"use client";

import { useMemo, useState } from "react";
import {
  X,
  CreditCard,
  Banknote,
  Landmark,
} from "lucide-react";


type Props = {
  open: boolean;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
};


export default function SaleModal({
  open,
  total,
  onClose,
  onConfirm,
}: Props) {


  const [metodoPago, setMetodoPago] =
    useState("Efectivo");


  const [recibido, setRecibido] =
    useState("");



  const cambio = useMemo(() => {

    const cantidad = Number(recibido);


    if (isNaN(cantidad)) {
      return 0;
    }


    return Math.max(cantidad - total, 0);


  }, [recibido, total]);



  if (!open) return null;



  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
      "
    >


      <div
        className="
          w-full
          max-w-md
          bg-[#0f1a0f]
          border
          border-white/5
          rounded-xl
          shadow-2xl
        "
      >



        {/* HEADER */}

        <div
          className="
            flex
            justify-between
            items-center
            px-5
            py-4
            border-b
            border-white/5
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Finalizar Venta
          </h2>



          <button
            onClick={onClose}
            className="
              text-white/40
              hover:text-white
              transition
            "
          >
            <X size={18}/>
          </button>


        </div>






        {/* CONTENIDO */}

        <div className="p-5">


          <p
            className="
              text-sm
              text-white/40
              mb-4
            "
          >
            Método de pago
          </p>



          <div
            className="
              grid
              grid-cols-3
              gap-3
            "
          >


            <PaymentButton
              active={metodoPago === "Efectivo"}
              onClick={() => setMetodoPago("Efectivo")}
              icon={<Banknote size={20}/>}
              label="Efectivo"
            />



            <PaymentButton
              active={metodoPago === "Tarjeta"}
              onClick={() => setMetodoPago("Tarjeta")}
              icon={<CreditCard size={20}/>}
              label="Tarjeta"
            />



            <PaymentButton
              active={metodoPago === "Transferencia"}
              onClick={() => setMetodoPago("Transferencia")}
              icon={<Landmark size={20}/>}
              label="Transferencia"
            />


          </div>





          {metodoPago === "Efectivo" && (

            <div className="mt-6">


              <label
                className="
                  text-sm
                  text-white/50
                  block
                  mb-2
                "
              >
                Cantidad recibida
              </label>



              <input
                type="number"
                value={recibido}
                onChange={(e) =>
                  setRecibido(e.target.value)
                }
                placeholder="0.00"
                className="
                  w-full
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-lg
                  px-3
                  py-2.5
                  text-white
                  outline-none
                  focus:border-[#6db56d]/50
                "
              />


            </div>

          )}







          {/* RESUMEN */}

          <div
            className="
              mt-6
              space-y-3
              border-t
              border-white/5
              pt-4
            "
          >


            <div
              className="
                flex
                justify-between
                text-sm
              "
            >

              <span className="text-white/40">
                Total
              </span>


              <span className="text-white font-medium">
                ${total.toFixed(2)}
              </span>


            </div>





            {metodoPago === "Efectivo" && (

              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >

                <span className="text-white/40">
                  Cambio
                </span>


                <span
                  className="
                    text-[#a8d5a8]
                    font-semibold
                  "
                >
                  ${cambio.toFixed(2)}
                </span>


              </div>

            )}


          </div>


        </div>







        {/* FOOTER */}

        <div
          className="
            flex
            gap-3
            px-5
            py-4
            border-t
            border-white/5
          "
        >


          <button
            onClick={onClose}
            className="
              flex-1
              py-2.5
              rounded-lg
              text-sm
              text-white
              border
              border-white/10
              hover:bg-white/5
              transition
            "
          >
            Cancelar
          </button>



          <button
            onClick={onConfirm}
            className="
              flex-1
              py-2.5
              rounded-lg
              text-sm
              font-medium
              bg-[#6db56d]/20
              text-[#a8d5a8]
              hover:bg-[#6db56d]/30
              transition
            "
          >
            Confirmar
          </button>


        </div>



      </div>


    </div>

  );

}






function PaymentButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {


  return (

    <button
      onClick={onClick}
      className={`
        flex
        flex-col
        items-center
        gap-2
        p-3
        rounded-lg
        border
        transition

        ${
          active
          ?
          "bg-[#6db56d]/10 border-[#6db56d]/40 text-[#a8d5a8]"
          :
          "border-white/10 text-white/50 hover:bg-white/5"
        }
      `}
    >

      {icon}


      <span
        className="
          text-xs
        "
      >
        {label}
      </span>


    </button>

  );

}