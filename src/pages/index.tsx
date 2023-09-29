import { useCallback } from "react";

// useCallback - utilizado para memoizar (memorizar) uma função entre as
// renderizações desse componente para que ela não seja recriada ocupando
// uma nova referencia na memoria

// diferença do useCallback - useMemo serve para memorizar um valor enquanto
// useCallback memoriza uma função

// utilizar quando:
// 1- igualdade referencial - quando a função for repassada a um
// componente filho ou funções de contexto.
// * -----------evite ao maximo otimizações prematuras-----------------------*

import type { NextPage } from "next";

import { FormEvent, useState } from "react";

import SearchList from "../components/SearchList";

interface Results {
  totalPriceFormated: number;
  data: any[];
}

const Home: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Results>({
    data: [],
    totalPriceFormated: 0,
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(
      `http://localhost:3333/products?q=${search}`
    ).then((data) => {
      return data.json();
    });

    const totalPriceFormated = response.reduce((total: any, product: any) => {
      return total + product.price;
    }, 0);

    // evite formatar ou calcular dados no momento da renderização, dessa forma
    // voce necessitara menos do useMemo

    setResults({ totalPriceFormated, data: response });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  // 1 parametro - a função que sera memoizada (memorizada)
  // 2 parametro - um array de dependencias
  // addToWishlist - função

  return (
    <>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button>Pesquisar</button>
      </form>
      <SearchList
        data={results.data}
        totalPriceFormated={results.totalPriceFormated}
        onAddWishlist={addToWishlist}
      />
    </>
  );
};

export default Home;

// caso o problema esteja foda abre o next/bundle-analyzer e se vira
