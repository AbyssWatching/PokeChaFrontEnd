import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from '../assets/images/pokecha-logo.png'
import "../assets/css/navbar.css"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            <img className='logo' src={logo} alt='pokecha logo'></img>
          </h1>
          
        </Link>
        <nav>
          {user && (
            <div>
              <span className='username'>{user.email}'s Pokedex</span>
              <button className='logout-button btn' onClick={handleClick}><i className="fa fa-close"></i></button>
            </div>
          )}
          {!user && (
            <div>
              <button className='btn1 btn'>
              <Link to="/login">Login</Link>
              </button>
              <button className='btn2 btn'>
              <Link to="/signup">Signup</Link>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar