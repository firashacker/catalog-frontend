import { useProducts, type Product } from "../store/Products/products";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../store/Cart/cart";
import ProductsList from "../components/ProductsList/ProductsList.component";
import CartPopUp from "../components/CartPopUp/CartPopUp.component";
import { useCategories } from "../store/Categories/categories";
import Button from "../components/Button/Button.component";
import { useUserStore } from "../store/user/user";
import { Link } from "react-router-dom";

function Home() {
  const { categories, fetchCategories } = useCategories((state) => state);
  const [currentCategory, SetCurrentCategory] = useState(0);
  const { products, fetchProducts } = useProducts((state) => state);
  const [productsList, setProductsList] = useState<Product[]>();
  const { cart, clearCart } = useCartStore((state) => state);
  const setNavHistory = useUserStore((state) => state.setNavHistory);
  const [showCart, setShowCart] = useState(false);
  //console.log(cart);
  //console.log(showCart);
  useEffect(() => {
    //clearCart();
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    setNavHistory(window.location.pathname);
    setProductsList(products);
  }, [products]);

  useEffect(() => {
    if (currentCategory === 0) return setProductsList(products);
    if (productsList) {
      const newList = products.filter(
        (category) => category.categoriesId === currentCategory,
      );
      setProductsList(newList);
    }
  }, [currentCategory]);

  const handleDelete = () => {
    if (cart.length <= 0) return;
    if (!confirm("cancle selection ?")) return;
    clearCart();
    setShowCart(false);
  };

  return (
    <main className="min-w-full gap-y-5 pt-4 text-center justify-center">
      {
        //sowCart when Toggled
        showCart && (
          <div>
            <div
              className="fixed min-h-full min-w-full bg-gray-300 left-0 opacity-20 "
              onClick={() => setShowCart(false)}
            ></div>
            <CartPopUp />
          </div>
        )
      }

      {categories.map && (
        <ul className="   flex mt-6 space-x-4 justify-center overflow-x-scroll py-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Button
                buttonStyle={`${currentCategory === category.id ? "base" : "inverted"}`}
                onButtonClick={() => {
                  if (currentCategory !== category.id)
                    SetCurrentCategory(category.id);
                  else SetCurrentCategory(0);
                }}
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="fixed flex space-x-6 bottom-12 z-99">
        <Button buttonStyle="danger" onButtonClick={handleDelete}>
          Cancel
        </Button>

        <Link to="/cart">
          <Button buttonStyle="base">Generate</Button>
        </Link>
        <Button buttonStyle="base" onButtonClick={() => setShowCart(!showCart)}>
          <FontAwesomeIcon icon={faList} />
        </Button>
      </div>
      {productsList?.map && <ProductsList products={productsList} />}
    </main>
  );
}

export default Home;
