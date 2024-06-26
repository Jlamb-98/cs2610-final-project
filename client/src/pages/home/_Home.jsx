import { Link } from "react-router-dom"
import { useProducts } from "../../utils/use_products"

export const Home = () => {
  const [products, productsLoading] = useProducts();

  if (productsLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      <h2>Recent Listings</h2>
      <div className="product-list">
        {
          products.map(product => (
            <div key={product.id} className="product">
              <img src={`/images/${product.id}/`} alt="Image not found"/>
              <Link to={`/product/${product.id}`} className="name">{product.name}</Link>
              <span>${product.price}</span>
              <span>{product.description}</span>
            </div>
          ))
        }
      </div>
    </>
  )
}