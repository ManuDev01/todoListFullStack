import { registerUser } from './api.js';
import { loginUser } from './api.js';
import { addTask } from './api.js';

// Estructura de datos para pestañas y tareas
let tabs = [];
let activeTabId = null;
let tabIdCounter = 1;
let taskIdCounter = 1;

// Inicializa con una pestaña por defecto y una tarea de ejemplo
function initTabs() {
    tabs = [
        {
            id: tabIdCounter++,
            name: 'Clases',
            tasks: [
                {
                    id: taskIdCounter++,
                    name: 'Terminar la interfaz',
                    completed: false
                }
            ]
        }
    ];
    activeTabId = tabs[0].id;
}

initTabs();

// Renderiza las pestañas en el header
function renderTabs() {
    const tabHeader = document.getElementById('TabHeader');
    // Elimina todas las pestañas excepto addTab y user
    tabHeader.querySelectorAll('.tab').forEach(tab => tab.remove());
    tabs.forEach(tab => {
        const tabDiv = document.createElement('div');
        tabDiv.className = 'tab';
        tabDiv.dataset.tabId = tab.id;
        if (tab.id === activeTabId) {
            tabDiv.style.background = '#333';
        } else {
            tabDiv.style.background = 'transparent';
        }
        const p = document.createElement('p');
        p.textContent = tab.name;
        hacerEditableTab(p, tab.id);
        tabDiv.appendChild(p);
        const closeIcon = document.createElement('img');
        closeIcon.className = 'close-icon';
        closeIcon.src = '../public/assets/images/close.png';
        closeIcon.alt = '';
        tabDiv.appendChild(closeIcon);
        // Insertar antes de addTab
        const addTabDiv = tabHeader.querySelector('.addTab');
        tabHeader.insertBefore(tabDiv, addTabDiv);
    });
}

// Renderiza las tareas de la pestaña activa
function renderTasks() {
    const todoContainer = document.querySelector('.todoContainer');
    // Elimina todas las tareas y hr excepto addTask, completedTask y hr finales
    todoContainer.querySelectorAll('.task, hr').forEach(el => {
        if (!el.id && !el.classList.contains('completedTask')) el.remove();
    });
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (!activeTab) return;
    activeTab.tasks.forEach(task => {
        // hr superior
        const hrArriba = document.createElement('hr');
        todoContainer.insertBefore(hrArriba, document.getElementById('addTask'));
        // div de tarea
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.taskId = task.id;
        taskDiv.innerHTML = `
            <input type="checkbox" name="taskCheck" ${task.completed ? 'checked' : ''}>
            <p>${task.name}</p>
            <div id="taskButtons">
                <img id="checkTask" src="../public/assets/images/check.png" alt="">
                <hr>
                <img id="deleteTask" src="../public/assets/images/trash.png" alt="">
            </div>
        `;
        todoContainer.insertBefore(taskDiv, document.getElementById('addTask'));
        // hr inferior
        const hrAbajo = document.createElement('hr');
        todoContainer.insertBefore(hrAbajo, document.getElementById('addTask'));
        // Hacer el nombre editable
        hacerEditableTask(taskDiv.querySelector('p'), task.id);
    });
}

// Cambia la pestaña activa y renderiza
function setActiveTab(tabId) {
    activeTabId = tabId;
    renderTabs();
    renderTasks();
}


// Función para hacer editable el nombre de una pestaña
function hacerEditableTab(tabElement, tabId) {
    tabElement.addEventListener('dblclick', function () {
        this.setAttribute('contenteditable', 'true');
        this.focus();
        const range = document.createRange();
        range.selectNodeContents(this);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    });
    tabElement.addEventListener('blur', function () {
        this.removeAttribute('contenteditable');
        // Actualiza el nombre en la estructura
        const tab = tabs.find(t => t.id === tabId);
        if (tab) {
            tab.name = this.textContent;
            renderTabs();
        }
    });
}

