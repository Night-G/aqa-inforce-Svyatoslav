import {expect} from "@playwright/test";

export async function  login({request}) {
    const res = await request.post('https://automationintesting.online/auth/login', {
        data: {
            "username": "admin",
            "password": "password"
        }
    });
    expect(res.status()).toBe(200);
}