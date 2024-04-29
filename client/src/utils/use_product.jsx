import { useEffect, useState } from "react";
import { useApi } from "./api"

export const useProduct = (id) => {
  const api = useApi();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProduct() {
    const {product} = await api.get(`/products/${id}`);
    setProduct(product);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function addToCart() {

  }

  useEffect(() => {
    loadProduct();
  }, []);

  return [product, loading, addToCart];
}