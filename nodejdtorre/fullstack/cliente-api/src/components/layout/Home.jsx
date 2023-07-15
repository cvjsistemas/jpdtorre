import Header from './Header';
import Navegacion from './Navegacion';
import useAuth from '../../hooks/useAuth';

const Home = () => {

    const {auth} = useAuth();
    console.log(auth);

    //console.log(auth);


    
  return (
    <>
        <Header />
        <div className="grid contenedor contenido-principal">
        <Navegacion />

        {/* <main className="caja-contenido col-9">

         </main>    */}

        </div>

    
    </>
    
  )
}

export default Home