'use strict';

window.app = angular.module('house-shifting', []);

app.controller('MainCtrl', function () {
    this.itemsData = [
        'someItem 1',
        'someItem 2',
        'someItem 3',
        'someItem 4'
    ];
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
        set: function (options) {
            return fetcher('/api/' + options.section + '/' + options.image + '?item=' + options.item + '&x=' + options.x + '&y=' + option.y);
        },
        get: function () {
            return fetcher('/api');
        }
    };
});

app.directive('itemsOverlay', function () {
    return {
        scope: true,
        transclude: true,
        templateUrl: 'templates/item-overlay.html',
        link: function (scope, elem, attrs) {
            var shouldRedraw = true;
            scope.matrix = [];
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

            elem.on('mouseover', draw);

            $(window).on('resize', function () {
                shouldRedraw = true;
            });

            scope.$on('$destroy',function() {
                elem.off('mouseover');
                $(window).off('resize');
            });
        }
    };
});
