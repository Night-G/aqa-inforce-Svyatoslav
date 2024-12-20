import {expect, test} from "@playwright/test";



test('API edit the room Put Request', async ({request}) => {
    let id = 1;
    const url = 'https://automationintesting.online/room/'+id;
    const res = await request.put(url,{
        data:{
            "roomName": "102",
            "type": "Suite",
            "accessible": false,
            "description": "This is room "+id,
            "roomPrice": 10,
            "features": [
                "WiFi", "Safe"
            ]
        },
        headers:{
            "cookie": process.env.API_TOKEN
        }
    });
    expect(res.status()).toBe(202);
});

