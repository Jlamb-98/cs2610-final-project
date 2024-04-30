import { useApi } from "./api";
import { useState, useEffect } from "react";

export const useMyProducts = () => {
  const api = useApi();
  const [myProducts, setMyProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadMyProducts() {
    const {products} = await api.get("/my_products/");
    setMyProducts(products);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    loadMyProducts();
  }, []);

  return [myProducts, loading];
}