import {Link} from "react-router-dom"
import SessionButton from "./SessionButton"
const Navbar = () => {
  console.log("NAVBAR IS RENDERED")
  return (
    <div className='Navbar'>
        <Link className="navbar-link" to="/">home</Link>
        <Link className="navbar-link" to="/brands">Brands</Link>
        <Link className="navbar-link" to="/brands/af">Single</Link>
        <Link className="navbar-link" to="/cart">Cart</Link>
        <SessionButton />
    </div>
  )
}

export default Navbar