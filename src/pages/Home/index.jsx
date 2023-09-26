import './Home.css';
import fotoeu from '../../Assets/eu1.jpg';
import Header from '../../Components/Header';

function Home(){
  return(
      <div className='background_sobre'>
      <Header/>

        <section className='Banner_perfil'>
          <img src={fotoeu} alt='imagem perfil'/>
          <h1>Enzo Rocha</h1>
          <h2>FrontEnd Portfolio</h2>
        </section>
        
      </div>
  );
}

export default Home;