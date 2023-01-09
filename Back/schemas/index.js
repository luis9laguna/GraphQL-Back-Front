const { bookType, authorType } = require('./type')
const data = require('../data.json');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: bookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => data.books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(bookType),
            description: 'List of All Books',
            resolve: () => data.books
        },
        authors: {
            type: new GraphQLList(authorType),
            description: 'List of All Authors',
            resolve: () => data.authors
        },
        author: {
            type: authorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => data.authors.find(author => author.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: bookType,
            description: 'Add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: data.books.length + 1, name: args.name, authorId: args.authorId }
                data.books.push(book)
                return book
            }
        },
        addAuthor: {
            type: authorType,
            description: 'Add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: data.authors.length + 1, name: args.name }
                data.authors.push(author)
                return author
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})
