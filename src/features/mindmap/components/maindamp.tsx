import MindElixir, { MindElixirInstance, NodeObj, Topic } from "mind-elixir";
import { useEffect, useRef } from "react";

export const MindMap: React.FC = () => {
  const me = useRef<MindElixirInstance | null>(null);

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

    // // ダブルクリック
    // instance.mindElixirBox.addEventListener('dblclick', (e) => {
    //   // setShowMindMap(false);

    //   const target = e.target as HTMLElement;
    //   const nodeId = target.closest('me-tpc')?.getAttribute('data-nodeid');

    //   if (nodeId) {
    //     const topic = instance.mindElixirBox.querySelector(`me-tpc[data-nodeid="${nodeId}"]`) as Topic;
    //     const getData = instance.getData()

    //     if (topic) {
    //       setTimeout(() => {
    //         instance.refresh(getData);
    //         instance.toCenter();
    //       }, 200);
    //     }
    //   }
    // });

    return () => {
      me.current = null;
    };

  }, []);


  return(
    <div id="map" style={{ transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
  )
}