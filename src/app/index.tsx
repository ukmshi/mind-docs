import { useEffect, useRef, useState } from "react";
import MindElixir, { MindElixirInstance } from "mind-elixir";

const App: React.FC = () => {
  const me = useRef<MindElixirInstance | null>(null);

  useEffect(() => {
    const instance = new MindElixir({
      el: "#map",
      direction: MindElixir.LEFT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true // default true
    });
    instance.init(MindElixir.new("new topic"));
    me.current = instance;

    return () => {
      me.current = null; // Clean up the reference on component unmount
    };

  }, []);

  return(
    <div id="map" style={{ height: "500px", width: "100%" }} />
  );
};

export default App;