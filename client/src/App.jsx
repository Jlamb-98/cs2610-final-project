import { Link } from "react-router-dom"
import { Outlet } from 'react-router-dom';

function App() {
  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <nav className='nav'>
      <h1><Link to="/">AmZam</Link></h1>
        <div className='button-menu'>
          <Link to="/my_products" className="material-symbols-outlined icon-button">person</Link>
          <Link to="/product/new" className="material-symbols-outlined icon-button">add</Link>
          <Link to="/shopping_cart" className="material-symbols-outlined icon-button">shopping_cart</Link>
          <button className='material-symbols-outlined icon-button' onClick={logout}>Logout</button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
