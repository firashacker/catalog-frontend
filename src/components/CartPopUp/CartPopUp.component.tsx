import { useCartStore } from "../../store/Cart/cart";
import { BaseUrl } from "../../lib/axios";

const CartPopUp = () => {
  const { cart } = useCartStore((state) => state);
  return (
    <div>
      <div className=" bg-white  fixed p-4 top-30 bottom-30 left-0 md:left-30 md:right-30 right-0 opacity-100 shadow-2xl rounded-2xl m-2 z-101 overflow-y-scroll overflow-x-clip">
        <table className="relative min-w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 md:right-5">
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
                <tr key={cartItem.id} className="bg-white dark:bg-gray-800">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="max-w-40" src={BaseUrl + cartItem.image} />
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cartItem.title}
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cartItem.description}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPopUp;
