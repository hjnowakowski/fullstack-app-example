import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Program e2e test', () => {

    let navBarPage: NavBarPage;
    let programDialogPage: ProgramDialogPage;
    let programComponentsPage: ProgramComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Programs', () => {
        navBarPage.goToEntity('program');
        programComponentsPage = new ProgramComponentsPage();
        expect(programComponentsPage.getTitle()).toMatch(/armoryApp.program.home.title/);

    });

    it('should load create Program dialog', () => {
        programComponentsPage.clickOnCreateButton();
        programDialogPage = new ProgramDialogPage();
        expect(programDialogPage.getModalTitle()).toMatch(/armoryApp.program.home.createOrEditLabel/);
        programDialogPage.close();
    });

    it('should create and save Programs', () => {
        programComponentsPage.clickOnCreateButton();
        programDialogPage.setProgramNameInput('programName');
        expect(programDialogPage.getProgramNameInput()).toMatch('programName');
        programDialogPage.setProgramDescriptionInput('programDescription');
        expect(programDialogPage.getProgramDescriptionInput()).toMatch('programDescription');
        programDialogPage.setProgramPriceInput('5');
        expect(programDialogPage.getProgramPriceInput()).toMatch('5');
        // programDialogPage.coursesSelectLastOption();
        programDialogPage.save();
        expect(programDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProgramComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-program div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProgramDialogPage {
    modalTitle = element(by.css('h4#myProgramLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    programNameInput = element(by.css('input#field_programName'));
    programDescriptionInput = element(by.css('input#field_programDescription'));
    programPriceInput = element(by.css('input#field_programPrice'));
    coursesSelect = element(by.css('select#field_courses'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setProgramNameInput = function (programName) {
        this.programNameInput.sendKeys(programName);
    }

    getProgramNameInput = function () {
        return this.programNameInput.getAttribute('value');
    }

    setProgramDescriptionInput = function (programDescription) {
        this.programDescriptionInput.sendKeys(programDescription);
    }

    getProgramDescriptionInput = function () {
        return this.programDescriptionInput.getAttribute('value');
    }

    setProgramPriceInput = function (programPrice) {
        this.programPriceInput.sendKeys(programPrice);
    }

    getProgramPriceInput = function () {
        return this.programPriceInput.getAttribute('value');
    }

    coursesSelectLastOption = function () {
        this.coursesSelect.all(by.tagName('option')).last().click();
    }

    coursesSelectOption = function (option) {
        this.coursesSelect.sendKeys(option);
    }

    getCoursesSelect = function () {
        return this.coursesSelect;
    }

    getCoursesSelectedOption = function () {
        return this.coursesSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
