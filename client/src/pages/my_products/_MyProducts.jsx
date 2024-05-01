import { useMyProducts } from "../../utils/use_my_products"
import { Link } from "react-router-dom"

export const MyProducts = () => {
  const [myProducts, loading] = useMyProducts();

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="product-list">
      {
        myProducts.map(product => (
          <div key={product.id} className="product">
            <img src={`/images/${product.id}/`} alt="Image not found"/>
            <Link to={`/product/${product.id}`} className="name">{product.name}</Link>
            <span>${product.price}</span>
            <span>{product.description}</span>
            <Link to={`/product/new/${product.id}`} className="material-symbols-outlined icon-button">edit</Link>
          </div>
        ))
      }
    </div>
  )
}