var cy;
var options;

function addNode(nodeIn){

  cy.add({data:{id: nodeIn}});
  nodeIn = '';
  cy.layout(options);
}

function removeNode(nodeIn){
  var tempRem = cy.getElementById(nodeIn);
  cy.remove(tempRem);
  nodeIn = '';
}

function addEdge(edgeNameIn, sourceIn, targetIn){
  cy.add({data:{id: edgeNameIn, source: sourceIn, target: targetIn}});
  edgeNameIn = '';
  sourceIn = '';
  targetIn = '';
}

function removeEdge(edgeIn){
  var tempRem = cy.getElementById(edgeIn);
  cy.remove(tempRem);
  edgeIn = '';
}

function clear(sectionIn){

}

function bfs(rootIn, targetIn){
  var bfs = cy.elements().bfs({
    roots: "node[id = '" + rootIn + "']",
    visit: function(i, depth, v, e, u){
      console.log(v.id());
      if(v.id() === targetIn){
        return true;
      }
    },
    directed:false
  });
  bfs.path.select();
}

function aStar(rootIn, targetIn){
  var aStar = cy.elements().aStar({
    roots: "node[id = '" + rootIn +"']",
    visit: function(i, depth, v, e, u){
      if(v.id() === targetIn){
        return true;
      }
    },
    directed:false
  });
  aStar.path.select();
}

function setLayout(nameIn, args){
  if(nameIn === 'random'){
    options = {
      name:'random'
    }
  }else if(nameIn === 'cose'){
    options = {
      name: 'cose',
      nodeRepulsion: function(node){return 50;},
      nodeOverlap: 50,
      idealEdgeLength: function(edge){return 50;},
      edgeElasticity: function(edge){return 50;},
      gravity: 50
    }
  }else if(nameIn ==="klayjs"){
    options = {
      name:'klayjs',
      addUnnecessaryBendpoints: args['addUnnecessaryBendpoints'],
      alignment: args['alignment'],
      aspectRatio: args['aspectRatio'],
      borderSpacing: args['borderSpacing'],
      compactComponents: args['compactComponents'],
      compactionStrategy: args['compactionStrategy'],
      contentAlignment: args['contentAlignment'],
      crossingMinimization: args['crossingMinimization'],
      cycleBreaking: args['cycleBreaking'],
      debugMode: args['debugMode'],
      direction: args['direction'],
      edgeLabelSideSelection: args['edgeLabelSideSelection'],
      //edgeNodeSpacingFactor: 0.5,
      edgeRouting: args['edgeRouting'],
      edgeSpacingFactor: args['edgeSpacingFactor'],
      feedbackEdges: args['feedbackEdges'],
      fixedAlignment: args['fixedAlignment'],
      greedySwitchCrossingMinimization: args['greedySwitchCrossingMinimization'],
      hierarchyHandling: args['hierarchyHandling'],
      inLayerSpacingFactor: args['inLayerSpacingFactor'],
      interactiveReferencePoint: args['interactiveReferencePoint'],
      layerConstraint: args['layerConstraint'],
      layoutHierarchy: args['layoutHierarchy'],
      linearSegmentsDeflectionDampening: args['linearSegmentsDeflectionDampening'],
      mergeEdges: args['mergeEdges'],
      mergeHierarchyCrossingEdges: args['mergeHierarchyCrossingEdges'],
      noLayout: args['noLayout'],
      nodeLabelPlacement: args['nodeLabelPlacement'],
      nodeLayering: args['nodeLayering'],
      nodePlacement: args['nodePlacement'],
      portAlignment: args['portAlignment'],
      portAlignmentEastern: args['portAlignmentEastern'],
      portAlignmentNorth: args['portAlignmentNorth'],
      portAlignmentSouth: args['portAlignmentSouth'],
      portAlignmentWest: args['portAlignmentWest'],
      portConstraints: args['portConstraints'],
      portLabelPlacement: args['portLabelPlacement'],
      portOffset: args['portOffset'],
      portSide: args['portSide'],
      portSpacing: args['portSpacing'],
      postCompaction: args['postCompaction'],
      priority: args['priority'],
      randomizationSeed: args['randomizationSeed'],
      routeSelfLoopInside: args['routeSelfLoopInside'],
      separateConnectedComponents: args['separateConnectedComponents'],
      sizeConstraint: args['sizeConstraint'],
      sizeOptions: args['sizeOptions'],
      spacing: args['spacing'],
      splineSelfLoopPlacement: args['splineSelfLoopPlacement'],
      thoroughness: args['thoroughness'],
      wideNodesOnMultipleLayers: args['wideNodesOnMultipleLayers'],
    };
    var i;
    for(i in options){
      if(options[i] === ""){
        options[i] = 'undefined';
      }else if(i ===  "aspectRatio" || i === "borderSpacing" || i === "edgeNodeSpacingFactor" || i === "edgeSpacingFactor" ||
      i === "inLayerSpacingFactor" || i === "linearSegmentsDeflectionDampening" || i === "portOffset" || i === "portSpacing" ||
      i === "spacing"){
        options[i] = parseFloat(options[i]);
      }else if(i === "randomizationSeed" || i === "priority" || i === "thoroughness"){
        options[i] = parseInt(options[i]);
      }
    }
  }else if(nameIn === 'matterjs'){
    options = {
      name: 'matterjs',
    }
  }
  cy.layout(options);
}

