interface Dimension {
    width: number
    height: number
}

interface Dimensions {
    tiny: Dimension
    small: Dimension
    large: Dimension
    original: Dimension
}

interface Meta {
    dimensions: Dimensions
}

interface Image {
    tiny: string
    small: string
    large: string
    original: string
    meta: Meta
}

interface Relation {
    links: {
        self: string
        related: string
    }
}

interface Relationship {
    genres: Relation
    categories: Relation
    animeCharacters: Relation
    animeStaff: Relation
}

interface Attributes {
    ageRatingGuide: string
    averageRating: string
    canonicalTitle: string
    description: string
    endDate: string
    startDate: string
    status: string
    episodeCount: number
    popularityRank: number
    showType: string
    youtubeVideoId: string
    coverImage: Image
    posterImage: Image
}

export interface AnimeData {
    id: string
    type: string
    attributes: Attributes
    links: {
        first: string
        last: string
        next: string
        prev: string
    }
    relationships: Relationship
}

export interface Anime {
    id: string
    showType: string
    canonicalTitle: string
    averageRating: string
    posterImage: Image
    coverImage: Image
    description: string
    episodeCount: number
    startDate: string
    endDate: string
    ageRatingGuide: string
    youtubeVideoId: string
    status: string
}

export interface AnimesResponse {
    animes: Anime[]
    links: {
        last: string
        next: string
        prev: string
    }
    count: number
}
