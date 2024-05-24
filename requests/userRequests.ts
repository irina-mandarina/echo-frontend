import { request, gql } from 'graphql-request'
import { getJWT } from '~/lib/localStorageUtil'
import type { User } from '~/models/User'
    
const graphqlEndpoint = "http://localhost:8080/graphql"

function generateUserQuery(fields: string[] | undefined = undefined) {
  let userFields = `
    username
    bio
    spotifyConnected
    streamingData {
      episode {
        id
        name
        description
        audio_preview_url
        uri
        images {
          url
          width
          height
        }
        show {
          id
          uri
          name
          publisher
          description
          total_episodes
          images {
            url
            width
            height
          }
        }
      }
      timestamps
    }
  `

  if (fields && fields.length > 0) {
    userFields = fields.join('\n')
  }

  return gql`
    query GetUser($username: String) {
      getUser(username: $username) {
        ${userFields}
      }
    }
  `
}

export async function getUser(username: string | undefined = undefined, fields: string[] | undefined = undefined): Promise<any> {
  const userQuery = generateUserQuery(fields)
  
  const requestHeaders = {
    'Authorization': `Bearer ${getJWT()}`
  }

  const variables = { username }
  const { getUser }  = await request(graphqlEndpoint!, userQuery, variables, requestHeaders) as { getUser: any }
  console.log(getUser)
  return getUser
}

export async function getUsers(query: string | undefined = undefined, fields: string[] | undefined = undefined): Promise<User[]> {
  const userQuery = gql`
    query GetUsers($query: String) {
      getUsers(query: $query) {
        username
        bio
      }
    }
  `
  const requestHeaders = {
    'Authorization': `Bearer ${getJWT()}`
  }

  const variables = { query }
  const { getUsers }  = await request(graphqlEndpoint!, userQuery, variables, requestHeaders) as { getUsers: any }
  console.log(getUsers)
  return getUsers
}

export async function logIn(identifier: string, password: string): Promise<any> {
  const loginMutation = gql`
    mutation LogIn($input: LogInDTO!) {
      logIn(input: $input) {
        jwt
        user {
          username
          bio
          spotifyConnected
        }
      }
    }
  `
  const requestHeaders = {
    'Authorization': `Bearer ${getJWT()}`
  }
  const variables = { input: {identifier, password } }
  const { logIn } = await request(graphqlEndpoint, loginMutation, variables) as { logIn: any }
  return logIn
}

export async function signUp(username: string, email: string, password: string): Promise<any> {
  const signUpMutation = gql`
    mutation SignUp($input: SignUpDTO!) {
      signUp(input: $input) {
        jwt
        user {
          username
          bio
        }
      }
    }
  `
  const requestHeaders = {
    'Authorization': `Bearer ${getJWT()}`
  }
  const variables = { input: {username, email, password } }
  const { signUp } = await request(graphqlEndpoint, signUpMutation, variables) as { signUp: any }
  console.log(signUp)
  return signUp
}

