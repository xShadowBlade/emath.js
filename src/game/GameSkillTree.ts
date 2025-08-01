/**
 * @file Declares the game skill tree class.
 */
import type { SkillTreeData } from "../classes/SkillTree";
import { SkillTreeStatic } from "../classes/SkillTree";
import type { Game } from "./Game";

/**
 * Represents a game skill tree. {@link SkillTreeData} is the data class. This class extends {@link SkillTreeStatic} and adds additional functionality for {@link Game}.
 * @template TSkillNames - The name of the skill tree. This is optional, and you can use it for display purposes.
 */
class GameSkillTree<TSkillNames extends string = string> extends SkillTreeStatic<TSkillNames> {
    /** The name of the skill tree. This is optional, and you can use it for display purposes. */
    public readonly name: string;

    /** The game pointer/reference */
    public readonly game?: Game;

    /**
     * Creates a new instance of the game skill tree class.
     * @param skillTreeStaticParams - The parameters for the skill tree static class.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the skill tree. This is optional, and you can use it for display purposes.
     */
    constructor(
        skillTreeStaticParams: ConstructorParameters<typeof SkillTreeStatic<TSkillNames>>,
        gamePointer: Game,
        name: string,
    ) {
        // Call the parent constructor
        super(...skillTreeStaticParams);

        this.name = name;
        this.game = gamePointer;
    }
}

export { GameSkillTree };
