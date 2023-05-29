import axios from 'axios'
import { Anime, AnimeData } from '@/interfaces/anime'

export const api = axios.create({
    baseURL: 'https://kitsu.io/api/edge',
    headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
    }
})

function extractAnimes(data: AnimeData[]) {
    const animes: Anime[] = data.map((anime: AnimeData) => {
        const animeObject: Anime = {
            id: anime.id,
            showType: anime.attributes.showType,
            canonicalTitle: anime.attributes.canonicalTitle,
            averageRating: anime.attributes.averageRating,
            posterImage: { ...anime.attributes.posterImage },
            coverImage: { ...anime.attributes.coverImage },
            description: anime.attributes.description,
            episodeCount: anime.attributes.episodeCount,
            ageRatingGuide: anime.attributes.ageRatingGuide,
            youtubeVideoId: anime.attributes.youtubeVideoId,
            status: anime.attributes.status,
            startDate: anime.attributes.startDate,
            endDate: anime.attributes.endDate,
        }
        return animeObject
    })

    return animes
}

export const getAnimes = async () => {
    const { data } = await api.get('/anime')

    const animes = extractAnimes(data.data)

    return { animes, links: data.links, count: data.meta.count }
}

export const getAnimeByName = async (name: string) => {
    const { data } = await api.get(`/anime/?filter[text]=${name}`)

    const animes = extractAnimes(data.data)

    return { animes, links: data.links, count: data.meta.count }
}

export const getAnimesNextPage = async (nextUrl: string) => {
    const { data } = await api.get(`${nextUrl}`)

    const animes = extractAnimes(data.data)

    return { animes, links: data.links, count: data.meta.count }
}

export const getGenres = async (id: string) => {
    const {
        data: { data: genres },
    } = await api.get(`anime/${id}/genres`);

    const genresArr = genres.map((genre: any) => genre.attributes.name);

    return genresArr
}

export const gerCharacters = async (id: string) => {
    const {
        data: { data: characters },
    } = await api.get(`anime/${id}/characters`);

    const idCharArr = characters.map((char: any) => char.id);

    const charactersArr = await Promise.all(
        idCharArr.map(async (id: string) => {
            const {
                data: { data: character },
            } = await api.get(`/media-characters/${id}/character`);
            return {
                name: character.attributes.name,
                image: character.attributes.image?.original,
            };
        })
    );

    return charactersArr;
}
