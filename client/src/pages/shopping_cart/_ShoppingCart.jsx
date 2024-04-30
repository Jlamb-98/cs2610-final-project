import { Link } from "react-router-dom"
import { useShoppingCart } from "../../utils/use_shopping_cart"

export const ShoppingCart = () => {
  const [shoppingCart, total, cartLoading, deleteCartItem] = useShoppingCart();
  if (cartLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
          {
            shoppingCart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`/images/${item.product.id}/`} alt="Image not found"/>
                <div>
                  <Link to={`/product/${item.product.id}/`}>{item.product.name}</Link>
                  <div>${item.product.price}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
                <button className="material-symbols-outlined icon-button" onClick={() => deleteCartItem(item)}>delete</button>
              </div>
            ))
          }
        <div>Total: ${total}</div>
        <button>Checkout</button>
      </div>
    </>
  )
}