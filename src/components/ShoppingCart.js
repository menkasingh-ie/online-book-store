import React from 'react';
import { useCart } from '../components/CartContext';

const ShoppingCart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    // Ensure cart is an array
    if (!Array.isArray(cart)) {
        console.error('Cart state is not an array');
        return <div>Error: Cart state is invalid.</div>;
    }

    return (
        <div className='container pt-5'>
            <div className="row pt-5">
                <div className="col-md-12">
                    <h2>Shopping Cart</h2>
                </div>
            </div>
            <div className='border-bottom mt-3'></div>
            <div className="row">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((book) => {
                        // Safeguard against undefined book or its properties
                        if (!book || !book.volumeInfo) {
                            console.error('Book or volumeInfo is undefined:', book);
                            return null;
                        }
                        
                        const { volumeInfo } = book;
                        const { imageLinks, title, authors } = volumeInfo || {};
                        const { thumbnail } = imageLinks || {};
                        
                        return (
                            <div className="col-md-12 border-bottom pb-5 pt-5" key={book.id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className='card'>
                                            <img 
                                                src={thumbnail} 
                                                alt={title} 
                                                className='img-fluid' 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className='card border-0'>
                                            <h2>{book.volumeInfo.title}</h2>
                                            <h5 className='mt-4'>
                                                <span><strong>Author:</strong></span>&nbsp; &nbsp;
                                                {book.volumeInfo.authors?.join(', ')}
                                            </h5>
                                            <div className="d-flex align-items-center mt-4">
                                                <p>
                                                    <span>Quantity:</span>&nbsp; &nbsp;
                                                    <small><strong>{book.quantity}</strong></small>
                                                </p>
                                                <div className='plus-minus-btn'>
                                                    <button onClick={() => decreaseQuantity(book.id)} className='btn minus-btn'>-</button>
                                                    <button onClick={() => increaseQuantity(book.id)} className='btn plus-btn'>+</button>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(book.id)} className='btn remove-btn'>
                                                Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;




