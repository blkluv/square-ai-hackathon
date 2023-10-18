import { useState } from "react";
import Graph from "react-vis-graph-wrapper";

// import "./styles.css";
// // need to import the vis network css in order to show tooltip
// import "./network.css";
function getUserGraph(matrix) {
    const graph = {
        nodes: [],
        edges: [],
    };
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        graph.nodes.push({ id: i, label: "Node"+i });
        for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
            graph.edges.push({ from: i, to: j });
        }
        }
    }
    return graph;
}
function UserGraph() {
    const handleNodeClick = ((node) => {
        if (selectedNodes.includes(node)) {
            // If the button is already selected, remove it
            setSelectedNodes(selectedNodes.filter((n) => n !== node));
          } else {
            // If the button is not selected, add it
            setSelectedNodes([...selectedNodes, node]);
          }
    });
  const [ selectedNodes, setSelectedNodes ] = useState([]);
//   const graph = {
//     nodes: [
//       { id: 1, label: "Node 1", title: "node 1 tootip text" },
//       { id: 2, label: "Node 2", title: "node 2 tootip text" },
//       { id: 3, label: "Node 3", title: "node 3 tootip text" },
//       { id: 4, label: "Node 4", title: "node 4 tootip text" },
//       { id: 5, label: "Node 5", title: "node 5 tootip text" },
//     ],
//     edges: [
//       { from: 1, to: 2 },
//       { from: 1, to: 3 },
//       { from: 2, to: 4 },
//       { from: 2, to: 5 },
//       { from: 3, to: 4 },
//       { from: 1, to: 5 },
//       { from: 2, to: 3 },
//     ],
//   };
//can fetch this adj matrix from api
const hardcoded_list = [
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]
]

const graph = getUserGraph(hardcoded_list)

  const options = {
    height: "900px",
  };

  const events = {
    select: function (event) {
        var { nodes, edges } = event;
        let node = nodes[0];
        handleNodeClick(node);
      },
  };
  return (
    <div className="mt-20">
      <div className="left-half">
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
            
      </div>
      <div className="right-half">
        <h1>Selected Nodes</h1>
        <ul>
          {selectedNodes.map((item, index) => (
            <li className="text-white" key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/* <div className="clear"></div> */}
    </div>
  );
}
export default UserGraph;
