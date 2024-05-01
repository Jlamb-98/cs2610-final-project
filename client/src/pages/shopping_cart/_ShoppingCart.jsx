import { Link } from "react-router-dom"
import { useShoppingCart } from "../../utils/use_shopping_cart"

export const ShoppingCart = () => {
  const [shoppingCart, total, cartLoading, deleteCartItem, checkout] = useShoppingCart();
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
        <h2>Shopping Cart</h2>
          {
            shoppingCart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`/images/${item.product.id}/`} alt="Image not found"/>
                <div>
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  <div>${item.product.price}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
                <button className="material-symbols-outlined icon-button" onClick={() => deleteCartItem(item)}>delete</button>
              </div>
            ))
          }
        <div className="total">Total: ${total}</div>
        <div className="button">
          <button className="rounded-button" onClick={() => checkout()}>Checkout</button>
        </div>
      </div>
    </>
  )
}