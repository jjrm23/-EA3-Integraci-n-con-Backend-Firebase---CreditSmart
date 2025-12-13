# 🏦 EA3: Integración con Backend (Firebase) - CreditSmart

Este proyecto es una aplicación web sencilla desarrollada con **React y Vite** que simula la gestión de productos crediticios, demostrando la integración completa de servicios **Backend como Servicio (BaaS)** usando **Google Firebase (Firestore)**.

## 🚀 Funcionalidades Demostradas

La aplicación implementa las siguientes operaciones de gestión de datos en tiempo real con Firebase:

| Operación | Ruta | Descripción |
| :--- | :--- | :--- |
| **READ** (Lectura) | `/` (Home) | Carga y muestra una lista de productos crediticios desde la colección `productos_crediticios`. |
| **CREATE** (Creación) | `/solicitar-credito` | Permite a los usuarios enviar una solicitud, guardando un nuevo documento en la colección `solicitudes_credito`. |
| **QUERY** (Consulta/Filtro) | `/mis-solicitudes` | Filtra las solicitudes de crédito basándose en un email de prueba (`test@user.com`) y las ordena por fecha de creación. |

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React v18, Vite
* **Routing:** React Router DOM v6
* **Backend:** Google Firebase
    * **Base de Datos:** Cloud Firestore
    * **Servicios:** Firebase SDK para conexión y gestión de colecciones.

## ⚙️ Configuración e Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

### 1. Clona el Repositorio

```bash
git clone [https://github.com/jjrm23/-EA3-Integraci-n-con-Backend-Firebase---CreditSmart.git](https://github.com/jjrm23/-EA3-Integraci-n-con-Backend-Firebase---CreditSmart.git)
cd -EA3-Integraci-n-con-Backend-Firebase---CreditSmart