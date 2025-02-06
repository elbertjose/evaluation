# Proyecto Laravel + React

Este documento detalla los pasos necesarios para poner en marcha un proyecto Laravel integrado con React.

## 📌 Requisitos Previos
Antes de iniciar, asegúrate de tener instalados los siguientes requisitos:
- PHP >= 8.1
- Composer
- Node.js y npm
- MySQL o PostgreSQL (según la configuración del proyecto)

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
git clone git@github.com:elbertjose/evaluation.git
cd evaluation
```

### 2️⃣ Configurar variables de entorno
Copia el archivo de ejemplo `.env.example` y renómbralo como `.env`:
```sh
cp .env.example .env
```
Modify the administrator user credentials in the `.env` file, which will be created by default when running migrations and seeders.
```env
APP_ADMIN_EMAIL=admin@example.com
APP_ADMIN_PASSWORD=admin
```
Asegúrate de configurar la conexión a la base de datos en `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_base
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

### 3️⃣ Instalar dependencias de Laravel
```sh
composer install
```

### 4️⃣ Generar la clave de la aplicación
```sh
php artisan key:generate
```

### 5️⃣ Ejecutar migraciones y seeders
```sh
php artisan migrate --seed
php artisan db:seed --class=UserAdminSeeder
```

### 6️⃣ Iniciar el servidor de Laravel
```sh
php artisan serve
```

---

## ⚛️ Instalación de React

### 7️⃣ Instalar dependencias de Node.js
```sh
npm install
```

### 8️⃣ Iniciar el servidor de desarrollo de React
```sh
npm run dev
```

---

## ✅ Acceso a la Aplicación

### 🔹 Acceder a Laravel API
Abre en tu navegador:
```
http://127.0.0.1:8000
```

### 🔹 Acceder a la Interfaz de React
Si el proyecto usa Vite, se ejecutará en:
```
http://127.0.0.1:5173
```

---

## 📢 Credenciales de Administrador
Una vez configurado el sistema, inicia sesión con:
- **Email:** `admin@example.com`
- **Contraseña:** `admin`


---

## 🎯 Comandos Útiles

### 🛠 Limpiar caché
```sh
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## 📚 Generación de Documentación de API con Scribe

### 1️⃣ Instalar Scribe (si aún no está instalado)
```sh
composer require --dev knuckleswtf/scribe
```

### 2️⃣ Publicar la configuración de Scribe
```sh
php artisan vendor:publish --provider="Knuckles\Scribe\ScribeServiceProvider" --tag=scribe-config
```

### 3️⃣ Generar la documentación
```sh
php artisan scribe:generate
```

### 4️⃣ Acceder a la documentación en el navegador
```
http://127.0.0.1:8000/docs
```

Si deseas regenerar la documentación después de hacer cambios, vuelve a ejecutar:
```sh
php artisan scribe:generate
```

---

¡Listo! Tu proyecto Laravel + React está funcionando y documentado. 🚀
