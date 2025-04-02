# EAN_GUIA4
Repositorio sobre dashboard de pd y rutas 

# Sistema de Gestión de Pedidos y Rastreo de Envíos - TechLogistics S.A.

Este proyecto es una solución integral para la gestión de pedidos y rastreo de envíos, diseñada específicamente para la empresa **TechLogistics S.A.**, dedicada a la gestión de envíos y logística de mercancías. El sistema proporciona una forma eficiente de administrar pedidos, clientes, transportistas y realizar un seguimiento en tiempo real de los envíos.

## Descripción del Proyecto

El sistema abarca los siguientes componentes clave:

- **Gestión de pedidos**: Permite gestionar los pedidos de los clientes, asignarles transportistas y realizar un seguimiento.
- **Rastreo de envíos**: Ofrece la capacidad de rastrear el estado de los envíos en tiempo real, proporcionando información sobre la ruta, el transportista y el estado del envío.
- **Gestión de clientes**: Administra la información de los clientes y sus pedidos asociados.
- **Gestión de transportistas**: Gestiona la información de los transportistas y las rutas asignadas.
- **Base de datos relacional**: Utiliza una base de datos relacional para almacenar la información de clientes, pedidos, productos, transportistas, rutas y el estado de los envíos.

## Requerimientos del Proyecto

### 1. **Diseño y modelado de la base de datos**
- El sistema incluye un modelo entidad-relación (MER) que ha sido transformado en un esquema relacional normalizado.
- Las entidades principales son:
  - **Clientes**
  - **Pedidos**
  - **Productos**
  - **Transportistas**
  - **Rutas**
  - **Estados de Envío**

### 2. **Implementación de la base de datos**
- Se utiliza un gestor de bases de datos relacional como **MySQL** (o cualquiera de **Oracle** o **PostgreSQL**).
- Las tablas se crean con claves primarias y foráneas correspondientes, asegurando la integridad referencial.

### 3. **Comunicación y sincronización de datos**
- Implementación de una **API REST** utilizando **Node.js** con **Express** para la gestión de pedidos y consultas en tiempo real.
- La API garantiza la comunicación entre la base de datos y la aplicación cliente.

### 4. **Interfaces de usuario**
- Diseño de una **interfaz web** para la gestión de pedidos y el seguimiento de envíos.
- Uso de tecnologías como **HTML**, **CSS** y **JavaScript**.

## Tecnologías Utilizadas

- **Node.js** con **Express**: para la API REST y la lógica de negocio.
- **MySQL** (o PostgreSQL/Oracle): como gestor de base de datos relacional.
- **Morgan**: para registro de solicitudes HTTP.
- **Nodemon**: para reiniciar el servidor automáticamente durante el desarrollo.
- **HTML/CSS/JavaScript**: para la interfaz de usuario.

## Instalación y Ejecución

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu_usuario/techlogistics.git
cd techlogistics

```
### Puedes importar el archivo SQL a tu base de datos con el siguiente comando (ajustando los valores de acuerdo a tu configuración):
```bash
mysql -u usuario -p nombre_base_datos < auth_system.sql
```

### Ejecutar el proyecto
Una vez que todo esté configurado, puedes iniciar el servidor en modo de desarrollo. Para ello, usa el siguiente comando:
```bash
npm run dev
```
