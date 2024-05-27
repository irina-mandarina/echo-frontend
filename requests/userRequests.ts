import { request, gql } from 'graphql-request'
import type { User } from '~/models/User'
import { requestHeaders } from './requestHeaders';
import type { Stream } from '~/models/StreamingData';

const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';


function generateUserQuery(fields: string[] | undefined = undefined) {
  let userFields = `
    username
    bio
    spotifyConnected
    followers {
      username
    }
    following {
      username
    }
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
  const variables = { username }
  const { getUser }  = await request(graphqlEndpoint!, userQuery, variables, requestHeaders()) as { getUser: any }
  return getUser
}

export async function searchUsers(query: string | undefined = undefined, fields: string[] | undefined = undefined): Promise<User[]> {
  const userQuery = gql`
    query SearchUsers($query: String) {
      searchUsers(query: $query) {
        username
        bio
      }
    }
  `
  const variables = { query }
  const { searchUsers }  = await request(graphqlEndpoint!, userQuery, variables, requestHeaders()) as { searchUsers: any }
  console.log(searchUsers)
  return searchUsers
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
  const variables = { input: {username, email, password } }
  const { signUp } = await request(graphqlEndpoint, signUpMutation, variables) as { signUp: any }
  console.log(signUp)
  return signUp
}

export async function getStreamingData(username: string | undefined = undefined): Promise<Stream[]> {
  const streamingDataQuery = gql`
    query getStreamingData($username: String) {
      getUser(username: $username) {
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
      }
    }
  `;

  const variables = { username };
  const { getUser }: { getUser: User } = await request(graphqlEndpoint, streamingDataQuery, variables, requestHeaders());
  const streamingData: Stream[] = getUser!.streamingData || [];
  return streamingData;
}

export async function followUser(username: string): Promise<void> {
  const followUserMutation = gql`
    mutation FollowUser($username: String!) {
      followUser(username: $username)
    }
  `

  const variables = { username }
  const { followUser }: any = await request(graphqlEndpoint, followUserMutation, variables, requestHeaders())
  return followUser
}