// Función para hacer editable el nombre de una tarea
function hacerEditableTask(taskElement, taskId) {
    taskElement.addEventListener('dblclick', function () {
        this.setAttribute('contenteditable', 'true');
        this.focus();
        const range = document.createRange();
        range.selectNodeContents(this);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    });
    taskElement.addEventListener('blur', function () {
        this.removeAttribute('contenteditable');
        // Actualiza el nombre en la estructura
        const tab = tabs.find(t => t.id === activeTabId);
        if (tab) {
            const task = tab.tasks.find(tsk => tsk.id === taskId);
            if (task) {
                task.name = this.textContent;
                renderTasks();
            }
        }
    });
}

// Función para eliminar tarea y sus hr exteriores
function eliminarTareaYHrs(elemento) {
    const taskDiv = elemento.closest('.task');
    if (taskDiv) {
        const prev = taskDiv.previousElementSibling;
        if (prev && prev.tagName === 'HR') {
            prev.remove();
        }
        // Elimina de la estructura
        const taskId = Number(taskDiv.dataset.taskId);
        const tab = tabs.find(t => t.id === activeTabId);
        if (tab) {
            tab.tasks = tab.tasks.filter(tsk => tsk.id !== taskId);
        }
        taskDiv.remove();
        const next = taskDiv.nextElementSibling;
        if (next && next.tagName === 'HR') {
            next.remove();
        }
    }
    renderTasks();
}

// Render inicial
document.addEventListener('DOMContentLoaded', function () {
    renderTabs();
    renderTasks();
    acountClick();
    // ...existing code...
    const completedTaskDiv = document.querySelector('.completedTask');
    if (completedTaskDiv && !completedTaskDiv.querySelector('details')) {
        const details = document.createElement('details');
        details.open = true;
        const summary = document.createElement('summary');
        summary.textContent = 'Tareas completadas';
        const ul = document.createElement('ul');
        ul.id = 'completedList';
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        details.appendChild(summary);
        details.appendChild(ul);
        completedTaskDiv.appendChild(details);
    }
});

// Añadir nueva tarea SOLO a la pestaña activa
function agregarNuevaTarea() {
    mostrarModalNombreTarea(function(nombreTarea) {
        const tab = tabs.find(t => t.id === activeTabId);
        if (tab) {
            tab.tasks.push({
                id: taskIdCounter++,
                name: nombreTarea,
                completed: false
            });
            renderTasks();
        }
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('#addTask img')) {
        agregarNuevaTarea();
    }
});

// Función para agregar una nueva pestaña (sin tareas)
function agregarNuevaPestana() {
    mostrarModalNombrePestana(function(nombrePestana) {
        const newTab = {
            id: tabIdCounter++,
            name: nombrePestana,
            tasks: []
        };
        tabs.push(newTab);
        setActiveTab(newTab.id);
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('.addTab img')) {
        agregarNuevaPestana();
    }
});

// Eliminar pestaña por ID
function eliminarPestana(elemento) {
    const tabDiv = elemento.closest('.tab');
    if (tabDiv) {
        const tabId = Number(tabDiv.dataset.tabId);
        tabs = tabs.filter(t => t.id !== tabId);
        // Si eliminamos la activa, selecciona la primera
        if (activeTabId === tabId) {
            activeTabId = tabs.length ? tabs[0].id : null;
        }
        renderTabs();
        renderTasks();
    }
}

// Delegación de eventos para eliminar y cambiar pestañas
document.getElementById('TabHeader').addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('close-icon')) {
        eliminarPestana(e.target);
    }
    // Cambiar pestaña activa al hacer click en la pestaña
    if (e.target && e.target.closest('.tab') && !e.target.classList.contains('close-icon')) {
        const tabDiv = e.target.closest('.tab');
        const tabId = Number(tabDiv.dataset.tabId);
        setActiveTab(tabId);
    }
});

