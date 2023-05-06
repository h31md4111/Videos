"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const port = process.env.PORT || 5000;
settings_1.app.listen(port, () => {
    console.log('App listen on port ${port} ');
});
// import express, {Request, Response} from "express";
// import bodyParser from "body-parser";
//
// const app = express()
// const port = process.env.PORT || 5000
//
// // examples of videos in our db
// const videos = [
//     {
//         id: 1,
//         title: "Video 1",
//         author: "Author 1",
//         canBeDownloaded: false,
//         minAgeRestriction: null,
//         createdAt: "2022-03-28T12:00:00Z",
//         publicationDate: "2022-03-28T12:00:00Z",
//         availableResolutions: ["P240", "P360", "P720"]
//     },
//     {
//         id: 2,
//         title: "Video 2",
//         author: "Author 2",
//         canBeDownloaded: true,
//         minAgeRestriction: 13,
//         createdAt: "2022-03-29T12:00:00Z",
//         publicationDate: "2022-03-29T12:00:00Z",
//         availableResolutions: ["P144", "P480", "P720", "P1080"]
//     }
// ];
//
// //middleware
// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)
//
// app.get('/videos', (req: Request, res: Response) => {
//     res.send(videos)
// })
// app.get('/videos/:id', (req: Request, res: Response) => {
//
//     const video = videos.find(v => v.id === +req.params.id)
//
//     if (video) {
//         res.send(video)
//     } else {
//         res.send(404)
//     }
//
// })
// app.post('/videos', (req: Request, res: Response) => {
//
//     const errors = []
//
//     //required fields validation
//     if (!req.body.title) {
//         errors.push({
//             field: 'title',
//             message: 'Title is required field'
//         });
//     } else if (req.body.title.length > 40) {
//         errors.push({
//             field: 'title',
//             message: 'Title is too long'
//         });
//     }
//
//     if (!req.body.author) {
//         errors.push({
//             field: 'author',
//             message: 'Author is required field'
//         });
//     } else if (req.body.author.length > 20) {
//         errors.push({
//             field: 'author',
//             message: 'Author name is too long'
//         });
//     }
//
//     // validation canBeDownloaded field
//     const canBeDownloaded: boolean = req.body.canBeDownloaded !== undefined ? req.body.canBeDownloaded : false;
//
//     // validation minAgeRestriction
//     const minAgeRestriction = req.body.minAgeRestriction !== undefined ? parseInt(req.body.minAgeRestriction) : null;
//     if (minAgeRestriction !== null && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
//         errors.push({
//             field: "minAgeRestriction",
//             message: "Min age restriction must be between 1 and 18"
//         });
//     }
//
//     // validation createdAt
//     const createdAt = req.body.createdAt !== undefined ? new Date(req.body.createdAt) : new Date();
//     if (isNaN(createdAt.getTime())) {
//         errors.push({
//             field: "createdAt",
//             message: "Invalid date format for createdAt"
//         });
//     }
//
//     // validation publicationDate
//     const publicationDate = req.body.publicationDate !== undefined ? new Date(req.body.publicationDate) : new Date(createdAt.getTime() + 86400000);
//     // 24 * 60 * 60 * 1000 = 86400000
//     if (isNaN(publicationDate.getTime())) {
//         errors.push({
//             field: "publicationDate",
//             message: "Invalid date format for publicationDate"
//         });
//     }
//
//     // validate availableResolutions
//     const availableResolutions = req.body.availableResolutions !== undefined ? req.body.availableResolutions : null;
//     if (availableResolutions !== null) {
//         const validResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
//         for (let i = 0; i < availableResolutions.length; i++) {
//             if (!validResolutions.includes(availableResolutions[i])) {
//                 errors.push({
//                     field: "availableResolutions",
//                     message: "Invalid resolution: " + availableResolutions[i]
//                 });
//                 break;
//             }
//         }
//     }
//
//     if (errors.length > 0) {
//         return res.status(400).json({
//             errorsMessages: errors
//         });
//     }
//
//     // add video to list
//     const video = {
//         id: videos.length + 1,
//         title: req.body.title,
//         author: req.body.author,
//         canBeDownloaded: canBeDownloaded,
//         minAgeRestriction: minAgeRestriction,
//         createdAt: createdAt.toISOString(),
//         publicationDate: publicationDate.toISOString(),
//         availableResolutions: availableResolutions
//     };
//     videos.push(video);
//
//     return res.status(201).send(video);
// })
// app.put('/videos/:id', (req: Request, res: Response) => {
//
//     const putVideo = videos.find(v => v.id === +req.params.id)
//
//     if (!putVideo) {
//         return res.status(404).send('Video not found')
//     }
//
//     // Validate input model
//     const errors = [];
//     if (!req.body.title) {
//         errors.push({
//             field: 'title',
//             message: 'Title is required field'
//         });
//     } else if (req.body.title.length > 40) {
//         errors.push({
//             field: 'title',
//             message: 'Title is too long'
//         });
//     }
//
//     if (!req.body.author) {
//         errors.push({
//             field: 'author',
//             message: 'Author is required field'
//         });
//     } else if (req.body.author.length > 20) {
//         errors.push({
//             field: 'author',
//             message: 'Author name is too long'
//         });
//     }
//
//     if (req.body.canBeDownloaded !== undefined && typeof req.body.canBeDownloaded !== "boolean") {
//         errors.push({
//             field: 'canBeDownloaded',
//             message: 'canBeDownloaded must be a boolean'
//         });
//     }
//
//     const availableResolutions = req.body.availableResolutions;
//     if (availableResolutions !== undefined && (!Array.isArray(availableResolutions) || availableResolutions.length === 0)) {
//         errors.push({
//             field: 'availableResolutions',
//             message: 'At least one resolution should be added'
//         });
//     } else if (availableResolutions !== undefined) {
//         const validResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
//         for (let i = 0; i < availableResolutions.length; i++) {
//             if (!validResolutions.includes(availableResolutions[i])) {
//                 errors.push({
//                     field: 'availableResolutions',
//                     message: `Invalid resolution: ${availableResolutions[i]}`
//                 });
//                 break;
//             }
//         }
//     }
//
//     // validation minAgeRestriction
//     const minAgeRestriction = req.body.minAgeRestriction !== undefined ? parseInt(req.body.minAgeRestriction) : null;
//     if (minAgeRestriction !== null && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
//         errors.push({
//             field: "minAgeRestriction",
//             message: "Min age restriction must be between 1 and 18"
//         });
//     }
//
//     // validation createdAt
//     const createdAt = req.body.createdAt !== undefined ? new Date(req.body.createdAt) : new Date();
//     if (isNaN(createdAt.getTime())) {
//         errors.push({
//             field: "createdAt",
//             message: "Invalid date format for createdAt"
//         });
//     }
//
//     // validation publicationDate
//     const publicationDate = req.body.publicationDate !== undefined ? new Date(req.body.publicationDate) : new Date(createdAt.getTime() + 86400000);
// // 24 * 60 * 60 * 1000 = 86400000
//     if (isNaN(publicationDate.getTime())) {
//         errors.push({
//             field: "publicationDate",
//             message: "Invalid date format for publicationDate"
//         });
//     } else if (typeof req.body.publicationDate !== "string" || Number.isNaN(Date.parse(req.body.publicationDate))) {
//         errors.push({
//             field: "publicationDate",
//             message: "Invalid date format for publicationDate"
//         });
//     }
//
//
//     if (errors.length > 0) {
//         return res.status(400).json({
//             errorsMessages: errors
//         });
//     }
//
//     // Update video object
//     if (req.body.title !== undefined) {
//         putVideo.title = req.body.title;
//     }
//
//     if (req.body.author !== undefined) {
//         putVideo.author = req.body.author;
//     }
//
//     if (req.body.availableResolutions !== undefined) {
//         putVideo.availableResolutions = req.body.availableResolutions;
//     }
//
//     if (req.body.canBeDownloaded !== undefined) {
//         putVideo.canBeDownloaded = req.body.canBeDownloaded;
//     }
//
//
//     if (req.body.minAgeRestriction !== undefined) {
//         putVideo.minAgeRestriction = req.body.minAgeRestriction;
//     }
//
//     if (req.body.publicationDate !== undefined) {
//         putVideo.publicationDate = req.body.publicationDate;
//     }
//
//     if (errors.length > 0) {
//         return res.status(400).json({
//             errorsMessages: errors
//         });
//     } else {
//         return res.status(204).send(putVideo);
//     }
// })
// app.delete('/videos/:id', (req: Request, res: Response) => {
//
//     let foundVideo = false
//
//     for (let i = 0; i < videos.length; i++) {
//
//         if (videos[i].id === +req.params.id) {
//             videos.splice(i, 1);
//             foundVideo = true
//             break;
//         }
//     }
//
//     if (!foundVideo) {
//         return res.status(404).send('Video not found');
//     } else return res.sendStatus(204);
// })
// app.delete('/testing/all-data', (req: Request, res: Response) => {
//     videos.splice(0, videos.length);
//     res.sendStatus(204).send('All data is deleted');
// });
//
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
