import {Link} from "react-router-dom"
import SessionButton from "./SessionButton"
const Navbar = () => {
  console.log("NAVBAR IS RENDERED")

  return (
    <div className='Navbar'>
        <Link className="Link" to="/">home</Link>
        <Link className="Link" to="/brands">Brands</Link>
        <Link className="Link" to="/brands/af">Single</Link>
        <Link className="Link" to="/cart">Cart</Link>
        <SessionButton />
    </div>
  )
}

export default Navbar