export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public _id: string,
        public departure: string,
        public email: string,
        public topics: string[],
        public username: string,
        public hash: string,
        public picture: { large: string, medium: string, thumbnail: string }
    ) {
        this.topics = this.generateTopics();
    }
    generateTopics() {
        const out = ['Austin', 'New York', 'Palo Alto', 'San Francisco', 'Seattle'];
        out.sort(() => Math.random() - 0.5);
        let nb = Math.trunc(Math.random() * 5);
        console.log(nb);
        while (nb > 0) {
            out.pop();
            nb--;
        }
        return out;
    }

}
