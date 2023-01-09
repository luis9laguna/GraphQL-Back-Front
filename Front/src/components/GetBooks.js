import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_USERS } from '../GraphQL/Queries'

const GetBooks = () => {

    const { error, loading, data } = useQuery(LOAD_USERS)

    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(data?.books)
    }, [data])

    return (
        <div>
            {books && books.map((book) => {
                return <h1>{book?.name}</h1>
            })}
        </div>
    )
}

export default GetBooks