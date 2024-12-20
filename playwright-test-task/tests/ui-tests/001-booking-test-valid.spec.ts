import {expect, test} from "@playwright/test";
import {MainPage} from "../../pages/MainPage";
import {FieldsData} from "../../Utilities/FieldDataStruct";



test('booking with valid data', async ({page})=>{
    await page.goto("https://automationintesting.online/");

    let data:FieldsData = {firstname:"validname",lastname:"validlastname",email:"valid.email@gmail.com",phone:"09999990000"};

    const mainPage = new MainPage(page)

    await mainPage.clickLetMeHackButton();
    await mainPage.clickBookThisRoomFirstButton();

    await mainPage.fillAllFields(data);

    await mainPage.selectTodayAndDayAfter();
    //await mainPage.selectDates("today",2);

    await mainPage.clickBookButton();

    await expect(page.locator("//h3[text()='Booking Successful!']")).toBeVisible();
});