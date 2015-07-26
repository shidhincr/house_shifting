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
        set: function(options) {
            return fetcher('/api/'+options.section+'/'+options.image+'?item='+options.item+'&x='+options.x+'&y='+option.y);
        },
        get: function() {
            return fetcher('/api');
        }
    };
});


app.directive('item-pin', function () {
    return {
        scope: {
            x: '@',
            y: '@',
            section: '@',
            image: '@'
        },
        templateUrl: 'templates/item-pin.html',
        link: function (scope, elem) {

        }
    };
});

app.directive('itemsOverlay', function () {
    return {
        scope: true,
        link: function (scope, elem, attrs) {
            elem.on('click', function (e) {
                var item = $('<div class="m-item"></div>');
                elem.append(item);
                item.css({
                    left: e.offsetX,
                    top: e.offsetY
                });
            });
        }
    }
});
