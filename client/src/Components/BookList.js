import React, { useState, useEffect } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/query'
import BookDetails from './BookDetails'

function BookList(props) {

    const [data, setData] = useState({})
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setData(props.data)
    })


    if (data.loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <ul className="book-list">{
                data.books && data.books.map((book, index) => {
                    return <li onClick={e => setSelected(book.id)} key={index}>{book.name}</li>
                })}
            </ul>
            <BookDetails bookId= {selected} />
        </div>
    )

}

export default graphql(getBooksQuery)(BookList)
