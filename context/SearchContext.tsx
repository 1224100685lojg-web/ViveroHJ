"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface SearchContextType {
  busqueda: string;
  setBusqueda: (texto: string) => void;
  limpiarBusqueda: () => void;
}


const SearchContext =
createContext<SearchContextType | undefined>(
  undefined
);



export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [busqueda,setBusqueda] =
  useState("");



  function limpiarBusqueda(){

    setBusqueda("");

  }



  return (

    <SearchContext.Provider

      value={{
        busqueda,
        setBusqueda,
        limpiarBusqueda,
      }}

    >

      {children}

    </SearchContext.Provider>

  );

}





export function useSearch(){

  const context =
  useContext(SearchContext);



  if(!context){

    throw new Error(
      "useSearch debe utilizarse dentro de SearchProvider"
    );

  }


  return context;

}