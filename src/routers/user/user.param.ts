import { PaginationDto } from "@app/dtos/pagination.dto"

// 歌曲得分传参
export interface SongScoreParam {
    song_no?: string,
    level?: string
}
// 歌曲请求传参
export interface SongsParam extends PaginationDto {
    song_no?: string,
    level?: string,
    type?: string,
    sort?: 0 | 1 ,//0 升序 1 降序
}

// 标题请求传参
export interface TitleParam extends PaginationDto {
    title_name?: string,
    rarity?: string,
    unlock?: boolean,
    isShow?: 1 | 0
}

// 位置请求传参
export interface LocationAxisParam {
    latitude: string,
    longitude: string,
}

// 日方素材说明求传参
export interface StaticParam extends PaginationDto {
    type: "clothes" | "head" | "body" | "face" | "mini_clothes" | "tone" | "hidden_song" | "hidden_sheet",
    unlock?: number
}