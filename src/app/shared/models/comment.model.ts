import { Author } from "./author.model";

export class Comment {
    constructor(public author: Author,
                public message: string,
                public createdOn: number) {}
}