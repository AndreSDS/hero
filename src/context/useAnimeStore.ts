import { create } from 'zustand'
import { Anime, AnimesResponse } from "../interfaces/anime";

interface AnimeStore {
    animeName: string | null,
    animeStore: AnimesResponse,
    setAnimeStore: (animeData: AnimesResponse) => void
    setAnimeName: (name: string) => void
}

function sortAnimesById(animes: Anime[]) {
    return animes.sort((a, b) => {
        if (Number(a.id) < Number(b.id)) return -1
        if (Number(a.id) > Number(b.id)) return 1
        return 0
    })
}

export const useAnimeStore = create<AnimeStore>((set) => ({
    animeName: null,
    animeStore: {
        animes: [],
        links: {
            last: '',
            next: '',
        },
        count: 0,
    },
    setAnimeStore: (animeData: AnimesResponse) => set((state) => {
        const animes = sortAnimesById([
            ...state.animeStore.animes,
            ...animeData.animes,
        ])

        const links = {
            next: animeData.links.next,
            last: animeData.links.last,
        }

        return {
            animeStore: {
                ...state.animeStore,
                animes,
                links,
                count: animeData.count,
            }
        }
    }),
    setAnimeName: (name: string) => set((state) => ({
        animeName: name,
    }))
}))