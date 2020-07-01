import React, { useState, useEffect } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { getBookQuery } from '../queries/query'


function BookDetails(props) {

    const displayBookDetails = () => {
        const { book } = props.data
        if (book) {
            return (
                <div>
                    <h2>Book Name: {book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(book => {
                                return <li key={book.id}>{book.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return(
                <h2>No book selected</h2>
            )
        }
    }

    return (
        <div className="book-details">
           {displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
