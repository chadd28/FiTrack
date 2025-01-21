import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className='container'>
                <Link to="/">
                    <h1>FiTrack</h1>
                </Link>
                <Link to="/Sessions">
                    <h1>Sessions</h1>
                </Link>
                <Link to="/Sessions">
                    <h1>Stats</h1>
                </Link>
            </div>
        </header>
    )
}


export default Navbar
