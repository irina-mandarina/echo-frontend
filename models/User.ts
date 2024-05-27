import type { Stream } from "./StreamingData"

export type User = {
    username: string | null
    email: string | null
    bio: string | null
    dateOfRegistration: string | null
    streamingData: Stream[] | null
    spotifyConnected: boolean
    following?: User[]
    followers?: User[]
}
