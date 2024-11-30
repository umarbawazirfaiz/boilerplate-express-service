import { getConfig } from '../src/config';
import request from 'supertest'
import App from '../src/app';
import AppRoutes from '../src/routes/app';

const config = getConfig();
const app = new App(config);

app.initRoutes([new AppRoutes()])

describe('GET /ping', () => {
    it('success ping', async () => {
        const res = await request(app.getServer())
            .get('/api/v1/ping')

        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
    });
});