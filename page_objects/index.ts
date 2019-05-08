import { Browser } from "../common";
import Login from "./login";
import Notes from "./notes";

export { Login, Notes };

export class AllPages {
    public login: Login;
    public notes: Notes;
    constructor(browser: Browser) {
        this.login = new Login(browser);
        this.notes = new Notes(browser);
    }
}
