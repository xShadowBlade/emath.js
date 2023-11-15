/**
 * @file js/PIXI/sprite.js
 * @description
 * This JavaScript file defines the `Game.classes.sprite` class, which represents a game sprite
 * created from a PIXI.Sprite. It provides functionality for managing sprite properties, collision
 * detection, and rendering offset by the camera.
 */

// import React, { useEffect } from "react";
// import { Sprite as PixiSprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import Intersects from "./pixi-intersects.js";
import type { pixiGame } from "./pixiGame";
class sprite {
    public sprite: PIXI.Sprite | PIXI.Graphics;
    public x: number;
    public y: number;
    public collisionShape: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line";
    public intersects: typeof Intersects.Shape | typeof Intersects.Circle | typeof Intersects.Polygon | typeof Intersects.Rectangle;

    private gameRef: pixiGame;

    /**
     * Constructs a new game sprite.
     *
     * @constructor
     * @param spr - The PIXI sprite to create the game sprite from.
     * @param collisionShape - The type of collision shape to use for the sprite.
     * Default: "Rectangle"
     * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
     */
    constructor (gameRef: pixiGame, spr: PIXI.Sprite | PIXI.Graphics, collisionShape: "Circle" | "Polygon" | "Rectangle" | "Shape" | "Line" = "Rectangle") {
        this.gameRef = gameRef;
        this.sprite = this.gameRef.PIXI.app.stage.addChild(spr);
        this.x = this.sprite.x; // absolute position
        this.y = this.sprite.y;
        this.collisionShape = collisionShape;
        // @ts-expect-error
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
     *
     * @param other - The other sprite to check for collision with.
     * @returns True if a collision occurs, otherwise false.
     */
    public collides (other: this): boolean {
        // @ts-expect-error
        return this.intersects[`collides${other.collisionShape}`](other.intersects);
    }

    /**
     * Removes the sprite from its parent and optionally from an array.
     * @param parent - The parent object or array.
     */
    public remove (parent: Array<any> | object): void {
        this.x = this.y = Infinity; // buggy collision detection
        this.sprite.parent.removeChild(this.sprite);
        if (Array.isArray(parent)) {
            const index = parent.indexOf(this);
            if (index !== -1) {
                parent.splice(index, 1);
            }
            // @ts-expect-error
        } else if (typeof parent == "object") delete this;
    }

    /**
     * Removes a sprite from its parent container.
     * @param sprite - The sprite to remove.
     * @param parent - The parent container from which to remove the sprite.
     */
    public static remove (sprite: sprite, parent: Array<any> | object): void {
        sprite.remove(parent);
    }
};
export { sprite };