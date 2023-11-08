interface obbInit {
    name: string;
    value: any;
}
/**
 * @deprecated dont ever use this
 */
declare class obb {
    [key: string]: any;
    constructor(array: obbInit[], methods: obbInit[]);
}
export { obb };
