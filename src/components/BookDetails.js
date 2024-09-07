import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const apiKey = 'AIzaSyATi2O8UTWTPiObt8Vuk9YQ1qI7xjJl3eQ';
    useEffect(() => {
        // fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('book details:', data);
                setBook(data)})
            .catch(error => console.error('Error fetching book details:', error));
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <main>
            <div className='container pt-5 pb-5'>
                <div className="row pt-5">
                    <div className="col-md-3">
                        <div className='card'>
                            <img src={book.volumeInfo.imageLinks?.thumbnail} 
                            className='img-fluid' alt={book.volumeInfo.title} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className='book-details'>
                            <h1>{book.volumeInfo.title}</h1>
                            <h5><span><strong>Author:</strong> </span>{book.volumeInfo.authors?.join(', ')}</h5>
                            <h5><span><strong>Genre(s):</strong> </span>{book.volumeInfo.categories?.join(', ')}</h5>
                            <div className='border-bottom mt-4'></div>
                            <h5><span><strong>Description:</strong></span></h5>
                            <p>{book.volumeInfo.description}</p>
                        </div>
                    </div>
                    {/* <div className='border-bottom pt-5'></div> */}
                </div>
                {/* <div className="row pt-5">
                    <div className="col-md-12">
                        <h5><span><strong>Description:</strong></span></h5>
                        <p>{book.volumeInfo.description}</p>
                    </div>
                </div> */}
            </div>
        </main>
    );
};

export default BookDetails;
