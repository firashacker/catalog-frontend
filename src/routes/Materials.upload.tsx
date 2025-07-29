import { useState } from "react";
import apiInstance from "../lib/axios";
import Button from "../components/Button/Button.component";
import FormInput from "../components/FormInput/FormInput.component";
import imageCompression from "browser-image-compression";

const MaterialUpload = () => {
  const [image, setImage] = useState<File | Blob>();
  const [title, setTitle] = useState<string>();
  const [clicked, setclicked] = useState(false);

  const HandleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageFile = event.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 720,
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

    setclicked(true);
    try {
      const res1 = await apiInstance.postForm("/api/image", { image: image });
      console.log("res1: " + `/images/${res1.data.filename}`);
      const res2 = await apiInstance.post("/api/materials", {
        title: title,
        //description: description,
        image: `/images/${res1.data.filename}`,
      });
      console.log(res2);
      window.location.reload();
    } catch (error) {
      alert(error);
      setclicked(false);
    }
  };

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

      {/*<div className="mb-5">
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
      </div>*/}

      <ShowUpload />
    </div>
  );
};

export default MaterialUpload;
