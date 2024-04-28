import { Link } from "react-router-dom"
import { useProducts } from "../../utils/use_products"

export const Home = () => {
  const [products, productsLoading] = useProducts();

  return (
    <div>
      <div className="product-list">
        {
          products.map(product => (
            <div key={product.id} className="product">
              <img src={`/images/${product.id}`} alt=""/>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
              <span>${product.price}</span>
              <span>{product.description}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}