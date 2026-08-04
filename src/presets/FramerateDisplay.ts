import type { Game } from "../game";
import { EventManager, GameIntervalEvent } from "../game/managers/EventManager";
import type { RecordToDataEntry } from "./AppSettings";

import { SubscribableDataEntry } from "../game/managers/DataEntry";

const defaultFramerateDisplayConfig = {
    /**
     * The {@link EventManager.framerateSampleSize} to use for the framerate display.
     */
    framerateSampleSize: EventManager.defaultFramerateSampleSize,

    /**
     * The interval (in milliseconds) at which the framerate display should update.
     */
    framerateDisplayUpdateIntervalMs: 100,

    /**
     * The {@link EventManager.config.fps}.
     */
    framerate: 30,

    /**
     * Whether or not to {@link EventManager.vsyncEnabled}.
     */
    enableVsync: false,
};

class FramerateDisplay {
    protected readonly eventManager: EventManager;
    protected readonly config: typeof defaultFramerateDisplayConfig;

    constructor(gameInstance: Game, initialConfig?: Partial<typeof defaultFramerateDisplayConfig>) {
        this.eventManager = gameInstance.eventManager;
        this.config = Object.assign(
            {},
            defaultFramerateDisplayConfig,
            {
                framerateSampleSize: this.eventManager.framerateSampleSize,
                enableVsync: this.eventManager.isVsyncEnabled(),
                framerate: this.eventManager.config.fps,
            },
            initialConfig,
        );
    }

    public registerDataEntrySettings(dataEntries: RecordToDataEntry<typeof defaultFramerateDisplayConfig>): void {
        dataEntries.framerateSampleSize.subscribe(() => {
            this.eventManager.framerateSampleSize = dataEntries.framerateSampleSize.get();
        });
        dataEntries.enableVsync.subscribe(() => {
            this.eventManager.setVsyncEnabled(dataEntries.enableVsync.get());
        });
        dataEntries.framerateDisplayUpdateIntervalMs.subscribe(() => {
            this.config.framerateDisplayUpdateIntervalMs = dataEntries.framerateDisplayUpdateIntervalMs.get();
        });
        dataEntries.framerate.subscribe(() => {
            this.eventManager.changeFps(dataEntries.framerate.get());
        });
    }

    public createSubscribableDataEntryForFramerate(): SubscribableDataEntry<number> {
        const entry = SubscribableDataEntry.fromGetterSetter(
            () => this.eventManager.getFramerate(),
            () => {
                // No setter, framerate is readonly
            },
            false,
        );

        this.eventManager.addEvent(
            new GameIntervalEvent(
                "framerateDisplayUpdater",
                () => this.config.framerateDisplayUpdateIntervalMs,
                () => {
                    entry.notifyListeners();
                },
            ),
        );
        return entry;
    }
}

export { defaultFramerateDisplayConfig, FramerateDisplay };
