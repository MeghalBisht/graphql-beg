const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID,
} = require('graphql')
const Book = require('../models/books')
const Author = require('../models/authors');
const authors = require('../models/authors');


const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This is a book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                // return authors.find(author => author.id === parent.authorId)
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This is an author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type:GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                // return books.filter(book => book.authorId === parent.id)
                return Book.find({ authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Root Query",
    fields: {
        book: {
            type: BookType,
            description: 'A Single Book',
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => Book.findById(args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all Books',
            resolve: () => Book.find({})
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => Author.findById(args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: () => Author.find({})
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            description: 'Add a b newook',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

//how query looks from front end
// book(id: '123'){
//     name 
//     genre
// }