function mostrarModalUsuario() {
    // Evita duplicar el modal
    if (document.getElementById('modalUsuario')) return;

    // Fondo del modal
    const modalBg = document.createElement('div');
    modalBg.id = 'modalUsuario';
    modalBg.style.position = 'fixed';
    modalBg.style.top = '0';
    modalBg.style.left = '0';
    modalBg.style.width = '100vw';
    modalBg.style.height = '100vh';
    modalBg.style.boxShadow = '0 0 10px 1px #000';
    modalBg.style.background = 'rgba(0,0,0,0.4)';
    modalBg.style.display = 'flex';
    modalBg.style.alignItems = 'center';
    modalBg.style.justifyContent = 'center';
    modalBg.style.zIndex = '1000';

    // Contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.background = '#242424';
    modalContent.style.padding = '30px 40px';
    modalContent.style.borderRadius = '12px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';

    // Título
    const titulo = document.createElement('h2');
    titulo.textContent = 'TodoList App';
    titulo.style.color = '#fff';
    titulo.style.background = 'transparent';
    titulo.style.marginBottom = '20px';
    modalContent.appendChild(titulo);

    // Botón Iniciar Sesión
    const btnLogin = document.createElement('button');
    btnLogin.textContent = 'Iniciar sesión';
    btnLogin.style.color = '#fff';
    btnLogin.style.borderColor = '#fff';
    btnLogin.style.borderRadius = '8px';
    btnLogin.style.borderStyle = 'solid';
    btnLogin.style.margin = '10px';
    btnLogin.style.padding = '10px 20px';
    btnLogin.style.fontSize = '16px';
    btnLogin.onclick = function() {
        btnLogin.style.borderColor = '#000';
        setTimeout(() => {
            document.body.removeChild(modalBg);
            mostrarModalLogin(); // Mostrar el modal de login
        }, 100);
    };
    modalContent.appendChild(btnLogin);

    // Botón Registrar
    const btnRegister = document.createElement('button');
    btnRegister.textContent = 'Registrar usuario';
    btnRegister.style.color = '#fff';
    btnRegister.style.borderColor = '#fff';
    btnRegister.style.borderRadius = '8px';
    btnRegister.style.borderStyle = 'solid';
    btnRegister.style.margin = '10px';
    btnRegister.style.padding = '10px 20px';
    btnRegister.style.fontSize = '16px';
    btnRegister.onclick = function() {
        btnRegister.style.borderColor = '#000';
        setTimeout(() => {
            document.body.removeChild(modalBg);
            mostrarModalRegistro(); // Mostrar el modal de registro
        }, 100);
    };
    modalContent.appendChild(btnRegister);

    // Botón cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.style.color = '#fff';
    btnCerrar.style.borderColor = '#fff';
    btnCerrar.style.borderRadius = '8px';
    btnCerrar.style.borderStyle = 'solid';
    btnCerrar.style.marginTop = '20px';
    btnCerrar.style.padding = '6px 16px';
    btnCerrar.onclick = function() {
        btnCerrar.style.borderColor = '#000'; // Cambia el borde a negro al hacer click
        setTimeout(() => {
            document.body.removeChild(modalBg);
        }, 100);
    };
    modalContent.appendChild(btnCerrar);

    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
}

