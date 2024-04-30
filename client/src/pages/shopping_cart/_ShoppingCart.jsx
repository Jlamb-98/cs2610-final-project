import { Link } from "react-router-dom"
import { useShoppingCart } from "../../utils/use_shopping_cart"

export const ShoppingCart = () => {
  const [shoppingCart, cartLoading] = useShoppingCart();

  if (cartLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div className="shopping-cart">
        {
          shoppingCart.map(item => {
            <div key={item.id} className="item">
              <img src={`/images/${item.id}/`} alt="Image not found"/>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <span>${item.price}</span>
              <span>{item.description}</span>
            </div>
          })
        }
      </div>
    </div>
  )
}