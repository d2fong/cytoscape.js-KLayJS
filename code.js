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

function setLayout(nameIn){
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
      addUnnecessaryBendpoints: document.getElementById("addUnnecessaryBendpointsTrue").checked,
      alignment: document.getElementById('alignment').value,
      aspectRatio: document.getElementById('aspectRatio').value,
      borderSpacing: document.getElementById('borderSpacing').value,
      compactComponents: document.getElementById('compactComponentsTrue').checked,
      compactionStrategy: document.getElementById('compactionStrategy').value,
      contentAlignment: document.getElementById('contentAlignment').value,
      crossingMinimization: document.getElementById('crossingMinimization').value,
      cycleBreaking: document.getElementById('cycleBreaking').value,
      debugMode: document.getElementById('debugModeTrue').checked,
      direction: document.getElementById('direction').value,
      edgeLabelSideSelection: document.getElementById('edgeLabelSideSelection').value,
      //edgeNodeSpacingFactor: 0.5,
      edgeRouting: document.getElementById('edgeRouting').value,
      edgeSpacingFactor: document.getElementById('edgeSpacingFactor').value,
      feedbackEdges: document.getElementById('feedbackEdgesTrue').checked,
      fixedAlignment: document.getElementById('fixedAlignment').value,
      greedySwitchCrossingMinimization: document.getElementById('greedySwitchCrossingMinimization').value,
      hierarchyHandling: document.getElementById('hierarchyHandling').value,
      inLayerSpacingFactor: document.getElementById('inLayerSpacingFactor').value,
      interactiveReferencePoint: document.getElementById('interactiveReferencePoint').value,
      layerConstraint: document.getElementById('layerConstraint').value,
      layoutHierarchy: document.getElementById('layoutHierarchyTrue').checked,
      linearSegmentsDeflectionDampening: document.getElementById('linearSegmentsDeflectionDampening').value,
      mergeEdges: document.getElementById('mergeEdgesTrue').checked,
      mergeHierarchyCrossingEdges: document.getElementById('mergeHierarchyCrossingEdgesTrue').checked,
      noLayout: document.getElementById('noLayoutTrue').checked,
      nodeLabelPlacement: document.getElementById('nodeLabelPlacement').value,
      nodeLayering: document.getElementById('nodeLayering').value,
      nodePlacement: document.getElementById('nodePlacement').value,
      portAlignment: document.getElementById('portAlignment').value,
      portAlignmentEastern: document.getElementById('portAlignmentEastern').value,
      portAlignmentNorth: document.getElementById('portAlignmentNorth').value,
      portAlignmentSouth: document.getElementById('portAlignmentSouth').value,
      portAlignmentWest: document.getElementById('portAlignmentWest').value,
      portConstraints: document.getElementById('portConstraints').value,
      portLabelPlacement: document.getElementById('portLabelPlacement').value,
      portOffset: document.getElementById('portOffset').value,
      portSide: document.getElementById('portSide').value,
      portSpacing: document.getElementById('portSpacing').value,
      postCompaction: document.getElementById('postCompaction').value,
      priority: document.getElementById('priority').value,
      randomizationSeed: document.getElementById('randomizationSeed').value,
      routeSelfLoopInside: document.getElementById('routeSelfLoopInsideTrue').checked,
      separateConnectedComponents: document.getElementById('separateConnectedComponentsTrue').checked,
      sizeConstraint: document.getElementById('sizeConstraint').value,
      sizeOptions: document.getElementById('sizeOptions').value,
      spacing: document.getElementById('spacing').value,
      splineSelfLoopPlacement: document.getElementById('splineSelfLoopPlacement').value,
      thoroughness: document.getElementById('thoroughness').value,
      wideNodesOnMultipleLayers: document.getElementById('wideNodesOnMultipleLayers').value,
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