// Nueva función para mostrar el modal de registro
function mostrarModalRegistro() {
    // Evita duplicar el modal
    if (document.getElementById('modalRegistro')) return;

    // Fondo del modal
    const modalBg = document.createElement('div');
    modalBg.id = 'modalRegistro';
    modalBg.style.position = 'fixed';
    modalBg.style.top = '0';
    modalBg.style.left = '0';
    modalBg.style.width = '100vw';
    modalBg.style.height = '100vh';
    modalBg.style.background = 'rgba(0,0,0,0.5)';
    modalBg.style.display = 'flex';
    modalBg.style.alignItems = 'center';
    modalBg.style.justifyContent = 'center';
    modalBg.style.zIndex = '1000';

    // Contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.background = '#242424';
    modalContent.style.padding = '30px 40px';
    modalContent.style.borderRadius = '12px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';

    // Título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Registro de usuario';
    titulo.style.color = '#fff';
    titulo.style.background = 'transparent';
    titulo.style.marginBottom = '20px';
    modalContent.appendChild(titulo);

    // Campos de registro
    const campos = [
        { label: 'Nombre', type: 'text', id: 'nombre' },
        { label: 'Apellido', type: 'text', id: 'apellido' },
        { label: 'Usuario', type: 'text', id: 'usuario' },
        { label: 'Contraseña', type: 'password', id: 'contrasena' }
    ];

    campos.forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.label;
        label.style.backgroundColor = 'transparent';
        label.style.color = '#fff';
        label.style.marginTop = '10px';
        label.style.display = 'block';
        label.setAttribute('for', campo.id);

        const input = document.createElement('input');
        input.type = campo.type;
        input.id = campo.id;
        input.style.color = '#fff';
        input.style.margin = '5px 0 15px 0';
        input.style.padding = '8px';
        input.style.borderRadius = '6px';
        input.style.border = '1px solid #ccc';
        input.style.width = '200px';

        modalContent.appendChild(label);
        modalContent.appendChild(input);
    });

    // Botón Registrar
    const btnRegistrar = document.createElement('button');
    btnRegistrar.textContent = 'Registrar';
    btnRegistrar.style.color = '#fff';
    btnRegistrar.style.background = '#007bff';
    btnRegistrar.style.border = 'none';
    btnRegistrar.style.borderRadius = '8px';
    btnRegistrar.style.margin = '10px';
    btnRegistrar.style.padding = '10px 20px';
    btnRegistrar.style.fontSize = '16px';
    btnRegistrar.onclick = async function() {
        // Obtén los valores de los inputs
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Crea el objeto con los datos
        const userData = {
            nombre,
            apellido,
            usuario,
            contrasena
        };

        // Llama a la función de la API
        const result = await registerUser(userData);

        if (result) {
            alert('Usuario registrado correctamente');
            document.body.removeChild(modalBg);
        } else {
            alert('Error al registrar usuario');
        }
    };
    modalContent.appendChild(btnRegistrar);

    // Botón cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.style.color = '#fff';
    btnCerrar.style.background = '#dc3545';
    btnCerrar.style.border = 'none';
    btnCerrar.style.borderRadius = '8px';
    btnCerrar.style.marginTop = '10px';
    btnCerrar.style.padding = '6px 16px';
    btnCerrar.onclick = function() {
        document.body.removeChild(modalBg);
    };
    modalContent.appendChild(btnCerrar);

    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
}

// Nueva función para mostrar el modal de inicio de sesión
function mostrarModalLogin() {
    // Evita duplicar el modal
    if (document.getElementById('modalLogin')) return;

    // Fondo del modal
    const modalBg = document.createElement('div');
    modalBg.id = 'modalLogin';
    modalBg.style.position = 'fixed';
    modalBg.style.top = '0';
    modalBg.style.left = '0';
    modalBg.style.width = '100vw';
    modalBg.style.height = '100vh';
    modalBg.style.background = 'rgba(0,0,0,0.5)';
    modalBg.style.display = 'flex';
    modalBg.style.alignItems = 'center';
    modalBg.style.justifyContent = 'center';
    modalBg.style.zIndex = '1000';

    // Contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.background = '#242424';
    modalContent.style.padding = '30px 40px';
    modalContent.style.borderRadius = '12px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';

    // Título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Iniciar sesión';
    titulo.style.color = '#fff';
    titulo.style.background = 'transparent';
    titulo.style.marginBottom = '20px';
    modalContent.appendChild(titulo);

    // Campos de login
    const campos = [
        { label: 'Usuario', type: 'text', id: 'usuarioLogin' },
        { label: 'Contraseña', type: 'password', id: 'contrasenaLogin' }
    ];

    campos.forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.label;
        label.style.backgroundColor = 'transparent';
        label.style.color = '#fff';
        label.style.marginTop = '10px';
        label.style.display = 'block';
        label.setAttribute('for', campo.id);

        const input = document.createElement('input');
        input.type = campo.type;
        input.id = campo.id;
        input.style.color = '#fff';
        input.style.margin = '5px 0 15px 0';
        input.style.padding = '8px';
        input.style.borderRadius = '6px';
        input.style.border = '1px solid #ccc';
        input.style.width = '200px';

        modalContent.appendChild(label);
        modalContent.appendChild(input);
    });

    // Botón Iniciar sesión
    const btnIniciar = document.createElement('button');
    btnIniciar.textContent = 'Iniciar sesión';
    btnIniciar.style.color = '#fff';
    btnIniciar.style.background = '#007bff';
    btnIniciar.style.border = 'none';
    btnIniciar.style.borderRadius = '8px';
    btnIniciar.style.margin = '10px';
    btnIniciar.style.padding = '10px 20px';
    btnIniciar.style.fontSize = '16px';
    btnIniciar.onclick = async function() {
        const usuario = document.getElementById('usuarioLogin').value;
        const contrasena = document.getElementById('contrasenaLogin').value;

        const credentials = { usuario, contrasena };
        const result = await loginUser(credentials);

        if (result && result === "Login exitoso") {
            alert('Sesión iniciada correctamente');
            const modalLogin = document.getElementById('modalLogin');
            if (modalLogin) {
                modalLogin.parentNode.removeChild(modalLogin);
            }
            // Aquí puedes guardar el usuario en localStorage o redirigir, etc.
        } else {
            alert(result || 'Usuario o contraseña incorrectos');
        }
    };
    modalContent.appendChild(btnIniciar);

    // Botón cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.style.color = '#fff';
    btnCerrar.style.background = '#dc3545';
    btnCerrar.style.border = 'none';
    btnCerrar.style.borderRadius = '8px';
    btnCerrar.style.marginTop = '10px';
    btnCerrar.style.padding = '6px 16px';
    btnCerrar.onclick = function() {
        document.body.removeChild(modalBg);
    };
    modalContent.appendChild(btnCerrar);

    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
}

