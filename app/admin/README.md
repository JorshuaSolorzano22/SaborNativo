# Panel de Administración - SaborNativo

## Estructura de Datos en Firestore

### Colección: `pedido`

Cada documento en la colección `pedido` debe tener la siguiente estructura:

```javascript
{
  cliente: "Nombre del Cliente",
  estadoPedido: "Pendiente de realizar", // "Entregado" | "Pendiente de realizar" | "Cancelado" | "Completado"
  estadoFacturacion: "Pendiente de pago", // "Pagado" | "Pendiente de pago"
  fecha: timestamp, // Timestamp de Firebase
  notasEntrega: "Notas de entrega opcionales",
  totalPedido: 25000, // Total en números
  productos: [
    {
      idProducto: "prod_001", // ID opcional del producto
      nombre: "Empanadas de carne",
      cantidad: 10,
      precioUnitario: 2500
    },
    {
      idProducto: "prod_002",
      nombre: "Tamales",
      cantidad: 5,
      precioUnitario: 3000
    }
  ]
}
```

## Funciones Implementadas

### Carga de Datos
- `loadOrdersFromFirebase()`: Carga todos los pedidos desde Firestore
- Transforma automáticamente los datos de Firebase al formato local

### Actualización de Datos
- `updateOrderInFirebase(orderId, updateData)`: Actualiza campos específicos de un pedido
- `updateOrderProductsInFirebase(orderId, products, newTotal)`: Actualiza los productos y el total

### Eliminación
- `deleteOrderFromFirebase(orderId)`: Elimina un pedido de Firebase

## Hook Principal: `useAdminDashboard`

El hook maneja todo el estado y la lógica del panel:

- **Estados**: `orders`, `isLoading`, `error`, `expandedOrders`, etc.
- **Funciones**: Actualización de estados, productos, y sincronización con Firebase
- **Manejo de errores**: Captura y muestra errores de Firebase

## Características Implementadas

✅ **Carga automática de pedidos desde Firebase**
✅ **Actualización en tiempo real de estados y productos**
✅ **Manejo de errores y estados de carga**
✅ **Interfaz responsive y moderna**
✅ **Actualización automática en Firebase al hacer cambios**
✅ **Modal de ingredientes con edición manual**
✅ **Botón de actualización manual**

## Uso

1. Los pedidos se cargan automáticamente al entrar al panel
2. Todos los cambios se guardan automáticamente en Firebase
3. En caso de error, se muestra una notificación al usuario
4. El botón "Actualizar" recarga los datos desde Firebase

## Reglas de Firestore Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura a la colección de pedidos
    match /pedido/{document} {
      allow read, write: if true; // Temporalmente abierto para desarrollo
    }
  }
}
```

**Nota**: En producción, implementa reglas de seguridad apropiadas.
