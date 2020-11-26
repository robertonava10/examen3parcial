import {db} from './firebase'
import {useState,useEffect} from 'react'


function App() {

 const [libros,setLibros] = useState([])
 const [titulo,setTitulo] = useState([])
 const [autor,setAutor] = useState([])
 const [idLibro,setIdLibro] = useState([])
 const [editorial,setEditorial] = useState([])
 const [clasificacion,setClasificacion] = useState([])
 const [modoEdicion,setModoEdicion] = useState(false)
 const [id,setId] = useState('')

 const getLibros = async () =>{
 const data = await db.collection('libros').get()
 const Arraylibros = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
 setLibros(Arraylibros)
 console.log(libros)
 }
 useEffect(()=>{
   getLibros()
 },[]) // eslint-disable-line react-hooks/exhaustive-deps

const agregarLibro = async (e) =>{
  e.preventDefault()
  
  const firebaseLibro = await db.collection('libros').add({
    titulo: titulo,
    editorial:editorial,
    clasificacion :clasificacion,
    idLibro:idLibro,
    autor:autor

    
  })
  getLibros()

}
const activarEdicion = (item) =>{
setModoEdicion(true)
setTitulo(item.titulo)
setAutor(item.autor)
setClasificacion(item.clasificacion)
setIdLibro(item.idLibro)
setEditorial(item.editorial)
setId(item.id)
}

const editarLibro =  async (e) =>{
  e.preventDefault()
  const firebaseLibro = await db.collection('libros').doc(id).update({
    titulo: titulo,
    editorial:editorial,
    clasificacion :clasificacion,
    idLibro:idLibro,
    autor:autor
  })
  getLibros()
}

const eliminarLibro = async (id) => {
  await db.collection('libros').doc(id).delete()

  getLibros()
}

  return (
    <div className="container">
      <h1>Listado de libros "EL ROBER"</h1>
       <h2>
         {modoEdicion ? 'Editar' : 'Agregar'}
       </h2>
       <form onSubmit={modoEdicion ? editarLibro : agregarLibro}>
         <div className="form-group">
           <label>Libro</label>
           <input type="text" className="form-control" value={titulo} onChange={e =>setTitulo(e.target.value)} placeholder= "Titulo" ></input>
           <input type="text" className="form-control" value={autor} onChange={e =>setAutor(e.target.value)} placeholder= "Autor" ></input>
           <input type="text" className="form-control" value={editorial} onChange={e =>setEditorial(e.target.value)} placeholder= "Editorial" ></input>
           <input type="text" className="form-control" value={clasificacion} onChange={e =>setClasificacion(e.target.value)} placeholder= "Clasificacion" ></input>
           <input type="text" className="form-control" value={idLibro} onChange={e =>setIdLibro(e.target.value)} placeholder= "IdLibro" ></input>
           
         </div>
         
         <button type="submit" className="btn btn-primary">Aceptar</button>
       </form>


      <ul className = "list-group">
        {
        libros.map(item => (
          <li className="list-group-item" key = {item.id}>
            <h1><span>{item.titulo}</span></h1>
            <h3><span>{item.autor}</span></h3>
            <h3><span>{item.clasificacion}</span></h3>
            <h3><span>{item.editorial}</span></h3>
            <h3><span>{item.idLibro}</span></h3>
           
            
            <button className="btn btn-danger btn.sm float-right"onClick={() => eliminarLibro(item.id)}>Eliminar</button>
            <button className="btn btn-warning btn.sm float-right mr-2" onClick={() => activarEdicion(item)}>Editar</button>
            
            
           
        </li>
        
        ))
        }
       
      </ul>
      
      
    </div>
  );
}

export default App;
