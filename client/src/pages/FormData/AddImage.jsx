import { useRef, useState } from "react";
import css from "./AddImage.module.css";
import axios from "axios";

export const AddImage = () => {
  const [picture, setPicture] = useState(null);
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formRef);
    const fd = new FormData(formRef.current);
    try {
      const res = await axios.post("http://localhost:3000/upload", fd);
      console.log(res);
      setPicture(res.data.filename);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="name" />
        <input type="text" name="surname" />
        <input type="file" name="picture" accept="image/*" />

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <img src={picture} alt="" width="400" />
    </div>
  );
};
