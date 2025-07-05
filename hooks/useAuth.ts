"use client";

import { useState, useEffect } from 'react';

interface User {
  id: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  fullName: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    console.log("🔍 Verificando usuario guardado en localStorage...");
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log("✅ Usuario encontrado en localStorage:", userData.nombre, userData.apellidos);
        setUser(userData);
      } catch (error) {
        console.error("❌ Error al cargar usuario guardado:", error);
        localStorage.removeItem('currentUser');
      }
    } else {
      console.log("❌ No hay usuario guardado en localStorage");
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    console.log("✅ Iniciando sesión para:", userData.nombre, userData.apellidos);
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    console.log("🚪 Cerrando sesión");
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    userName: user?.fullName || "Usuario"
  };
}
