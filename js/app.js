// Variables 
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
let articulosCarrito = []


cargarEventListeners()
function cargarEventListeners(){

  // Muestra los cursos de LS 
  document.addEventListener('DOMContentLoaded',cargarLS)
  // Cuando agregas un curso presionando agregar al carrito
  listaCursos.addEventListener('click', agregarCurso)

  // Elimina cursos del carrito 
  carrito.addEventListener('click', eliminarCurso)
  
  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", vaciaCarrito)
}


// Funciones
function agregarCurso(e){
  e.preventDefault()
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado)
  }
}

function eliminarCurso(e){
  if(e.target.classList.contains("borrar-curso")){
    const cursoId = e.target.getAttribute('data-id')
    articulosCarrito = articulosCarrito.filter( curso => cursoId !== curso.id )
    sincronizarLS()
    carritoHTML()
  }
}
function vaciaCarrito(e){
  articulosCarrito = []
  sincronizarLS()
  carritoHTML()
}
// Lee el contenido del HTML al que le dimos click y extrae informacion del curso
function leerDatosCurso(curso){
  // Crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }  
  agregarCarrito(infoCurso)
}

function agregarCarrito(infoCurso){
  const existe = articulosCarrito.some( curso =>  curso.id === infoCurso.id  )
  if(existe){
    // actualizo cantidad
    const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id ){
          curso.cantidad++
          return curso
        }else{
          return curso
        }
      } 
    )
    articulosCarrito = [...cursos]
  }else{
    articulosCarrito = [...articulosCarrito, infoCurso]
  }
  sincronizarLS()
  carritoHTML()
}
// Muestra el carrito de compras  en el HTML
function carritoHTML(){
  // Limpiar HTML
  limpiarHTML()
  // Recorre carrito y genera HTML
  articulosCarrito.forEach(( curso ) => { 
    const { imagen, titulo, precio, cantidad, id } = curso
    const row = document.createElement('tr')
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id=${id}>X</a>
      </td>
    `
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row)

  })
}
// Elimina cursos del tbody
function limpiarHTML ( ) {
  // Forma Lenta
  // contenedorCarrito.innerHTML = ''
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
// Sincronizar LS
function sincronizarLS(){
  localStorage.setItem('carrito', (JSON.stringify(articulosCarrito)))
}
// Cargar LS
function cargarLS(){
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
  carritoHTML()
}