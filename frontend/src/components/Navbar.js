import { Link, useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav className='navbar__nav'>
                <h1 className='navbar__brand'><Link to="/">Recipe Directory</Link></h1>
                <div className='search-bar'>
                    {/*Search bar */}
                  <Searchbar/>
                </div>
                <ul className='navbar__right'>
                    <button className="create-btn"><Link to="/create">Create Recipe</Link></button>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="signup">Signup</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar