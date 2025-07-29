import ProductCard from "../ProductCard/ProductCard.component";
import { type Product as ProductType } from "../../store/Products/products";

interface ListOptions {
  children?: React.ReactNode | string;
  onCardClick?: (product: ProductType) => {} | void;
  otherProps?: any;
  products: ProductType[];
}

const ProductsList = ({
  children,
  onCardClick,
  products,
  //@ts-ignore
  ...otherProps
}: ListOptions) => {
  return (
    <div className="justify-center">
      <div className="mt-4 flex flex-wrap justify-center gap-4 pb-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
