'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('myCustomer', function(version) {
    return {
        template: '姓名: {{customer.name}} 地址: {{customer.address}}'  //templateUrl
    };
  })
   .directive('accordion1', [function () {
    return {
      restrict: 'EA',
      replace:true,
      transclude:true,
      template:'<div ng-transclude></div>',
      controller: function(){
        var expanders = [];
        this.gotOpened = function(selectedExpander){
          angular.forEach(expanders, function(expander){
            if (selectedExpander != expander) {
              expander.showMe = false;
            }
          });
        }
        this.addExpander = function(expander){
          expanders.push(expander);
        }
      }
    };
  }])  
  .directive('expander', [function () {
    return {
      restrict: 'EA',
      replace:true,
      transclude:true,
      require:'^?accordion1',
      scope:{title:'=expanderTitle'},
      template: '<div>' +
                // '<input ng-model="title" >' +
                '<div class="title" ng-click="toggle()">{{title}}</div>' +
                '<div class="body" ng-show="showMe" ng-transclude></div>' +
                '</div>',
      link: function (scope, iElement, iAttrs, accordion1Controller) {
        scope.showMe = false;
        accordion1Controller.addExpander(scope);
        scope.toggle = function(){
          scope.showMe = !scope.showMe;
          accordion1Controller.gotOpened(scope);
        }  
      }
    };
  }]) 
 .directive('myDraggable', function($document) {
    var startX=0, startY=0, x = 0, y = 0;
    return function(scope, element, attr) {
      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });
      element.bind('mousedown', function(event) {
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    };
 })
 .directive('myCurrentTime', function($timeout,dateFilter) {
  return function(scope,iElement,iAttrs){
    var format,  // date format
          timeoutId; // timeoutId, so that we can cancel the time updates
      // used to update the UI
      function updateTime() {
        iElement.text(dateFilter(new Date(), format));
      }

      // watch the expression, and update the UI on change.
      scope.$watch(iAttrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          updateTime(); // update DOM
          updateLater(); // schedule another update
        }, 1000);
      }

      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      iElement.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });

      updateLater(); // kick off the UI update process.
    };
 })
