import './Contato.css';
import Header from '../../Components/Header';

function Contato(){
  return(
    <div className='background_contato'>
        <Header/>

        <section className='contatos'>
          <h2>Email</h2>
          <h3>rochasenzo.04@gmail.com</h3>

          <h2>Telefone</h2>
          <h3>(42) 98401-8839</h3>

          <h2>LinkedIn</h2>
          <h3><a href="https://www.linkedin.com/in/elziorocha">linkedin.com/in/elziorocha</a></h3>

          <h2>GitHub</h2>
          <h3><a href='https://github.com/elziorocha'>github.com/elziorocha</a></h3>

        </section>

    </div>
  );
}

export default Contato;