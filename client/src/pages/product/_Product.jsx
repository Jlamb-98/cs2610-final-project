import { useParams } from "react-router-dom"
import { useProduct } from "../../utils/use_product";

export const Product = () => {
  const {id} = useParams();
  const [product, productLoading, addToCart] = useProduct(id);

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
        <button className="add-to-cart" onClick={() => addToCart()}>Add to Cart</button>
      </div>
    </div>
  )
}