import {expect, test} from "@playwright/test";

test('API book the room Post Request', async ({request}) => {
    const res = await request.post('https://automationintesting.online/booking/',{
        data:{
                "roomid": 1,
                "firstname": "valid",
                "lastname": "validlastname",
                "email": "valid.email@gmail.com",
                "phone": "09999990000",
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2024-10-10",
                    "checkout": "2024-10-11"
                }

        }
    });
    expect(res.status()).toBe(201);
});
