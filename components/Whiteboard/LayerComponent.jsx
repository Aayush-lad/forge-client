import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Ellipse from "./Ellipse";
import Path from "./Path";
import Rectangle from "./Rectangle";
import { colorToCss } from "./utils";
const CanvasMode ={
  None: "None",
  Pressing: "Pressing",
  Translating: "Translating",
  Resizing: "Resizing",
  Pencil: "Pencil",
  Inserting: "Inserting",
  SelectionNet: "SelectionNet",

}

const LayerType = {
  Rectangle: "Rectangle",
  Ellipse: "Ellipse",
  Path: "Path",
};


const LayerComponent = memo(
  ({ mode, onLayerPointerDown, id, selectionColor }) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) {
      return null;
    }

    const isAnimated =
      mode !== CanvasMode.Translating && mode !== CanvasMode.Resizing;

    switch (layer.type) {
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#CCC"}
            stroke={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

export default LayerComponent;