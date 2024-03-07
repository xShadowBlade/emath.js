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
import Intersects from "./pixi-intersects.js";
import type { pixiGame } from "./pixiGame";
import type { Sprite, Graphics } from "pixi.js";

type collisionShapeType = "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line";

/**
 * Represents a game sprite
 */
class sprite {
    public sprite: Sprite | Graphics;
    public x: number;
    public y: number;
    public collisionShape: collisionShapeType;
    public intersects: typeof Intersects.Shape | typeof Intersects.Circle | typeof Intersects.Polygon | typeof Intersects.Rectangle;

    protected gameRef: pixiGame;

    /**
     * Constructs a new game sprite.
     * @param gameRef - The game reference.
     * @param spr - The PIXI sprite to create the game sprite from.
     * @param collisionShape - The type of collision shape to use for the sprite.
     * Default: "Rectangle"
     * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
     */
    constructor (gameRef: pixiGame, spr: Sprite | Graphics, collisionShape: collisionShapeType = "Rectangle") {
        this.gameRef = gameRef;
        this.sprite = this.gameRef.PIXI.app.stage.addChild(spr);
        this.x = this.sprite.x; // absolute position
        this.y = this.sprite.y;
        this.collisionShape = collisionShape;
        // @ts-expect-error - collisionShape is a string, but we want to use it as a type
        this.intersects = new Intersects[this.collisionShape](this.sprite);

        // Offset by camera
        this.gameRef.PIXI.app.ticker.add(this.tickerFn, this);
    }
    private tickerFn () {
        this.sprite.x = this.x - this.gameRef.PIXI.camera.x;
        this.sprite.y = this.y - this.gameRef.PIXI.camera.y;
    }

    /**
     * Checks if this sprite collides with another sprite.
     * @param other - The other sprite to check for collision with.
     * @returns True if a collision occurs, otherwise false.
     */
    public collides (other: this): boolean {
        // @ts-expect-error - collisionShape is a string, but we want to use it as a type
        return this.intersects[`collides${other.collisionShape}`](other.intersects);
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
export { sprite, collisionShapeType };