.directive('modalDialog', [ function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width){
        scope.dialogStyle.width = attrs.width;
      }
      if (attrs.height){
        scope.dialogStyle.height = attrs.height;
      }
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'partials/dialog.html'
  };
}])
//.directive('treeModel', [function () {
//return {
//  restrict: 'EA',
//  replace: true,
//  template: '<div></div>',
//
//  link: function (scope, iElement, iAttrs) {
//    var margin = {top: 20, right: 120, bottom: 20, left: 120},
//  width = 1200 - margin.right - margin.left,
//  height = 900 - margin.top - margin.bottom;
//  
//var i = 0,
//  duration = 750,
//  root;
//function zoom() {
//svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//}
//var tree = d3.layout.tree()
//  .size([height, width]);
//
//var diagonal = d3.svg.diagonal()
//  .projection(function(d) { return [d.y, d.x]; });
//
//var svg = d3.select("div").append("svg")
//  .attr("width", 1800)
//  .attr("height", 1000)
//  .style("border",'solid thin red')
//.append("g")
//.call(d3.behavior.zoom().scaleExtent([1,10]).on("zoom", zoom))
//  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//d3.json("partials/flare.json", function(error, data) {
//root = data[0];
//root.x0 = height / 2;
//root.y0 = 0;
//
//function collapse(d) {
//  if (d.children) {
//    d._children = d.children;
//    d._children.forEach(collapse);
//    d.children = null;
//  }
//}
//
//root.children.forEach(collapse);
//update(root);
//});
//
//d3.select(self.frameElement).style("height", "800px");
//
//function update(source) {
//
//// Compute the new tree layout.
//var nodes = tree.nodes(root).reverse(),
//    links = tree.links(nodes);
//
//// Normalize for fixed-depth.
//nodes.forEach(function(d) { d.y = d.depth * 180; });
//
//// Update the nodes…
//var node = svg.selectAll("g.node")
//    .data(nodes, function(d) { return d.id || (d.id = ++i); });
//
//// Enter any new nodes at the parent's previous position.
//var nodeEnter = node.enter().append("g")
//    .attr("class", "node")
//    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
//    .on("click", click);
//
//nodeEnter.append("circle")
//    .attr("r", 1e-6)
//    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
//
//nodeEnter.append("text")
//    .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
//    .attr("dy", ".35em")
//    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
//    .text(function(d) { return d.name; })
//    .style("fill-opacity", 1e-6);
//
//// Transition nodes to their new position.
//var nodeUpdate = node.transition()
//    .duration(duration)
//    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
//
//nodeUpdate.select("circle")
//    .attr("r", 4.5)
//    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
//
//nodeUpdate.select("text")
//    .style("fill-opacity", 1);
//
//// Transition exiting nodes to the parent's new position.
//var nodeExit = node.exit().transition()
//    .duration(duration)
//    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
//    .remove();
//
//nodeExit.select("circle")
//    .attr("r", 1e-6);
//
//nodeExit.select("text")
//    .style("fill-opacity", 1e-6);
//
//// Update the links…
//var link = svg.selectAll("path.link")
//    .data(links, function(d) { return d.target.id; });
//
//// Enter any new links at the parent's previous position.
//link.enter().insert("path", "g")
//    .attr("class", "link")
//    .attr("d", function(d) {
//      var o = {x: source.x0, y: source.y0};
//      return diagonal({source: o, target: o});
//    });
//
//      // Transition links to their new position.
//      link.transition()
//          .duration(duration)
//          .attr("d", diagonal);
//
//      // Transition exiting nodes to the parent's new position.
//      link.exit().transition()
//          .duration(duration)
//          .attr("d", function(d) {
//            var o = {x: source.x, y: source.y};
//            return diagonal({source: o, target: o});
//          })
//          .remove();
//
//      // Stash the old positions for transition.
//      nodes.forEach(function(d) {
//        d.x0 = d.x;
//        d.y0 = d.y;
//      });
//    }
//
//    // Toggle children on click.
//    function click(d) {
//      if (d.children) {
//        d._children = d.children;
//        d.children = null;
//      } else {
//        d.children = d._children;
//        d._children = null;
//      }
//      update(d);
//    }    
//  }
//};
//}])
.directive('highchart', function () {

    //IE8 support
    var indexOf = function(arr, find, i /*opt*/) {
      if (i===undefined) i= 0;
      if (i<0) i+= arr.length;
      if (i<0) i= 0;
      for (var n= arr.length; i<n; i++)
        if (i in arr && arr[i]===find)
          return i;
      return -1;
    };


    function prependMethod(obj, method, func) {
      var original = obj[method];
      obj[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        func.apply(this, args);
        if(original) {
          return original.apply(this, args);
        }  else {
          return;
        }

      };
    }

    function deepExtend(destination, source) {
      for (var property in source) {
        if (source[property] && source[property].constructor &&
          source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          deepExtend(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }
      return destination;
    }

    var seriesId = 0;
    var ensureIds = function (series) {
      angular.forEach(series, function(s) {
        if (!angular.isDefined(s.id)) {
          s.id = 'series-' + seriesId++;
        }
      });
    };
    var axisNames = [ 'xAxis', 'yAxis' ];

    var getMergedOptions = function (scope, element, config) {
      var mergedOptions = {};

      var defaultOptions = {
        chart: {
          events: {}
        },
        title: {},
        subtitle: {},
        series: [],
        credits: {},
        plotOptions: {},
        navigator: {enabled: false}
      };

      if (config.options) {
        mergedOptions = deepExtend(defaultOptions, config.options);
      } else {
        mergedOptions = defaultOptions;
      }
      mergedOptions.chart.renderTo = element[0];
      angular.forEach(axisNames, function(axisName) {
        if (config[axisName]) {
          prependMethod(mergedOptions.chart.events, 'selection', function(e){
            var thisChart = this;
            if (e[axisName]) {
              scope.$apply(function () {
                scope.config[axisName].currentMin = e[axisName][0].min;
                scope.config[axisName].currentMax = e[axisName][0].max;
              });
            } else {
              //handle reset button - zoom out to all
              scope.$apply(function () {
                scope.config[axisName].currentMin = thisChart[axisName][0].dataMin;
                scope.config[axisName].currentMax = thisChart[axisName][0].dataMax;
              });
            }
          });

          prependMethod(mergedOptions.chart.events, 'addSeries', function(e){
            scope.config[axisName].currentMin = this[axisName][0].min || scope.config[axisName].currentMin;
            scope.config[axisName].currentMax = this[axisName][0].max || scope.config[axisName].currentMax;
          });

          mergedOptions[axisName] = angular.copy(config[axisName]);
        }
      });

      if(config.title) {
        mergedOptions.title = config.title;
      }
      if (config.subtitle) {
        mergedOptions.subtitle = config.subtitle;
      }
      if (config.credits) {
        mergedOptions.credits = config.credits;
      }
      return mergedOptions;
    };

    var updateZoom = function (axis, modelAxis) {
      var extremes = axis.getExtremes();
      if(modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
        axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
      }
    };

    var processExtremes = function(chart, axis, axisName) {
      if(axis.currentMin || axis.currentMax) {
        chart[axisName][0].setExtremes(axis.currentMin, axis.currentMax, true);
      }
    };

    var chartOptionsWithoutEasyOptions = function (options) {
      return angular.extend({}, options, {data: null, visible: null});
    };

    var prevOptions = {};

    var processSeries = function(chart, series) {
      var ids = [];
      if(series) {
        ensureIds(series);

        //Find series to add or update
        angular.forEach(series, function(s) {
          ids.push(s.id);
          var chartSeries = chart.get(s.id);
          if (chartSeries) {
            if (!angular.equals(prevOptions[s.id], chartOptionsWithoutEasyOptions(s))) {
              chartSeries.update(angular.copy(s), false);
            } else {
              if (s.visible !== undefined && chartSeries.visible !== s.visible) {
                chartSeries.setVisible(s.visible, false);
              }
              if (chartSeries.options.data !== s.data) {
                chartSeries.setData(angular.copy(s.data), false);
              }
            }
          } else {
            chart.addSeries(angular.copy(s), false);
          }
          prevOptions[s.id] = chartOptionsWithoutEasyOptions(s);
        });
      }

      //Now remove any missing series
      for(var i = chart.series.length - 1; i >= 0; i--) {
        var s = chart.series[i];
        if (indexOf(ids, s.options.id) < 0) {
          s.remove(false);
        }
      }

    };

    var initialiseChart = function(scope, element, config) {
      config = config || {};
      var mergedOptions = getMergedOptions(scope, element, config);
      var chart = config.useHighStocks ? new Highcharts.StockChart(mergedOptions) : new Highcharts.Chart(mergedOptions);
      for (var i = 0; i < axisNames.length; i++) {
        if (config[axisNames[i]]) {
          processExtremes(chart, config[axisNames[i]], axisNames[i]);
        }
      }
      processSeries(chart, config.series);
      if(config.loading) {
        chart.showLoading();
      }
      chart.redraw();
      return chart;
    };




    return {
      restrict: 'EAC',
      replace: true,
      template: '<div></div>',
      scope: {
        config: '='
      },
      link: function (scope, element, attrs) {

        var chart = false;
        function initChart() {
          if (chart) chart.destroy();
          chart = initialiseChart(scope, element, scope.config);
        }
        initChart();

        scope.$watch('config.series', function (newSeries, oldSeries) {
          //do nothing when called on registration
          if (newSeries === oldSeries) return;
          processSeries(chart, newSeries);
          chart.redraw();
        }, true);

        scope.$watch('config.title', function (newTitle) {
          chart.setTitle(newTitle, true);
        }, true);

        scope.$watch('config.subtitle', function (newSubtitle) {
          chart.setTitle(true, newSubtitle);
        }, true);

        scope.$watch('config.loading', function (loading) {
          if(loading) {
            chart.showLoading();
          } else {
            chart.hideLoading();
          }
        });

        scope.$watch('config.credits.enabled', function (enabled) {
          if (enabled) {
            chart.credits.show();
          } else if (chart.credits) {
            chart.credits.hide();
          }
        });

        scope.$watch('config.useHighStocks', function (useHighStocks) {
          initChart();
        });

        angular.forEach(axisNames, function(axisName) {
          scope.$watch('config.' + axisName, function (newAxes, oldAxes) {
            if (newAxes === oldAxes) return;
            if(newAxes) {
              chart[axisName][0].update(newAxes, false);
              updateZoom(chart[axisName][0], angular.copy(newAxes));
              chart.redraw();
            }
          }, true);
        });
        scope.$watch('config.options', function (newOptions, oldOptions, scope) {
          //do nothing when called on registration
          if (newOptions === oldOptions) return;
          initChart();
        }, true);

        scope.$on('$destroy', function() {
          if (chart) chart.destroy();
          element.remove();
        });

      }
    };
  })
;