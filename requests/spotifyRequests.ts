import request, { gql } from "graphql-request"
import { getJWT } from "~/lib/localStorageUtil"
import type { User } from "~/models/User"
import type { Episode, EpisodeSearchResult } from "~/models/Episode"
import type { Show, ShowSearchResult } from "~/models/Show"
import { requestHeaders } from "./requestHeaders"

const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

const SEARCH_EPISODES_QUERY = gql`
    query SearchEpisodes($query: String, $limit: Int, $offset: Int) {
        searchEpisodes(query: $query, limit: $limit, offset: $offset) {
            name
            release_date
            images {
                url
            }
            uri
            id
            description
        }
    }
`;

const SEARCH_SHOWS_QUERY = gql`
    query SearchShows($query: String, $limit: Int, $offset: Int) {
        searchShows(query: $query, limit: $limit, offset: $offset) {
            name
            publisher
            images {
                url
            }
            uri
            id
            description
        }
    }
`;

export async function searchEpisodes(query: string, limit: number, offset: number): Promise<EpisodeSearchResult[]> {
    const variables = { query, limit, offset };

    try {
        const { searchEpisodes }: { searchEpisodes: EpisodeSearchResult[] } = await request(graphqlEndpoint!, SEARCH_EPISODES_QUERY, variables, requestHeaders());
        return searchEpisodes;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
}


export async function searchShows(query: string, limit: number, offset: number): Promise<ShowSearchResult[]> {
    const variables = { query, limit, offset };

    try {
        const { searchShows } : { searchShows: ShowSearchResult[] } = await request(graphqlEndpoint!, SEARCH_SHOWS_QUERY, variables, requestHeaders());
        return searchShows;
    } catch (error) {
        console.error('Error fetching shows:', error);
        return [];
    }
}


export async function getEpisodeRecommendations(count = 10): Promise<any[]> {
    const variables = { count }

    const recommendationQuery = gql`
        query RecommendEpisodes($count: Int!) {
            recommendEpisodes(count: $count) {
                name
                release_date
                images {
                    url
                }
                uri
                id
                description
                show {
                    name
                    publisher
                }
            }
        }
    `

    const { recommendEpisodes }: { recommendEpisodes: any[] } = await request(graphqlEndpoint, recommendationQuery, variables, requestHeaders());
    return recommendEpisodes;
}

export async function getTopShows(count = 10): Promise<Show[]> {
    const variables = { count }

    const topShowsQuery = gql`
        query GetTopShows($count: Int!) {
            getTopShows(count: $count) {
                name
                publisher
                images {
                    url
                }
                uri
                id
                description
            }
        }
    `

    const { getTopShows }: { getTopShows: Show[] } = await request(graphqlEndpoint, topShowsQuery, variables, requestHeaders());
    return getTopShows;
}

export async function getEpisodeById(showId: string): Promise<Episode> {
    const variables = { showId };

    const getEpisodeQuery = gql`
        query GetEpisode($showId: String!) {
            getEpisode(showId: $showId) {
                name
                release_date
                images {
                    url
                }
                uri
                id
                description
                show {
                    name
                    publisher
                    images {
                        url
                    }
                    uri
                    id
                }
            }
        }
    `

    const { getEpisode }: { getEpisode: Episode } = await request(graphqlEndpoint!, getEpisodeQuery, variables, requestHeaders());
    return getEpisode;
}