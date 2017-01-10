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
  }
  cy.layout(options);
}

document.addEventListener('DOMContentLoaded', function(){
  cy = cytoscape({
    container: document.getElementById('cy'),
    elements:[
      {data:{id: 'a'}},
      {data:{id: 'b'}},
      {data:{id: 'c'}},
      {data:{id: 'd'}},
      {data:{id: 'e'}},
      {data:{id: 'ab', source: 'a', target: 'b'}},
      {data:{id: 'ac', source: 'a', target: 'c'}},
      {data:{id: 'ad', source: 'a', target: 'd'}},
      {data:{id: 'ae', source: 'a', target: 'e'}},
      {data:{id: 'bc', source: 'b', target: 'c'}},
      {data:{id: 'bd', source: 'b', target: 'd'}},
      {data:{id: 'be', source: 'b', target: 'e'}},
      {data:{id: 'cd', source: 'c', target: 'd'}},
      {data:{id: 'ce', source: 'c', target: 'e'}},
      {data:{id: 'de', source: 'd', target: 'e'}},
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
