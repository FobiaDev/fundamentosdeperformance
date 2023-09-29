export interface AddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestClose: () => void;
}

const AddProductToWishlist = ({
  onAddToWishlist,
  onRequestClose,
}: AddProductToWishlistProps): JSX.Element => {
  return (
    <span>
      deseja adicionar aos favoritos?
      <button onClick={onAddToWishlist}>Sim</button>
      <button onClick={onRequestClose}>Nao</button>
    </span>
  );
};

export default AddProductToWishlist;
