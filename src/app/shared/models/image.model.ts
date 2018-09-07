export class Image {
    constructor(public imgPath: string,
        public author: {
            id: string,
            name: string,
            imgPath: string
        },
        public createdOn: number,
        public tags?: string[], 
        public descr?: string,
        public likesAmount?: number, 
        public likes?: {},
        public id?: string) {}
}