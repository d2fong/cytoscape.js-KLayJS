;(function(){ 'use strict';

  var g0 = {
    nodes: [{
      data: {
        id: 'compartment',
        class: 'compartment',
        label: 'compartment',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'complex',
        class: 'complex',
        label: 'complex',
        parent: 'compartment',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'macromolecule',
        class: 'macromolecule',
        label: 'macromolecule',
        parent: 'complex',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      },
    },
    {
      data: {
        id: 'nucleic acid feature',
        class: 'nucleic acid feature',
        label: 'nucleic acid feature',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    }],
    edges: [{
      data: {
        id: 'macromolecule-nucleicacidfeature',
        class: 'production',
        source: 'macromolecule',
        target: 'nucleic acid feature'
      }
    }]
  };

  var g1 = {
    nodes: [{
      data: {
        id: 'compartment',
        class: 'compartment',
        label: 'compartment',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'complex',
        class: 'complex',
        label: 'complex',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'macromolecule',
        class: 'macromolecule',
        label: 'macromolecule',
        parent: 'complex',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      },
    },
    {
      data: {
        id: 'nucleic acid feature',
        class: 'nucleic acid feature',
        label: 'nucleic acid feature',
        parent: 'compartment',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    }],
    edges: [{
      data: {
        id: 'macromolecule-nucleicacidfeature',
        class: 'production',
        source: 'macromolecule',
        target: 'nucleic acid feature'
      }
    }]
  };

  var g2 = {
    nodes: [{
      data: {
        id: 'compartment',
        class: 'compartment',
        label: 'compartment',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'complex',
        class: 'complex',
        label: 'complex',
        parent: '',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    },
    {
      data: {
        id: 'macromolecule',
        class: 'macromolecule',
        label: 'macromolecule',
        parent: 'complex',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      },
    },
    {
      data: {
        id: 'nucleic acid feature',
        class: 'nucleic acid feature',
        label: 'nucleic acid feature',
        parent: 'compartment',
        'clonemarker': false,
        'stateVariables': [],
        'unitsOfInformation': []
      }
    }],
    edges: [{
      data: {
        id: 'compartment-complex',
        class: 'production',
        source: 'compartment',
        target: 'complex'
      }
    }]
  };

  // registers the extension on a cytoscape lib ref
  var register = function( cytoscape, klay ){

    if( !cytoscape ){ return; } // can't register if cytoscape unspecified

    var defaults = {
      klay: {},
      nodeDimensionsIncludeLabels: false, // Boolean which changes whether label dimensions are included when calculating node dimensions
      spacing: 50, // TODO comment these
      fit: true
    };

    var extend = Object.assign || function( tgt ){
      for( var i = 1; i < arguments.length; i++ ){
        var obj = arguments[i];

        for( var k in obj ){ tgt[k] = obj[k]; }
      }

      return tgt;
    };

    var getPos = function( ele ){
      var k = ele.scratch('klay');

      return k;
    };

    var makeNode = function( node, options ){
      var dims = node.layoutDimensions( options );

      var k = {
        _cyEle: node,
        id: node.id(),
        width: dims.w,
        height: dims.h
      };

      node.scratch('klay', k);

      return k;
    };

    var makeEdge = function( edge, options ){
      var k = {
        _cyEle: edge,
        id: edge.id(),
        source: edge.data('source'),
        target: edge.data('target')
      };

      edge.scratch('klay', k);

      return k;
    };

    var makeGraph = function( nodes, edges, options ){
      var klayNodes = [];
      var klayEdges = [];
      var klayEleLookup = {};
      var klayHierarchyEles = {
        id: 'root',
        children: [],
        edges: []
      };

      // map all nodes
      for( var i = 0; i < nodes.length; i++ ){
        var n = nodes[i];
        var k = makeNode( n, options );

        klayNodes.push( k );

        klayEleLookup[ n.id() ] = k;
      }

      // map all edges
      for( var i = 0; i < edges.length; i++ ){
        var e = edges[i];
        var k = makeEdge( e, options );

        klayEdges.push( k );

        klayEleLookup[ e.id() ] = k;
      }

      // make hierarchy
      for( var i = 0; i < klayNodes.length; i++ ){
        var k = klayNodes[i];
        var n = k._cyEle;

        if( !n.isChild() ){
          klayHierarchyEles.children.push( k );
        } else {
          var parent = n.parent();
          var parentK = klayEleLookup[ parent.id() ];

          var children = parentK.children = parentK.children || [];

          children.push( k );
        }
      }

      for( var i = 0; i < klayEdges.length; i++ ){
        var k = klayEdges[i];

        klayHierarchyEles.edges.push( k );
      }

      return klayHierarchyEles;
    };

    function Layout( options ){
      this.options = extend( {}, defaults, options );
    }

    Layout.prototype.run = function(){
      var layout = this;
      var options = this.options;
      var cy = options.cy;

      var eles = options.eles;
      var nodes = eles.nodes();
      var edges = eles.edges();

      (function klayinit(){

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

      });

      var graph = makeGraph( nodes, edges, options );

      klay.layout({
        graph: graph,
        options: options.klay,
        success: function (g) {
          console.log(g);
        },
        error: function(error){
          throw error;
        }
      });

      nodes.layoutPositions( layout, options, getPos );

      return this;
    };

    Layout.prototype.stop = function(){
      return this; // chaining
    };

    Layout.prototype.destroy = function(){
      return this; // chaining
    };

    cytoscape( 'layout', 'klay', Layout ); // register with cytoscape.js

  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = function ( cytoscape, klay ) {
      register( cytoscape, klay || require('klayjs'));
    };
  }

  if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-klay', function(){
      return register;
    });
  }

  if( typeof cytoscape !== 'undefined' && typeof $klay !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( cytoscape, $klay );
  }

})();
