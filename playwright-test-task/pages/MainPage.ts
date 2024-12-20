import {Locator, Page} from "@playwright/test";
import {FieldsData} from "../Utilities/FieldDataStruct";

export class MainPage{
    private page:Page;

    private letMeHackButton: Locator;
    private bookThisRoomFirstButton: Locator;

    private firstnameField: Locator;
    private lastnameField: Locator;
    private emailField: Locator;
    private phoneField: Locator;

    private todayButton: Locator;
    private bookButton: Locator;

    private todayCell: Locator;
    private dayAfterTodayCell:Locator;


    constructor(page:Page) {
        this.page = page;

        this.letMeHackButton = page.getByRole('button', { name: 'Let me hack!' })
        this.bookThisRoomFirstButton = page.getByRole('button', { name: 'Book this room' }).first();

        this.firstnameField = page.locator('//input[@name=\'firstname\']');
        this.lastnameField = page.locator('//input[@name=\'lastname\']');
        this.emailField = page.locator('//input[@name=\'email\']');
        this.phoneField = page.locator('//input[@name=\'phone\']');

        this.todayButton = page.getByRole('button', { name: 'Today' });
        this.bookButton = page.getByRole('button', { name: 'Book', exact: true });

        this.todayCell = page.locator("//div[@class='rbc-day-bg rbc-today']");
        this.dayAfterTodayCell = page.locator("//div[@class='rbc-day-bg rbc-today']/following-sibling::div[1]");
    }
    async clickLetMeHackButton(){
        await this.letMeHackButton.scrollIntoViewIfNeeded();
        await this.letMeHackButton.click();
    }

    async clickBookThisRoomFirstButton(){
        if(await this.bookThisRoomFirstButton.isVisible()){
        await this.bookThisRoomFirstButton.scrollIntoViewIfNeeded();
        await this.bookThisRoomFirstButton.click();}
    }

    async fillFirstnameField(firstname: string){
        await this.firstnameField.scrollIntoViewIfNeeded();
        await this.firstnameField.fill(firstname);
    }

    async fillLastnameField(lastname: string){
        await this.lastnameField.scrollIntoViewIfNeeded();
        await this.lastnameField.fill(lastname);
    }

    async fillEmailField(email: string){
        await this.emailField.scrollIntoViewIfNeeded();
        await this.emailField.fill(email);
    }

    async fillPhoneField(phone: string){
        await this.phoneField.scrollIntoViewIfNeeded();
        await this.phoneField.fill(phone);

    }

    async fillAllFields(data: FieldsData){
        await this.fillFirstnameField(data.firstname);
        await this.fillLastnameField(data.lastname);
        await this.fillEmailField(data.email);
        await this.fillPhoneField(data.phone);
    }


    async clickTodayButton(){
        await this.todayButton.scrollIntoViewIfNeeded();
        await this.todayButton.click();
    }

    async clickBookButton(){
        await this.bookButton.scrollIntoViewIfNeeded();
        await this.bookButton.click();
    }

    async selectTodayAndDayAfter(){
        let firstDayBox = await this.todayCell.boundingBox();
        let lastDayBox = await this.dayAfterTodayCell.boundingBox();


        await this.page.mouse.move(firstDayBox. x + firstDayBox. width /2, firstDayBox. y + firstDayBox. height / 6);
        await this.page.mouse.down();
        await this.page.mouse.move(lastDayBox. x, lastDayBox. y + firstDayBox. height / 2);

        await this.page.waitForSelector("//div[@class='rbc-day-bg rbc-selected-cell rbc-today']");

        await this.page.mouse.move(lastDayBox. x + lastDayBox. width / 2, lastDayBox. y + lastDayBox. height / 2);
        await this.page.waitForSelector("//div[@class='rbc-day-bg rbc-selected-cell']");
        await this.page.mouse.up();


    }


    async selectDates(startDate: string, numOfDays:number){
        if(startDate == "today"){
            await this.clickTodayButton();

            startDate = await this.page.locator('//div[@class=\'rbc-date-cell rbc-now rbc-current\']/button[@class=\'rbc-button-link\']').textContent();
        }

        let firstDate: Locator = this.page.locator("//button[text()='"+startDate+"']/ancestor::div[1]");
        let lastDate: Locator =  this.page.locator("//button[text()='"+(Number(startDate)+numOfDays-1)+"']");

        let firstDayBox = await firstDate.boundingBox();
        let lastDayBox = await lastDate.boundingBox();


        await this.page.mouse.move(firstDayBox. x + firstDayBox. width /2, firstDayBox. y + firstDayBox. height / 6);
        await this.page.mouse.down();
        await this.page.mouse.move(lastDayBox. x, lastDayBox. y + firstDayBox. height / 2);

        await this.page.waitForSelector("//div[@class='rbc-day-bg rbc-selected-cell rbc-today']");

        await this.page.mouse.move(lastDayBox. x + lastDayBox. width / 2, lastDayBox. y + lastDayBox. height / 2);
        await this.page.waitForSelector("//div[@class='rbc-day-bg rbc-selected-cell']");
        await this.page.mouse.up();
    }

}