import { useParams } from "react-router-dom"
import { useProduct } from "../../utils/use_product";
import { useState } from "react";

export const Product = () => {
  const {id} = useParams();
  const [product, productLoading, addToCart] = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (productLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="product-page">
      <img src={`/images/${product.id}/`} alt="Image not found"/>
      <div>
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
        <div>{product.description}</div>
        <div>
          <label htmlFor="quantity">Quantity </label>
          <input type="number" id="quantity" min={1} value={quantity} onChange={e => setQuantity(e.target.value)}/>
        </div>
        <button className="add-to-cart" onClick={() => addToCart(quantity)}>Add to Cart</button>
      </div>
    </div>
  )
}