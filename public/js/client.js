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
                console.log(item);
            });
        }
    }
});
