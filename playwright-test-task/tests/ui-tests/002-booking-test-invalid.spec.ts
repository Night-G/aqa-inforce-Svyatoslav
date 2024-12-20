import {expect, test} from "@playwright/test";
import {MainPage} from "../../pages/MainPage";

interface Data{
    firstname: string;
    lastname:string;
    email: string;
    phone: string;
}

test('booking with invalid data', async ({page})=>{
    await page.goto("https://automationintesting.online/");

    let data:Data = {firstname:"validname",lastname:"validlastname",email:"valid.email@gmail.com",phone:"9999991111"};

    const mainPage = new MainPage(page)

    await mainPage.clickLetMeHackButton();
    await mainPage.clickBookThisRoomFirstButton();

    await mainPage.fillAllFields(data);

    await mainPage.selectTodayAndDayAfter();
    //await mainPage.selectDates("11",2);

    await mainPage.clickBookButton();

    await expect(page.locator("//div[@class='alert alert-danger']//p[text()='size must be between 11 and 21']")).toBeVisible();
});