import {expect, test} from "@playwright/test";



test('API delete the room Delete Request', async ({request}) => {
    let id = 1;
    const res = await request.delete('https://automationintesting.online/room/'+id,{
        headers:{
        "cookie": process.env.API_TOKEN
    }});
    expect(res.status()).toBe(202);
});

