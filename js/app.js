// Variables 
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners(){
  // Cuando agregas un curso presionando agregar al carrito
  listaCursos.addEventListener('click', agregarCurso)
}


// Funciones
function agregarCurso(e){
  e.preventDefault()
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado)
  }
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
  // agregarCarrito(infoCurso)
  // Agrega elementos al arreglo del carrito
  articulosCarrito = [...articulosCarrito, infoCurso]
  carritoHTML(infoCurso)
}
function agregarCarrito(infoCurso){
  // Agrega elementos al arreglo del carrito

  // if(carrito){
  //   const carritoNew = carrito.map( curso => curso.titulo === infoCurso.titulo ? (curso.cantidad++) : ([...articulosCarrito, infoCurso]) )
  // }else {
  //   carrito.push(infoCurso)
  // }
  // articulosCarrito = [...articulosCarrito, infoCurso]
  
}
// Muestra el carrito de compras  en el HTML
function carritoHTML(){
  // Limpiar HTML
  limpiarHTML()
  // Recore carrito y genera HTML
  articulosCarrito.forEach(( curso ) => { 
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
        ${curso.imagen}
      </td>
      <td>
        ${curso.titulo}
      </td>
      <td>
      ${curso.precio}
      </td>
      <td>
      ${curso.cantidad}
      </td>
    `
    // <td>
    // <th>${curso.imagen}</th>
    // <th>${curso.titulo}</th>
    // <th>${curso.precio}</th>
    // <th>${curso.cantidad}</th>
    // </td>
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