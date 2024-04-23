import { useState } from 'react'
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
        <h1>AmZam</h1>
        {/* TODO: maybe implement this search */}
        <input type='text' className='search-bar' placeholder='Search'/>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  )
}

export default App;
