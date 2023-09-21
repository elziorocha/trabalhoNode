import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas
import Error from '../pages/Error';
import Sobre from '../pages/Sobre';
import Home from '../pages/Home';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='*' element={<Error/>} />
                <Route path='/sobre' element={<Sobre/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;