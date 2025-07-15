// Cambia la URL base según tu backend
const API_BASE = 'http://localhost:8080';

export async function getAllUsers() {
    try {
        const response = await fetch(`${API_BASE}/getAllUsers`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Api para registrar un usuario
export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE}/user/userRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Error al registrar usuario');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

//Api para iniciar sesion
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE}/user/login/${credentials.usuario}/${credentials.contrasena}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Error al iniciar sesión');
        // Si el backend devuelve texto plano:
        const text = await response.text();
        console.log(text);
        return text;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addTask(taskData) {
    try {
        const response = await fetch(`${API_BASE}/task/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error al agregar tarea');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}