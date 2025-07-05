# Sistema de Carrito con Productos de Firebase

## Descripción
El sistema de carrito ha sido completamente refactorizado para funcionar con productos de la colección "producto" de Firebase en lugar de productos estáticos.

## Cambios principales

### 1. **Hook useCart.tsx actualizado**

#### **Antes:**
- Usaba `Product` de `@/lib/data`
- IDs de tipo `number`
- Propiedades: `name`, `price`, `image`, `description`

#### **Después:**
- Usa `FirebaseProduct` de `@/hooks/useProducts`
- IDs de tipo `string` (Firebase document IDs)
- Propiedades: `nombre`, `precio`, `descripcion`
- Nueva interfaz `CartItem`:
```typescript
export interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  quantity: number;
  image?: string; // Imagen por defecto
}
```

#### **Funciones actualizadas:**
- `addToCart(product: FirebaseProduct, quantity?: number)`
- `updateQuantity(productId: string, newQuantity: number)`
- `removeFromCart(productId: string)`
- Cálculo de precios usa `item.precio`

### 2. **CartItemCard.tsx actualizado**

#### **Cambios:**
- `item.name` → `item.nombre`
- `item.price` → `item.precio`
- `item.image || "/placeholder.jpg"` para imagen por defecto
- Mantiene toda la funcionalidad (agregar, quitar, eliminar)

### 3. **OrderSummary.tsx actualizado**

#### **Cambios:**
- `item.name` → `item.nombre`
- `item.price` → `item.precio`
- Número de WhatsApp actualizado: `50687462555`
- Mensaje de WhatsApp usa los nuevos nombres de propiedades

### 4. **Página de producto [id]/page.tsx**

#### **Nuevas funcionalidades:**
- Importa y usa `useCart`
- Función `handleAddToCart()` actualizada para usar `addToCart(product, quantity)`
- Funciona completamente con productos de Firebase

## Flujo completo del carrito

### **1. Agregar producto**
```typescript
// En la página de detalles
const { addToCart } = useCart()
addToCart(firebaseProduct, quantity)
```

### **2. Ver carrito**
- Los productos se muestran con imagen por defecto
- Nombres y precios desde Firebase
- Funciones de cantidad y eliminación funcionales

### **3. Realizar pedido**
- Genera mensaje de WhatsApp con productos de Firebase
- Incluye método de pago y notas de entrega
- Envía al WhatsApp: `+506 8746-2555`

## Estructura de datos

### **Producto de Firebase:**
```typescript
{
  id: "firebase-doc-id",
  nombre: "Miel de Abeja",
  descripcion: "Descripción del producto",
  precio: 7500
}
```

### **Item del carrito:**
```typescript
{
  id: "firebase-doc-id",
  nombre: "Miel de Abeja", 
  descripcion: "Descripción del producto",
  precio: 7500,
  quantity: 2,
  image: "/placeholder.jpg"
}
```

## Características mantenidas

✅ **Persistencia en localStorage**
✅ **Cálculo automático de totales**
✅ **Validación de cantidades**
✅ **Estados de carrito vacío**
✅ **Integración con WhatsApp**
✅ **Responsive design**

## Testing

Para probar el sistema:

1. **Agregar productos:** Ir a una página de producto y hacer clic en "Agregar al carrito"
2. **Ver carrito:** Navegar a `/cart` 
3. **Modificar cantidades:** Usar los botones +/- en el carrito
4. **Eliminar productos:** Usar el botón de basura
5. **Realizar pedido:** Completar información y enviar por WhatsApp

## Notas técnicas

- **Compatibilidad:** El sistema es retrocompatible con productos estáticos si es necesario
- **Imágenes:** Todos los productos usan `/placeholder.jpg` por defecto
- **IDs:** Los IDs de Firebase son strings, no numbers
- **Precios:** Se mantiene el formato de colones (₡)
- **WhatsApp:** El número se puede cambiar fácilmente en `OrderSummary.tsx`