document.addEventListener('DOMContentLoaded', function(){
  cy = cytoscape({
    container: document.getElementById('cy'),
    elements:[
      {data:{id: 'a0'}},
      {data:{id: 'b0'}},
      {data:{id: 'c0'}},
      {data:{id: 'd0'}},
      {data:{id: 'e0'}},
      {data:{id: 'f0'}},
      {data:{id: 'a0a1', parent: 'a0'}},
      {data:{id: 'a0b1', parent: 'a0'}},
      {data:{id: 'a0c1', parent: 'a0'}},
      {data:{id: 'a0a1a2', parent: 'a0a1'}},
      /*{data:{id: 'a0b1', parent: 'a0'}},*/
      {data:{id: 'e0a1', parent: 'e0'}},
      /*{data:{id: 'f0a1', parent: 'f0'}},
      {data:{id: 'f0b1', parent: 'f0'}},
      {data:{id: 'e0a1a2', parent: 'e0a1'}},
      {data:{id: 'f0a1a2', parent: 'f0a1'}},
      {data:{id: 'f0a1b2', parent: 'f0a1'}},
      {data:{id: 'f0a1b2a3', parent: 'f0a1b2'}},*/
      {data:{id: 'a0b0', source: 'a0', target: 'b0'}},
      {data:{id: 'a0c0', source: 'a0', target: 'c0'}},
      {data:{id: 'a0d0', source: 'a0', target: 'd0'}},
      {data:{id: 'a0e0', source: 'a0', target: 'e0'}},
      {data:{id: 'a0f0', source: 'a0', target: 'f0'}},
      {data:{id: 'b0c0', source: 'b0', target: 'c0'}},
      {data:{id: 'b0d0', source: 'b0', target: 'd0'}},
      {data:{id: 'b0e0', source: 'b0', target: 'e0'}},
      {data:{id: 'b0f0', source: 'b0', target: 'f0'}},
      {data:{id: 'c0d0', source: 'c0', target: 'd0'}},
      {data:{id: 'c0e0', source: 'c0', target: 'e0'}},
      {data:{id: 'c0f0', source: 'c0', target: 'f0'}},
      {data:{id: 'd0e0', source: 'd0', target: 'e0'}},
      {data:{id: 'd0f0', source: 'd0', target: 'f0'}},
      {data:{id: 'e0f0', source: 'e0', target: 'f0'}},
      {data:{id:'a0a1a0b1', source:'a0a1', target: 'a0b1'}},
      /*{data:{id: 'a0'}},
      {data:{id: 'b0'}},
      {data:{id: 'c0'}},
      {data:{id: 'd0'}},
      {data:{id: 'e0'}},
      {data:{id: 'f0'}},
      {data:{id: 'g0'}},
      {data:{id: 'h0'}},
      {data:{id: 'i0'}},
      {data:{id: 'j0'}},
      {data:{id: 'k0'}},
      {data:{id: 'l0'}},
      {data:{id: 'm0'}},
      {data:{id: 'n0'}},
      {data:{id: 'o0'}},
      {data:{id: 'p0'}},
      {data:{id: 'q0'}},
      {data:{id: 'r0'}},
      {data:{id: 's0'}},
      {data:{id: 't0'}},
      {data:{id: 'u0'}},
      {data:{id: 'v0'}},
      {data:{id: 'w0'}},
      {data:{id: 'x0'}},
      {data:{id: 'y0'}},
      {data:{id: 'z0'}},
      {data:{id: 'a1'}},
      {data:{id: 'b1'}},
      {data:{id: 'c1'}},
      {data:{id: 'd1'}},
      {data:{id: 'e1'}},
      {data:{id: 'f1'}},
      {data:{id: 'g1'}},
      {data:{id: 'h1'}},
      {data:{id: 'i1'}},
      {data:{id: 'j1'}},
      {data:{id: 'k1'}},
      {data:{id: 'l1'}},
      {data:{id: 'm1'}},
      {data:{id: 'n1'}},
      {data:{id: 'o1'}},
      {data:{id: 'p1'}},
      {data:{id: 'q1'}},
      {data:{id: 'r1'}},
      {data:{id: 's1'}},
      {data:{id: 't1'}},
      {data:{id: 'u1'}},
      {data:{id: 'v1'}},
      {data:{id: 'w1'}},
      {data:{id: 'x1'}},
      {data:{id: 'y1'}},
      {data:{id: 'z1'}},
      {data:{id: 'a0b0', source: 'a0', target: 'b0'}},
      {data:{id: 'b0c0', source: 'b0', target: 'c0'}},
      {data:{id: 'c0d0', source: 'c0', target: 'd0'}},
      {data:{id: 'd0e0', source: 'd0', target: 'e0'}},
      {data:{id: 'e0f0', source: 'e0', target: 'f0'}},
      {data:{id: 'f0g0', source: 'f0', target: 'g0'}},
      {data:{id: 'g0h0', source: 'g0', target: 'h0'}},
      {data:{id: 'h0i0', source: 'h0', target: 'i0'}},
      {data:{id: 'i0j0', source: 'i0', target: 'j0'}},
      {data:{id: 'j0k0', source: 'j0', target: 'k0'}},
      {data:{id: 'k0l0', source: 'k0', target: 'l0'}},
      {data:{id: 'l0m0', source: 'l0', target: 'm0'}},
      {data:{id: 'm0n0', source: 'm0', target: 'n0'}},
      {data:{id: 'n0o0', source: 'n0', target: 'o0'}},
      {data:{id: 'o0p0', source: 'o0', target: 'p0'}},
      {data:{id: 'p0q0', source: 'p0', target: 'q0'}},
      {data:{id: 'q0r0', source: 'q0', target: 'r0'}},
      {data:{id: 'r0s0', source: 'r0', target: 's0'}},
      {data:{id: 's0t0', source: 's0', target: 't0'}},
      {data:{id: 't0u0', source: 't0', target: 'u0'}},
      {data:{id: 'u0v0', source: 'u0', target: 'v0'}},
      {data:{id: 'v0w0', source: 'v0', target: 'w0'}},
      {data:{id: 'w0x0', source: 'w0', target: 'x0'}},
      {data:{id: 'x0y0', source: 'x0', target: 'y0'}},
      {data:{id: 'y0z0', source: 'y0', target: 'z0'}},
      {data:{id: 'z0a0', source: 'z0', target: 'a0'}},
      {data:{id: 'a1b1', source: 'a1', target: 'b1'}},
      {data:{id: 'b1c1', source: 'b1', target: 'c1'}},
      {data:{id: 'c1d1', source: 'c1', target: 'd1'}},
      {data:{id: 'd1e1', source: 'd1', target: 'e1'}},
      {data:{id: 'e1f1', source: 'e1', target: 'f1'}},
      {data:{id: 'f1g1', source: 'f1', target: 'g1'}},
      {data:{id: 'g1h1', source: 'g1', target: 'h1'}},
      {data:{id: 'h1i1', source: 'h1', target: 'i1'}},
      {data:{id: 'i1j1', source: 'i1', target: 'j1'}},
      {data:{id: 'j1k1', source: 'j1', target: 'k1'}},
      {data:{id: 'k1l1', source: 'k1', target: 'l1'}},
      {data:{id: 'l1m1', source: 'l1', target: 'm1'}},
      {data:{id: 'm1n1', source: 'm1', target: 'n1'}},
      {data:{id: 'n1o1', source: 'n1', target: 'o1'}},
      {data:{id: 'o1p1', source: 'o1', target: 'p1'}},
      {data:{id: 'p1q1', source: 'p1', target: 'q1'}},
      {data:{id: 'q1r1', source: 'q1', target: 'r1'}},
      {data:{id: 'r1s1', source: 'r1', target: 's1'}},
      {data:{id: 's1t1', source: 's1', target: 't1'}},
      {data:{id: 't1u1', source: 't1', target: 'u1'}},
      {data:{id: 'u1v1', source: 'u1', target: 'v1'}},
      {data:{id: 'v1w1', source: 'v1', target: 'w1'}},
      {data:{id: 'w1x1', source: 'w1', target: 'x1'}},
      {data:{id: 'x1y1', source: 'x1', target: 'y1'}},
      {data:{id: 'y1z1', source: 'y1', target: 'z1'}},
      {data:{id: 'z1a1', source: 'z1', target: 'a1'}},

      {data:{id: 'a0a1', source: 'a0', target: 'a1'}},
      {data:{id: 'b0b1', source: 'b0', target: 'b1'}},
      {data:{id: 'c0c1', source: 'c0', target: 'c1'}},
      {data:{id: 'd0d1', source: 'd0', target: 'd1'}},
      {data:{id: 'e0e1', source: 'e0', target: 'e1'}},
      {data:{id: 'f0f1', source: 'f0', target: 'f1'}},
      {data:{id: 'g0g1', source: 'g0', target: 'g1'}},
      {data:{id: 'h0h1', source: 'h0', target: 'h1'}},
      {data:{id: 'i0i1', source: 'i0', target: 'i1'}},
      {data:{id: 'j0j1', source: 'j0', target: 'j1'}},
      {data:{id: 'k0k1', source: 'k0', target: 'k1'}},
      {data:{id: 'l0l1', source: 'l0', target: 'l1'}},
      {data:{id: 'm0m1', source: 'm0', target: 'm1'}},
      {data:{id: 'n0n1', source: 'n0', target: 'n1'}},
      {data:{id: 'o0o1', source: 'o0', target: 'o1'}},
      {data:{id: 'p0p1', source: 'p0', target: 'p1'}},
      {data:{id: 'q0q1', source: 'q0', target: 'q1'}},
      {data:{id: 'r0r1', source: 'r0', target: 'r1'}},
      {data:{id: 's0s1', source: 's0', target: 's1'}},
      {data:{id: 't0t1', source: 't0', target: 't1'}},
      {data:{id: 'u0u1', source: 'u0', target: 'u1'}},
      {data:{id: 'v0v1', source: 'v0', target: 'v1'}},
      {data:{id: 'w0w1', source: 'w0', target: 'w1'}},
      {data:{id: 'x0x1', source: 'x0', target: 'x1'}},
      {data:{id: 'y0y1', source: 'y0', target: 'y1'}},
      {data:{id: 'z0z1', source: 'z0', target: 'z1'}},*/
    ]
  });
  options = {
    name: 'cose',
    animate: true,
    animationThreshold: 200,
    fit: true,
    nodeRepulsion: function(node){return 50;},
    nodeOverlap: 50,
    idealEdgeLength: function(edge){return 50;},
    edgeElasticity: function(edge){return 50;},
    gravity: 50
  };
  cy.layout(options);
});
