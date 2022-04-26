const login = document.querySelector('.login');
const sideBar = document.querySelector('.sideBar');
const navBar = document.querySelector('.navBar');
const empresas = document.querySelector('.empresas');
const agregarEmpresa = document.querySelector('.agregar-empresa');
const productos = document.querySelector('.productos');
const agregarProductos = document.querySelector('.agregar-productos');
const motoristas = document.querySelector('.motoristas');
const agregarMotorista = document.querySelector('.agregar-motorista');
const ordenes = document.querySelector('.ordenes');
const asignarOrden = document.querySelector('.asignar-orden');
const linkToEmpresas = document.querySelector('.sidebar-empresas')
const linkToProductos = document.querySelector('.sidebar-productos')
const linkToMotoristas = document.querySelector('.sidebar-motoristas')
const linkToOrdenes = document.querySelector('.sidebar-ordenes');
const linkToLogin = document.querySelector('.sidebar-login');


const loginBtn = document.querySelector('.login-btn');
const agregarBtn = document.querySelector('.agregar-item');
const lapizBtn = document.querySelectorAll('.lapiz-agregar');
const empresaCancelarBtn = document.querySelector('.empresa-no-agregar');
const empresaAgregarBtn = document.querySelector('.empresa-agregar');
const lapizBtn2 = document.querySelectorAll('.lapiz-producto');
const agregarProductoBtn = document.querySelector('.agregar-producto');
const cancelarProductoBtn = document.querySelector('.agregar-no-producto');
const lapizBtn3 = document.querySelectorAll('.lapiz-motorista');
const agregarEmpleadoBtn = document.querySelector('.agregarEmpleado');
const noAgregarEmpleadoBtn = document.querySelector('.noAgregarEmpleado')
const editarOrden = document.querySelectorAll('.editar-orden');
const modificarOrden = document.querySelector('.btn-modificar-orden');
const noModificarOrden = document.querySelector('.btn-no-modificar-orden')
let tablaEmpresas = document.querySelector('.contenido-tabla-empresas');
let tablaProductos = document.querySelector('.contenido-tabla-productos');
let tablaRepartidores = document.querySelector('.contenido-tabla-repartidores');
let tablaOrden = document.querySelector('.contenido-tabla-ordenes');
let btnAgregarElemento = document.querySelector('.agregar-elemento-btn');
var obj;

function cambiarRepartidorOrden() {
    let idRepartidor = document.querySelector('.nombre-repartidor-asignar').value;
    idRepartidor = parseInt(idRepartidor)
    obj.repartidor = idRepartidor;
    axios({
        url: '../Ez-Food-BE/api/asignar-orden.php',
        method: 'POST',
        responseType: 'json',
        data: obj,
    }).then(response => {
        tablaOrden.innerHTML = ``;
        crearOrdenes();
    }).catch(e => {
        console.log(e);
    })

}

function asignarUnaOrden(orden) {
    navBar.classList.add('oculto');
    ordenes.classList.add('oculto');

    asignarOrden.classList.remove('oculto');
    obj = JSON.parse(decodeURIComponent(orden))

}

function crearProducto() {

    let nombreProducto = document.querySelector('.input-nombre-producto').value;
    let descripcion = document.querySelector('.descripcion-nombre-producto').value;
    let precio = document.querySelector('.precio-nombre-producto').value;
    let categoria = document.querySelector('.categoria-nombre-producto').value;
    let empresa = document.querySelector('.empresa-nombre-producto').value;
    let id = document.querySelector('.id-nombre-producto').value;

    let nuevoProducto = {
        "categoria": categoria,
        "empresa": empresa,
        "idProducto": id,
        "empresaProducto": nombreProducto,
        "descripcionProducto": descripcion,
        "precioProducto": precio,
        "imagenProducto": "PICALIFORNIA.png"
    }

    axios({
        url: '../Ez-Food-BE/api/crear-orden.php',
        responseType: 'json',
        method: 'POST',
        data: nuevoProducto
    }).then(res => {
        crearProductos();
    }).catch(e => {

    })
}

function generarFormularioProducto() {
    ocultarTodo();
    sideBar.classList.remove('oculto');
    agregarProductos.classList.remove('oculto');

}

function crearEmpresaNueva() {

    nombreEmpresa = document.querySelector('.nombre-empresa').value;
    descripcion = document.querySelector('.descripcion-empresa').value;
    puntuacion = document.querySelector('.puntuacion-empresa').value;
    categoria = document.querySelector('.categoria-empresa').value;


    let empresa = {
        'categoria': categoria,
        'nombreEmpresa': nombreEmpresa,
        "puntuacion": puntuacion,
        "descripcionEmpresa": descripcion,
        "productosEmpresa": []
    }

    axios({
        url: '../Ez-Food-BE/api/admin.php',
        method: 'POST',
        responseType: 'json',
        data: empresa
    }).then((response) => {

        crearEmpresas();
    }).catch(e => {
        console.log(e);
    })
}

