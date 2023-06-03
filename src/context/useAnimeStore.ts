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

function createNewDataToStore(animesInStore: Anime[], animesData: AnimesResponse, sort?: boolean) {
    const animes = sort ? sortAnimesById([...animesInStore, ...animesData.animes]) : [...animesInStore, ...animesData.animes]

    const links = {
        next: animesData.links.next,
        last: animesData.links.last,
        prev: animesData.links.prev,
    }

    const count = animesData.count

    return {
        animes,
        links,
        count,
    }
}

export const useAnimeStore = create<AnimeStore>((set) => ({
    animeName: null,
    animeStored: {
        animes: [],
        links: {
            last: '',
            next: '',
            prev: '',
        },
        count: 0,
    },
    animesFiltered: {
        animes: [],
        links: {
            last: '',
            next: '',
            prev: '',
        },
        count: 0,
    },
    setAnimeName: (name: string) => set(() => {
        if (name === '') return { animeName: null }
        return { animeName: name }
    }),
    setAnimeStored: (animeData: AnimesResponse) => set((store) => {
        const newDataAnimes = createNewDataToStore(store.animeStored.animes, animeData)

        return {
            animeStored: newDataAnimes
        }
    }),
    setAnimesFiltered: (animeDataFiltered: AnimesResponse) => set((store) => {
        const newDataAnimes = createNewDataToStore(store.animesFiltered.animes, animeDataFiltered, false)

        return {
            animesFiltered: newDataAnimes
        }
    })
}))