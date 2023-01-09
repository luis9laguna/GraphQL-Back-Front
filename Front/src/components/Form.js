import { CREATE_BOOK_MUTATION } from '../GraphQL/Mutations'
import { useMutation } from '@apollo/client'

const Form = () => {

    const [addBook, { error }] = useMutation(CREATE_BOOK_MUTATION)

    const formhandler = (e) => {
        e.preventDefault()
        const { book, author } = e.target
        addBook({
            variables: {
                name: book.value,
                authorId: parseInt(author.value)
            }
        })

        if (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={formhandler}>
            <div>
                <label htmlFor='book'>Book</label>
                <input id="book" />
            </div>
            <div>
                <label htmlFor='author'>Author</label>
                <select id='author'>
                    <option>Choose</option>
                    <option value="1">J. K. Rowling</option>
                    <option value="2">J. R. R. Tolkien</option>
                    <option value="3">Brent Weeks</option>
                </select>
            </div>

            <button>Submit</button>
        </form>
    )
}

export default Form