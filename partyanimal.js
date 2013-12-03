window.partyanimal = function() {
    var canvas;
    var frames;
    var lastAnimTs;
    var animDt = 170;
    var frameIdx;
    var imgWidth = 64;
    var imgHeight = 50;
    var ctx;

    function setRequestAnimFrame() {
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 5);
                };
        })();
    }

    function centerInCanvas(imgWidth, imgHeight, canvasWidth, canvasHeight) {
        // Returns (x, y) where (imgWidth, imgHeight) can be drawn
        // and be centered in (canvasWidth, canvasHeight).

        // FIXME: currently, this assumes img{Width,Height} <= canvas{Width,Height}
        var widthOverflow = canvasWidth - imgWidth;
        var heightOverflow = canvasHeight - imgHeight;

        return [Math.floor(widthOverflow / 2), Math.floor(heightOverflow / 2)];
    }

    function setFrames(frameList) {
        frames = frameList;
    }

    function drawPixel(imageData, x, y, color) {
        // imageData is flat, so we need to calculate where this goes.
        var index = (x + y * imageData.width) * 4;
        var r = color[0];
        var g = color[1];
        var b = color[2];
        var a = color[3];
        imageData.data[index]     = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function init(canvas_el) {
        canvas = document.getElementById(canvas_el);
        ctx = canvas.getContext("2d");
        setRequestAnimFrame();
        frameIdx = 0;
    }
    
    function animate(timestamp) {
        requestAnimFrame(animate);
        if (typeof timestamp == "undefined" ||
            typeof lastAnimTs == "undefined" ||
            (timestamp - lastAnimTs) >= animDt) {
            lastAnimTs = timestamp;
            draw();
        }
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        if (! frames) {
            return;
        }

        clear();
        var frame = frames[frameIdx];
        var imageData = ctx.createImageData(imgWidth, imgHeight);
        var pos = centerInCanvas(imgWidth, imgHeight, canvas.width, canvas.height);
        for (i = 0; i < frame.length; i++) {
            x = i % 64;
            y = Math.floor(i / 64);
            drawPixel(imageData, x, y, frame[i]);
        }
        ctx.putImageData(imageData, pos[0], pos[1]);
        frameIdx = (frameIdx + 1) % 4;
    }
    

    return {
        init: init,
        animate: animate,
        party: function(el) {
            init(el);
            animate();
        },
        setFrames: setFrames
    }
}();

