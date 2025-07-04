# Sistema de Productos con Firebase

## Descripción
El componente `FeaturedProductsSection` ahora carga productos dinámicamente desde la colección "producto" de Firebase en lugar de usar datos estáticos.

## Estructura de la colección "producto"
Cada documento en la colección debe tener los siguientes campos:
- `nombre` (string): El nombre del producto
- `descripcion` (string): Descripción del producto
- `precio` (number): Precio del producto en colones

## Componentes creados/modificados

### 1. `useProducts.ts` (Hook personalizado)
- Carga productos desde Firebase
- Maneja estados de carga y error
- Proporciona función para refrescar productos

### 2. `FirebaseProductCard.tsx` (Componente de tarjeta)
- Renderiza productos de Firebase
- Usa imagen por defecto (`/placeholder.jpg`)
- Maneja la estructura de datos de Firebase

### 3. `FeaturedProductsSection.tsx` (Componente modificado)
- Ahora usa el hook `useProducts`
- Muestra estados de carga y error
- Funciona con productos de Firebase

## Cómo poblar productos en Firebase

### Opción 1: Script automático
```bash
# Ejecutar el script de población
npm run dev
# Luego en la consola del navegador:
# import { populateProducts } from './scripts/populate-products'
# populateProducts()
```

### Opción 2: Firebase Console
1. Ir a Firebase Console
2. Seleccionar el proyecto "sabor-nativo"
3. Ir a Firestore Database
4. Crear colección "producto"
5. Agregar documentos con la estructura:
```json
{
  "nombre": "Nombre del producto",
  "descripcion": "Descripción del producto",
  "precio": 7500
}
```

## Productos de ejemplo
El script incluye estos productos:
- Miel de Abeja (₡7,500)
- Chimichurri Argentino (₡5,000)
- Pesto (₡6,200)
- Mermelada de Mora (₡4,200)
- Mantequilla Saborizada (₡3,800)
- Pasta de Ajo (₡2,500)

## Estados del componente
- **Cargando**: Muestra spinner
- **Error**: Muestra mensaje de error
- **Sin productos**: Muestra mensaje informativo
- **Con productos**: Muestra carousel funcional

## Notas técnicas
- Los productos se cargan automáticamente al montar el componente
- Se usa imagen por defecto para todos los productos
- El carousel se ajusta automáticamente al número de productos
- Funciona con responsive design (1 columna en móvil, 3 en desktop)
