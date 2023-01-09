import { Behaviour, GameObject, serializeable } from "@needle-tools/engine";
import { Object3D } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { saveAs } from "file-saver";

// Documentation → https://docs.needle.tools/scripting

export class ArtworkExporter extends Behaviour {

    @serializeable(GameObject)
    exportRoot : GameObject | undefined;

    btn : HTMLButtonElement | undefined = undefined;
    exportMethod : any;

    onEnable(): void {
        this.btn = this.context.domElement.querySelector("#export-button") as HTMLButtonElement;
        this.exportMethod = this.exportUsdz.bind(this);
        this.btn.addEventListener('click', this.exportMethod);
    }

    onDisable(): void {
        this.btn?.removeEventListener('click', this.exportMethod);
    }

    async exportUsdz() {
        let root : Object3D = this.context.scene;
        if (this.exportRoot)
            root = this.exportRoot;

        console.log("export!", this, root);

        root.traverse( x => {
            const p = x.position;
            if(!isFinite(p.x)) p.x = 0;
            if(!isFinite(p.y)) p.y = 0;
            if(!isFinite(p.z)) p.z = 0;
            console.log(x.position, x);
        });

        const exporter = new GLTFExporter();

        exporter.parse(root, function (gltfJson) {
            console.log(gltfJson);
            const jsonString = JSON.stringify(gltfJson);
            console.log(jsonString);
            
            // The following doesn't seem to work due to iframe sandboxing.
            // But please save the gltf json from the Console to obtain the file.
            const blob = new Blob([jsonString], { type: "application/json" });
            //saveAs(blob, "colored-square.gltf");
            const link = document.createElement( 'a' );
           link.href = URL.createObjectURL( blob );
           link.download = "artwork.glb";
           link.click();
            //console.log("Download requested" + blob);
          }, { binary: true });


       /* const arraybuffer = await exporter.parse( root );
        const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );

        const link = document.getElementById( 'link' ) as HTMLLinkElement;
        link.href = URL.createObjectURL( blob );*/

    }
}