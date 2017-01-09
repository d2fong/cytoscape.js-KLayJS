var cy;
var options;

function addNode(){

  var tempName = document.getElementById('newNodeInput').value;
  cy.add({data:{id: tempName}});
  document.getElementById('newNodeInput').value = '';
  cy.layout(options);
}

function removeNode(){
  var tempName = document.getElementById('remNodeInput').value;
  var tempRem = cy.getElementById(tempName);
  cy.remove(tempRem);
  document.getElementById('remNodeInput').value = '';
}

function addEdge(){
  var tempName = document.getElementById('newEdgeInput').value;
  var tempSource = document.getElementById('newSourceInput').value;
  var tempTarget = document.getElementById('newTargetInput').value;
  cy.add({data:{id: tempName, source: tempSource, target: tempTarget}});
  document.getElementById('newEdgeInput').value = '';
  document.getElementById('newSourceInput').value = '';
  document. getElementById('newTargetInput').value = '';
}

function removeEdge(){
  var tempName = document.getElementById('remEdgeInput').value;
  var tempRem = cy.getElementById(tempName);
  cy.remove(tempRem);
  document.getElementById('remEdgeInput').value = '';
}

function runBFS(){
  var bfs = cy.elements().bfs({
    roots: "[id = 'c']",
    visit: function(i, depth, v, e, u){
      console.log(v.id());
      if(v.id() === 'e'){
        return true;
      }
    },
    directed:false
  });
  bfs.path.select();
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
      name:'klayjs'
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
      {data:{id: 'AB', source: 'a', target: 'b'}},
      {data:{id: 'BC', source: 'b', target: 'c'}},
      {data:{id: 'CA', source: 'c', target: 'a'}}
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
