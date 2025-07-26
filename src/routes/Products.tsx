import { Link } from "react-router-dom";
import Button from "../components/Button/Button.component";
import { useProducts } from "../store/Products/products";
import { useEffect } from "react";
import apiInstance from "../lib/axios";
import { BaseUrl } from "../lib/axios";
import { useUserStore } from "../store/user/user";

function Products() {
  const { products, fetchProducts } = useProducts((state) => state);
  const setNavHistory = useUserStore((state) => state.setNavHistory);

  const handleDelete = async (productId: number) => {
    if (confirm("تأكيد؟")) {
      await apiInstance.post(`/api/products/${productId}`);
      window.location.reload();
    } else {
      console.log("Aborting !");
    }
  };
  useEffect(() => {
    fetchProducts();
    setNavHistory(window.location.pathname);
  }, []);
  return (
    <main className="min-w-full justify-center gap-y-5 pt-12 text-center">
      <div className="justify-center">
        <div className="mt-4 flex flex-wrap justify-center gap-4 pb-12">
          <Link to="/products/upload">
            <Button buttonStyle="base">اضافة منتج</Button>
          </Link>
          <div className="min-w-full"></div>
          {products.map &&
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white/90 shadow-2xl rounded-md w-80 px-6 py-8"
              >
                <img
                  className="w-full h-60 object-center rounded-md"
                  src={BaseUrl + product.image}
                  alt={product.title}
                />
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <h3 className="text-lg font-bold text-slate-600 mb-2">
                    {product.description}{" "}
                  </h3>

                  <div className="container mx-auto flex justify-around">
                    <div className="min-w-[50%] px-2">
                      <Button
                        buttonStyle="dangerFullW"
                        onButtonClick={() => {
                          handleDelete(product.id);
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Products;
