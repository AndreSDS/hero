import { create } from 'zustand'
import { Anime, AnimesResponse } from "../interfaces/anime";

interface AnimeStore {
    animeName: string | null,
    animeStored: AnimesResponse,
    animesFiltered: AnimesResponse,
    setAnimeName: (name: string) => void,
    setAnimeStored: (animeData: AnimesResponse) => void
    setAnimesFiltered: (animeData: AnimesResponse) => void
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
    animeStored: {
        animes: [],
        links: {
            last: '',
            next: '',
        },
        count: 0,
    },
    animesFiltered: {
        animes: [],
        links: {
            last: '',
            next: '',
        },
        count: 0,
    },
    setAnimeName: (name: string) => set(() => {
        if (name === '') return { animeName: null }
        return { animeName: name }
    }),
    setAnimeStored: (animeData: AnimesResponse) => set((store) => {
        const sortedNewAnimes = sortAnimesById([...store.animeStored.animes, ...animeData.animes])

        const links = {
            next: animeData.links.next,
            last: animeData.links.last,
        }

        return {
            animeStored: {
                animes: sortedNewAnimes,
                links,
                count: animeData.count,
            }
        }
    }),
    setAnimesFiltered: (animeDataFiltered: AnimesResponse) => set((store) => {
        const sortedNewAnimes = sortAnimesById([...store.animesFiltered.animes, ...animeDataFiltered.animes])

        const links = {
            next: animeDataFiltered.links.next,
            last: animeDataFiltered.links.last,
        }

        return {
            animesFiltered: {
                animes: sortedNewAnimes,
                links,
                count: animeDataFiltered.count,
            }
        }
    })
}))