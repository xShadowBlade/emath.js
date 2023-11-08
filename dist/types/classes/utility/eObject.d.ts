declare class EObject extends Object {
    constructor(value?: object);
    static getFast(object: any, id: string): any;
    getFast(this: any, id: string): any;
    static get(object: any, id: string): any;
    get(this: any, id: string): any;
}
export { EObject };
