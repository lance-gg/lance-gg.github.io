
require("!style-loader!raw-loader!sass-loader!./../sass/main.scss");
require("../node_modules/waypoints/lib/noframework.waypoints.js");
var smoothScroll = require("../node_modules/zenscroll/zenscroll");

var innerWidth = window.innerWidth;

document.addEventListener("resize",function(){
    innerWidth = window.innerWidth;
});

document.addEventListener("DOMContentLoaded",function(){

    if (innerWidth>500) {
        var waypoint = new Waypoint({
            element: document.getElementById('gallery'),
            context: qs('.siteContainer'),
            offset: 73,
            handler: function (direction) {
                if (direction == "down") {
                    document.body.classList.add("fixedMenu");
                }
                else {
                    document.body.classList.remove("fixedMenu");
                }
            }
        });
    }
    var myScroller = smoothScroll.createScroller(qs('.siteContainer'), null, qs('#outerMenu').offsetHeight);
    var linksArr = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    for (var x=0; x<linksArr.length;x++){
        linksArr[x].addEventListener("click",function(e){
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = qs(this.hash);
                myScroller.to(target);
                e.preventDefault();
            }
        });
    }
    
    if (is_touch_device() == true) {
        qs("body").classList.add('hasTouch');
    }
    if (isiOS){
        qs("body").classList.add('iOS');
    }
});

function qs(selector){
    return document.querySelector(selector);
}

var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function is_touch_device() {
    return ('ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints) == true;       // works on IE10/11 and Surface
};
