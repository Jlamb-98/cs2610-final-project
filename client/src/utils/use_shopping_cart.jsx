import { useEffect, useState } from "react";
import { useApi } from "./api"

export const useShoppingCart = () => {
  const api = useApi();
  const [shoppingCart, setShoppingCart] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  async function loadShoppingCart() {
    const {shoppingCart, products} = await api.get("/shopping_cart/");
    // console.log(products)
    setShoppingCart(shoppingCart);
    setProducts(products);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function deleteCartItem(id) {
    // TODO: make a DELETE request to delete item from cart
  }

  useEffect(() => {
    loadShoppingCart();
  }, [])

  return [shoppingCart, products, loading, deleteCartItem];
}