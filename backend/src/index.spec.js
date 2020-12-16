const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server')

const Server = require('./server')

const dataSource = require('./dataSources/inMemory')
const User = require('./models/User')
const Post = require('./entities/Post')

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
            title
            author {
            name
            id
            posts{
                title
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
        }
    }
`
const GET_USERS_AND_POSTS = gql`
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
    mutation ($post: PostInput!) {
        write(post: $post){
            author{
                name
                posts{
                    title
                }
            }
        }
    }
`




const getTestClient = () => {
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

    return createTestClient(server)
}


describe("Query", () => {
    const { query } = getTestClient()

    describe("Posts", () => {

        it("simple", async () => {
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

        it("Nested", async () => {
            await expect(query({ query: GET_POSTS_NESTED })).resolves.toMatchObject({
                errors: undefined,
                "data": {
                    "posts": [
                        {
                            "title": "title 1",
                            "author": {
                                "name": "John",
                                "id": "1",
                                "posts": [
                                    {
                                        "title": "title 1",
                                        "author": {
                                            "name": "John"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "title": "title 2",
                            "author": {
                                "name": "Emilia",
                                "id": "2",
                                "posts": [
                                    {
                                        "title": "title 2",
                                        "author": {
                                            "name": "Emilia"
                                        }
                                    },
                                    {
                                        "title": "Testy",
                                        "author": {
                                            "name": "Emilia"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "title": "Testy",
                            "author": {
                                "name": "Emilia",
                                "id": "2",
                                "posts": [
                                    {
                                        "title": "title 2",
                                        "author": {
                                            "name": "Emilia"
                                        }
                                    },
                                    {
                                        "title": "Testy",
                                        "author": {
                                            "name": "Emilia"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            })
        })
    })

    describe("Users", () => {
        it("Simple", async () => {
            await expect(query({ query: GET_USERS })).resolves.toMatchObject({
                errors: undefined,
                "data": {
                    "users": [
                        {
                            "name": "John",
                            "id": "1",
                            "email": "john@snow.org",
                        },
                        {
                            "name": "Emilia",
                            "id": "2",
                            "email": "emilia@clark.org",
                        }
                    ]
                }
            })
        })

        it("With posts", async () => {
            await expect(query({ query: GET_USERS_AND_POSTS })).resolves.toMatchObject({
                errors: undefined,
                "data": {
                    "users": [
                        {
                            "name": "John",
                            "id": "1",
                            "email": "john@snow.org",
                            "posts": [
                                {
                                    "title": "title 1"
                                }
                            ]
                        },
                        {
                            "name": "Emilia",
                            "id": "2",
                            "email": "emilia@clark.org",
                            "posts": [
                                {
                                    "title": "title 2"
                                },
                                {
                                    "title": "Testy"
                                }
                            ]
                        }
                    ]
                }
            })
        })

        it("Infinite nesting", async () => {
            await expect(query({ query: GET_USERS_AND_POSTS })).resolves.toMatchObject({
                errors: undefined,
                "data": {
                    "users": [
                        {
                            "name": "John",
                            "id": "1",
                            "email": "john@snow.org",
                            "posts": [
                                {
                                    "title": "title 1"
                                }
                            ]
                        },
                        {
                            "name": "Emilia",
                            "id": "2",
                            "email": "emilia@clark.org",
                            "posts": [
                                {
                                    "title": "title 2"
                                },
                                {
                                    "title": "Testy"
                                }
                            ]
                        }
                    ]
                }
            })
        })
    })

})

describe("Mutate", () => {
    const { mutate } = getTestClient()

    const createTestMutation = (title) => {
        mutate({
            mutation: gql`
                mutation{
                    write(post:{
                        title: "${title}",
                        }){
                            title
                    }
                }
            `
        })
    }

    describe("Posts", () => {
        it("Create", async () => {
            // const action = () => {
            //     mutate({
            //         mutation: WRITE_POST,
            //         variables: { title: "A sample title" }
            //     })
            // }
            // await expect(action()).resolves.toMatchObject({
            //     errors: undefined,
            //     "data": {
            //         "write": {
            //             "title": "A sample title"
            //         }
            //     }
            // })



            // export const DELETE_DOG_MUTATION = gql`
            //     mutation deleteDog($name: String!) {
            //         deleteDog(name: $name) {
            //         id
            //         name
            //         breed
            //         }
            //     }
            // `;
            // const WRITE = gql`
            // mutation write($title: String!){
            //     write(post:{
            //         title: "${title}",
            //         }){
            //             title
            //     }
            // }


            console.log(await createTestMutation("A sample title"))

        })
    })
})