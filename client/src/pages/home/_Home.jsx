import { Link } from "react-router-dom"
import { useProducts } from "../../utils/use_products"

export const Home = () => {
  const [products, productsLoading] = useProducts();

  return (
    <div>
      <Link to="/product/new">List New Product</Link>
      <div>
        {
          products.map(product => (
            <div key={product.id} className="product">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
              <span>${product.price}</span>
              <span>{product.description}</span>
              <img src={`/images/${product.id}`} alt="" width={200}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}