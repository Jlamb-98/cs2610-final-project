import { useEffect, useState } from "react";
import { useApi } from "./api"
import { useNavigate } from "react-router-dom";

export const useProduct = (id) => {
  const api = useApi();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadProduct() {
    const {product} = await api.get(`/products/${id}/`);
    setProduct(product);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function addToCart(quantity) {
    const res = await api.post(`/shopping_cart/${product.id}/`, {quantity});
    navigate("/shopping_cart");
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return [product, loading, addToCart];
}