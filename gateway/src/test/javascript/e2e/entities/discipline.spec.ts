import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Discipline e2e test', () => {

    let navBarPage: NavBarPage;
    let disciplineDialogPage: DisciplineDialogPage;
    let disciplineComponentsPage: DisciplineComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Disciplines', () => {
        navBarPage.goToEntity('discipline');
        disciplineComponentsPage = new DisciplineComponentsPage();
        expect(disciplineComponentsPage.getTitle()).toMatch(/armoryApp.discipline.home.title/);

    });

    it('should load create Discipline dialog', () => {
        disciplineComponentsPage.clickOnCreateButton();
        disciplineDialogPage = new DisciplineDialogPage();
        expect(disciplineDialogPage.getModalTitle()).toMatch(/armoryApp.discipline.home.createOrEditLabel/);
        disciplineDialogPage.close();
    });

    it('should create and save Disciplines', () => {
        disciplineComponentsPage.clickOnCreateButton();
        disciplineDialogPage.setDisciplineNameInput('disciplineName');
        expect(disciplineDialogPage.getDisciplineNameInput()).toMatch('disciplineName');
        disciplineDialogPage.setDisciplineDescriptionInput('disciplineDescription');
        expect(disciplineDialogPage.getDisciplineDescriptionInput()).toMatch('disciplineDescription');
        disciplineDialogPage.setDisciplinePriceInput('5');
        expect(disciplineDialogPage.getDisciplinePriceInput()).toMatch('5');
        // disciplineDialogPage.programsSelectLastOption();
        disciplineDialogPage.save();
        expect(disciplineDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DisciplineComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-discipline div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DisciplineDialogPage {
    modalTitle = element(by.css('h4#myDisciplineLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    disciplineNameInput = element(by.css('input#field_disciplineName'));
    disciplineDescriptionInput = element(by.css('input#field_disciplineDescription'));
    disciplinePriceInput = element(by.css('input#field_disciplinePrice'));
    programsSelect = element(by.css('select#field_programs'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDisciplineNameInput = function (disciplineName) {
        this.disciplineNameInput.sendKeys(disciplineName);
    }

    getDisciplineNameInput = function () {
        return this.disciplineNameInput.getAttribute('value');
    }

    setDisciplineDescriptionInput = function (disciplineDescription) {
        this.disciplineDescriptionInput.sendKeys(disciplineDescription);
    }

    getDisciplineDescriptionInput = function () {
        return this.disciplineDescriptionInput.getAttribute('value');
    }

    setDisciplinePriceInput = function (disciplinePrice) {
        this.disciplinePriceInput.sendKeys(disciplinePrice);
    }

    getDisciplinePriceInput = function () {
        return this.disciplinePriceInput.getAttribute('value');
    }

    programsSelectLastOption = function () {
        this.programsSelect.all(by.tagName('option')).last().click();
    }

    programsSelectOption = function (option) {
        this.programsSelect.sendKeys(option);
    }

    getProgramsSelect = function () {
        return this.programsSelect;
    }

    getProgramsSelectedOption = function () {
        return this.programsSelect.element(by.css('option:checked')).getText();
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
