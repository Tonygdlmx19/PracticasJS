
const carrito = document.querySelector(`#carrito`);
const contenedorCarrito = document.querySelector(`#lista-carrito tbody`);
const vaciarCarritoBtn = document.querySelector(`#vaciar-carrito`);
const listaCursos = document.querySelector(`#lista-cursos`);
let arregloCarrito = [];


// Seccion de eventListeners
cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener(`click`, agregarCurso);
}

carrito.addEventListener(`click`, eliminarCurso);

vaciarCarritoBtn.addEventListener(`click`, () => {  ;
    arregloCarrito = [], // Reseteamos el arreglo

    limpiarHTML();  // Eliminiamos todo el HTML
})


// Secciond e funciones, no todas las funciones se crearon en orden, como se fueron necesitando se fueron creando.
function agregarCurso(e) {
    e.preventDefault();

    
    if(e.target.classList.contains(`agregar-carrito`)){
        const informacion = e.target.parentElement.parentElement;


        segunda(informacion);

    }  
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains(`borrar-curso`)){
        const cursoId = e.target.getAttribute(`data-id`);

        arregloCarrito = arregloCarrito.filter( curso => curso.id !== cursoId);

        console.log(arregloCarrito);

        carritoHTML();
    }
}



function segunda(curso){
   // console.log(curso);


    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector(`h4`).textContent,
        instructor: curso.querySelector(`p`).textContent,
        precio: curso.querySelector(`.precio span`).textContent,
        id: curso.querySelector(`a`).getAttribute(`data-id`),
        cantidad: 1,
       
    }

    const existe = arregloCarrito.some( curso => curso.id === infoCurso.id );// Aqui estamos declarando la variable "existe" comparando "curso id " con nuestro contenido en el objeto "ïnfoCurso.id"  OJO ! solamente el nombre pero no el valor.
    
    // En esta parte estamos declarando un "if" para actualizar la cantidad mediante una funcion con el nombre de la variable "cursos" la cual va a comparar ahora si el valor y en caso de ser igual aumentara en 1 es decir ++
    if(existe){
        const cursos = arregloCarrito.map( function(curso) {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        
        arregloCarrito = [...cursos];

    }else{
        // Agrega elementos al articulo carrito
    arregloCarrito = [...arregloCarrito, infoCurso];
    }
    

    console.log(arregloCarrito);

    carritoHTML();
}

function carritoHTML (){
    limpiarHTML();
    
    arregloCarrito.forEach (curso => {
        const row = document.createElement(`tr`);
        row.innerHTML = `
            <td>< img src = "${curso.imagen}"></td>
            <td>${curso.nombre}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>
            `;

    contenedorCarrito.appendChild(row);
       } );
}

function limpiarHTML(){
    
    contenedorCarrito.innerHTML = ``;
}

