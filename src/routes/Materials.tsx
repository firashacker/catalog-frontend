import { Link } from "react-router-dom";
import Button from "../components/Button/Button.component";
import { useMaterials } from "../store/Materials/materials";
import { useEffect } from "react";
import apiInstance from "../lib/axios";
import { BaseUrl } from "../lib/axios";
import { useUserStore } from "../store/user/user";

function Materials() {
  const { materials, fetchMaterials } = useMaterials((state) => state);
  const setNavHistory = useUserStore((state) => state.setNavHistory);

  const handleDelete = async (materialId: number) => {
    if (confirm("تأكيد؟")) {
      await apiInstance.post(`/api/materials/${materialId}`);
      window.location.reload();
    } else {
      console.log("Aborting !");
    }
  };
  useEffect(() => {
    fetchMaterials();
    setNavHistory(window.location.pathname);
  }, []);
  return (
    <main className="min-w-full justify-center gap-y-5 pt-12 text-center">
      <div className="justify-center">
        <div className="mt-4 flex flex-wrap justify-center gap-4 pb-12">
          <Link to="/materials/upload">
            <Button buttonStyle="base">اضافة خامة</Button>
          </Link>
          <div className="min-w-full"></div>
          {materials.map &&
            materials.map((material) => (
              <div
                key={material.id}
                className="bg-white/90 shadow-2xl rounded-md w-80 px-6 py-8"
              >
                <img
                  className="w-full h-60 object-center rounded-md"
                  src={BaseUrl + material.image}
                  alt={material.title}
                />
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-bold mb-2">{material.title}</h3>

                  <div className="container mx-auto flex justify-around">
                    <div className="min-w-[50%] px-2">
                      <Button
                        buttonStyle="dangerFullW"
                        onButtonClick={() => {
                          handleDelete(material.id);
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

export default Materials;
