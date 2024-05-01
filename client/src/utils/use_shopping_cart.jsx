import { useEffect, useState } from "react";
import { useApi } from "./api"
import { useNavigate } from "react-router-dom";

export const useShoppingCart = () => {
  const api = useApi();
  const [shoppingCart, setShoppingCart] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadShoppingCart() {
    const {shoppingCart} = await api.get("/shopping_cart/");
    setShoppingCart(shoppingCart);
    calculateTotal(shoppingCart);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function deleteCartItem(item) {
    const newShoppingCart = shoppingCart.filter(i => i !== item);
    setShoppingCart(newShoppingCart);
    await api.del(`/shopping_cart/${item.id}/`);
    calculateTotal(newShoppingCart);
  }

  function calculateTotal(shoppingCart) {
    let total = 0;
    for (const item of shoppingCart) {
      total += item.product.price * item.quantity;
    }
    setTotal(total);
  }

  async function checkout() {
    for (const item of shoppingCart) {
      deleteCartItem(item);
    }
    navigate("/checkout");
  }

  useEffect(() => {
    loadShoppingCart();
  }, [])

  return [shoppingCart, total, loading, deleteCartItem, checkout];
}