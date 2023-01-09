const data = require('../data');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql')

const bookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: authorType,
            resolve: (book) => {
                return data.authors.find(author => author.id === book.authorId)
            }
        }
    })
})


const authorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(bookType),
            resolve: (author) => {
                return data.books.filter(book => book.authorId === author.id)
            }
        }
    })
})


module.exports = { bookType, authorType };
