import { useEffect, useState } from "react";
import { useCartStore } from "../../store/Cart/cart";
import { BaseUrl } from "../../lib/axios";

interface ProductType {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  categoriesId: number;
}

interface CardOptions {
  children?: React.ReactNode | string;
  onCardClick?: (product: ProductType) => {} | void;
  otherProps?: any;
  product: ProductType;
}

const ProductCard = ({
  children,
  onCardClick,
  product,
  //@ts-ignore
  ...otherProps
}: CardOptions) => {
  const { addToCart, deleteFromCart, cart } = useCartStore((state) => state);
  const [selected, setSelected] = useState(false);

  const HandleClicked = () => {
    if (selected) {
      deleteFromCart(product);
      setSelected(!selected);
    } else {
      addToCart(product);
      setSelected(!selected);
    }
  };
  useEffect(() => {
    const Item = cart.filter((item) => item.id === product.id)[0];
    //console.log(Item);
    if (Item) setSelected(true);
    else setSelected(false);
  }, [cart]);
  return (
    <div
      className={` shadow-2xl rounded-md w-80 px-6 py-8 ${selected ? "bg-green-300" : ""}`}
    >
      <div onClick={HandleClicked}>
        <img
          className="w-full h-60 object-center rounded-md"
          src={BaseUrl + product.image}
          alt={product.title}
        />

        <div className="block max-w-sm p-6 wrap-break-word">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
        </div>
      </div>
      {/*selected ? (
        <div className="flex justify-around">
          <div
            className="relative bg-red-400 hover:bg-red-600 min-h-10 rounded-full flex justify-around min-w-[25%]"
            onClick={() => {
              removeFromCart({ quantity: 1, ...product });
              //setSelected(selected - 1);
            }}
          >
            <FontAwesomeIcon className="p-3" icon={faCancel} />
          </div>
        </div>
      ) : (
        <></>
        )*/}
    </div>
  );
};

export default ProductCard;
