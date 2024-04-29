import { useApi } from "./api"

export const useProduct = () => {
  const api = useApi();
  const [products, setProducts] = useState([]);

  return [products];
}