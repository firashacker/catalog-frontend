import { useEffect, useState } from "react";
import { useCartStore } from "../../store/Cart/cart";
import { BaseUrl } from "../../lib/axios";
import { type Product as ProductType } from "../../store/Products/products";
import { type Material } from "../../store/Materials/materials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush } from "@fortawesome/free-solid-svg-icons";

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
  const [material, setMaterial] = useState<Material>(
    product.ProductsMaterials[0]?.material,
  );

  const ShowMaterials = () => {
    const materials = product.ProductsMaterials;
    return materials.map((productmaterial) => {
      const clicked = productmaterial.material.id === material.id;
      return (
        <button
          key={productmaterial.id}
          className={`${clicked ? "bg-red-400" : ""} rounded-full p-[5px] m-2`}
          onClick={() => {
            deleteFromCart(product);
            setMaterial(productmaterial.material);
          }}
        >
          <img
            className="w-12 rounded-full h-12 border-s-slate-950 border-2"
            src={BaseUrl + productmaterial.material.image}
          />
        </button>
      );
    });
  };

  const HandleClicked = () => {
    if (selected) {
      deleteFromCart(product);
      setSelected(!selected);
    } else {
      if (material) {
        addToCart({
          ...product,
          materialImage: material.image,
        });
      } else {
        addToCart(product);
      }

      setSelected(!selected);
    }
    //console.log(cart);
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
      {product.ProductsMaterials.length > 0 ? (
        <div>
          <h1 className="font-semibold text-xl">
            finish <FontAwesomeIcon icon={faBrush} />
          </h1>
          <div className="min-w-full flex justify-start flex-wrap">
            <ShowMaterials />
          </div>
        </div>
      ) : (
        <div className="min-h-full" onClick={HandleClicked}></div>
      )}
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
