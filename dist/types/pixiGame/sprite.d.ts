/**
 * @file js/PIXI/sprite.js
 * @description
 * This JavaScript file defines the `Game.classes.sprite` class, which represents a game sprite
 * created from a PIXI.Sprite. It provides functionality for managing sprite properties, collision
 * detection, and rendering offset by the camera.
 */
import Intersects from "./pixi-intersects.js";
import type { pixiGame } from "./pixiGame";
import type { Sprite, Graphics } from "pixi.js";
type collisionShapeType = "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line";
/**
 * Represents a game sprite
 */
declare class sprite {
    sprite: Sprite | Graphics;
    x: number;
    y: number;
    collisionShape: collisionShapeType;
    intersects: typeof Intersects.Shape | typeof Intersects.Circle | typeof Intersects.Polygon | typeof Intersects.Rectangle;
    protected gameRef: pixiGame;
    /**
     * Constructs a new game sprite.
     * @param gameRef - The game reference.
     * @param spr - The PIXI sprite to create the game sprite from.
     * @param collisionShape - The type of collision shape to use for the sprite.
     * Default: "Rectangle"
     * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
     */
    constructor(gameRef: pixiGame, spr: Sprite | Graphics, collisionShape?: collisionShapeType);
    private tickerFn;
    /**
     * Checks if this sprite collides with another sprite.
     * @param other - The other sprite to check for collision with.
     * @returns True if a collision occurs, otherwise false.
     */
    collides(other: this): boolean;
    /**
     * Removes the sprite from its parent container.
     * Note: This does not delete the sprite object, it only removes it from the parent container.
     * You should delete the sprite object after calling this method, or it will still exist in memory.
     */
    remove(): void;
}
export { sprite, collisionShapeType };
