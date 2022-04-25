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


function crearEmpresas() {
    axios({
        url: '../Ez-Food-BE/api/admin.php?empresas',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        console.log(response.data);
        tablaEmpresas.innerHTML = ``;

        response.data.forEach(empresa => {
            tablaEmpresas.insertAdjacentHTML('beforeend',
                `
            <tr>
                <th scope="row">${empresa.nombreEmpresa}</th>
                <td>${empresa.productosEmpresa[0] ? empresa.productosEmpresa[0].categoria : 'Inactiva' }</td>
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

    navBar.classList.remove('oculto');
    sideBar.classList.remove('oculto');
    empresas.classList.remove('oculto');
})

linkToProductos.addEventListener('click', () => {
    ocultarTodo();

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

    login.classList.remove('oculto');
})

crearEmpresas();
renderizarLogin();
renderizarAgregarEmpresas();
renderizarAgregarProductos();
renderizarAgregarMotoristas();
renderizarAgregarOrdenes();