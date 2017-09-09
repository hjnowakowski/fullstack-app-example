import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Resource e2e test', () => {

    let navBarPage: NavBarPage;
    let resourceDialogPage: ResourceDialogPage;
    let resourceComponentsPage: ResourceComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Resources', () => {
        navBarPage.goToEntity('resource');
        resourceComponentsPage = new ResourceComponentsPage();
        expect(resourceComponentsPage.getTitle()).toMatch(/armoryApp.resource.home.title/);

    });

    it('should load create Resource dialog', () => {
        resourceComponentsPage.clickOnCreateButton();
        resourceDialogPage = new ResourceDialogPage();
        expect(resourceDialogPage.getModalTitle()).toMatch(/armoryApp.resource.home.createOrEditLabel/);
        resourceDialogPage.close();
    });

    it('should create and save Resources', () => {
        resourceComponentsPage.clickOnCreateButton();
        resourceDialogPage.setResourceNameInput('resourceName');
        expect(resourceDialogPage.getResourceNameInput()).toMatch('resourceName');
        resourceDialogPage.setResourceDescriptionInput('resourceDescription');
        expect(resourceDialogPage.getResourceDescriptionInput()).toMatch('resourceDescription');
        resourceDialogPage.setResourceURLInput('resourceURL');
        expect(resourceDialogPage.getResourceURLInput()).toMatch('resourceURL');
        resourceDialogPage.setResourcePreviewImageInput('resourcePreviewImage');
        expect(resourceDialogPage.getResourcePreviewImageInput()).toMatch('resourcePreviewImage');
        resourceDialogPage.resourceTypeSelectLastOption();
        resourceDialogPage.setWeightInput('5');
        expect(resourceDialogPage.getWeightInput()).toMatch('5');
        resourceDialogPage.disciplineSelectLastOption();
        resourceDialogPage.programSelectLastOption();
        resourceDialogPage.courseSelectLastOption();
        resourceDialogPage.lessonSelectLastOption();
        resourceDialogPage.save();
        expect(resourceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResourceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-resource div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ResourceDialogPage {
    modalTitle = element(by.css('h4#myResourceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    resourceNameInput = element(by.css('input#field_resourceName'));
    resourceDescriptionInput = element(by.css('input#field_resourceDescription'));
    resourceURLInput = element(by.css('input#field_resourceURL'));
    resourcePreviewImageInput = element(by.css('input#field_resourcePreviewImage'));
    resourceTypeSelect = element(by.css('select#field_resourceType'));
    weightInput = element(by.css('input#field_weight'));
    disciplineSelect = element(by.css('select#field_discipline'));
    programSelect = element(by.css('select#field_program'));
    courseSelect = element(by.css('select#field_course'));
    lessonSelect = element(by.css('select#field_lesson'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setResourceNameInput = function (resourceName) {
        this.resourceNameInput.sendKeys(resourceName);
    }

    getResourceNameInput = function () {
        return this.resourceNameInput.getAttribute('value');
    }

    setResourceDescriptionInput = function (resourceDescription) {
        this.resourceDescriptionInput.sendKeys(resourceDescription);
    }

    getResourceDescriptionInput = function () {
        return this.resourceDescriptionInput.getAttribute('value');
    }

    setResourceURLInput = function (resourceURL) {
        this.resourceURLInput.sendKeys(resourceURL);
    }

    getResourceURLInput = function () {
        return this.resourceURLInput.getAttribute('value');
    }

    setResourcePreviewImageInput = function (resourcePreviewImage) {
        this.resourcePreviewImageInput.sendKeys(resourcePreviewImage);
    }

    getResourcePreviewImageInput = function () {
        return this.resourcePreviewImageInput.getAttribute('value');
    }

    setResourceTypeSelect = function (resourceType) {
        this.resourceTypeSelect.sendKeys(resourceType);
    }

    getResourceTypeSelect = function () {
        return this.resourceTypeSelect.element(by.css('option:checked')).getText();
    }

    resourceTypeSelectLastOption = function () {
        this.resourceTypeSelect.all(by.tagName('option')).last().click();
    }
    setWeightInput = function (weight) {
        this.weightInput.sendKeys(weight);
    }

    getWeightInput = function () {
        return this.weightInput.getAttribute('value');
    }

    disciplineSelectLastOption = function () {
        this.disciplineSelect.all(by.tagName('option')).last().click();
    }

    disciplineSelectOption = function (option) {
        this.disciplineSelect.sendKeys(option);
    }

    getDisciplineSelect = function () {
        return this.disciplineSelect;
    }

    getDisciplineSelectedOption = function () {
        return this.disciplineSelect.element(by.css('option:checked')).getText();
    }

    programSelectLastOption = function () {
        this.programSelect.all(by.tagName('option')).last().click();
    }

    programSelectOption = function (option) {
        this.programSelect.sendKeys(option);
    }

    getProgramSelect = function () {
        return this.programSelect;
    }

    getProgramSelectedOption = function () {
        return this.programSelect.element(by.css('option:checked')).getText();
    }

    courseSelectLastOption = function () {
        this.courseSelect.all(by.tagName('option')).last().click();
    }

    courseSelectOption = function (option) {
        this.courseSelect.sendKeys(option);
    }

    getCourseSelect = function () {
        return this.courseSelect;
    }

    getCourseSelectedOption = function () {
        return this.courseSelect.element(by.css('option:checked')).getText();
    }

    lessonSelectLastOption = function () {
        this.lessonSelect.all(by.tagName('option')).last().click();
    }

    lessonSelectOption = function (option) {
        this.lessonSelect.sendKeys(option);
    }

    getLessonSelect = function () {
        return this.lessonSelect;
    }

    getLessonSelectedOption = function () {
        return this.lessonSelect.element(by.css('option:checked')).getText();
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
