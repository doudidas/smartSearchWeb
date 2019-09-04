export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public _id: string,
        public departure: string,
        public email: string,
        public topics: string[],
        public username: string,
        public picture: {large: string, medium: string, thumbnail: string}
    ) {
    }
}

