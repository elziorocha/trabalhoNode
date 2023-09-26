import './Contato.css';
import Header from '../../Components/Header';

function Contato(){
  return(
    <div className='background_contato'>
        <Header/>

        <section className='contatos'>
          <h2>Email</h2>
          <p>rochasenzo.04@gmail.com</p>

          <h2>Telefone</h2>
          <p>(42) 98401-8839</p>

          <h2>Linkedin</h2>
          
          <h2>GitHub</h2>

        </section>

    </div>
  );
}

export default Contato;