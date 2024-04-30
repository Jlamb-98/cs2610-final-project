import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from "react-router-dom";
import { NewProduct } from './pages/new_product/_NewProduct.jsx'
import { Product } from './pages/product/_Product.jsx'
import { Home } from './pages/home/_Home.jsx'
import { ShoppingCart } from './pages/shopping_cart/_ShoppingCart.jsx'
import { Checkout } from './pages/checkout/_Checkout.jsx'
import { MyProducts } from './pages/my_products/_MyProducts.jsx'


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/product/new",
        element: <NewProduct />
      }, {
        path: "/product/new/:id",
        element: <NewProduct />
      }, {
        path: "/product/:id",
        element: <Product />
      }, {
        path: "/shopping_cart",
        element: <ShoppingCart />
      }, {
        path: "/checkout",
        element: <Checkout />
      }, {
        path: "/my_products",
        element: <MyProducts />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
