import request from "graphql-request";
import { getJWT } from "~/lib/localStorageUtil";

const graphqlEndpoint = "http://localhost:8080/graphql"
const requestHeaders = {
    'Authorization': `Bearer ${getJWT()}`
};
console.log(requestHeaders);

export async function getSpotifyAuthURL(): Promise<string> {
    const getSpotifyAuthURLQuery = `
        query GetSpotifyAuthURL {
            getSpotifyAuthURL
        }
    `;

    try {
        const { getSpotifyAuthURL } : any = await request(graphqlEndpoint!, getSpotifyAuthURLQuery, undefined, requestHeaders);
        
        console.log(getSpotifyAuthURL);
        return getSpotifyAuthURL;
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw error;
    }
}