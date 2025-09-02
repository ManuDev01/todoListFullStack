# TodoList

**Descripción**:
TodoList es una aplicación para gestionar tareas de manera eficiente, con una API REST creada en **Java Spring Boot** que utiliza **PostgreSQL**, un frontend en **HTML**, **CSS** con **SASS**, y **JavaScript**, y una versión de escritorio construida con **Python** y **Glade** para la interfaz gráfica.

## Tecnologías utilizadas

### Backend

* **Java** (versión 17)
* **Spring Boot** para crear la API REST
* **PostgreSQL** como base de datos
* **JPA** (Java Persistence API) para interactuar con la base de datos

### Frontend

* **HTML5** para la estructura de la página
* **CSS3** con **SASS** para los estilos
* **JavaScript** para la interactividad

### Aplicación de Escritorio

* **Python** (versión 3.13)
* **Glade** para la interfaz gráfica de usuario (UI)
* **GTK** para la creación de interfaces en aplicaciones de escritorio

## Estructura del proyecto

```
/proyecto_2
├── backend/              # API REST con Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/                               # Código fuente Java
│   │   │   │   └── com/
│   │   │   │       └── jpirela/                    # Paquete base de la app
│   │   │   │           └── tuproyecto/
│   │   │   │               ├── TuProyectoApplication.java # Clase principal de Spring Boot
│   │   │   │               ├── controller/         # Endpoints REST
│   │   │   │               ├── model/              # Entidades y DTOs
│   │   │   │               ├── repository/         # Repositorios de JPA
│   │   │   │               ├── service/            # Lógica de negocio
│   │   │   │               └── exception/          # Excepciones personalizadas
│   │   │   └── resources/                          # Archivos de configuración y estáticos
│   ├── pom.xml             # Dependencias de Maven
│   └── README.md           # Documentación del backend
├── frontend/             # Aplicación web
│   ├── public/             # Archivos estáticos (HTML, imágenes)
│   ├── src/                # Código fuente de la app frontend
│   └── README.md           # Documentación del frontend
├── desktop-app/          # Aplicación de escritorio con Python y Glade
│   ├── src/               # Código fuente de la aplicación
│   ├── assets/            # Recursos estáticos
│   ├── requirements.txt   # Dependencias de Python
│   ├── .env.example       # Variables de entorno
│   └── README.md          # Documentación de la app de escritorio
```

## Instalación

### Requisitos previos

* **Java 17** para el backend
* **Maven** para gestionar dependencias del backend
* **PostgreSQL** para la base de datos
* **Python 3.13** para la aplicación de escritorio
* **Glade** para diseñar la interfaz de usuario del escritorio

### 1. Clonar el repositorio

```bash
https://github.com/ManuDev01/todoListFullStack
cd todoListFullStack
```

### 2. Instalación de dependencias

#### Backend (Java + Spring Boot)

```bash
cd backend
mvn install
```

#### Frontend (HTML, CSS, JavaScript)

El frontend no tiene dependencias adicionales, pero puedes servir los archivos estáticos usando un servidor local o desplegarlo.

```bash
cd frontend
# Usar un servidor local o abrir index.html directamente
```

#### Aplicación de Escritorio (Python + Glade)

```bash
cd desktop-app
pip install -r requirements.txt
```

### 3. Configuración de la base de datos

1. Crea una base de datos en PostgreSQL llamada `todolist`.
2. Configura las credenciales en el archivo `application.properties` de Spring Boot.

Ejemplo de configuración en `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todolist
spring.datasource.username=usuario
spring.datasource.password=contraseña
```

### 4. Ejecutar la aplicación

#### Backend

```bash
cd backend
mvn spring-boot:run
```

#### Frontend

Puedes abrir `index.html` directamente en el navegador o servirlo usando un servidor web local.

#### Aplicación de Escritorio

```bash
cd desktop-app
python main.py
```

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
