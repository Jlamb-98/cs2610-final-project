import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  function selectFile(e) {
    console.log(e.target.value);
  }

  async function saveProduct(e) {
    e.preventDefault();

    // TODO: validate number inputs

    // TODO: save product in database

    navigate(-1);
  }

  return (
    <form onSubmit={saveProduct}>
      <div>
        <label htmlFor="name">Product Name </label>
        <input type="text" id="name"/>
      </div>
      <div>
        <label htmlFor="price">Price (USD$) </label>
        <input type="number" id="price" min={1}/>
      </div>
      <div>
        <label htmlFor="quantity">Quantity </label>
        <input type="number" id="quantity" min={1}/>
      </div>
      <label htmlFor="description">Description </label>
      <textarea type="textarea" id="description" rows={10}/>
      <input type="file" onChange={selectFile} accept="image/*"/>
      <div className="button">
        <button>List Product</button>
      </div>
    </form>
  )
}