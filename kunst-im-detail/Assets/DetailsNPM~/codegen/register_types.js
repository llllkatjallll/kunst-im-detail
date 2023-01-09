import { TypeStore } from "@needle-tools/engine/engine/engine_typestore"

// Import types
import { ArtworkExporter } from "../ArtworkExporter.ts";
import { Infopoint } from "../Infopoint.ts";
import { objectInfo } from "../Infopoint.ts";
import { detailInfo } from "../Infopoint.ts";
import { SpatialTriggerReceiver } from "../SpatialTrigger.ts";
import { SpatialTrigger } from "../SpatialTrigger.ts";

// Register types
TypeStore.add("ArtworkExporter", ArtworkExporter);
TypeStore.add("Infopoint", Infopoint);
TypeStore.add("objectInfo", objectInfo);
TypeStore.add("detailInfo", detailInfo);
TypeStore.add("SpatialTriggerReceiver", SpatialTriggerReceiver);
TypeStore.add("SpatialTrigger", SpatialTrigger);
