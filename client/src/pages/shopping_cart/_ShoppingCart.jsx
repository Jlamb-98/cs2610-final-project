import { Link } from "react-router-dom"
import { useShoppingCart } from "../../utils/use_shopping_cart"

export const ShoppingCart = () => {
  const [shoppingCart, products, cartLoading, deleteCartItem] = useShoppingCart();
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
            products.map(product => (
              <div key={product.id} className="cart-item">
                <img src={`/images/${product.id}/`} alt="Image not found"/>
                <div>
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                  <div>${product.price}</div>
                  <div>Qty:</div>
                </div>
                <button className="material-symbols-outlined icon-button" onClick={deleteCartItem(product.id)}>delete</button>
              </div>
            ))
          }
        <div>Total: $</div>
        <button>Checkout</button>
      </div>
    </>
  )
}