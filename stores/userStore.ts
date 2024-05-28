import { defineStore } from 'pinia'
import { followUser, getStreamingData, getUser, logIn, signUp, unfollowUser, getFollowData } from '~/requests/userRequests'
import { setJWT, removeJWT } from '~/lib/localStorageUtil'
import type { User } from '~/models/User'

export const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        user: null as User | null,
        errorMessage: null as string | null
    }),
    actions: {
        async init() {
            console.log('Initializing user store')
            await this.setUser()
        },
        async setUser() {
            try {
                this.user = await getUser()
                console.log(this.user)
                this.errorMessage = null
            }
            catch (error: any) {
                console.error(error)
                if (error.response?.status === 401) {
                    removeJWT()
                    if (window) window.location.href = '/login'
                    return
                }
                this.errorMessage = error.response?.errors[0].message
            }
        },
        async logIn(username: string, password: string) {
            try {
                const { user, jwt, result } = await logIn(username, password)
                this.user = user
                setJWT(jwt)
                this.errorMessage = null
            } catch (error: any) {
                console.error(error)
                this.errorMessage = error.response.errors[0].message
            }
        },
        async logOut() {
            this.user = null
            removeJWT()
        },
        async signUp(username: string, email: string, password: string) {
            try {
                const res = await signUp(username, email, password)
                console.log(res)
                this.user = res.user
                setJWT(res.jwt)
                this.errorMessage = null
            }
            catch (error: any) {
                console.error(error)
                this.errorMessage = error.response.errors[0].message
            }
        },
        async refreshStreamingData() {
            try {
                const res = await getStreamingData()
                if (!this.user) await this.setUser()
                this.user!.streamingData = res
                this.errorMessage = null
            }
            catch (error: any) {
                console.error(error)
                this.errorMessage = error?.response?.errors[0]?.message
                if (error.response?.status === 401) {
                    removeJWT()
                    if (window) window.location.href = '/login'
                    return
                }
            }
        },
        async followUser(username: string) {
            try {
                const res = await followUser(username)
                console.log(res)
                this.errorMessage = null
                getFollowData(username)
                this.user?.following?.push({username} as User)
            }    
            catch (error: any) {
                console.error(error)
                this.errorMessage = error.response.errors[0].message
            }
        },
        async unfollowUser(username: string) {
            try {
                const res = await unfollowUser(username)
                console.log(res)
                this.errorMessage = null
                getFollowData(username)
                if (this.user?.following)
                    this.user.following = this.user?.following?.filter(user => user.username !== username)
                else {
                    await this.setUser()
                }
            }    
            catch (error: any) {
                console.error(error)
                this.errorMessage = error.response.errors[0].message
            }
        }
    }
});

export default useUserStore