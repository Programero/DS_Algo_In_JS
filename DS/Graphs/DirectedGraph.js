function Vertex(data) {
  this.data = data;
  this.edges = {}; // to store all edges going out from this vertex
}

//@param {Edge} edge
Vertex.prototype.addEdge = function (edge) {
  //check edge.from.data should be equal to vertex data
  if (edge.from.data != this.data) {
    throw new Error(
      "edge.from is not the same vertex to which edge is being added"
    );
  }

  if (!this.edges[edge.getKey()]) {
    this.edges[edge.getKey()] = edge;
  }
};

Vertex.prototype.toString = function () {
  return this.data.toString();
};

//@param {Vertex} fromVertex
//@param {Vertex} toVertex
//@param {Number} weight
function Edge(fromVertex, toVertex, weight) {
  this.from = fromVertex;
  this.to = toVertex;
  this.weight = weight;
}

Edge.prototype.getKey = function () {
  return `${this.from.data}-${this.to.data}`;
};

function Graph(isDirected = false) {
  this.edges = {}; //to store all the edges of a graph
  this.vertices = {}; //to store all the vertices of a graph
  this.isDirected = isDirected;
}

//@param {Edge} edge
Graph.prototype.insertEdge = function (edge) {
  let startVertex = edge.from;
  let endVertex = edge.to;

  //if startVertex,endVertex are not a part of Graph.vertices, then add them to Graph.vertices
  if (!this.vertices[startVertex]) {
    this.vertices[startVertex] = startVertex;
  }

  if (!this.vertices[endVertex]) {
    this.vertices[endVertex] = endVertex;
  }

  //now add edge to Graph.edges if the edge doesn't exist in Graph.edges
  if (!this.edges[edge.getKey()]) {
    this.edges[edge.getKey()] = edge;
  }

  //now add edge to the vertex.edges as well
  startVertex.addEdge(edge);

  //check if the graph is undirected
  if (!this.isDirected) {
    //as the graph is undirected, therefore reverse the edge and add it to endvertex.edges as well as to Graph.edges
    const reversedEdge = new Edge(edge.to, edge.from, edge.weight);
    this.edges[reversedEdge.getKey()] = reversedEdge;
    endVertex.addEdge(reversedEdge);
  }
};

Graph.prototype.BFSTraversal = function (startVertex) {
  //Here we are taking visited as a hashmap because our vertex is not 0,1,2,3.... , it can have any data
  let visited = {};
  let queue = [];

  //as startVertex is an object and in visited obect we can use only string/symbol as key
  //therefore whenever we use visited[startvertex], startVertex.toString() will be called and then used as key
  visited[startVertex] = true;
  queue.push(startVertex);

  while (queue.length) {
    let dequeuedVertex = queue.shift();

    //print the data of the deueued vertex
    console.log(dequeuedVertex.data);

    //process all the edges of the dequeuedVertex
    for (let edgeKey in dequeuedVertex.edges) {
      if (dequeuedVertex.edges.hasOwnProperty(edgeKey)) {
        let edge = dequeuedVertex.edges[edgeKey];
        if (!visited[edge.to]) {
          queue.push(edge.to);
          visited[edge.to] = true;
        }
      }
    }
  }
};

Graph.prototype.DFSTraversal = function (startVertex) {
  let visited = {};

  //implementing DFS using recursion
  let _DFSTraversalRecur = (currentVertex, visited) => {
    //used arrow function to retain reference to this keyword
    visited[currentVertex] = true;
    console.log(currentVertex.data);
    for (let edgeKey in currentVertex.edges) {
      if (currentVertex.edges.hasOwnProperty(edgeKey)) {
        let edge = currentVertex.edges[edgeKey];
        if (!visited[edge.to]) {
          _DFSTraversalRecur(edge.to, visited);
        }
      }
    }
  };

  _DFSTraversalRecur(startVertex, visited);
};

// //Dijkstra's algorithm to findout single source shortest path
// Graph.prototype.dijkstra = function(sourceVertex){
//  let distanceFromSource = {};
//  //initially distance from all other vertices will be infinity and distance from sourceVertex will be zero
//  distanceFromSource[sourceVertex] = 0;

//  // notSelected is used to keep track of all vertices to which shortest path has not been found
//  //initally for all vertices would be present in notSelected
//  let notSelected = {}
//  while(){

//  }
// }

///----------------Driver Code--------------

let myGraph = new Graph(true); //isDirected is false by default, therefore we are having an undirected graph

//let's create 5 new vertices
let vertex1 = new Vertex(1);
let vertex2 = new Vertex(2);
let vertex3 = new Vertex(3);
let vertex4 = new Vertex(4);
let vertex5 = new Vertex(5);

//now let's create all the edges
let edge12 = new Edge(vertex1, vertex2, 1);
myGraph.insertEdge(edge12);

let edge23 = new Edge(vertex2, vertex3, 1);
myGraph.insertEdge(edge23);

let edge34 = new Edge(vertex3, vertex4, 1);
myGraph.insertEdge(edge34);

let edge45 = new Edge(vertex4, vertex5, 1);
myGraph.insertEdge(edge45);

let edge54 = new Edge(vertex5, vertex4, 1);
myGraph.insertEdge(edge45);

let edge15 = new Edge(vertex1, vertex5, 1);
myGraph.insertEdge(edge15);

myGraph.BFSTraversal(vertex1);
myGraph.DFSTraversal(vertex1);
