# 🚀 Guía de Instalación y Configuración - API REST Inventario

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18 o superior
- **pnpm**: v10 o superior (gestor de paquetes)
- **MySQL**: v8.0 o superior
- **Git**: Para clonar el repositorio

### Verificar Instalaciones

```bash
node --version
# Debe mostrar: v18.x.x o superior

pnpm --version
# Debe mostrar: 10.18.3 o superior

mysql --version
# Debe mostrar: mysql Ver 8.0.x o superior
```

---

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/BackendApiInventory.git
cd BackendApiInventory
```

- **Instalar dependencias**

```bash
pnpm install
```

- **Configurar variables de entorno**

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

- **Crear base de datos**

```sql
CREATE DATABASE brm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- **Scripts Disponibles**

```bash
# Desarrollo
pnpm run start              # Iniciar servidor con nodemon
```

---

## 📁 Estructura del Proyecto

```text
BackendApiInventory/
│
├── src/
│   ├── api/              # postman
│   │   ├── BRM.postman_collection.json       # Swagger postman
│   │
│   ├── controllers/         # Controladores
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── purchaseController.js
│   │   └── adminController.js
│   │
│   ├── database/           # Base de datos
│   │   └── connectionDB.js
│   │
│   ├── middleware/         # Middlewares
│   │   └── auth.js   # Autenticación y autorización
│   │
│   ├── models/             # Modelos Sequelize
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── purchaseModel.js
│   │   ├── detailPurchaseModel.js
│   │   └── associations.js # Uniones de tablas Foreign key
│   │
│   ├── routes/             # Rutas
│   │   └── inventoriesRoute.js
│   │
│   ├── app.js              # Configuración Express
│   └── index.js            # Punto de entrada
│
├── docs/                   # Documentación generada
├── .env                    # Variables de entorno
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Roles

- **Administrador**: Gestión completa de productos y visualización de todas las compras
- **Cliente**: Realizar compras y ver su historial

## Autenticación

Actualmente el sistema utiliza un objeto `user` en el body de las peticiones.
En futuras versiones se implementará JWT.

### ✅ 2. Captura de Errores

- Middleware centralizado de errores
- Manejo específico de errores de Sequelize

**Verificación:**

- Todos los controladores usan `try-catch` y `next(error)`
- El middleware `errorHandler` captura todos los errores
- Los errores se registran en logs

**Verificación:**

- Probar enviar datos inválidos
- Verificar mensajes de error detallados
- Los campos se validan antes de llegar al controlador

### ✅ 4. Documentación del Código

- Comentarios JSDoc en todos los controladores
- Documentación con ApiDoc
- Documentación HTML generada automáticamente
- Ejemplos de request/response
- Descripción de errores posibles

**Verificación:**

- Acceder a `http://localhost:3000/docs`
- Revisar documentación interactiva
- Todos los endpoints están documentados

---

## 📝 Crear README.md

**Archivo:** `README.md`

```markdown
# 📦 Sistema de Inventario - API REST

API REST para gestión de inventario con sistema de compras desarrollada con Node.js, Express, Sequelize y MySQL.

## ✨ Características

- ✅ Gestión completa de usuarios (Administradores y Clientes)
- ✅ CRUD de productos con control de stock
- ✅ Sistema de compras con transacciones
- ✅ Historial de compras y facturas
- ✅ Documentación con ApiDoc

## 🛠️ Tecnologías

- **Node.js** v18+
- **Express** v5.1
- **Sequelize** v6.37 (ORM)
- **MySQL** v8.0
- **ApiDoc** (Documentación)

## 📋 Requisitos Previos

- Node.js v18 o superior
- pnpm v10 o superior
- MySQL v8.0 o superior
- Git
```

El servidor estará disponible en `http://localhost:3000`

## 🧪 Testing con Postman

1. Importar la colección de Postman (disponible en `/api`)

## 🔐 Seguridad

- Prevención de SQL Injection (Sequelize)
- Manejo seguro de errores

## 📄 Licencia

ISC

## 👤 Autor

Marlon Steven Diaz Lopez

## 📞 Soporte

Para reportar bugs o solicitar características, crear un issue en GitHub.

---

¡Gracias! 🎉
