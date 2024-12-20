import {expect, test} from "@playwright/test";

test('API get the room Get Request, and not find it', async ({request}) => {
    let id = 1;
    const res = await request.get('https://automationintesting.online/room/'+id,{

    });
    expect(res.status()).toBe(500);
});
