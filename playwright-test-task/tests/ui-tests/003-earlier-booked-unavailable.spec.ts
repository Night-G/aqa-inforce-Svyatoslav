import {expect, test} from "@playwright/test";
import {MainPage} from "../../pages/MainPage";
import {FieldsData} from "../../Utilities/FieldDataStruct";

interface Data{
    firstname: string;
    lastname:string;
    email: string;
    phone: string;
}



test('check for unavailability of already selected dates', async ({page})=>{
    await page.goto("https://automationintesting.online/");
    let data:FieldsData = {firstname:"validname",lastname:"validlastname",email:"valid.email@gmail.com",phone:"09999990000"};

    const mainPage = new MainPage(page)

    await mainPage.clickLetMeHackButton();
    await mainPage.clickBookThisRoomFirstButton();

    await mainPage.fillAllFields(data);

    //await mainPage.selectDates("today",2);
    await mainPage.selectTodayAndDayAfter();


    await mainPage.clickBookButton();

    await expect(page.locator(
        "//div[@class='alert alert-danger']//p[text()='" +
        "The room dates are either invalid or are already booked for one or more of the dates that you have selected." +
        "']"))
        .toBeVisible();
});

