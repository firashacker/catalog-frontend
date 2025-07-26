import { useEffect, useState } from "react";
import { useOrders } from "../../store/Orders/orders";
import apiInstance from "../../lib/axios";

export interface Order {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: { title: string; price: number };
}

function OrderTicket() {
  const { currentOrderId } = useOrders((state) => state);
  const [orders, setOrders] = useState<Order[]>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await apiInstance.get(`/api/ticket/${currentOrderId}`);
        setOrders(response.data);
      } catch (error) {
        alert(error);
      }
    };
    getTicket();
    console.log(orders);
  }, []);

  useEffect(() => {
    let Total = 0;
    orders?.map((order) => (Total += order.quantity * order.product?.price));
    setTotalPrice(Total);
  }, [orders]);

  return (
    <div className=" bg-white  fixed p-4 top-30 bottom-30 left-0 md:left-30 md:right-30 right-0 opacity-100 shadow-2xl rounded-2xl m-2 z-101 overflow-scroll">
      <div className="min-w-full   justify-center gap-4 ">
        <table className="min-w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="border border-gray-300 px-6 py-3">الأسم</th>
              <th className=" border border-gray-300 px-6 py-3">السعر</th>
              <th className="border border-gray-300 px-6 py-3">الكمية</th>
              <th className="border border-gray-300 px-6 py-3">الاجمالي</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id} className="bg-white dark:bg-gray-800">
                  <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.product?.title}
                  </th>
                  <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.product?.price}₪
                  </th>
                  <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.quantity}
                  </th>
                  <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.product?.price * order.quantity}₪
                  </th>
                </tr>
              ))}
            <tr key="-1" className="bg-blue-300 dark:bg-gray-800">
              <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
              <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>

              <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                المجموع
              </th>
              <th className="border border-gray-300 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {totalPrice}₪
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTicket;
