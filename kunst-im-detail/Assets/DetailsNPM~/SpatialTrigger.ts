import { BoxHelper, Layers } from "three";
import { Behaviour, EventList, GameObject } from "@needle-tools/engine/";
import { BoxHelperComponent } from "@needle-tools/engine";

import { serializeable } from "@needle-tools/engine";
import { getParam } from "@needle-tools/engine/engine/engine_utils";


const debug = getParam("debugSpatialTrigger");

const layer1 = new Layers();
const layer2 = new Layers();
function testMask(mask1, mask2) {
    layer1.mask = mask1;
    layer2.mask = mask2;
    return layer1.test(layer2);
}

export class SpatialTriggerReceiver extends Behaviour {
    @serializeable()
    objectId: number = 1;
    // currently Layers in unity but maybe this should be a string or plane number? Or should it be a bitmask to allow receivers use multiple triggers?
    @serializeable()
    triggerMask: number = 0;
    @serializeable(EventList)
    onEnter?: EventList;
    @serializeable(EventList)
    onStay?: EventList;
    @serializeable(EventList)
    onExit?: EventList;

    start() {
        if (debug) console.log(this.name, this.triggerMask, this);
    }

    update(): void {
        this.currentIntersected.length = 0;
        for (const trigger of SpatialTrigger.triggers) {
            if (testMask(trigger.triggerMask, this.triggerMask)) {
                if (trigger.test(this.gameObject)) {
                    this.currentIntersected.push(trigger);
                }
            }
        }
        for (let i = this.lastIntersected.length - 1; i >= 0; i--) {
            const last = this.lastIntersected[i]
            if (this.currentIntersected.indexOf(last) < 0) {
                this.onExitTrigger(last);
                this.lastIntersected.splice(i, 1);
            }
        }
        for (const cur of this.currentIntersected) {
            if (this.lastIntersected.indexOf(cur) < 0)
                this.onEnterTrigger(cur);
            this.onStayTrigger(cur);
        }
        this.lastIntersected.length = 0;
        this.lastIntersected.push(...this.currentIntersected);

    }

    currentIntersected: SpatialTrigger[] = [];
    lastIntersected: SpatialTrigger[] = [];

    onEnterTrigger(trigger: SpatialTrigger): void {
        if(debug) console.log("ENTER TRIGGER", this.name, trigger.name, this, trigger);
        trigger.raiseOnEnterEvent(this);
        this.onEnter?.invoke(this, trigger);
    }
    onExitTrigger(trigger: SpatialTrigger): void {
        if(debug) console.log("EXIT TRIGGER", this.name, trigger.name, this, trigger);
        trigger.raiseOnExitEvent(this);
        this.onExit?.invoke(this, trigger);
    }

    onStayTrigger(trigger: SpatialTrigger): void {
        trigger.raiseOnStayEvent(this);
        this.onStay?.invoke(this, trigger);
    }
}

export class SpatialTrigger extends Behaviour {

    static triggers: SpatialTrigger[] = [];

    @serializeable()
    triggerMask?: number;

    private boxHelper?: BoxHelperComponent;

    start() {
        if (debug)
            console.log(this.name, this.triggerMask, this);
    }

    onEnable(): void {
        SpatialTrigger.triggers.push(this);
        if (!this.boxHelper) {
            this.boxHelper = GameObject.addNewComponent(this.gameObject, BoxHelperComponent);
            this.boxHelper?.showHelper();
        }
    }
    onDisable(): void {
        SpatialTrigger.triggers.splice(SpatialTrigger.triggers.indexOf(this), 1);
    }

    test(obj: THREE.Object3D): boolean {
        if (!this.boxHelper) return false;
        return this.boxHelper.isInBox(obj) ?? false;
    }

    // private args: SpatialTriggerEventArgs = new SpatialTriggerEventArgs();

    raiseOnEnterEvent(rec: SpatialTriggerReceiver) {
        // this.args.trigger = this;
        // this.args.source = rec;
        GameObject.foreachComponent(this.gameObject, c => {
            if (c === rec) return;
            if(c instanceof SpatialTriggerReceiver) {
                c.onEnterTrigger(this);
            }
        }, false);
    }

    raiseOnStayEvent(rec: SpatialTriggerReceiver) {
        // this.args.trigger = this;
        // this.args.source = rec;
        GameObject.foreachComponent(this.gameObject, c => {
            if (c === rec) return;
            if(c instanceof SpatialTriggerReceiver) {
                c.onStayTrigger(this);
            }
        }, false);
    }

    raiseOnExitEvent(rec: SpatialTriggerReceiver) {
        GameObject.foreachComponent(this.gameObject, c => {
            if (c === rec) return;
            if(c instanceof SpatialTriggerReceiver) {
                c.onExitTrigger(this);
            }
        }, false);
    }
}
