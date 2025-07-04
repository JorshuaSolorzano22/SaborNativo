"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { FirebaseProduct } from "@/hooks/useProducts";

// Interfaz para un item del carrito basado en productos de Firebase
export interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  quantity: number;
  imagen: string; 
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: FirebaseProduct, quantity?: number) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

// 1. Creamos el Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Creamos el Proveedor (Provider) que contendrá el estado
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Lógica para cargar el carrito desde localStorage al iniciar (opcional pero recomendado)
  useEffect(() => {
    const storedCart = localStorage.getItem("sabor_nativo_cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Lógica para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("sabor_nativo_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: FirebaseProduct, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si ya existe, actualiza la cantidad
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Si no existe, lo añade con imagen por defecto
      return [...prevItems, { 
        ...product, 
        quantity,
        imagen: product.imagen || "/placeholder.jpg" // Imagen por defecto
      }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(items => items.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Creamos el Hook para consumir el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}