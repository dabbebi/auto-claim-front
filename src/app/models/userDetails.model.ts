export class UserDetails {

    firstName: String | null | undefined;
    lastName: String | null | undefined;
    email: String | null | undefined;
    cin: String | null | undefined;
    address: String | null | undefined;
    password: String | null | undefined;
    telephone: String | null | undefined;

    constructor() {
        this.address = "";
        this.cin = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.password = "";
        this.telephone = "";
    }
}