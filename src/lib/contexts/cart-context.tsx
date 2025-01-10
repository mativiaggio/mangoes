import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  totalQuantity: number;
  updateCart: (items: CartItem[]) => void;
  loadCart: (agencyId: string) => void;
  updateQuantity: (id: string, change: number, agencyId: string) => void;
  deleteProduct: (id: string, agencyId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  };

  const updateQuantity = (id: string, change: number, agencyId: string) => {
    const cartKey = "cart";
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "{}");
    const agencyCart = currentCart[agencyId] || [];

    const updatedCart = agencyCart
      .map((item: CartItem) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity > 0) {
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            };
          }
        }
        return item;
      })
      .filter((item: CartItem) => item.quantity > 0); // Filtra los items con cantidad > 0

    if (updatedCart.length === 0) {
      // Si no quedan productos, elimina el agencyId del carrito
      delete currentCart[agencyId];
    } else {
      // Si aún hay productos, actualiza el carrito de la agencia
      currentCart[agencyId] = updatedCart;
    }

    localStorage.setItem(cartKey, JSON.stringify(currentCart));
    updateCart(updatedCart);
  };

  const deleteProduct = (id: string, agencyId: string) => {
    const cartKey = "cart";
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "{}");
    const agencyCart = currentCart[agencyId] || [];

    const updatedCart = agencyCart.filter((item: CartItem) => item.id !== id);

    if (updatedCart.length === 0) {
      // Si no quedan productos, elimina el agencyId del carrito
      delete currentCart[agencyId];
    } else {
      // Si aún hay productos, actualiza el carrito de la agencia
      currentCart[agencyId] = updatedCart;
    }

    localStorage.setItem(cartKey, JSON.stringify(currentCart));
    updateCart(updatedCart);
  };

  const loadCart = (agencyId: string) => {
    const cartKey = "cart";
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "{}");
    const agencyCart = currentCart[agencyId] || [];
    updateCart(agencyCart);
  };

  // Cargar el carrito al inicio
  useEffect(() => {
    const cartKey = "cart";
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "{}");

    // Combina todos los items de todas las agencias para calcular el total
    const allItems = Object.values(currentCart).flat() as CartItem[];
    updateCart(allItems);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem(cartKey) || "{}");
      const updatedItems = Object.values(updatedCart).flat() as CartItem[];
      updateCart(updatedItems);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        updateCart,
        loadCart,
        updateQuantity,
        deleteProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};
