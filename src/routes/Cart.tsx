import { useCartStore } from "../store/Cart/cart";
import { BaseUrl } from "../lib/axios";
import { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const Cart = () => {
  const { cart } = useCartStore((state) => state);
  const contentRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      const TrigerDownload = async () => {
        setTimeout(HandleDownload, 1000);
      };
      TrigerDownload();
    }
  }, [cart]);

  const HandleDownload = useReactToPrint({
    contentRef,
    ignoreGlobalStyles: false,
    documentTitle: `${import.meta.env.VITE_SELLPOINT}-${Date()}`,
    //documentTitle: `${String(prompt("what is your name?"))}`,
  });
  return (
    <main className="min-w-full  pt-6 text-center">
      <div className="min-w-full mt-12 flex flex-wrap justify-center pb-12">
        {/*
        <div className="md:hidden fixed flex-row justify-center min-w-full min-h-full left-0 top-0 z-99 bg-white">
          <div className="flex-col justify-center">
            <h1 dir="ltr" className="mt-12">
              Generating Your Document ! 🥳
            </h1>
          </div>
        </div>
        */}
        <div className="min-w-full max-h-full flex overflow-scroll justify-center">
          <div ref={contentRef} dir="rtl">
            <table className="relative  text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 md:right-5  border-black border-2 max-w-full ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">description</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((cartItem) => (
                    <tr
                      key={cartItem.id}
                      className="bg-white dark:bg-gray-800 w-full"
                    >
                      <th className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white  border-black border-2 w-1/2">
                        <img
                          className="min-w-full"
                          src={BaseUrl + cartItem.image}
                        />
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  border-black border-2 w-1/4">
                        <p className="break-words text-wrap">
                          {cartItem.title}
                        </p>
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  border-black border-2 w-1/4">
                        <p className="break-words text-wrap">
                          {cartItem.description}
                        </p>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
