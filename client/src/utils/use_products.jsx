import { useEffect, useState } from "react";
import { useApi } from "./api"

export const useProducts = () => {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const {products} = await api.get("/products/");
    setProducts(products);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return [products, loading];
}