import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Lesson e2e test', () => {

    let navBarPage: NavBarPage;
    let lessonDialogPage: LessonDialogPage;
    let lessonComponentsPage: LessonComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lessons', () => {
        navBarPage.goToEntity('lesson');
        lessonComponentsPage = new LessonComponentsPage();
        expect(lessonComponentsPage.getTitle()).toMatch(/armoryApp.lesson.home.title/);

    });

    it('should load create Lesson dialog', () => {
        lessonComponentsPage.clickOnCreateButton();
        lessonDialogPage = new LessonDialogPage();
        expect(lessonDialogPage.getModalTitle()).toMatch(/armoryApp.lesson.home.createOrEditLabel/);
        lessonDialogPage.close();
    });

    it('should create and save Lessons', () => {
        lessonComponentsPage.clickOnCreateButton();
        lessonDialogPage.setLessonTitleInput('lessonTitle');
        expect(lessonDialogPage.getLessonTitleInput()).toMatch('lessonTitle');
        lessonDialogPage.setLessonDescriptionInput('lessonDescription');
        expect(lessonDialogPage.getLessonDescriptionInput()).toMatch('lessonDescription');
        lessonDialogPage.languageSelectLastOption();
        lessonDialogPage.save();
        expect(lessonDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LessonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lesson div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LessonDialogPage {
    modalTitle = element(by.css('h4#myLessonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    lessonTitleInput = element(by.css('input#field_lessonTitle'));
    lessonDescriptionInput = element(by.css('input#field_lessonDescription'));
    languageSelect = element(by.css('select#field_language'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLessonTitleInput = function (lessonTitle) {
        this.lessonTitleInput.sendKeys(lessonTitle);
    }

    getLessonTitleInput = function () {
        return this.lessonTitleInput.getAttribute('value');
    }

    setLessonDescriptionInput = function (lessonDescription) {
        this.lessonDescriptionInput.sendKeys(lessonDescription);
    }

    getLessonDescriptionInput = function () {
        return this.lessonDescriptionInput.getAttribute('value');
    }

    setLanguageSelect = function (language) {
        this.languageSelect.sendKeys(language);
    }

    getLanguageSelect = function () {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    languageSelectLastOption = function () {
        this.languageSelect.all(by.tagName('option')).last().click();
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
