import { UUID } from "angular2-uuid";
import { Md5 } from "ts-md5";

export class LoginSession {
    public id: string
    public hash: Int32Array | string
    private password: string;
    constructor(
        public type: string,
        public username: string,
        public rememberMe: boolean,
    ) {
        this.id = UUID.UUID()
    }
    public generateHash() {
        this.hash = Md5.hashStr(this.username + this.password)
    }
    public setPassword(value) {
        this.password = value
    }
  }
  