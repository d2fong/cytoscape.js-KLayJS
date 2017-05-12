;(function(){ 'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function( cytoscape, klay ){

    if( !cytoscape ){ return; } // can't register if cytoscape unspecified

    // default values that klay uses
    var klayDefaults = {
      'addUnnecessaryBendpoints': 'de.cau.cs.kieler.klay.layered.unnecessaryBendpoints',
      'alignment': 'de.cau.cs.kieler.alignment',
      'aspectRatio': 'de.cau.cs.kieler.aspectRatio',
      'borderSpacing': 'borderSpacing',
      'compactComponents': 'de.cau.cs.kieler.klay.layered.components.compact',
      'compactionStrategy': 'de.cau.cs.kieler.klay.layered.nodeplace.compactionStrategy',
      'contentAlignment': 'de.cau.cs.kieler.klay.layered.contentAlignment',
      'crossingMinimization': 'de.cau.cs.kieler.klay.layered.crossMin',
      'cycleBreaking': 'de.cau.cs.kieler.klay.layered.cycleBreaking',
      'debugMode': 'de.cau.cs.kieler.debugMode',
      'direction': 'de.cau.cs.kieler.direction',
      'edgeLabelSideSelection': 'de.cau.cs.kieler.klay.layered.edgeLabelSideSelection',
      // <broken> 'de.cau.cs.kieler.klay.layered.edgeNodeSpacingFactor': options.edgeNodeSpacingFactor,
      'edgeRouting': 'de.cau.cs.kieler.edgeRouting',
      'edgeSpacingFactor': 'de.cau.cs.kieler.klay.layered.edgeSpacingFactor',
      'feedbackEdges': 'de.cau.cs.kieler.klay.layered.feedBackEdges',
      'fixedAlignment': 'de.cau.cs.kieler.klay.layered.fixedAlignment',
      'greedySwitchCrossingMinimization': 'de.cau.cs.kieler.klay.layered.greedySwitch',
      'hierarchyHandling': 'de.cau.cs.kieler.hierarchyHandling',
      'inLayerSpacingFactor': 'de.cau.cs.kieler.klay.layered.inLayerSpacingFactor',
      'interactiveReferencePoint': 'de.cau.cs.kieler.klay.layered.interactiveReferencePoint',
      'layerConstraint': 'de.cau.cs.kieler.klay.layered.layerConstraint',
      'layoutHierarchy': 'de.cau.cs.kieler.layoutHierarchy',
      'linearSegmentsDeflectionDampening': 'de.cau.cs.kieler.klay.layered.linearSegmentsDeflectionDampening',
      'mergeEdges': 'de.cau.cs.kieler.klay.layered.mergeEdges',
      'mergeHierarchyCrossingEdges': 'de.cau.cs.kieler.klay.layered.mergeHierarchyEdges',
      'noLayout': 'de.cau.cs.kieler.noLayout',
      'nodeLabelPlacement': 'de.cau.cs.kieler.nodeLabelPlacement',
      'nodeLayering': 'de.cau.cs.kieler.klay.layered.nodeLayering',
      'nodePlacement': 'de.cau.cs.kieler.klay.layered.nodePlace',
      'portAlignment': 'de.cau.cs.kieler.portAlignment',
      'portAlignmentEastern': 'de.cau.cs.kieler.portAlignment.east',
      'portAlignmentNorth': 'de.cau.cs.kieler.portAlignment.north',
      'portAlignmentSouth': 'de.cau.cs.kieler.portAlignment.south',
      'portAlignmentWest': 'de.cau.cs.kieler.portAlignment.west',
      'portConstraints': 'de.cau.cs.kieler.portConstraints',
      'portLabelPlacement': 'de.cau.cs.kieler.portLabelPlacement',
      'portOffset': 'de.cau.cs.kieler.offset',
      'portSide': 'de.cau.cs.kieler.portSide',
      'portSpacing': 'de.cau.cs.kieler.portSpacing',
      'postCompaction': 'de.cau.cs.kieler.klay.layered.postCompaction',
      'priority': 'de.cau.cs.kieler.priority',
      'randomizationSeed': 'de.cau.cs.kieler.randomSeed',
      'routeSelfLoopInside': 'de.cau.cs.kieler.selfLoopInside',
      'separateConnectedComponents': 'de.cau.cs.kieler.separateConnComp',
      'sizeConstraint': 'de.cau.cs.kieler.sizeConstraint',
      'sizeOptions': 'de.cau.cs.kieler.sizeOptions',
      'spacing': 'de.cau.cs.kieler.spacing',
      'splineSelfLoopPlacement': 'de.cau.cs.kieler.klay.layered.splines.selfLoopPlacement',
      'thoroughness': 'de.cau.cs.kieler.klay.layered.thoroughness',
      'wideNodesOnMultipleLayers': 'de.cau.cs.kieler.klay.layered.wideNodesOnMultipleLayers'
    };

    var cyDefaults = {
      // define the default options for your layout here
      refreshInterval: 16, // in ms
      refreshIterations: 10, // iterations until thread sends an update
      fit: true
    };

    var extend = Object.assign || function( tgt ){
      for( var i = 1; i < arguments.length; i++ ){
        var obj = arguments[i];

        for( var k in obj ){ tgt[k] = obj[k]; }
      }

      return tgt;
    };

    function Layout( options ){
      this.options = extend( {}, cyDefaults, options );
    }

    Layout.prototype.run = function(){
      var layout = this;
      var options = this.options;
      var cy = options.cy;
      var eles = options.eles;
      var nodes = eles.nodes();
      var edges = eles.edges();

      var positions = [];

      (function klayinit(){
        var properties = function (opts, klayOpts) {
          var optionsOut = {};
          var i = 0;
          for(i in opts){
            if(opts[i] !== 'undefined'){
              var j = 0;
              for(j in klayOpts){
                if(j === i){
                  optionsOut[klayOpts[j]] = opts[i];
                }
              }
            }
          }
          return optionsOut;
        };

        // TODO lazy create parents (see paper)
        var klayChildren = function (nodes) {
          var children = [];
          for (var i = 0; i < nodes.length; i++) {
            var currNode = nodes[i];
            if (currNode.data().parent === undefined) {
              children.push({
                id: currNode.data('id'),
                width: currNode.outerWidth(),
                height: currNode.outerHeight(),
                children: [],
              });
            } else {
              var j;
              for(j = 0; j < children.length; j++){
                if(children[j].id === nodes[i].data().parent){
                  children[j].children.push({
                    id: currNode.data('id'),
                    width: currNode.outerWidth(),
                    height: currNode.outerHeight(),
                    children: []
                  });
                }
              }
            }
          }
          return children;
        };

        var klayEdges = function (edges){
          var temp = [];
          var i;
          for(i = 0; i < edges.length; i++){
            temp[i] = {
              id: edges[i].data('id'),
              source: edges[i].source().data('id'),
              target: edges[i].target().data('id')
            };
          }
          return temp;
        };

        var graph = {
          id: 'root',
          properties: properties(options, klayDefaults),
          children: klayChildren(nodes),
          edges: klayEdges(edges)
        };

        console.log(JSON.stringify(graph, null, 4));

        graph = {
          id: 'root',
          children: [{
            id: 'n1',
            labels: [ { text: 'n1' } ],
            width: 100,
            height: 100
          },
          {
            id: 'n2',
            labels: [ { text: 'n2' } ],
            width: 100,
            height: 50,
            ports: [{
              id: 'n2_p1',
              width: 10,
              height: 10
            }],
            children: [{
              id: 'n3',
              labels: [ { text: 'n3' } ],
              width: 40,
              height: 40
            },{
              id: 'n4',
              labels: [ { text: 'n4' } ],
              width: 40,
              height: 40}
            ],
            edges: [{
              id: 'e4',
              source: 'n3',
              target: 'n1'
            }]
          }],
          edges: [{
            id: 'e1',
            labels: [ { text: 'e1' } ],
            source: 'n1',
            target: 'n2',
            // targetPort: 'n2_p1'
          }]
        };


        var t;
        klay.layout({
          graph: graph,
          options: {
            spacing: 50
          },
          success: function (g) {
            console.log(g);
            t = g;
          },
          error: function(error){
            //console.log(error);
            console.log(JSON.stringify(error, null, 4));
          }
        });


        function recordPositions (nodesIn) {
          for(var i=0; i < nodesIn.length; i++){
            positions.push({
              id: nodesIn[i].id,
              x: nodesIn[i].x,
              y: nodesIn[i].y
            });
            if(nodesIn[i].children !== undefined){
              recordPositions(nodesIn[i].children);
            }
          }
        }

        // console.log(graph.children);
        // console.log(graph);
        recordPositions(graph.children);

        function recordEdges(edgesIn){
          for(var i = 0; i < edgesIn.length; i++){
            if(edgesIn[i].bendPoints !== undefined){
              for(var j = 0; j < edges.length; j++){
                if(edges[j].data().id === edgesIn[i].id){
                  edges[j].rscratch = edgesIn[i].bendPoints;
                }
              }
            }
          }
        }
        recordEdges(graph.edges);

      })();

      var getPos = function( ele, i ){
        var j = 0;
        // console.log(positions);
        for(j = 0; j < positions.length; j++){
          if(positions[j].id === ele.data('id')){
            return {
              x: positions[i].x,
              y: positions[i].y
            };
          }
        }
        /*if(ele.data().parent === undefined){
          return {
            x: positions[i].x,
            y: positions[i].y
          };
        }else{
          var j;
          for(j = 0; j < temp.length; j++){
            if(temp[j].id === nodes[i].data().parent){
              temp[j].children.push({
                "id": nodes[i].data().id,
                "width": 4,
                "height": 4
              });
            }
          }
        }*/
      };
      nodes.layoutPositions( layout, options, getPos );

      return this; // or...

      // continuous/asynchronous layouts need to do things manually:
      // (this example uses a thread, but you could use a fabric to get even
      // better performance if your algorithm allows for it)

      var thread = this.thread = cytoscape.thread();
      thread.require( getPos, 'getPos' );

      // to indicate we've started
      layout.trigger('layoutstart');

      // for thread updates
      var firstUpdate = true;
      var id2pos = {};
      var updateTimeout;

      // update node positions
      var update = function(){
        nodes.positions(function( i, node ){
          return id2pos[ node.id() ];
        });

        // maybe we fit each iteration
        if( options.fit ){
          cy.fit( options.padding );
        }

        if( firstUpdate ){
          // indicate the initial positions have been set
          layout.trigger('layoutready');
          firstUpdate = false;
        }
      };

      // update the node positions when notified from the thread but
      // rate limit it a bit (don't want to overwhelm the main/ui thread)
      thread.on('message', function( e ){
        var nodeJsons = e.message;
        nodeJsons.forEach(function( n ){ id2pos[n.data.id] = n.position; });

        if( !updateTimeout ){
          updateTimeout = setTimeout( function(){
            update();
            updateTimeout = null;
          }, options.refreshInterval );
        }
      });

      // we want to keep the json sent to threads slim and fast
      var eleAsJson = function( ele ){
        return {
          data: {
            id: ele.data('id'),
            source: ele.data('source'),
            target: ele.data('target'),
            parent: ele.data('parent')
          },
          group: ele.group(),
          position: ele.position()

          // maybe add calculated data for the layout, like edge length or node mass
        };
      };

      // data to pass to thread
      var pass = {
        eles: eles.map( eleAsJson ),
        refreshIterations: options.refreshIterations
        // maybe some more options that matter to the calculations here ...
      };

      // then we calculate for a while to get the final positions
      thread.pass( pass ).run(function( pass ){
        var getRandomPos = _ref_('getRandomPos');
        var broadcast = _ref_('broadcast');
        var nodeJsons = pass.eles.filter(function(e){ return e.group === 'nodes'; });

        // calculate for a while (you might use the edges here)
        for( var i = 0; i < 100000; i++ ){
          nodeJsons.forEach(function( nodeJson, j ){
            nodeJson.position = getRandomPos( j, nodeJson );
          });

          if( i % pass.refreshIterations === 0 ){ // cheaper to not broadcast all the time
            broadcast( nodeJsons ); // send new positions outside the thread
          }
        }
      }).then(function(){
        // to indicate we've finished
        layout.trigger('layoutstop');
      });

      return this; // chaining
    };

    Layout.prototype.stop = function(){
      // continuous/asynchronous layout may want to set a flag etc to let
      // run() know to stop

      if( this.thread ){
        this.thread.stop();
      }

      this.trigger('layoutstop');

      return this; // chaining
    };

    Layout.prototype.destroy = function(){
      // clean up here if you create threads etc

      if( this.thread ){
        this.thread.stop();
      }

      return this; // chaining
    };

    cytoscape( 'layout', 'klayjs', Layout ); // register with cytoscape.js

  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = function ( cytoscape, klay ) {
      register( cytoscape, klay || require('klayjs'));
    };
  }

  if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-klayjs', function(){
      return register;
    });
  }

  if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( cytoscape, klay );
  }

})();
