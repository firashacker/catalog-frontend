import { useState, useEffect } from "react";
import { useCategories } from "../store/Categories/categories";
import apiInstance from "../lib/axios";
import Button from "../components/Button/Button.component";
import FormInput from "../components/FormInput/FormInput.component";
import imageCompression from "browser-image-compression";

const ProductUpload = () => {
  const [image, setImage] = useState<File | Blob>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { categories, fetchCategories } = useCategories((state) => state);
  const [category, setCategory] = useState<number>();
  const [clicked, setclicked] = useState(false);

  //@ts-ignore
  const debuglog = () => {
    console.log({
      title: title,
      descriptopn: description,
      image: image,
      category: category,
    });
  };
  //debuglog();

  const HandleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageFile = event.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob,
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
        ); // smaller than maxSizeMB

        setImage(compressedFile); // write your own logic
      } catch (error) {
        setImage(file);
        console.log(error);
      }
    }
  };

  const ShowUpload = () => {
    if (clicked) return;
    if (!image) return;
    if (!title) return;
    if (!category) return;
    return (
      <Button
        buttonStyle="baseFullW"
        onButtonClick={() => {
          handelSubmit();
        }}
      >
        Post
      </Button>
    );
  };

  const handelSubmit = async () => {
    if (!image) {
      alert("Please fill Image Field !");
      return null;
    }
    if (!title) {
      alert("Please fill Title Field !");
      return null;
    }

    if (!category) {
      alert("please Choose a category !");
      return null;
    }

    setclicked(true);
    try {
      const res1 = await apiInstance.postForm("/api/image", { image: image });
      console.log("res1: " + `/images/${res1.data.filename}`);
      const res2 = await apiInstance.post("/api/products", {
        title: title,
        description: description,
        image: `/images/${res1.data.filename}`,
        categoriesId: category,
      });
      console.log(res2);
      window.location.reload();
    } catch (error) {
      alert(error);
      setclicked(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5 pt-12 ">
        <FormInput
          inputId="Image"
          label="Image"
          inputOptions={{
            type: "file",
            accept: "image/*",
            required: true,
            onChange: (event: any) => {
              HandleFileChange(event);
            },
            name: "image",
          }}
        />

        {image ? (
          <img className="p-2" src={URL.createObjectURL(image)} />
        ) : (
          <img />
        )}
      </div>
      <div className="mb-5">
        <FormInput
          inputId="title"
          label="title"
          inputOptions={{
            type: "text",
            required: true,
            onChange: (event: any) => {
              setTitle(event.target.value);
            },
            name: "title",
            placeholder: "Title",
          }}
        />
      </div>

      <div className="mb-5">
        <FormInput
          inputId="description"
          label="description"
          inputOptions={{
            type: "text",
            required: false,
            onChange: (event: any) => {
              setDescription(event.target.value);
            },
            name: "discription",
            placeholder: "Discription",
          }}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="sections"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Category
        </label>
        <select
          onChange={(event) => {
            setCategory(Number(event.target.value));
            //console.log(event.target.value);
          }}
          id="sections"
          className="border-gray border-2 w-full px-4 py-3 rounded-lg border-gray-200 bg-white shadow-sm appearance-none focus:border-blue-500 outline-none focus:ring-2 ring-blue-500"
        >
          <option key="default" value="">
            Choose Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ShowUpload />
    </div>
  );
};

export default ProductUpload;
