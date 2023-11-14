export default Intersects;
declare namespace Intersects {
    export { Shape };
    export { Rectangle };
    export { Polygon };
    export { Circle };
}
/** base class of all shapes */
declare class Shape {
    /**
     * Do two lines intersect?
     * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
     * @param {Point} p1
     * @param {Point} p2
     * @param {Point} p3
     * @param {Point} p4
     * @return {boolean}
     */
    static lineLine(p1: Point, p2: Point, p3: Point, p4: Point): boolean;
    /**
     * @param {object} [article] that uses this shape
     */
    constructor(article?: object | undefined);
    article: object | undefined;
    update(): void;
    /**
     * collides with this shape's AABB box
     * @param {object} AABB
     */
    AABBs(AABB: object): boolean;
    /**
     * point-polygon collision test based on this.vertices
     * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
     * @param {Point} point
     * @return {boolean}
     */
    collidesPoint(point: Point): boolean;
    collidesCircle(): void;
    collidesRectangle(): void;
    /**
     * Does Polygon collide Polygon or AABB?
     * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
     * @param {Array} polygon
     * @param {boolean} isAABB
     * @return {boolean}
     */
    collidesPolygon(polygon: any[], isAABB: boolean): boolean;
    /**
     * Does polygon collide Line?
     * @param {Point} p1
     * @param {Point} p2
     * @return {boolean}
     */
    collidesLine(p1: Point, p2: Point): boolean;
    /** catch all for automatic collision checking */
    collides(shape: any): any;
}
declare const Rectangle_base: {
    new (article?: object | undefined): {
        article: object | undefined;
        update(): void;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        collidesCircle(): void;
        collidesRectangle(): void;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    };
    /**
     * Do two lines intersect?
     * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
     * @param {Point} p1
     * @param {Point} p2
     * @param {Point} p3
     * @param {Point} p4
     * @return {boolean}
     */
    lineLine(p1: Point, p2: Point, p3: Point, p4: Point): boolean;
};
declare class Rectangle extends Rectangle_base {
    static fromRectangle(x: any, y: any, width: any, height: any): {
        SHAPE: string;
        _vertices: any[];
        AABB: number[];
        /**
         * @param {object} options
         * @param {number} [options.width] width of object when aligned
         * @param {number} [options.height] height of object when aligned
         * @param {number} [options.square] side size of a square
         * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
         * @param {object} [options.rotation] object to use for rotation instead of options.center or article
         * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
         */
        set(options: {
            width?: number | undefined;
            height?: number | undefined;
            square?: number | undefined;
            center?: object | undefined;
            rotation?: object | undefined;
            noRotate?: boolean | undefined;
        }): void;
        center: object | undefined;
        rotation: object | undefined;
        _width: any;
        _height: any;
        noRotate: boolean | undefined;
        hw: number | undefined;
        hh: number | undefined;
        /** width of rectangle */
        width: any;
        /** height of rectangle */
        height: any;
        /**
         * based on http://www.willperone.net/Code/coderr.php
         * update AABB and sets vertices to dirty
         */
        update(): void;
        verticesDirty: boolean | undefined;
        /** updates vertices automatically when dirty */
        updateVertices(): void;
        /** sets vertices Array[8] */
        readonly vertices: any[];
        /**
         * Does Rectangle collide Rectangle?
         * @param {Rectangle} rectangle
         * @return {boolean}
         */
        collidesRectangle(rectangle: any): boolean;
        /**
         * Does Rectangle collide Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: {
            SHAPE: string;
            AABB: any[];
            /**
             * @param {object} options
             * @param {object} [options.positionObject=this.article] use this to update position
             * @param {number} [options.radius] otherwise article.width / 2 is used as radius
             */
            set(options: {
                positionObject?: object | undefined;
                radius?: number | undefined;
            }): void;
            radius: number | undefined;
            radiusSquared: number | undefined;
            center: object | undefined;
            /** update AABB */
            update(): void;
            /**
             * Does Circle collide with Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            /**
             * Does Circle collide with point?
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Circle collide with a line?
             * from http://stackoverflow.com/a/10392860/1955997
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /**
             * Does circle collide with Rectangle?
             * @param {Rectangle} rectangle
             */
            collidesRectangle(rectangle: any): boolean;
            collidesPolygon(polygon: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    };
    /**
     * @param {object} article that uses this shape
     * @param {object} [options] @see {@link Rectangle.set}
     */
    constructor(article: object, options?: object | undefined);
    SHAPE: string;
    _vertices: any[];
    AABB: number[];
    /**
     * @param {object} options
     * @param {number} [options.width] width of object when aligned
     * @param {number} [options.height] height of object when aligned
     * @param {number} [options.square] side size of a square
     * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
     * @param {object} [options.rotation] object to use for rotation instead of options.center or article
     * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
     */
    set(options: {
        width?: number | undefined;
        height?: number | undefined;
        square?: number | undefined;
        center?: object | undefined;
        rotation?: object | undefined;
        noRotate?: boolean | undefined;
    }): void;
    center: object | undefined;
    rotation: object | undefined;
    _width: any;
    _height: any;
    noRotate: boolean | undefined;
    hw: number | undefined;
    hh: number | undefined;
    set width(arg: any);
    /** width of rectangle */
    get width(): any;
    set height(arg: any);
    /** height of rectangle */
    get height(): any;
    verticesDirty: boolean | undefined;
    /** updates vertices automatically when dirty */
    updateVertices(): void;
    /** sets vertices Array[8] */
    get vertices(): any[];
    /**
     * Does Rectangle collide Rectangle?
     * @param {Rectangle} rectangle
     * @return {boolean}
     */
    collidesRectangle(rectangle: {
        SHAPE: string;
        _vertices: any[];
        AABB: number[];
        /**
         * @param {object} options
         * @param {number} [options.width] width of object when aligned
         * @param {number} [options.height] height of object when aligned
         * @param {number} [options.square] side size of a square
         * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
         * @param {object} [options.rotation] object to use for rotation instead of options.center or article
         * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
         */
        set(options: {
            width?: number | undefined;
            height?: number | undefined;
            square?: number | undefined;
            center?: object | undefined;
            rotation?: object | undefined;
            noRotate?: boolean | undefined;
        }): void;
        center: object | undefined;
        rotation: object | undefined;
        _width: any;
        _height: any;
        noRotate: boolean | undefined;
        hw: number | undefined;
        hh: number | undefined;
        /** width of rectangle */
        width: any;
        /** height of rectangle */
        height: any;
        /**
         * based on http://www.willperone.net/Code/coderr.php
         * update AABB and sets vertices to dirty
         */
        update(): void;
        verticesDirty: boolean | undefined;
        /** updates vertices automatically when dirty */
        updateVertices(): void;
        /** sets vertices Array[8] */
        readonly vertices: any[];
        collidesRectangle(rectangle: any): boolean;
        /**
         * Does Rectangle collide Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: {
            SHAPE: string;
            AABB: any[];
            /**
             * @param {object} options
             * @param {object} [options.positionObject=this.article] use this to update position
             * @param {number} [options.radius] otherwise article.width / 2 is used as radius
             */
            set(options: {
                positionObject?: object | undefined;
                radius?: number | undefined;
            }): void;
            radius: number | undefined;
            radiusSquared: number | undefined;
            center: object | undefined;
            /** update AABB */
            update(): void;
            /**
             * Does Circle collide with Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            /**
             * Does Circle collide with point?
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Circle collide with a line?
             * from http://stackoverflow.com/a/10392860/1955997
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /**
             * Does circle collide with Rectangle?
             * @param {Rectangle} rectangle
             */
            collidesRectangle(rectangle: any): boolean;
            collidesPolygon(polygon: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
    /**
     * Does Rectangle collide Circle?
     * @param {Circle} circle
     * @return {boolean}
     */
    collidesCircle(circle: {
        SHAPE: string;
        AABB: any[];
        /**
         * @param {object} options
         * @param {object} [options.positionObject=this.article] use this to update position
         * @param {number} [options.radius] otherwise article.width / 2 is used as radius
         */
        set(options: {
            positionObject?: object | undefined;
            radius?: number | undefined;
        }): void;
        radius: number | undefined;
        radiusSquared: number | undefined;
        center: object | undefined;
        /** update AABB */
        update(): void;
        /**
         * Does Circle collide with Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: any): boolean;
        /**
         * Does Circle collide with point?
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Circle collide with a line?
         * from http://stackoverflow.com/a/10392860/1955997
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /**
         * Does circle collide with Rectangle?
         * @param {Rectangle} rectangle
         */
        collidesRectangle(rectangle: {
            SHAPE: string;
            _vertices: any[];
            AABB: number[];
            /**
             * @param {object} options
             * @param {number} [options.width] width of object when aligned
             * @param {number} [options.height] height of object when aligned
             * @param {number} [options.square] side size of a square
             * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
             * @param {object} [options.rotation] object to use for rotation instead of options.center or article
             * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
             */
            set(options: {
                width?: number | undefined;
                height?: number | undefined;
                square?: number | undefined;
                center?: object | undefined;
                rotation?: object | undefined;
                noRotate?: boolean | undefined;
            }): void;
            center: object | undefined;
            rotation: object | undefined;
            _width: any;
            _height: any;
            noRotate: boolean | undefined;
            hw: number | undefined;
            hh: number | undefined;
            /** width of rectangle */
            width: any;
            /** height of rectangle */
            height: any;
            /**
             * based on http://www.willperone.net/Code/coderr.php
             * update AABB and sets vertices to dirty
             */
            update(): void;
            verticesDirty: boolean | undefined;
            /** updates vertices automatically when dirty */
            updateVertices(): void;
            /** sets vertices Array[8] */
            readonly vertices: any[];
            /**
             * Does Rectangle collide Rectangle?
             * @param {Rectangle} rectangle
             * @return {boolean}
             */
            collidesRectangle(rectangle: any): boolean;
            /**
             * Does Rectangle collide Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /**
             * point-polygon collision test based on this.vertices
             * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Polygon collide Polygon or AABB?
             * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
             * @param {Array} polygon
             * @param {boolean} isAABB
             * @return {boolean}
             */
            collidesPolygon(polygon: any[], isAABB: boolean): boolean;
            /**
             * Does polygon collide Line?
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        collidesPolygon(polygon: any): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
}
declare const Polygon_base: {
    new (article?: object | undefined): {
        article: object | undefined;
        update(): void;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        collidesCircle(): void;
        collidesRectangle(): void;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    };
    /**
     * Do two lines intersect?
     * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
     * @param {Point} p1
     * @param {Point} p2
     * @param {Point} p3
     * @param {Point} p4
     * @return {boolean}
     */
    lineLine(p1: Point, p2: Point, p3: Point, p4: Point): boolean;
};
declare class Polygon extends Polygon_base {
    /**
     * @param {Article} article that uses this shape
     * @param {array} points in the form of [x, y, x2, y2, x3, y3, . . .]
     * @param {object} [options] @see {@link Polygon.set}
     */
    constructor(article: Article, points: array, options?: object | undefined);
    SHAPE: string;
    points: array;
    vertices: any[];
    AABB: any[];
    /**
     * @param {object} options
     * @param {PIXI.Point[]} options.points
     * @param {PIXI.DisplayObject} [options.center] - object to use for position (and rotation, unless separately defined)
     * @param {PIXI.DisplayObject} [options.rotation] - object to use for rotation instead of options.center or article
     */
    set(options: {
        points: PIXI.Point[];
        center?: any;
        rotation?: any;
    }): void;
    center: any;
    rotation: any;
    width: number | undefined;
    height: number | undefined;
    hw: number | undefined;
    hh: number | undefined;
    /**
     * Does Rectangle collide Rectangle?
     * @param {Rectangle} rectangle
     * @return {boolean}
     */
    collidesRectangle(rectangle: {
        SHAPE: string;
        _vertices: any[];
        AABB: number[];
        /**
         * @param {object} options
         * @param {number} [options.width] width of object when aligned
         * @param {number} [options.height] height of object when aligned
         * @param {number} [options.square] side size of a square
         * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
         * @param {object} [options.rotation] object to use for rotation instead of options.center or article
         * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
         */
        set(options: {
            width?: number | undefined;
            height?: number | undefined;
            square?: number | undefined;
            center?: object | undefined;
            rotation?: object | undefined;
            noRotate?: boolean | undefined;
        }): void;
        center: object | undefined;
        rotation: object | undefined;
        _width: any;
        _height: any;
        noRotate: boolean | undefined;
        hw: number | undefined;
        hh: number | undefined;
        /** width of rectangle */
        width: any;
        /** height of rectangle */
        height: any;
        /**
         * based on http://www.willperone.net/Code/coderr.php
         * update AABB and sets vertices to dirty
         */
        update(): void;
        verticesDirty: boolean | undefined;
        /** updates vertices automatically when dirty */
        updateVertices(): void;
        /** sets vertices Array[8] */
        readonly vertices: any[];
        /**
         * Does Rectangle collide Rectangle?
         * @param {Rectangle} rectangle
         * @return {boolean}
         */
        collidesRectangle(rectangle: any): boolean;
        /**
         * Does Rectangle collide Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: {
            SHAPE: string;
            AABB: any[];
            /**
             * @param {object} options
             * @param {object} [options.positionObject=this.article] use this to update position
             * @param {number} [options.radius] otherwise article.width / 2 is used as radius
             */
            set(options: {
                positionObject?: object | undefined;
                radius?: number | undefined;
            }): void;
            radius: number | undefined;
            radiusSquared: number | undefined;
            center: object | undefined;
            /** update AABB */
            update(): void;
            /**
             * Does Circle collide with Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            /**
             * Does Circle collide with point?
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Circle collide with a line?
             * from http://stackoverflow.com/a/10392860/1955997
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /**
             * Does circle collide with Rectangle?
             * @param {Rectangle} rectangle
             */
            collidesRectangle(rectangle: any): boolean;
            collidesPolygon(polygon: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
    /**
     * Does Rectangle collide Circle?
     * @param {Circle} circle
     * @return {boolean}
     */
    collidesCircle(circle: {
        SHAPE: string;
        AABB: any[];
        /**
         * @param {object} options
         * @param {object} [options.positionObject=this.article] use this to update position
         * @param {number} [options.radius] otherwise article.width / 2 is used as radius
         */
        set(options: {
            positionObject?: object | undefined;
            radius?: number | undefined;
        }): void;
        radius: number | undefined;
        radiusSquared: number | undefined;
        center: object | undefined;
        /** update AABB */
        update(): void;
        /**
         * Does Circle collide with Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: any): boolean;
        /**
         * Does Circle collide with point?
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Circle collide with a line?
         * from http://stackoverflow.com/a/10392860/1955997
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /**
         * Does circle collide with Rectangle?
         * @param {Rectangle} rectangle
         */
        collidesRectangle(rectangle: {
            SHAPE: string;
            _vertices: any[];
            AABB: number[];
            /**
             * @param {object} options
             * @param {number} [options.width] width of object when aligned
             * @param {number} [options.height] height of object when aligned
             * @param {number} [options.square] side size of a square
             * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
             * @param {object} [options.rotation] object to use for rotation instead of options.center or article
             * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
             */
            set(options: {
                width?: number | undefined;
                height?: number | undefined;
                square?: number | undefined;
                center?: object | undefined;
                rotation?: object | undefined;
                noRotate?: boolean | undefined;
            }): void;
            center: object | undefined;
            rotation: object | undefined;
            _width: any;
            _height: any;
            noRotate: boolean | undefined;
            hw: number | undefined;
            hh: number | undefined;
            /** width of rectangle */
            width: any;
            /** height of rectangle */
            height: any;
            /**
             * based on http://www.willperone.net/Code/coderr.php
             * update AABB and sets vertices to dirty
             */
            update(): void;
            verticesDirty: boolean | undefined;
            /** updates vertices automatically when dirty */
            updateVertices(): void;
            /** sets vertices Array[8] */
            readonly vertices: any[];
            /**
             * Does Rectangle collide Rectangle?
             * @param {Rectangle} rectangle
             * @return {boolean}
             */
            collidesRectangle(rectangle: any): boolean;
            /**
             * Does Rectangle collide Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /**
             * point-polygon collision test based on this.vertices
             * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Polygon collide Polygon or AABB?
             * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
             * @param {Array} polygon
             * @param {boolean} isAABB
             * @return {boolean}
             */
            collidesPolygon(polygon: any[], isAABB: boolean): boolean;
            /**
             * Does polygon collide Line?
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        collidesPolygon(polygon: any): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
}
declare const Circle_base: {
    new (article?: object | undefined): {
        article: object | undefined;
        update(): void;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        collidesCircle(): void;
        collidesRectangle(): void;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    };
    /**
     * Do two lines intersect?
     * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
     * @param {Point} p1
     * @param {Point} p2
     * @param {Point} p3
     * @param {Point} p4
     * @return {boolean}
     */
    lineLine(p1: Point, p2: Point, p3: Point, p4: Point): boolean;
};
/** circle shape */
declare class Circle extends Circle_base {
    /**
     * @param {Article} article that uses this shape
     * @param {object} [options] - @see {@link Circle.set}
     */
    constructor(article: Article, options?: object | undefined);
    SHAPE: string;
    AABB: any[];
    /**
     * @param {object} options
     * @param {object} [options.positionObject=this.article] use this to update position
     * @param {number} [options.radius] otherwise article.width / 2 is used as radius
     */
    set(options: {
        positionObject?: object | undefined;
        radius?: number | undefined;
    }): void;
    radius: number | undefined;
    radiusSquared: number | undefined;
    center: object | undefined;
    /**
     * Does Circle collide with Circle?
     * @param {Circle} circle
     * @return {boolean}
     */
    collidesCircle(circle: {
        SHAPE: string;
        AABB: any[];
        /**
         * @param {object} options
         * @param {object} [options.positionObject=this.article] use this to update position
         * @param {number} [options.radius] otherwise article.width / 2 is used as radius
         */
        set(options: {
            positionObject?: object | undefined;
            radius?: number | undefined;
        }): void;
        radius: number | undefined;
        radiusSquared: number | undefined;
        center: object | undefined;
        /** update AABB */
        update(): void;
        collidesCircle(circle: any): boolean;
        /**
         * Does Circle collide with point?
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Circle collide with a line?
         * from http://stackoverflow.com/a/10392860/1955997
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /**
         * Does circle collide with Rectangle?
         * @param {Rectangle} rectangle
         */
        collidesRectangle(rectangle: {
            SHAPE: string;
            _vertices: any[];
            AABB: number[];
            /**
             * @param {object} options
             * @param {number} [options.width] width of object when aligned
             * @param {number} [options.height] height of object when aligned
             * @param {number} [options.square] side size of a square
             * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
             * @param {object} [options.rotation] object to use for rotation instead of options.center or article
             * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
             */
            set(options: {
                width?: number | undefined;
                height?: number | undefined;
                square?: number | undefined;
                center?: object | undefined;
                rotation?: object | undefined;
                noRotate?: boolean | undefined;
            }): void;
            center: object | undefined;
            rotation: object | undefined;
            _width: any;
            _height: any;
            noRotate: boolean | undefined;
            hw: number | undefined;
            hh: number | undefined;
            /** width of rectangle */
            width: any;
            /** height of rectangle */
            height: any;
            /**
             * based on http://www.willperone.net/Code/coderr.php
             * update AABB and sets vertices to dirty
             */
            update(): void;
            verticesDirty: boolean | undefined;
            /** updates vertices automatically when dirty */
            updateVertices(): void;
            /** sets vertices Array[8] */
            readonly vertices: any[];
            /**
             * Does Rectangle collide Rectangle?
             * @param {Rectangle} rectangle
             * @return {boolean}
             */
            collidesRectangle(rectangle: any): boolean;
            /**
             * Does Rectangle collide Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /**
             * point-polygon collision test based on this.vertices
             * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Polygon collide Polygon or AABB?
             * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
             * @param {Array} polygon
             * @param {boolean} isAABB
             * @return {boolean}
             */
            collidesPolygon(polygon: any[], isAABB: boolean): boolean;
            /**
             * Does polygon collide Line?
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        collidesPolygon(polygon: any): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
    /**
     * Does circle collide with Rectangle?
     * @param {Rectangle} rectangle
     */
    collidesRectangle(rectangle: {
        SHAPE: string;
        _vertices: any[];
        AABB: number[];
        /**
         * @param {object} options
         * @param {number} [options.width] width of object when aligned
         * @param {number} [options.height] height of object when aligned
         * @param {number} [options.square] side size of a square
         * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
         * @param {object} [options.rotation] object to use for rotation instead of options.center or article
         * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
         */
        set(options: {
            width?: number | undefined;
            height?: number | undefined;
            square?: number | undefined;
            center?: object | undefined;
            rotation?: object | undefined;
            noRotate?: boolean | undefined;
        }): void;
        center: object | undefined;
        rotation: object | undefined;
        _width: any;
        _height: any;
        noRotate: boolean | undefined;
        hw: number | undefined;
        hh: number | undefined;
        /** width of rectangle */
        width: any;
        /** height of rectangle */
        height: any;
        /**
         * based on http://www.willperone.net/Code/coderr.php
         * update AABB and sets vertices to dirty
         */
        update(): void;
        verticesDirty: boolean | undefined;
        /** updates vertices automatically when dirty */
        updateVertices(): void;
        /** sets vertices Array[8] */
        readonly vertices: any[];
        /**
         * Does Rectangle collide Rectangle?
         * @param {Rectangle} rectangle
         * @return {boolean}
         */
        collidesRectangle(rectangle: any): boolean;
        /**
         * Does Rectangle collide Circle?
         * @param {Circle} circle
         * @return {boolean}
         */
        collidesCircle(circle: {
            SHAPE: string;
            AABB: any[];
            /**
             * @param {object} options
             * @param {object} [options.positionObject=this.article] use this to update position
             * @param {number} [options.radius] otherwise article.width / 2 is used as radius
             */
            set(options: {
                positionObject?: object | undefined;
                radius?: number | undefined;
            }): void;
            radius: number | undefined;
            radiusSquared: number | undefined;
            center: object | undefined;
            /** update AABB */
            update(): void;
            /**
             * Does Circle collide with Circle?
             * @param {Circle} circle
             * @return {boolean}
             */
            collidesCircle(circle: any): boolean;
            /**
             * Does Circle collide with point?
             * @param {Point} point
             * @return {boolean}
             */
            collidesPoint(point: Point): boolean;
            /**
             * Does Circle collide with a line?
             * from http://stackoverflow.com/a/10392860/1955997
             * @param {Point} p1
             * @param {Point} p2
             * @return {boolean}
             */
            collidesLine(p1: Point, p2: Point): boolean;
            /**
             * Does circle collide with Rectangle?
             * @param {Rectangle} rectangle
             */
            collidesRectangle(rectangle: any): boolean;
            collidesPolygon(polygon: any): boolean;
            article: object | undefined;
            /**
             * collides with this shape's AABB box
             * @param {object} AABB
             */
            AABBs(AABB: object): boolean;
            /** catch all for automatic collision checking */
            collides(shape: any): any;
        }): boolean;
        article: object | undefined;
        /**
         * collides with this shape's AABB box
         * @param {object} AABB
         */
        AABBs(AABB: object): boolean;
        /**
         * point-polygon collision test based on this.vertices
         * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
         * @param {Point} point
         * @return {boolean}
         */
        collidesPoint(point: Point): boolean;
        /**
         * Does Polygon collide Polygon or AABB?
         * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
         * @param {Array} polygon
         * @param {boolean} isAABB
         * @return {boolean}
         */
        collidesPolygon(polygon: any[], isAABB: boolean): boolean;
        /**
         * Does polygon collide Line?
         * @param {Point} p1
         * @param {Point} p2
         * @return {boolean}
         */
        collidesLine(p1: Point, p2: Point): boolean;
        /** catch all for automatic collision checking */
        collides(shape: any): any;
    }): boolean;
    collidesPolygon(polygon: any): boolean;
}