function acountClick() {
    const userImage = document.getElementById('userImage');
    if (userImage) {
        userImage.addEventListener('click', mostrarModalUsuario);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    acountClick();

    const completedTaskDiv = document.querySelector('.completedTask');
    if (completedTaskDiv && !completedTaskDiv.querySelector('details')) {
        const details = document.createElement('details');
        details.open = true; // Puedes ponerlo en false si prefieres cerrado por defecto
        const summary = document.createElement('summary');
        summary.textContent = 'Tareas completadas';
        const ul = document.createElement('ul');
        ul.id = 'completedList';
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        details.appendChild(summary);
        details.appendChild(ul);
        completedTaskDiv.appendChild(details);
    }
});

// Delegación para marcar tarea como completada y eliminar
document.querySelector('.todoContainer').addEventListener('click', function (e) {
    if (e.target && e.target.id === 'checkTask') {
        const taskDiv = e.target.closest('.task');
        if (taskDiv) {
            const taskId = Number(taskDiv.dataset.taskId);
            const tab = tabs.find(t => t.id === activeTabId);
            if (tab) {
                const task = tab.tasks.find(tsk => tsk.id === taskId);
                if (task) {
                    task.completed = true;
                    // Añadir a la lista de completadas
                    const completedList = document.getElementById('completedList');
                    if (completedList) {
                        const li = document.createElement('li');
                        li.textContent = task.name;
                        li.style.color = '#28a745';
                        li.style.marginBottom = '6px';
                        completedList.appendChild(li);
                    }
                    // Eliminar de la estructura
                    tab.tasks = tab.tasks.filter(tsk => tsk.id !== taskId);
                    renderTasks();
                }
            }
        }
    }
    // Eliminar tarea y los hr exteriores usando delegación de eventos
    if (e.target && e.target.id === 'deleteTask') {
        eliminarTareaYHrs(e.target);
    }
});

