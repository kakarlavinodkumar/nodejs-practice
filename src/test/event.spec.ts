import { Server } from "http";
import {start} from "../server";
const request = require('supertest')
let app:Server;
let results:any;

describe('event apis', () => {
    beforeAll(async() => {
        app = await start()
    })

    // Check the GET events api
    it('GET events api call', async () => {
        // let app: Server = await start()
        const res = await request(app).get('/api/events');
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        // expect(data).toContain("results");
        expect(data.results).toBeInstanceOf(Array);
        results = data.results;
    });
    
    it('Response check location property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("location")
        }
    })

    it('Response check name property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("name")
        }
    })

    it('Response check date property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("date")
        }
    })

    it('Response check organizer property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("organizer")
        }
    })
    
    it('Response check isOutside property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("is_outside")
        }
    })

    it('Response check rowid property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("rowid")
        }
    })

    it('Response check attendees property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("attendees")
        }
    })

    // Check from date filter
    const from = new Date().getTime();
    it('GET events api call with date filters', async () => {
        // let app: Server = await start()
        const res = await request(app).get(`/api/events?from=${from}`);
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        // expect(data).toContain("results");
        expect(data.results).toBeInstanceOf(Array);
        results = data.results;
    });

    it('Response check of date filter location property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("location")
        }
    })

    it('Response check of date filter name property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("name")
        }
    })

    it('Response check of date filter date property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("date")
        }
    })

    it('Response check of date filterorganizer property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("organizer")
        }
    })
    
    it('Response check of date filter isOutside property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("is_outside")
        }
    })

    it('Response check of date filter rowid property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("rowid")
        }
    })

    it('Response check of date filter attendees property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("attendees")
        }
    })

    // Check from and until filters 
    const until = new Date().getTime() + 10000000
    it('GET events api call with from and until filters', async () => {
        // let app: Server = await start()
        const res = await request(app).get(`/api/events?from=${from}`);
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        // expect(data).toContain("results");
        expect(data.results).toBeInstanceOf(Array);
        results = data.results;
    });

    it('Response check of from and until filter location property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("location")
        }
    })

    it('Response check of from and until filter name property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("name")
        }
    })

    it('Response check of from and until filter date property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("date")
        }
    })

    it('Response check of from and until filterorganizer property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("organizer")
        }
    })
    
    it('Response check of from and until filter isOutside property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("is_outside")
        }
    })

    it('Response check of from and until filter rowid property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("rowid")
        }
    })

    it('Response check of from and until filter attendees property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("attendees")
        }
    })

    // Check pagination 
    it('GET events api call with date filters', async () => {
        // let app: Server = await start()
        const res = await request(app).get(`/api/events?from=${from}&page=2&limit=2`);
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        // expect(data).toContain("results");
        expect(data.results).toBeInstanceOf(Array);
        results = data.results;
    });

    it('Response check of pagination location property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("location")
        }
    })

    it('Response check of pagination name property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("name")
        }
    })

    it('Response check of pagination date property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("date")
        }
    })

    it('Response check of pagination organizer property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("organizer")
        }
    })
    
    it('Response check of pagination isOutside property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("is_outside")
        }
    })

    it('Response check of pagination rowid property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("rowid")
        }
    })

    it('Response check of pagination attendees property', async () => {
        for(let obj of results) {
            expect(obj).toHaveProperty("attendees")
        }
    })

    // Check GET Event By ID API
    it('GET event by id api call', async () => {
        // let app: Server = await start()
        const res = await request(app).get('/api/events/2');
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        // expect(data).toContain("results");
        expect(data).toBeInstanceOf(Object);
        results = data;
    });

    afterAll(async() => {

    })
});
