/**
 * @file js/PIXI/sprite.js
 * @description
 * This JavaScript file defines the `Game.classes.sprite` class, which represents a game sprite
 * created from a PIXI.Sprite. It provides functionality for managing sprite properties, collision
 * detection, and rendering offset by the camera.
 */
import { Shape, Rectangle, Polygon, Circle } from "./pixi-intersects.js";
import type { PixiGame } from "./PixiGame.js";
import type { Sprite, Graphics } from "pixi.js";
type CollisionShapeType = "Circle" | "Polygon" | "Rectangle" | "Line";
/**
 * Represents a game sprite
 */
declare class GameSprite {
    /** The pixi sprite */
    sprite: Sprite | Graphics;
    /** The x position of the sprite */
    x: number;
    /** The y position of the sprite */
    y: number;
    /** The type of collision shape to use for the sprite */
    collisionShape: CollisionShapeType;
    /** The collision shape of the sprite */
    protected intersects: Shape | Circle | Polygon | Rectangle;
    /** The game reference */
    protected gameRef: PixiGame;
    /**
     * Constructs a new game sprite.
     * @param gameRef - The game reference.
     * @param spr - The PIXI sprite to create the game sprite from.
     * @param collisionShape - The type of collision shape to use for the sprite.
     * Default: "Rectangle"
     * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
     */
    constructor(gameRef: PixiGame, spr: Sprite | Graphics, collisionShape?: CollisionShapeType);
    private tickerFn;
    /**
     * Checks if this sprite collides with another sprite.
     * @param other - The other sprite to check for collision with.
     * @returns True if a collision occurs, otherwise false.
     */
    collides(other: GameSprite): boolean;
    /**
     * Removes the sprite from its parent container.
     * Note: This does not delete the sprite object, it only removes it from the parent container.
     * You should delete the sprite object after calling this method, or it will still exist in memory.
     */
    remove(): void;
}
export { GameSprite, CollisionShapeType };
