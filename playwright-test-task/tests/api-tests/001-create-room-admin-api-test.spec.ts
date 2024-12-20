import {expect, test} from "@playwright/test";
import 'dotenv/config'

// admin
test('API Login Post Request', async ({request}) => {
    const res = await request.post('https://automationintesting.online/auth/login', {
        data: {
            "username": "admin",
            "password": "password"
        }
    });
    expect(res.status()).toBe(200);

    const setCookie = res.headers()['set-cookie'];

    process.env.API_TOKEN = setCookie.substring(0, 22);

});

test('API create a room Post Request', async ({request}) => {

    const res = await request.post('https://automationintesting.online/room/',{
        data:{
            "roomName": "202",
            "roomId": 2,
            "type": "Single",
            "accessible": true,
            "image": "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
            "description": "Please enter a description for this room",
            "features": [],
            "roomPrice": 999
        },
        headers:{
            "cookie": process.env.API_TOKEN
        }
    });
    expect(res.status()).toBe(201);
});

