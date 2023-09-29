import { useMemo } from "react";

// useMemo - utilizado para memoizar (memorizar) o resultado de algum calculo
// entre as renderizações desse componente para que ele não precise ser
// recalculado do zero.

// diferença do useCallback - useMemo serve para memorizar um valor enquanto
// useCallback memoriza uma função

// utilizar quando:
// 1- houver um calculo complexo.
// 2- igualdade referencial - quando a informação for repassada a um
// componente filho.
// * -----------evite ao maximo otimizações prematuras-----------------------*

import Item from "./Item";

interface SearchListProps {
  data: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddWishlist: (id: number) => void;
  totalPriceFormated: number;
}

const SearchList = ({
  data,
  onAddWishlist,
  totalPriceFormated,
}: SearchListProps): JSX.Element => {
  const totalPrice = useMemo(() => {
    return data.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [data]);

  // 1 parametro - uma função que retorne o resultado
  // 2 parametro - um array de dependencias
  // totalPrice - valor

  return (
    <div>
      <h1>TotalPriceFormated</h1>
      <h2>{totalPriceFormated}</h2>

      <h1>TotalPrice</h1>
      <h2>{totalPrice}</h2>

      {data.map((product) => {
        return (
          <Item
            product={product}
            onAddWishlist={onAddWishlist}
            key={product.id}
          />
        );
      })}
    </div>
  );
};

export default SearchList;
