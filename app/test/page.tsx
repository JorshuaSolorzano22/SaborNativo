import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-brand-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-brand-foreground">
          Test de CSS - Sabor Nativo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-brand-primary mb-4">
              Color Primario
            </h2>
            <p className="text-brand-foreground">
              Usando color brand-primary: #7A8751
            </p>
          </div>
          
          <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-brand-foreground mb-4">
              Color Secundario
            </h2>
            <p className="text-brand-foreground">
              Usando color brand-secondary: #E9D6A8
            </p>
          </div>
          
          <div className="bg-white border-2 border-brand-border p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-brand-primary mb-4">
              Border Brand
            </h2>
            <p className="text-brand-foreground">
              Usando border-brand-border
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="btn-sabor-primary px-6 py-3 rounded-lg font-semibold">
            Botón Primario Custom
          </button>
          
          <button className="btn-sabor-secondary px-6 py-3 rounded-lg font-semibold">
            Botón Secundario Custom
          </button>
          
          <button className="bg-brand-whatsapp text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Color WhatsApp
          </button>
        </div>
        
        <div className="sabor-gradient p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-brand-foreground mb-4">
            Gradiente Custom
          </h2>
          <p className="text-brand-foreground">
            Esta caja usa la clase sabor-gradient definida en globals.css
          </p>
        </div>
        
        <div className="sabor-shadow sabor-hover-lift bg-white p-6 rounded-lg cursor-pointer">
          <h2 className="text-xl font-semibold text-brand-primary mb-4">
            Sombra y Hover Effect
          </h2>
          <p className="text-brand-foreground">
            Esta caja tiene sombra custom y efecto hover lift
          </p>
        </div>
      </div>
    </div>
  );
}
