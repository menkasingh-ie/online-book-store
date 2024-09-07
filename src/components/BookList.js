import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext'; 
import '../assets/css/booklist.css';

const BookList = ({ searchQuery }) => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        if (searchQuery) {
            // fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30`)
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyATi2O8UTWTPiObt8Vuk9YQ1qI7xjJl3eQ&maxResults=30`)
                .then(response => response.json())
                .then(data => setBooks(data.items || []))
                .catch(error => console.error('Error fetching books:', error));
        }
    }, [searchQuery]);

    const handleCardClick = (id) => {
        navigate(`/bookdetails/${id}`);
    };

    const handleCartButtonClick = (book) => {
        const bookInCart = cart.find(b => b.id === book.id);
        if (bookInCart) {
            removeFromCart(book.id);
        } else {
            addToCart(book);
        }
    };

    return (
        <main>
            <Container>
                <div className="row pt-5 mt-5">
                    <div className="col-md-12">
                        <h4 className='headings'>Books Showing Based on Your Search</h4>
                    </div>
                </div>
                <div className="row">
                    {books.length > 0 ? (
                        books.map((book) => {
                            const bookInCart = cart.find(b => b.id === book.id);
                            return (
                                <div className="col-md-2 mb-5" key={book.id}>
                                    <Card className="book-list custom-card">
                                        <Card.Img variant="top" onClick={() => handleCardClick(book.id)}
                                            src={book.volumeInfo.imageLinks?.thumbnail} className='img-width' />
                                        <Card.Body>
                                            <Card.Title>{book.volumeInfo.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{book.volumeInfo.authors?.join(', ')}</Card.Subtitle>
                                            <Button className='addBtn'
                                                variant=""
                                                onClick={() => handleCartButtonClick(book)}>
                                                {bookInCart ? 'Remove' : 'Add to Cart'}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-md-12">
                            {/* <p>No books found. Try a different search.</p> */}
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
};

export default BookList;



