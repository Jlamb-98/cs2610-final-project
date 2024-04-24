import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div>
      <Link to={"/product/new"}>List New Product</Link>
      <div>
        Display products for sale here!!!
      </div>
    </div>
  )
}