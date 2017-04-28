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
      /*addUnnecessaryBendpoints: args['addUnnecessaryBendpoints'],
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
      wideNodesOnMultipleLayers: args['wideNodesOnMultipleLayers'],*/
    };
    /*var i;
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
    }*/
  }else if(nameIn === 'matterjs'){
    options = {
      name: 'matterjs',
      maxSimulationTime: Infinity,
      maxTicks: 5000,
      refresh: 1,
      gravity: -10,
    }
  }
  var layout = cy.layout(options);
  layout.run();
}

document.addEventListener('DOMContentLoaded', function(){
  cy = cytoscape({
    container: document.getElementById('cy'),
    elements:[
      /*{data:{id: 'a'}},
      {data:{id: 'aa', parent:'a'}},
      {data:{id: 'aaa', parent: 'aa'}},
      {data:{id: 'aab', parent: 'aa'}},
      {data:{id: 'ab', parent: 'a'}},
      {data:{id: 'ac', parent: 'a'}},
      {data:{id: 'b'}},
      {data:{id: 'ba', parent: 'b'}},
      {data:{id: 'baa', parent: 'ba'}},
      {data:{id: 'c'}},
      {data:{id: 'ca', parent: 'c'}},
      {data:{id: 'd'}},
      {data:{id: 'da', parent:'d'}},

      {data:{id: 'a-b', source:'a', target:'b'}},
      {data:{id: 'b-c', source:'b', target:'c'}},
      {data:{id: 'c-d', source:'c', target:'d'}},
      {data:{id: 'd-a', source:'d', target:'a'}},*/
      {data:{id: 'a0a1', parent: 'a0'}},
      {data:{id: 'a0b1', parent: 'a0'}},
      {data:{id: 'a0'}},
      {data:{id: 'a0c1', parent: 'a0'}},
      {data:{id: 'b0'}},
      {data:{id: 'b0a1', parent: 'b0'}},
      {data:{id: 'c0'}},
      {data:{id: 'c0a1', parent: 'c0'}},
      {data:{id: 'd0'}},
      {data:{id: 'd0a1', parent: 'd0'}},
      {data:{id: 'e0'}},
      {data:{id: 'e0a1', parent: 'e0'}},
      {data:{id: 'f0'}},
      {data:{id: 'f0a1', parent: 'f0'}},
      {data:{id: 'g0'}},
      {data:{id: 'g0a1', parent: 'g0'}},
      {data:{id: 'h0'}},
      {data:{id: 'h0a1', parent: 'h0'}},
      {data:{id: 'i0'}},
      {data:{id: 'i0a1', parent: 'i0'}},
      {data:{id: 'j0'}},
      {data:{id: 'j0a1', parent: 'j0'}},
      {data:{id: 'k0'}},
      {data:{id: 'k0a1', parent: 'k0'}},
      {data:{id: 'l0'}},
      {data:{id: 'l0a1', parent: 'l0'}},
      {data:{id: 'm0'}},
      {data:{id: 'm0a1', parent: 'm0'}},
      {data:{id: 'n0'}},
      {data:{id: 'n0a1', parent: 'n0'}},
      {data:{id: 'o0'}},
      {data:{id: 'o0a1', parent: 'o0'}},
      {data:{id: 'p0'}},
      {data:{id: 'p0a1', parent: 'p0'}},
      {data:{id: 'q0'}},
      {data:{id: 'q0a1', parent: 'q0'}},
      {data:{id: 'r0'}},
      {data:{id: 'r0a1', parent: 'r0'}},
      {data:{id: 's0'}},
      {data:{id: 's0a1', parent: 's0'}},
      {data:{id: 't0'}},
      {data:{id: 't0a1', parent: 't0'}},
      {data:{id: 'u0'}},
      {data:{id: 'u0a1', parent: 'u0'}},
      {data:{id: 'v0'}},
      {data:{id: 'v0a1', parent: 'v0'}},
      {data:{id: 'w0'}},
      {data:{id: 'w0a1', parent: 'w0'}},
      {data:{id: 'x0'}},
      {data:{id: 'x0a1', parent: 'x0'}},
      {data:{id: 'y0'}},
      {data:{id: 'y0a1', parent: 'y0'}},
      {data:{id: 'z0'}},
      {data:{id: 'z0a1', parent: 'z0'}},
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
      {data:{id: 'a2'}},
      {data:{id: 'b2'}},
      {data:{id: 'c2'}},
      {data:{id: 'd2'}},
      {data:{id: 'e2'}},
      {data:{id: 'f2'}},
      {data:{id: 'g2'}},
      {data:{id: 'h2'}},
      {data:{id: 'i2'}},
      {data:{id: 'j2'}},
      {data:{id: 'k2'}},
      {data:{id: 'l2'}},
      {data:{id: 'm2'}},
      {data:{id: 'n2'}},
      {data:{id: 'o2'}},
      {data:{id: 'p2'}},
      {data:{id: 'q2'}},
      {data:{id: 'r2'}},
      {data:{id: 's2'}},
      {data:{id: 't2'}},
      {data:{id: 'u2'}},
      {data:{id: 'v2'}},
      {data:{id: 'w2'}},
      {data:{id: 'x2'}},
      {data:{id: 'y2'}},
      {data:{id: 'z2'}},
      {data:{id: 'a0-b0', source: 'a0', target: 'b0'}},
      {data:{id: 'b0-c0', source: 'b0', target: 'c0'}},
      {data:{id: 'c0-d0', source: 'c0', target: 'd0'}},
      {data:{id: 'd0-e0', source: 'd0', target: 'e0'}},
      {data:{id: 'e0-f0', source: 'e0', target: 'f0'}},
      {data:{id: 'f0-g0', source: 'f0', target: 'g0'}},
      {data:{id: 'g0-h0', source: 'g0', target: 'h0'}},
      {data:{id: 'h0-i0', source: 'h0', target: 'i0'}},
      {data:{id: 'i0-j0', source: 'i0', target: 'j0'}},
      {data:{id: 'j0-k0', source: 'j0', target: 'k0'}},
      {data:{id: 'k0-l0', source: 'k0', target: 'l0'}},
      {data:{id: 'l0-m0', source: 'l0', target: 'm0'}},
      {data:{id: 'm0-n0', source: 'm0', target: 'n0'}},
      {data:{id: 'n0-o0', source: 'n0', target: 'o0'}},
      {data:{id: 'o0-p0', source: 'o0', target: 'p0'}},
      {data:{id: 'p0-q0', source: 'p0', target: 'q0'}},
      {data:{id: 'q0-r0', source: 'q0', target: 'r0'}},
      {data:{id: 'r0-s0', source: 'r0', target: 's0'}},
      {data:{id: 's0-t0', source: 's0', target: 't0'}},
      {data:{id: 't0-u0', source: 't0', target: 'u0'}},
      {data:{id: 'u0-v0', source: 'u0', target: 'v0'}},
      {data:{id: 'v0-w0', source: 'v0', target: 'w0'}},
      {data:{id: 'w0-x0', source: 'w0', target: 'x0'}},
      {data:{id: 'x0-y0', source: 'x0', target: 'y0'}},
      {data:{id: 'y0-z0', source: 'y0', target: 'z0'}},
      {data:{id: 'z0-a0', source: 'z0', target: 'a0'}},
      {data:{id: 'a1-b1', source: 'a1', target: 'b1'}},
      {data:{id: 'b1-c1', source: 'b1', target: 'c1'}},
      {data:{id: 'c1-d1', source: 'c1', target: 'd1'}},
      {data:{id: 'd1-e1', source: 'd1', target: 'e1'}},
      {data:{id: 'e1-f1', source: 'e1', target: 'f1'}},
      {data:{id: 'f1-g1', source: 'f1', target: 'g1'}},
      {data:{id: 'g1-h1', source: 'g1', target: 'h1'}},
      {data:{id: 'h1-i1', source: 'h1', target: 'i1'}},
      {data:{id: 'i1-j1', source: 'i1', target: 'j1'}},
      {data:{id: 'j1-k1', source: 'j1', target: 'k1'}},
      {data:{id: 'k1-l1', source: 'k1', target: 'l1'}},
      {data:{id: 'l1-m1', source: 'l1', target: 'm1'}},
      {data:{id: 'm1-n1', source: 'm1', target: 'n1'}},
      {data:{id: 'n1-o1', source: 'n1', target: 'o1'}},
      {data:{id: 'o1-p1', source: 'o1', target: 'p1'}},
      {data:{id: 'p1-q1', source: 'p1', target: 'q1'}},
      {data:{id: 'q1-r1', source: 'q1', target: 'r1'}},
      {data:{id: 'r1-s1', source: 'r1', target: 's1'}},
      {data:{id: 's1-t1', source: 's1', target: 't1'}},
      {data:{id: 't1-u1', source: 't1', target: 'u1'}},
      {data:{id: 'u1-v1', source: 'u1', target: 'v1'}},
      {data:{id: 'v1-w1', source: 'v1', target: 'w1'}},
      {data:{id: 'w1-x1', source: 'w1', target: 'x1'}},
      {data:{id: 'x1-y1', source: 'x1', target: 'y1'}},
      {data:{id: 'y1-z1', source: 'y1', target: 'z1'}},
      {data:{id: 'z1-a1', source: 'z1', target: 'a1'}},
      {data:{id: 'a2-b2', source: 'a2', target: 'b2'}},
      {data:{id: 'b2-c2', source: 'b2', target: 'c2'}},
      {data:{id: 'c2-d2', source: 'c2', target: 'd2'}},
      {data:{id: 'd2-e2', source: 'd2', target: 'e2'}},
      {data:{id: 'e2-f2', source: 'e2', target: 'f2'}},
      {data:{id: 'f2-g2', source: 'f2', target: 'g2'}},
      {data:{id: 'g2-h2', source: 'g2', target: 'h2'}},
      {data:{id: 'h2-i2', source: 'h2', target: 'i2'}},
      {data:{id: 'i2-j2', source: 'i2', target: 'j2'}},
      {data:{id: 'j2-k2', source: 'j2', target: 'k2'}},
      {data:{id: 'k2-l2', source: 'k2', target: 'l2'}},
      {data:{id: 'l2-m2', source: 'l2', target: 'm2'}},
      {data:{id: 'm2-n2', source: 'm2', target: 'n2'}},
      {data:{id: 'n2-o2', source: 'n2', target: 'o2'}},
      {data:{id: 'o2-p2', source: 'o2', target: 'p2'}},
      {data:{id: 'p2-q2', source: 'p2', target: 'q2'}},
      {data:{id: 'q2-r2', source: 'q2', target: 'r2'}},
      {data:{id: 'r2-s2', source: 'r2', target: 's2'}},
      {data:{id: 's2-t2', source: 's2', target: 't2'}},
      {data:{id: 't2-u2', source: 't2', target: 'u2'}},
      {data:{id: 'u2-v2', source: 'u2', target: 'v2'}},
      {data:{id: 'v2-w2', source: 'v2', target: 'w2'}},
      {data:{id: 'w2-x2', source: 'w2', target: 'x2'}},
      {data:{id: 'x2-y2', source: 'x2', target: 'y2'}},
      {data:{id: 'y2-z2', source: 'y2', target: 'z2'}},
      {data:{id: 'z2-a2', source: 'z2', target: 'a2'}},

      {data:{id: 'a0-a1', source: 'a0', target: 'a1'}},
      {data:{id: 'b0-b1', source: 'b0', target: 'b1'}},
      {data:{id: 'c0-c1', source: 'c0', target: 'c1'}},
      {data:{id: 'd0-d1', source: 'd0', target: 'd1'}},
      {data:{id: 'e0-e1', source: 'e0', target: 'e1'}},
      {data:{id: 'f0-f1', source: 'f0', target: 'f1'}},
      {data:{id: 'g0-g1', source: 'g0', target: 'g1'}},
      {data:{id: 'h0-h1', source: 'h0', target: 'h1'}},
      {data:{id: 'i0-i1', source: 'i0', target: 'i1'}},
      {data:{id: 'j0-j1', source: 'j0', target: 'j1'}},
      {data:{id: 'k0-k1', source: 'k0', target: 'k1'}},
      {data:{id: 'l0-l1', source: 'l0', target: 'l1'}},
      {data:{id: 'm0-m1', source: 'm0', target: 'm1'}},
      {data:{id: 'n0-n1', source: 'n0', target: 'n1'}},
      {data:{id: 'o0-o1', source: 'o0', target: 'o1'}},
      {data:{id: 'p0-p1', source: 'p0', target: 'p1'}},
      {data:{id: 'q0-q1', source: 'q0', target: 'q1'}},
      {data:{id: 'r0-r1', source: 'r0', target: 'r1'}},
      {data:{id: 's0-s1', source: 's0', target: 's1'}},
      {data:{id: 't0-t1', source: 't0', target: 't1'}},
      {data:{id: 'u0-u1', source: 'u0', target: 'u1'}},
      {data:{id: 'v0-v1', source: 'v0', target: 'v1'}},
      {data:{id: 'w0-w1', source: 'w0', target: 'w1'}},
      {data:{id: 'x0-x1', source: 'x0', target: 'x1'}},
      {data:{id: 'y0-y1', source: 'y0', target: 'y1'}},
      {data:{id: 'z0-z1', source: 'z0', target: 'z1'}},
      {data:{id: 'a1-a2', source: 'a1', target: 'a2'}},
      {data:{id: 'b1-b2', source: 'b1', target: 'b2'}},
      {data:{id: 'c1-c2', source: 'c1', target: 'c2'}},
      {data:{id: 'd1-d2', source: 'd1', target: 'd2'}},
      {data:{id: 'e1-e2', source: 'e1', target: 'e2'}},
      {data:{id: 'f1-f2', source: 'f1', target: 'f2'}},
      {data:{id: 'g1-g2', source: 'g1', target: 'g2'}},
      {data:{id: 'h1-h2', source: 'h1', target: 'h2'}},
      {data:{id: 'i1-i2', source: 'i1', target: 'i2'}},
      {data:{id: 'j1-j2', source: 'j1', target: 'j2'}},
      {data:{id: 'k1-k2', source: 'k1', target: 'k2'}},
      {data:{id: 'l1-l2', source: 'l1', target: 'l2'}},
      {data:{id: 'm1-m2', source: 'm1', target: 'm2'}},
      {data:{id: 'n1-n2', source: 'n1', target: 'n2'}},
      {data:{id: 'o1-o2', source: 'o1', target: 'o2'}},
      {data:{id: 'p1-p2', source: 'p1', target: 'p2'}},
      {data:{id: 'q1-q2', source: 'q1', target: 'q2'}},
      {data:{id: 'r1-r2', source: 'r1', target: 'r2'}},
      {data:{id: 's1-s2', source: 's1', target: 's2'}},
      {data:{id: 't1-t2', source: 't1', target: 't2'}},
      {data:{id: 'u1-u2', source: 'u1', target: 'u2'}},
      {data:{id: 'v1-v2', source: 'v1', target: 'v2'}},
      {data:{id: 'w1-w2', source: 'w1', target: 'w2'}},
      {data:{id: 'x1-x2', source: 'x1', target: 'x2'}},
      {data:{id: 'y1-y2', source: 'y1', target: 'y2'}},
      {data:{id: 'z1-z2', source: 'z1', target: 'z2'}},
    ],
  });
  options = {
    name: 'random'
  };
  //console.log("asdfasdfasdfdfffff");
  //console.log(options);
  var layout = cy.layout(options);
  layout.run();
});
