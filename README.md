# Implementación de login:

Aspectos a incluir
Se deberá contar con un hasheo de contraseña utilizando bcrypt
Se deberá contar con una implementación de passport, tanto para register como para login.
Implementar el método de autenticación de GitHub a la vista de login.

## Instrucciones:

Instalar dependencias: npm i

Ejecutar: npm start

## Ejemplos:

Vista Home:
GET http://localhost:8080/

Vista de login:
http://localhost:8080/login

Vista de registro:
http://localhost:8080/register

Vista de productos: (protegida)
http://localhost:8080/products

Vista de perfil: (protegida)
http://localhost:8080/profile

NOTA: si el usuario ya está logueado, no puede volver a loguearse o registrarse.
En ambos casos el usuario es redirigido a la vista de perfil.

## Sistema de roles:

Rol de administrador:

- Usuario: adminCoder@coder.com
- Contraseña: adminCod3r123

Rol de usuario:

- Usuario: pepe@gmail.com
- Contraseña: 123456
