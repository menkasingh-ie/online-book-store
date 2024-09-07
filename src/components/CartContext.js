import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const addToCart = (book) => {
        setCart(prevCart => {
            // Ensure prevCart is always an array
            if (!Array.isArray(prevCart)) {
                console.error('Cart state is not an array');
                return [book];
            }

            const existingBookIndex = prevCart.findIndex(item => item.id === book.id);
            if (existingBookIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingBookIndex].quantity += 1;
                return updatedCart;
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };


    const removeFromCart = (bookId) => {
        setCart(prevCart => {
            if (!Array.isArray(prevCart)) {
                console.error('Cart state is not an array');
                return [];
            }

            return prevCart.filter(item => item.id !== bookId);
        });
    };


    const increaseQuantity = (bookId) => {
        setCart(prevCart => {
            if (!Array.isArray(prevCart)) {
                console.error('Cart state is not an array');
                return [];
            }

            const updatedCart = prevCart.map(item =>
                item.id === bookId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return updatedCart;
        });
    };


    const decreaseQuantity = (bookId) => {
        setCart(prevCart => {
            if (!Array.isArray(prevCart)) {
                console.error('Cart state is not an array');
                return [];
            }

            const updatedCart = prevCart.map(item =>
                item.id === bookId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            return updatedCart;
        });
    };



    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );

};

