const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server')

const Server = require('./server')

const dataSource = require('./CustomDataSource')
const User = require('./models/User')
const Post = require('./models/Post')

const seed_db = new dataSource()

const context_user = new User({ name: 'John', email: 'john@snow.org', password: "12345" }, id = "1")

seed_db.users = [
    context_user,
    new User({ name: 'Emilia', email: 'emilia@clark.org', password: "23456" }, id = "2")
]

seed_db.posts = [
    new Post({ title: 'title 1' }, authorId = "1", id = "1"),
    new Post({ title: 'title 2' }, authorId = "2", id = "2"),
    new Post({ title: 'Testy' }, authorId = "2", id = "3")
]
const context = () => {
    return { context_user }
}

const server = new Server({
    context: context,
    dataSources: () => {
        return {
            db: seed_db
        }
    },
})

const { query, mutate } = createTestClient(server)

const GET_POSTS = gql`
    query {
        posts {
        title
        id
        author {
            name
            id
        }
        }
    }
`
const GET_POSTS_NESTED = gql`
    query {
        posts {
        author {
            posts{
            author{
                name
            }
            }
        }
        }
    }
`
const GET_USERS = gql`
    query {
        users {
        name
        id
        email
        posts {
            title
        }
        }
    }
`
const WRITE_POST = gql`
    mutation {
        write(post:{
            title: "A sample title",
            }){
        title
        }
    }
`


describe("Posts", () => {
    it("List", async () => {
        console.log("POST-LIST:");
        await expect(query({ query: GET_POSTS })).resolves.toMatchObject({
            errors: undefined,
            data: {
                posts: [
                    { title: 'title 1', id: "1" },
                    { title: 'title 2', id: "2" },
                    { title: 'Testy', id: "3" }
                ]
            },
        })
    })

    // beforeEach(() => {


    // })

})
