import React, { useState, useEffect } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/query'

function AddBook(props) {

    const [data, setData] = useState({})
    const [book, setBook] = useState({
        name: "",
        genre: "",
        authorId: ""
    })

    useEffect(() => {
        setData(props.getAuthorsQuery)
    })
    const displayAuthors = () => {
        if (data.loading) {
            return <option>Loading</option>
        } else {
            return data.authors && data.authors.map((author, i) => {
                return <option value={author.id} key={i}>{author.name}</option>
            })
        }
    }

    const changeHandler = (e) => {
        setBook({
            ...book,
            [e.target.id]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        console.log(book);
        setBook({
            name: "",
            genre: "",
            authorId: ""
        })
        props.addBookMutation({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    return (
        <form className="add-book" onSubmit={submitForm}>

            <div className="field">
                <label>Book Name:</label>
                <input id="name" onChange={changeHandler} value={book.name} type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input id="genre" onChange={changeHandler} value={book.genre} type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select id="authorId" onChange={changeHandler} value={book.authorId}>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
