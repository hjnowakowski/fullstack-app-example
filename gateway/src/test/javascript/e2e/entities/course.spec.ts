import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Course e2e test', () => {

    let navBarPage: NavBarPage;
    let courseDialogPage: CourseDialogPage;
    let courseComponentsPage: CourseComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Courses', () => {
        navBarPage.goToEntity('course');
        courseComponentsPage = new CourseComponentsPage();
        expect(courseComponentsPage.getTitle()).toMatch(/armoryApp.course.home.title/);

    });

    it('should load create Course dialog', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage = new CourseDialogPage();
        expect(courseDialogPage.getModalTitle()).toMatch(/armoryApp.course.home.createOrEditLabel/);
        courseDialogPage.close();
    });

    it('should create and save Courses', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage.setCourseTitleInput('courseTitle');
        expect(courseDialogPage.getCourseTitleInput()).toMatch('courseTitle');
        courseDialogPage.setCourseDescriptionInput('courseDescription');
        expect(courseDialogPage.getCourseDescriptionInput()).toMatch('courseDescription');
        courseDialogPage.setCoursePriceInput('5');
        expect(courseDialogPage.getCoursePriceInput()).toMatch('5');
        courseDialogPage.courseLevelSelectLastOption();
        // courseDialogPage.lessonsSelectLastOption();
        courseDialogPage.save();
        expect(courseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CourseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-course div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CourseDialogPage {
    modalTitle = element(by.css('h4#myCourseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    courseTitleInput = element(by.css('input#field_courseTitle'));
    courseDescriptionInput = element(by.css('input#field_courseDescription'));
    coursePriceInput = element(by.css('input#field_coursePrice'));
    courseLevelSelect = element(by.css('select#field_courseLevel'));
    lessonsSelect = element(by.css('select#field_lessons'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCourseTitleInput = function (courseTitle) {
        this.courseTitleInput.sendKeys(courseTitle);
    }

    getCourseTitleInput = function () {
        return this.courseTitleInput.getAttribute('value');
    }

    setCourseDescriptionInput = function (courseDescription) {
        this.courseDescriptionInput.sendKeys(courseDescription);
    }

    getCourseDescriptionInput = function () {
        return this.courseDescriptionInput.getAttribute('value');
    }

    setCoursePriceInput = function (coursePrice) {
        this.coursePriceInput.sendKeys(coursePrice);
    }

    getCoursePriceInput = function () {
        return this.coursePriceInput.getAttribute('value');
    }

    setCourseLevelSelect = function (courseLevel) {
        this.courseLevelSelect.sendKeys(courseLevel);
    }

    getCourseLevelSelect = function () {
        return this.courseLevelSelect.element(by.css('option:checked')).getText();
    }

    courseLevelSelectLastOption = function () {
        this.courseLevelSelect.all(by.tagName('option')).last().click();
    }
    lessonsSelectLastOption = function () {
        this.lessonsSelect.all(by.tagName('option')).last().click();
    }

    lessonsSelectOption = function (option) {
        this.lessonsSelect.sendKeys(option);
    }

    getLessonsSelect = function () {
        return this.lessonsSelect;
    }

    getLessonsSelectedOption = function () {
        return this.lessonsSelect.element(by.css('option:checked')).getText();
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
