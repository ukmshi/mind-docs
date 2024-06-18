import { useEffect, useRef, useState } from "react";
import MindElixir, { MindElixirInstance, NodeObj, Topic } from "mind-elixir";

const App: React.FC = () => {
  const me = useRef<MindElixirInstance | null>(null);
  const [showMindMap, setShowMindMap] = useState(true);

  useEffect(() => {
    const instance = new MindElixir({
      el: "#map",
      direction: MindElixir.RIGHT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true // default true
    });
    instance.init(MindElixir.new("new topic"));
    me.current = instance;

    // ダブルクリック
    instance.mindElixirBox.addEventListener('dblclick', (e) => {
      setShowMindMap(false);

      const target = e.target as HTMLElement;
      const nodeId = target.closest('me-tpc')?.getAttribute('data-nodeid');

      if (nodeId) {
        const topic = instance.mindElixirBox.querySelector(`me-tpc[data-nodeid="${nodeId}"]`) as Topic;
        const getData = instance.getData()

        if (topic) {
          setTimeout(() => {
            instance.refresh(getData);
            instance.toCenter();
          }, 200);
        }
      }
    });

    return () => {
      me.current = null;
    };

  }, []);

  const handleClose = () => {
    setShowMindMap(true);

    setTimeout(() => {
      me.current?.toCenter();
    }, 200);
  };

  return(
    <>
      <div style={{ display: "flex", height: "80vh", width: "100%" }}>
      <div id="map" style={{ flex: showMindMap ? 1 : 0.5, transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
      {!showMindMap && (
        <div style={{ flex: 0.5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "1px solid #ccc" }}>
          <button onClick={handleClose} style={{ position: "absolute", top: 10, right: 10 }}>×</button>
          <div style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}
    </div>

    </>
  );
};

export default App;