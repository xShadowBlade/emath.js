/**
 * @file js/PIXI/sprite.js
 * @description
 * This JavaScript file defines the `Game.classes.sprite` class, which represents a game sprite
 * created from a PIXI.Sprite. It provides functionality for managing sprite properties, collision
 * detection, and rendering offset by the camera.
 */

// import React, { useEffect } from "react";
// import { Sprite as PixiSprite } from "@pixi/react";
// import { loadPIXI } from "./loadPIXI.js";
import Intersects, { Shape, Rectangle, Polygon, Circle } from "./pixi-intersects.js";
import type { PixiGame } from "./PixiGame.js";
import type { Sprite, Graphics } from "pixi.js";

type CollisionShapeType = Exclude<keyof typeof Intersects, "Shape">;

/**
 * Represents a game sprite
 */
class GameSprite {
    /** The pixi sprite */
    public sprite: Sprite | Graphics;
    /** The x position of the sprite */
    public x: number;
    /** The y position of the sprite */
    public y: number;
    /** The type of collision shape to use for the sprite */
    public collisionShape: CollisionShapeType;
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
    constructor (gameRef: PixiGame, spr: Sprite | Graphics, collisionShape: CollisionShapeType = "Rectangle") {
        this.gameRef = gameRef;
        this.sprite = this.gameRef.PIXI.app.stage.addChild(spr);
        this.x = this.sprite.x; // absolute position
        this.y = this.sprite.y;
        this.collisionShape = collisionShape;
        // @ts-expect-error - collisionShape is a string, but we want to use it as a type
        this.intersects = new Intersects[this.collisionShape](this.sprite);

        // Offset by camera
        this.gameRef.PIXI.app.ticker.add(this.tickerFn.bind(this), this);
    }

    /**
     * The ticker function for the sprite, used to offset the sprite by the camera.
     */
    private tickerFn (): void {
        this.sprite.x = this.x - this.gameRef.PIXI.camera.x;
        this.sprite.y = this.y - this.gameRef.PIXI.camera.y;
    }

    /**
     * Checks if this sprite collides with another sprite.
     * @param other - The other sprite to check for collision with.
     * @returns True if a collision occurs, otherwise false.
     */
    public collides (other: GameSprite): boolean {
        if (this.x === Infinity || other.x === Infinity) return false; // buggy collision detection
        return Boolean(this.intersects[`collides${other.collisionShape}`](other.intersects));
    }

    /**
     * Removes the sprite from its parent container.
     * Note: This does not delete the sprite object, it only removes it from the parent container.
     * You should delete the sprite object after calling this method, or it will still exist in memory.
     */
    public remove (): void {
        this.x = this.y = Infinity; // buggy collision detection
        this.sprite.parent.removeChild(this.sprite);
        // if (Array.isArray(parent)) {
        //     const index = parent.indexOf(this);
        //     if (index !== -1) {
        //         parent.splice(index, 1);
        //     }
        //     // @ts-expect-error - collisionShape is a string, but we want to use it as a type
        // } else if (typeof parent == "object") delete this;
    }
};
// export { GameSprite as GameSprite, CollisionShapeType as CollisionShapeType };
export { GameSprite, CollisionShapeType };