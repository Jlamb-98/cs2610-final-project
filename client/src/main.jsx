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
        path: "/product/:id",
        element: <Product />
      }, {
        path: "/shopping_cart",
        element: <ShoppingCart />
      }, {
        path: "/checkout",
        element: <Checkout />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