function generarFormularioEmpresa() {
    ocultarTodo();
    agregarEmpresa.classList.remove('oculto');
    sideBar.classList.remove('oculto');



}

function crearOrdenes() {
    axios({
        url: '../Ez-Food-BE/api/admin.php?ordenes',
        method: 'GET',
        responseType: 'json'
    }).then(res => {
        res.data.forEach(orden => {
            tablaOrden.insertAdjacentHTML('beforeend',
                `
            <tr>
            <th scope="row">${orden.id}</th>
            <td>${orden.repartidor ? orden.repartidor : 'Sin repartidor'}</td>
            <td>${orden.Total}</td>
            <td>${orden.direccionOrigen}</td>
            <td>${orden.direccionDestino}</td>
            <td><button type="button" class="btn btn-light">${orden.estado ? orden.estado : 'No asignada'}</button></td>
            <td><i class="fas fa-pencil-alt px-3 editar-orden" onclick="asignarUnaOrden('${encodeURIComponent(JSON.stringify(orden))}')"></i><i class="fa fa-trash"></i></td>
        </tr>
            `
            )
        })

        btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item">Agregar Orden</button>`
    })
}

function crearRepartidores() {

    axios({
        url: '../Ez-Food-BE/api/admin.php?repartidores',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        response.data.forEach(motorista => {
            tablaRepartidores.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th scope="row">${motorista.repartidor}</th>
            <td>${motorista.id}</td>
            <td><button type="button" class="btn btn-${motorista.ordenes.length > 0 ? 'primary' : 'light'}">${motorista.ordenes.length > 0 ? 'Activo' : 'Inactivo'}</button></td>
            <td><i class="fas fa-pencil-alt px-3 lapiz-motorista"></i><i class="fa fa-trash"></i></td>
        </tr>
            `
            )
        })

        btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item">Agregar Repartidor</button>`
    })



}

function crearProductos() {

    axios({
        url: '../Ez-Food-BE/api/admin.php?productos',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        tablaProductos.innerHTML = ``;

        response.data.forEach(producto => {
            tablaProductos.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th scope="row">${producto.empresaProducto}</th>
            <th scope="row">${producto.categoria}</th>
            <td>${producto.empresa}</td>
            <td>${producto.precioProducto}</td>
            <td><i class="fas fa-pencil-alt px-3 lapiz-producto"></i><i class="fa fa-trash"></i></td>
        </tr>
            `
            )

        })

        btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item" onclick="generarFormularioProducto()">Agregar Producto</button>`
    }).catch(e => {
        console.log(e);
    })

}


function crearEmpresas() {
    axios({
        url: '../Ez-Food-BE/api/admin.php?empresas',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        tablaEmpresas.innerHTML = ``;

        response.data.forEach(empresa => {
            tablaEmpresas.insertAdjacentHTML('beforeend',
                `
            <tr>
                <th scope="row">${empresa.nombreEmpresa}</th>
                <td>${empresa.productosEmpresa[0] ? empresa.productosEmpresa[0].categoria : 'Inactiva'}</td>
                <td>${empresa.puntuacion}</td>
                <td><button type="button" class="btn btn-${empresa.productosEmpresa[0] ? 'primary' : 'light'}">${empresa.productosEmpresa[0] ? 'Activo' : 'Inactivo'}</button></td>
                <td><i class="fas fa-pencil-alt px-3 lapiz-agregar"></i><i class="fa fa-trash"></i></td>
            </tr>   
            `
            )

        })


    }).catch(e => {
        console.log(e);
    })


}



function logCredenciales() {
    axios({
        url: '../Ez-Food-BE/api/admin.php',
        method: 'GET',
        responseType: 'json',
    }).then((response) => {

        let usuarioLog = document.querySelector('.login-input').value;
        let contrasenaLog = document.querySelector('.password-input').value;

        if (usuarioLog && contrasenaLog) {
            let contador = 0;

            response.data.forEach((data) => {
                if (data.usuario == usuarioLog && data.contrasena == contrasenaLog) {
                    renderizarEmpresas();

                    contador++;
                }
            })

            if (contador == 0) {
                alert('Usuario no encontrado\nIntente nuevamente o cree uno nuevo');
            }

        }

        if (!usuarioLog || !contrasenaLog) {
            alert('Ingrese las credenciales');
        }



    }).catch((err) => {
        console.log(err);
    })
}

function renderizarLogin() {
    login.classList.remove('oculto');
}

function renderizarEmpresas() {
    loginBtn.addEventListener('click', () => {
        login.classList.add('oculto');

        empresas.classList.remove('oculto');
        navBar.classList.remove('oculto');
        sideBar.classList.remove('oculto');
    })
}

function renderizarAgregarEmpresas() {
    agregarBtn.addEventListener('click', () => {
        empresas.classList.add('oculto');
        navBar.classList.add('oculto');
        sideBar.classList.add('oculto');

        sideBar.classList.remove('oculto');
        agregarEmpresa.classList.remove('oculto');
    })

    lapizBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            empresas.classList.add('oculto');
            navBar.classList.add('oculto');
            sideBar.classList.add('oculto');

            sideBar.classList.remove('oculto');
            agregarEmpresa.classList.remove('oculto');
        })
    })

    empresaCancelarBtn.addEventListener('click', () => {
        agregarEmpresa.classList.add('oculto');

        sideBar.classList.remove('oculto');
        navBar.classList.remove('oculto');
        empresas.classList.remove('oculto');
    })

    empresaAgregarBtn.addEventListener('click', () => {
        agregarEmpresa.classList.add('oculto');

        sideBar.classList.remove('oculto');
        navBar.classList.remove('oculto');
        empresas.classList.remove('oculto');
    })
}

