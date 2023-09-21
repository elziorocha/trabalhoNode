import { Link } from 'react-router-dom';
import './Sobre.css';

function Sobre() {
  return (
    <div>
      <div className='background_sobre'>

      <ul class="circles">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
      <br />
        <div className="sobre_caixa">
          <h2>Acesse aos Jogos Instantaneamente</h2>
          <h3>Encontre entre 500.000 jogos à sua disposição para baixar e se divertir!<br /><br />
            Conecte-se com seus amigos<br /><br />Aproveite as promoções exclusivas
          </h3>
        </div>
        <br /><br /><Link to="/jogos" className='links_sobre'>Navegue pela loja</Link>

        <div className="sobre_caixa">
          <h2>Participe da Comunidade</h2>
          <h3>Conheça novas pessoas, entre em grupos, converse enquanto joga e muito mais!<br /><br />
            Com mais de 100 milhões de prováveis amigos <br />(ou inimigos), a diversão nunca acaba.</h3>
        </div>
        <br /><br /><Link to="*" className='links_sobre'>A Comunidade</Link>

        <div className="sobre_caixa">
          <h2>Lance o seu jogo</h2>
          <h3>Tenha a oportunidade de lançar o seu jogo em nosso site!<br/>
           A Atlantic Games fornece um conjunto de ferramentas e serviços para auxiliar
           no seu desenvolvimento</h3>
        </div>

        <br /><br /><Link to="/contato" className='links_sobre'>Nosso Contato</Link>
      </ul>
      </div>
    </div>
  );
}

export default Sobre;