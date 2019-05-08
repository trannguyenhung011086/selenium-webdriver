import { Browser, Page } from "../common";

export default class Notes extends Page {
    constructor(browser: Browser) {
        super(browser);
    }
    public title = "#my-notes-page > h2";
    public addNoteBtn = ".btn-primary";
    public noteTitleField = 'input[name="note.title"]';
    public noteDescField = 'textarea[name="note.description"]';
    public noteErrorMsg = "#note-error-message";
    public noteList = ".list-group";

    async getTitle() {
        return this.browser.getText(this.title);
    }

    async addNote(title: string, desc: string) {
        await this.browser.click(this.addNoteBtn);
        await this.browser.type(this.noteTitleField, title);
        await this.browser.type(this.noteDescField, desc);
        await this.browser.click(this.addNoteBtn);
    }

    async getError() {
        return this.browser.getText(this.noteErrorMsg);
    }

    async getNotes() {
        return await this.browser.getText("#my-notes-page");
    }
}
