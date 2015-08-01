'use strict';

window.app = angular.module('house-shifting', []);

app.controller('MainCtrl', function (itemsData) {
    this.itemsData = itemsData;
});

app.factory('fetcher', function ($http, $q) {
    return function (url) {
        return $q(function (resolve, reject) {
            $http.get(url).success(resolve).error(reject);
        });
    };
});

app.factory('itemsData', function (fetcher) {
    return {
        data: {},
        set: function (options) {
            return fetcher('/api/' + options.section + '/' + options.image + '?item=' + options.item + '&location=' + options.location);
            this.counter++;
        },
        get: function () {
            return fetcher('/api').then(function(res) {
                this.data = _(res).map(_.toArray).flatten().filter(function (i) {
                    return !_.isEmpty(i)
                }).map(_.toArray).flatten().value();

                return res;
            }.bind(this));
        }
    };
});

app.directive('itemsOverlay', function ($parse, itemsData) {
    return {
        scope: true,
        transclude: true,
        templateUrl: 'templates/item-overlay.html',
        link: function (scope, elem, attrs) {
            var shouldRedraw = true;
            scope.matrix = [];
            var data = (attrs.itemsOverlay || '').split(',');

            var draw = function () {

                if(!shouldRedraw){
                    return;
                }
                var h = elem.height(),
                    w = elem.width();
                scope.matrix = [];
                for(var i= 0; i<100; i++) {
                    scope.matrix.push({
                        h: (h/10)-1/10,
                        w: (w/10)-1/10
                    });
                }

                scope.$apply();
                shouldRedraw = false;
            };

            elem.on('mouseover', function() {
                draw();
                scope.loadItems();
            });

            $(window).on('resize', function () {
                shouldRedraw = true;
            });

            scope.loadItems = function () {
                itemsData.get().then(function (res) {
                    var items = res && res[data[0]][data[1]];

                    if(!items) {
                        return;
                    }

                    Object.keys(items).forEach(function (key) {
                        scope.matrix[Number(key)-1].text = items[key];
                    });
                    
                });
            };

            scope.edit = function(event) {
                var elem = event.target;
                $(elem).prop('contenteditable', 'true');
            };

            scope.update = function(event, index) {
                var $elem = $(event.target);
                $elem.removeProp('contenteditable');
                var text = $.trim($elem.text());

                if(!text) {
                    return;
                }

                itemsData.set({
                    section: data[0],
                    image: data[1],
                    item: text,
                    location: index
                }).then(function() {
                    scope.loadItems();
                });
            };

            scope.$on('$destroy',function() {
                elem.off('mouseover');
                $(window).off('resize');
            });
        }
    };
});