function mostrarModalNombreTarea(callback) {
    // Evita duplicar el modal
    if (document.getElementById('modalNombreTarea')) return;

    // Fondo del modal
    const modalBg = document.createElement('div');
    modalBg.id = 'modalNombreTarea';
    modalBg.style.position = 'fixed';
    modalBg.style.top = '0';
    modalBg.style.left = '0';
    modalBg.style.width = '100vw';
    modalBg.style.height = '100vh';
    modalBg.style.background = 'rgba(0,0,0,0.5)';
    modalBg.style.display = 'flex';
    modalBg.style.alignItems = 'center';
    modalBg.style.justifyContent = 'center';
    modalBg.style.zIndex = '1000';

    // Contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.background = '#242424';
    modalContent.style.padding = '30px 40px';
    modalContent.style.borderRadius = '12px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';

    // Título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Nombre de la tarea';
    titulo.style.color = '#fff';
    titulo.style.marginBottom = '20px';
    modalContent.appendChild(titulo);

    // Input para el nombre
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe el nombre de la tarea';
    input.style.marginBottom = '20px';
    input.style.padding = '8px';
    input.style.borderRadius = '6px';
    input.style.border = '1px solid #ccc';
    input.style.width = '200px';
    input.style.color = '#fff';
    input.style.background = '#333';
    modalContent.appendChild(input);

    // Botón aceptar
    const btnAceptar = document.createElement('button');
    btnAceptar.textContent = 'Aceptar';
    btnAceptar.style.color = '#fff';
    btnAceptar.style.background = '#007bff';
    btnAceptar.style.border = 'none';
    btnAceptar.style.borderRadius = '8px';
    btnAceptar.style.margin = '10px';
    btnAceptar.style.padding = '10px 20px';
    btnAceptar.style.fontSize = '16px';
    btnAceptar.onclick = function() {
        const nombreTarea = input.value.trim();
        if (nombreTarea) {
            document.body.removeChild(modalBg);
            callback(nombreTarea); // Aquí solo llamas al callback
        } else {
            alert('Por favor ingresa un nombre para la tarea');
        }
    };
    modalContent.appendChild(btnAceptar);

    // Botón cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.style.color = '#fff';
    btnCerrar.style.background = '#dc3545';
    btnCerrar.style.border = 'none';
    btnCerrar.style.borderRadius = '8px';
    btnCerrar.style.marginTop = '10px';
    btnCerrar.style.padding = '6px 16px';
    btnCerrar.onclick = function() {
        document.body.removeChild(modalBg);
    };
    modalContent.appendChild(btnCerrar);

    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
}

function mostrarModalNombrePestana(callback) {
    if (document.getElementById('modalNombrePestana')) return;

    const modalBg = document.createElement('div');
    modalBg.id = 'modalNombrePestana';
    modalBg.style.position = 'fixed';
    modalBg.style.top = '0';
    modalBg.style.left = '0';
    modalBg.style.width = '100vw';
    modalBg.style.height = '100vh';
    modalBg.style.background = 'rgba(0,0,0,0.5)';
    modalBg.style.display = 'flex';
    modalBg.style.alignItems = 'center';
    modalBg.style.justifyContent = 'center';
    modalBg.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.background = '#242424';
    modalContent.style.padding = '30px 40px';
    modalContent.style.borderRadius = '12px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Nombre de la pestaña';
    titulo.style.color = '#fff';
    titulo.style.marginBottom = '20px';
    modalContent.appendChild(titulo);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe el nombre de la pestaña';
    input.style.marginBottom = '20px';
    input.style.padding = '8px';
    input.style.borderRadius = '6px';
    input.style.border = '1px solid #ccc';
    input.style.width = '200px';
    input.style.color = '#fff';
    input.style.background = '#333';
    modalContent.appendChild(input);

    const btnAceptar = document.createElement('button');
    btnAceptar.textContent = 'Aceptar';
    btnAceptar.style.color = '#fff';
    btnAceptar.style.background = '#007bff';
    btnAceptar.style.border = 'none';
    btnAceptar.style.borderRadius = '8px';
    btnAceptar.style.margin = '10px';
    btnAceptar.style.padding = '10px 20px';
    btnAceptar.style.fontSize = '16px';
    btnAceptar.onclick = function() {
        const nombrePestana = input.value.trim();
        if (nombrePestana) {
            document.body.removeChild(modalBg);
            callback(nombrePestana);
        } else {
            alert('Por favor ingresa un nombre para la pestaña');
        }
    };
    modalContent.appendChild(btnAceptar);

    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.style.color = '#fff';
    btnCerrar.style.background = '#dc3545';
    btnCerrar.style.border = 'none';
    btnCerrar.style.borderRadius = '8px';
    btnCerrar.style.marginTop = '10px';
    btnCerrar.style.padding = '6px 16px';
    btnCerrar.onclick = function() {
        document.body.removeChild(modalBg);
    };
    modalContent.appendChild(btnCerrar);

    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
}