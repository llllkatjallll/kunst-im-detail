import { Behaviour, GameObject, serializeable } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

export class Infopoint extends Behaviour {

    @serializeable()
    currentId: number = 555;
    
   

    showInfo() {
        console.log("currentId " + this.currentId);
    }

    selectChild() {
        const allObjects = GameObject.getComponentsInChildren (this.gameObject, objectInfo);
       
        for(let x = 0; x < allObjects.length; x++){
            console.log("selectedId " + allObjects[x].infoId);
        }

    }

    showCurrentModel(){
        for(let x = 0; x < this.gameObject.children.length; x++){
            GameObject.setActive(this.gameObject.children[x], false);
        }
        GameObject.setActive(this.gameObject.children[this.currentId], true);
       // 
    }

    hideAllModels(){
        for(let x = 0; x < this.gameObject.children.length; x++){
            GameObject.setActive(this.gameObject.children[x], false);
        }
    }
}

export class objectInfo extends Behaviour {

    @serializeable()
    infoId: number = 0;
}

export class detailInfo extends Behaviour {

    @serializeable()
    detailId: number = 0;

    @serializeable( Infopoint)
    infopointObject: Infopoint| null = null;

    shareId(){
        if(this.infopointObject)
        this.infopointObject.currentId = this.detailId;
    }
}