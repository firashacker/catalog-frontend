import { useCategories } from "../store/Categories/categories";
import { useEffect, useState } from "react";
import FormInput from "../components/FormInput/FormInput.component";
import Button from "../components/Button/Button.component";
import apiInstance from "../lib/axios";
import { useUserStore } from "../store/user/user";

function Categories() {
  const { categories, fetchCategories } = useCategories((state) => state);
  const setNavHistory = useUserStore((state) => state.setNavHistory);
  const [addCategory, setAddCategory] = useState("");
  useEffect(() => {
    fetchCategories();
    setNavHistory(window.location.pathname);
  }, []);

  const handleAddCategory = async () => {
    if (!addCategory) return alert("حدد اسم الصنف رجاءاً");
    try {
      await apiInstance.post("/api/categories", { name: addCategory });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-w-full gap-y-5 pt-6 text-center">
      <div className="min-w-full mt-12 flex flex-wrap justify-center gap-4 pb-12">
        <div className="min-w-full  overflow-scroll">
          <table className="min-w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">معرف الصنف</th>
                <th className="px-6 py-3">اسم الصنف</th>
              </tr>
            </thead>
            <tbody>
              <tr key="999999999999" className="bg-white dark:bg-gray-800">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Button buttonStyle="base" onButtonClick={handleAddCategory}>
                    اضافة صنف
                  </Button>
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <FormInput
                    inputId="category"
                    label=""
                    inputOptions={{
                      type: "text",
                      required: true,
                      onChange: (event: any) => {
                        setAddCategory(event.target.value);
                        //console.log(event.target.value);
                      },
                      name: "category",
                      placeholder: "صنف جديد",
                    }}
                  />
                </th>
              </tr>
              {categories.map &&
                categories.map((category) => (
                  <tr key={category.id} className="bg-white dark:bg-gray-800">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {category.id}
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {category.name}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Categories;
