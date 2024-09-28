/**
 * @file Tests for the EventManager class
 */
import { describe, it } from "mocha";
import { assert } from "chai";

import { EventInit, EventManager, EventTypes } from "emath.js/game";

// EventManager is a part of <Game> class
import { testGame } from "../setupGame";

describe("EventManager", () => {
    describe("EventManager constructor", () => {
        // The event manager should be created when the game is created
        it("should create an event manager instance", () => {
            assert.instanceOf(testGame.eventManager, EventManager);
        });
    });

    describe("on/dispatch", () => {
        let eventDispatched = false;

        // Create a new event and listen to it
        testGame.eventManager.on("test-event", () => {
            eventDispatched = true;
        });

        // Dispatch the event
        testGame.eventManager.dispatch("test-event");

        // The event should have been dispatched
        it("should dispatch an event", () => {
            assert.isTrue(eventDispatched);
        });
    });

    describe("setEvent", () => {
        let intervalEventDispatchedTimes = 0;
        const intervalDtArray: number[] = [];

        // Set an interval event
        testGame.eventManager.setEvent("testInterval1", "interval", 100, (dt) => {
            intervalEventDispatchedTimes++;
            intervalDtArray.push(dt);
        });

        testGame.eventManager.setEvent({
            name: "testInterval2",
            type: EventTypes.interval,
            delay: 100,
            callback: (dt) => {
                intervalEventDispatchedTimes++;
                intervalDtArray.push(dt);
            },
        } as EventInit);

        let timeoutEventDispatchedTimes = 0;

        // Set up a timeout event
        testGame.eventManager.setEvent("testTimeout1", "timeout", 100, () => {
            // eventDispatchedTimes++;
            timeoutEventDispatchedTimes++;
        });

        testGame.eventManager.setEvent({
            name: "testTimeout2",
            type: EventTypes.timeout,
            delay: 100,
            callback: () => {
                // eventDispatchedTimes++;
                timeoutEventDispatchedTimes++;
            },
        } as EventInit);

        it("should dispatch interval events", (done) => {
            setTimeout(() => {
                // The interval event should have been dispatched
                it("should dispatch interval events", () => {
                    assert.equal(intervalEventDispatchedTimes, 2);
                });

                // The interval event should have been dispatched with the correct dt
                it("should dispatch interval events with the correct dt", () => {
                    assert.equal(intervalDtArray.length, 2);
                    intervalDtArray.forEach((dt) => {
                        assert.closeTo(dt, 100, 100);
                    });
                });

                // The timeout event should have been dispatched
                it("should dispatch timeout events", () => {
                    assert.equal(timeoutEventDispatchedTimes, 2);
                });

                done();
            }, 120);
        });
    });
});
