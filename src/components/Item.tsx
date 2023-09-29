import { memo, useState, lazy } from "react";

// memo- utilizado para evitar a criação de uma nova versão do componente
// caso nenhuma propriedade do componente tenha sido alterada utilizado em
// componentes filho onde a renderização e provinda das propriedades

// utilizar quando:
// 1. Pure Functional Components - componentes utilizados apenas para abstrair
// alguma parte visual da aplicação e que não dependa de algum serviço externo.
// 2. Renders too often - verificar no react-devtools-profiler se o componente
// esta renderizando muitas vezes.
// 3. Re-renders with same props - componentes que renderizam varias vezes com
// as mesmas propriedades.
// 4. Medium to big size - componentes de tamanho grande ou medio.
// * -----------evite ao maximo otimizações prematuras-----------------------*

import dynamic from "next/dynamic";

// code splitting (lazyLoading) - pode ser utilizado em qualquer importação que
// nem sempre estara disponivel em um primeiro momento, dependendo de uma ação
// do usuario, ou seja, carregar o import somente quando ele for necessario
// e não no build da aplicação
// (next- dynamic from next/dynamic / react- lazy from react)

// import AddProductToWishlist from "./AddProductToWishlist";

import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist");
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

// import de export default

// const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
//   return import('./AddProductToWishlist').then(mod => mod.item)
// })

// import de algum export especifico

interface ItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddWishlist: (id: number) => void;
}

const ItemComponent = ({ product, onAddWishlist }: ItemProps): JSX.Element => {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<boolean>(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
};

const Item = memo(ItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});

// 1 parametro - componente
// 2 parametro - uma função que recebe prevProps e nextProps e deve ser
// utilizada para fazer uma comparação aprofundada em casos onde as props
// tenham objetos para de fato saber se houve mudança ou não, caso nao
// informada, fara uma comparação raza de todas as propriedades

export default Item;
