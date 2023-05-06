import {VideoResolutions} from "../enums";

export interface Video {
    id?: number;
    title: string;
    author: string;
    canBeDownloaded?: boolean;
    minAgeRestriction?: number | null;
    createdAt?: string;
    publicationDate?: string;
    availableResolutions: VideoResolutions[]
}
// I can create separated DTO on request and response