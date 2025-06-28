"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Product } from "@/lib/data"; // Usamos el tipo de producto que ya tenemos

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
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

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si ya existe, actualiza la cantidad
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Si no existe, lo añade
      return [...prevItems, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(items => items.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(items => items.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Creamos el Hook personalizado para consumir el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}