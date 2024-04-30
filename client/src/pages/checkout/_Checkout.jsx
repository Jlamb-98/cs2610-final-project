import { Link } from "react-router-dom"

export const Checkout = () => {
  // This would have a form for card and shipping information

  return (
    <>
    <div>
      <h1>Thank you for your purchase!!!</h1>
      <Link to="/" className="rounded-button">Continue Shopping</Link>
    </div>
    </>
  )
}