import {Video} from '../src/types'
import {CodeResponses, VideoResolutions} from "../src/enums";
import {app} from "../src/settings";
import {body} from "express-validator";
import request from 'supertest';


describe('/videos', () => {
    let video: any;
    let newVideo: Video = {
        id: 123,
        title: 'new video',
        author: 'Kirill',
        availableResolutions: [VideoResolutions.P144],
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(204);
    });

    describe('GET /videos', () => {
        it('should return empty array when no videos exist', async () => {
            const res = await request(app).get('/videos');
            expect(res.body).toEqual([]);
        });
    });

    describe('POST /videos', () => {
        it('should not create the video with no title/no author', async () => {
            await request(app)
                .post('/videos')
                .send({ title: '', author: '' })
                .expect(CodeResponses.Incorrect_values_400, {
                    errorsMessages: [
                        { message: 'required field', field: 'title' },
                        { message: 'required field', field: 'author' },
                    ],
                });

            const res = await request(app).get('/videos');
            expect(res.body).toEqual([]);
        });

        it('should create a video with correct data', async () => {
            await request(app).post('/videos').send(newVideo);
            const videos = await request(app).get('/videos');
            video = videos.body.find(
                (video: Video): boolean => video.id === newVideo.id,
            );
            expect(video.title).toBe(newVideo.title);
            expect(video.author).toBe(newVideo.author);
            expect(video.availableResolutions).toEqual(newVideo.availableResolutions);
        });
    });

    describe('GET /videos/:id', () => {
        it('should return 404 with incorrect id', async () => {
            await request(app).get('/videos/helloWorld').expect(404);
        });

        it('should return video with correct id', async () => {
            await request(app)
                .get('/videos/' + newVideo.id)
                .expect(200, video);
        });
    });

    describe('PUT /videos/:id', () => {
        it('should update video with correct data', async () => {
            await request(app)
                .put('/videos/' + newVideo.id)
                .send({
                    title: 'hello title',
                    author: 'hello author',
                    publicationDate: '2023-05-07T17:53:21.662Z',
                })
                .expect(CodeResponses.No_content_204);

            const res = await request(app).get('/videos');
            expect(res.body[0]).toEqual({
                ...video,
                title: 'hello title',
                author: 'hello author',
                publicationDate: '2023-05-07T17:53:21.662Z',
            });
            newVideo = res.body[0];
        });
    });

    describe('DELETE /videos/:id', () => {
        it('should return 404 with incorrect id', async () => {
            await request(app)
                .delete('/videos/876321')
                .expect(CodeResponses.Not_found_404);

            const res = await request(app).get('/videos/');
            expect(res.body[0]).toEqual(newVideo);
        });

        it('should delete video with correct id', async () => {
            await request(app)
                .delete('/videos/' + newVideo.id)
                .expect(CodeResponses.No_content_204);

            const res = await request(app).get
        });
    });
});

