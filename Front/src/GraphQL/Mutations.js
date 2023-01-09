import { gql } from '@apollo/client'


export const CREATE_BOOK_MUTATION = gql`
    mutation addBook($name: String! $authorId: Int!){
        addBook(name: $name authorId: $authorId){
            id
        }
    }
`