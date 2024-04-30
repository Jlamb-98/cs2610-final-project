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

  async function deleteCartItem(item) {
    setShoppingCart(shoppingCart.filter(i => i !== item))
    await api.del(`/shopping_cart/${item.id}/`)
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