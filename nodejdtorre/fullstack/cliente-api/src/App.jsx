//import Header from './components/layout/Header';
//import Navegacion from './components/layout/Navegacion';
import MyRoutes from './router/MyRoutes';


function App() {
 

  return (
      <div> 
        {/* <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion /> */}

          <main className="caja-contenido col-9">
              <MyRoutes />
           </main> 


       </div>
      // </div> 
  )
}

export default App
