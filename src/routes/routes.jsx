import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas
import Error from '../pages/Error';
import Sobre from '../pages/Sobre';
import Home from '../pages/Home';
import Contato from '../pages/Contato';
import Portfolio from '../pages/Portfolio';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='*' element={<Error/>} />
                <Route path='/sobre' element={<Sobre/>} />
                <Route path='/portfolio' element={<Portfolio/>} />
                <Route path='/contato' element={<Contato/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;