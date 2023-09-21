import { Link } from 'react-router-dom';
import './Error.css';

function Erro(){
  return(
    <div className="not-found">
      <h1>Error 404</h1>
      <h2>Pagina não encontrada!</h2>
      <Link to="/">Volte para a Home</Link>
    </div>
  )
}

export default Erro;