function ocultarTodo() {
    login.classList.add('oculto');
    sideBar.classList.add('oculto');
    navBar.classList.add('oculto');
    empresas.classList.add('oculto');
    agregarEmpresa.classList.add('oculto');
    productos.classList.add('oculto');
    agregarProductos.classList.add('oculto');
    motoristas.classList.add('oculto');
    agregarMotorista.classList.add('oculto');
    ordenes.classList.add('oculto');
    asignarOrden.classList.add('oculto');
}

linkToEmpresas.addEventListener('click', () => {
    ocultarTodo();

    btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item" onclick="generarFormularioEmpresa()">Agregar Empresa</button>`
    navBar.classList.remove('oculto');
    sideBar.classList.remove('oculto');
    empresas.classList.remove('oculto');
})

linkToProductos.addEventListener('click', () => {
    ocultarTodo();

    btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item" onclick="generarFormularioProducto()">Agregar Producto</button>`
    navBar.classList.remove('oculto');
    sideBar.classList.remove('oculto');
    productos.classList.remove('oculto');
})

function renderizarAgregarProductos() {
    lapizBtn2.forEach(e => {
        e.addEventListener('click', () => {
            navBar.classList.add('oculto');
            productos.classList.add('oculto');

            agregarProductos.classList.remove('oculto');
        })
    })

    agregarProductoBtn.addEventListener('click', () => {
        agregarProductos.classList.add('oculto');

        navBar.classList.remove('oculto');
        productos.classList.remove('oculto');
    })

    cancelarProductoBtn.addEventListener('click', () => {
        agregarProductos.classList.add('oculto');

        navBar.classList.remove('oculto');
        productos.classList.remove('oculto');
    })

}

linkToMotoristas.addEventListener('click', () => {
    ocultarTodo();

    btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item">Agregar Motorista</button>`
    navBar.classList.remove('oculto');
    sideBar.classList.remove('oculto');
    motoristas.classList.remove('oculto');
})


function renderizarAgregarMotoristas() {
    lapizBtn3.forEach((btn) => {
        btn.addEventListener('click', () => {
            navBar.classList.add('oculto');
            motoristas.classList.add('oculto');

            agregarMotorista.classList.remove('oculto');
        })
    })

    agregarEmpleadoBtn.addEventListener('click', () => {
        agregarMotorista.classList.add('oculto');

        navBar.classList.remove('oculto');
        sideBar.classList.remove('oculto');
        motoristas.classList.remove('oculto');
    })

    noAgregarEmpleadoBtn.addEventListener('click', () => {
        agregarMotorista.classList.add('oculto');

        navBar.classList.remove('oculto');
        sideBar.classList.remove('oculto');
        motoristas.classList.remove('oculto');
    })
}


linkToOrdenes.addEventListener('click', () => {
    ocultarTodo();

    btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item">Agregar Orden</button>`
    navBar.classList.remove('oculto');
    sideBar.classList.remove('oculto');
    ordenes.classList.remove('oculto');
})

function renderizarAgregarOrdenes() {
    editarOrden.forEach(btn => {
        btn.addEventListener('click', () => {
            navBar.classList.add('oculto');
            ordenes.classList.add('oculto');

            asignarOrden.classList.remove('oculto');
        })
    })

    modificarOrden.addEventListener('click', () => {
        asignarOrden.classList.add('oculto');

        navBar.classList.remove('oculto');
        sideBar.classList.remove('oculto');
        ordenes.classList.remove('oculto');
    })

    noModificarOrden.addEventListener('click', () => {
        asignarOrden.classList.add('oculto');

        navBar.classList.remove('oculto');
        sideBar.classList.remove('oculto');
        ordenes.classList.remove('oculto');
    })

}

linkToLogin.addEventListener('click', () => {
    ocultarTodo();

    btnAgregarElemento.innerHTML = `<button type="button" class="btn btn-primary my-2 my-sm-0 agregar-item" onclick="generarFormularioEmpresa()">Agregar Empresa</button>`
    login.classList.remove('oculto');
})
crearOrdenes();
crearRepartidores();
crearEmpresas();
crearProductos();
renderizarLogin();
renderizarAgregarEmpresas();
renderizarAgregarProductos();
renderizarAgregarMotoristas();
renderizarAgregarOrdenes();