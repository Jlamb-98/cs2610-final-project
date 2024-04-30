import { useEffect, useState } from "react";
import { useApi } from "./api"

export const useShoppingCart = () => {
  const api = useApi();
  const [shoppingCart, setShoppingCart] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  async function loadShoppingCart() {
    const {shoppingCart} = await api.get("/shopping_cart/");
    setShoppingCart(shoppingCart);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function deleteCartItem(id) {
    // TODO: make a DELETE request to delete item from cart
  }

  async function calculateTotal() {
    setTotal(0);
  }

  useEffect(() => {
    loadShoppingCart();
    calculateTotal();
  }, [])

  return [shoppingCart, total, loading, deleteCartItem];
}