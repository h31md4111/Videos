import {Request, Response, Router} from 'express';
import { Video } from '../types'
import {validateVideoData} from "../utils";
import {addDays} from 'date-fns';

export const videoRouter = Router();

let videos: Video[] = [];

export const clearDB = (): void => {
    videos = [];
}
videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videos);
});
videoRouter.get('videos/:id', (req: Request, res: Response) => {

    const video = videos.find(v => v.id === +req.params.id)

    if (video) {
        res.send(video);
    } else {
        res.sendStatus(404);
    }
    })

videoRouter.post('/', (req: Request, res: Response) => {

    const errors = validateVideoData(req.body);

    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors});
    } else {
        const newVideo = {
            minAgeRestriction: null,
            id: new Date().getTime(),
            canBeDownloaded: false,
            createdAt: new Date().toISOString(),
            publicationDate: addDays(new Date(new Date()), 1).toISOString(),
            ...req.body,
        };
        videos.push(newVideo);

        return res.status(201).send(newVideo);
    }
    return res.sendStatus(500);
})

videoRouter.put('/:id', (req: Request, res: Response) => {

    const videoIndex = videos.findIndex(video => video.id === +req.params.id);
    const errors = validateVideoData(req.body);
    if (videoIndex > -1 && errors.length > 0) {
        res.status(400).send({errorsMessages: errors});
    }
if (videoIndex === -1) {
res.sendStatus(404);
} else {
    videos[videoIndex] = {...videos[videoIndex], ...req.body};
    res.sendStatus(204);
}
});

videoRouter.delete('/:id', (req: Request, res: Response) => {

    const videoIndex = videos.findIndex(video => video.id === +req.params.id);
    if (videoIndex > -1) {
        videos.splice(videoIndex, 1);
        res.sendStatus(204);
    }

    if (videoIndex === -1) {
        res.sendStatus(404);
    }
});




