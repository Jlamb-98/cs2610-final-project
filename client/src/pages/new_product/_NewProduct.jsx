import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useApi } from "../../utils/api";

export const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const api = useApi();

  function selectImage(e) {
    // TODO: can I add multiple images?
    setImage(e.target.files[0]);
  }

  async function saveProduct(e) {
    e.preventDefault();
    setErrorMessage("");

    if (name === "") {
      setErrorMessage("Name cannot be blank");
      return;
    }
    if (price < 1) {
      setErrorMessage("Price must be greater than $0");
      return;
    }
    if (description === "") {
      setErrorMessage("Description cannot be blank");
      return;
    }
    if (quantity < 1) {
      setErrorMessage("Quantity must be greater than 0");
      return;
    }
    if (image === null || image === undefined) {
      setErrorMessage("Please provide an image");
      return;
    }

    // create product in database
    const res = await api.post("/products/", {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      file: image
    }, true);

    if (res.success !== true) {
      setErrorMessage(res.message);
      return;
    }

    navigate("/");
  }

  return (
    <form onSubmit={saveProduct}>
      <div>
        <label htmlFor="name">Product Name </label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="price">Price (USD$) </label>
        <input type="number" id="price" min={1} value={price} onChange={e => setPrice(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="quantity">Quantity </label>
        <input type="number" id="quantity" min={1} value={quantity} onChange={e => setQuantity(e.target.value)}/>
      </div>
      <label htmlFor="description">Description </label>
      <textarea type="textarea" id="description" rows={10} value={description} onChange={e => setDescription(e.target.value)}/>
      <input type="file" onChange={selectImage} accept="image/*"/>
      <div className="button">
        <button>List Product</button>
      </div>
      <span className="error-message">{errorMessage}</span>
    </form>
  )
}