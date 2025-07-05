# Debug y Solución - Autenticación con Firestore

## Problema Identificado

El usuario reportó que "no acepta ningún usuario creado en la colección Users". Este problema se debe a que probablemente no hay usuarios creados en la colección "Users" de Firestore o hay algún problema en la consulta.

## Solución Implementada

### 1. Herramientas de Debug Creadas

#### a) Página de Debug de Usuarios (`/admin/debug-users`)
- **Funcionalidad**: Permite listar, crear y probar usuarios de Firestore
- **Acceso**: Disponible desde el Admin Dashboard
- **Características**:
  - Lista todos los usuarios existentes en la colección "Users"
  - Crea un usuario de prueba con credenciales conocidas
  - Prueba el proceso de login directamente
  - Muestra información detallada de cada usuario

#### b) Página de Creación Manual (`/admin/create-test-user`)
- **Funcionalidad**: Permite crear usuarios personalizados
- **Acceso**: Desde la página de debug
- **Características**:
  - Formulario completo para crear usuarios
  - Valores predeterminados para facilitar pruebas
  - Confirmación de creación exitosa
  - Enlace directo al login para probar

#### c) Logging Mejorado
- **Hook useAuth**: Agregado logging detallado del estado de autenticación
- **Página Login**: Agregado logging paso a paso del proceso de login
- **OrderSummary**: Agregado logging del estado de autenticación

### 2. Páginas de Poblado de Datos

#### a) Poblado Masivo (`/admin/populate-users`)
- Crea 5 usuarios de prueba de una vez
- Incluye el usuario test@test.com con contraseña test123

#### b) Script de Poblado (`/admin/populate-users.ts`)
- Script reutilizable para poblar usuarios
- Fácil de modificar para agregar más usuarios

## Credenciales de Prueba Disponibles

```
Email: test@test.com
Contraseña: test123

Email: juan.perez@email.com  
Contraseña: 123456

Email: maria.gonzalez@email.com
Contraseña: password

Email: carlos.rodriguez@email.com
Contraseña: mipassword

Email: ana.sanchez@email.com
Contraseña: 123abc

Email: usuario@test.com
Contraseña: 123456
```

## Pasos para Probar el Sistema

### 1. Verificar Estado Inicial
1. Ir a `/admin/debug-users`
2. Hacer clic en "Listar Usuarios"
3. Verificar si existen usuarios en la colección

### 2. Crear Usuarios de Prueba (si no existen)
**Opción A - Poblado Masivo:**
1. Ir a `/admin/populate-users`
2. Hacer clic en "Poblar Usuarios"
3. Confirmar que se crearon exitosamente

**Opción B - Creación Manual:**
1. Ir a `/admin/create-test-user`
2. Modificar los datos si es necesario
3. Hacer clic en "Crear Usuario"
4. Verificar el mensaje de éxito

### 3. Probar Autenticación
1. Ir a `/login`
2. Usar cualquiera de las credenciales de prueba
3. Verificar que el login sea exitoso
4. Ir a `/cart` para confirmar que el usuario está autenticado

### 4. Verificar Funcionalidad del Carrito
1. Agregar productos al carrito
2. Ir a `/cart`
3. Verificar que aparece el nombre del usuario autenticado
4. Probar el flujo de crear pedido

## Estructura de Datos en Firestore

### Colección "Users"
```javascript
{
  nombre: "String",
  apellidos: "String", 
  telefono: "String",
  correo: "String",     // Campo usado para login
  contraseña: "String"   // Campo usado para login
}
```

## Enlaces Rápidos de Navegación

- **Admin Dashboard**: `/admin`
- **Debug de Usuarios**: `/admin/debug-users`
- **Poblar Usuarios**: `/admin/populate-users`
- **Crear Usuario Manual**: `/admin/create-test-user`
- **Login**: `/login`
- **Carrito**: `/cart`

## Notas Técnicas

1. **Autenticación Híbrida**: El sistema soporta tanto Firebase Auth como usuarios de Firestore
2. **Sesión Local**: Los usuarios de Firestore se almacenan en localStorage
3. **Eventos Personalizados**: Se usa `auth-change` para sincronizar el estado
4. **Logging**: Revisar la consola del navegador para ver el proceso paso a paso
5. **Validación**: El sistema requiere autenticación para realizar pedidos

## Solución de Problemas

Si aún no funciona después de seguir estos pasos:

1. **Verificar Conexión a Firebase**:
   - Revisar `firebaseConfig.js`
   - Confirmar que las credenciales son correctas

2. **Verificar Consola del Navegador**:
   - Buscar errores en la consola
   - Revisar los logs de autenticación

3. **Limpiar Estado**:
   - Limpiar localStorage: `localStorage.clear()`
   - Recargar la página

4. **Verificar Firestore**:
   - Confirmar que la colección "Users" existe
   - Verificar que los documentos tienen los campos correctos
