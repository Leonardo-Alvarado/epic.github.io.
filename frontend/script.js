// Manejo de la interactividad entre las secciones de inicio de sesión y registro
const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
   container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
   container.classList.add("toggle");
});

// Función para manejar el registro de usuario
const registrarUsuario = async (datosUsuario) => {
    try {
        const response = await fetch('/usuarios/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.mensaje); // Mensaje de éxito
        } else {
            alert(data.error); // Mensaje de error
        }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
    }
};

// Función para manejar el inicio de sesión
const iniciarSesion = async (credenciales) => {
    try {
        const response = await fetch('/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.mensaje); // Mensaje de éxito
            window.location.href = '/principal.html'; // Redirigir a la página principal si el inicio de sesión es exitoso
        } else {
            alert(data.error); // Mensaje de error
        }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
    }
};

// Evento de formulario de registro
const signUpForm = document.querySelector('.sign-up');
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = signUpForm.querySelector('input[name="nombre"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;
    if (!nombre || !email || !password) {
        alert('Completa todos los campos obligatorios'); // Mensaje si falta algún dato
        return;
    }
    const datosUsuario = { nombre, email, password };
    registrarUsuario(datosUsuario);
});

// Evento de formulario de inicio de sesión
const signInForm = document.querySelector('.sign-in');
signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = signInForm.querySelector('input[name="email"]').value;
    const password = signInForm.querySelector('input[name="password"]').value;
    if (!email || !password) {
        alert('Completa todos los campos obligatorios'); // Mensaje si falta algún dato
        return;
    }
    const credenciales = { email, password };

    try {
        const response = await fetch('/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        });
        const data = await response.json();
        if (response.ok) {
            // alert(data.mensaje); // Comentado para evitar mostrar el mensaje de alerta
            window.location.href = '/principal.html'; // Redirigir a la página principal si el inicio de sesión es exitoso
        } else {
            alert(data.error); // Mensaje de error
        }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor');
    }
});
