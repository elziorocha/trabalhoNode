import './Header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <div id="header">
                <nav>
                    <ul>
                        <li><Link to="/" className='routes'>Home</Link></li>
                        <li><Link to="/sobre" className='routes'>Sobre</Link></li>
                        <li><Link to="/portfolio" className='routes'>Portfólio</Link></li>
                        <li><Link to="/contato" className='routes'>Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;