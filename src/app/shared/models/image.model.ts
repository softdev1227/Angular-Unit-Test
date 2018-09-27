import { Author } from "./author.model";
import { Comment } from "./comment.model";

export class Image {
    constructor(public imgPath: string,
        public author: Author,
        public createdOn: number,
        public tags?: string[], 
        public descr?: string,
        public likesAmount?: number, 
        public likes?: {},
        public id?: string,
        public comments?: Comment[]
    ) {}
}