window.partyanimal = window.partyanimal || {};
window.partyanimal.party = function(canvas_el) {
    // FIXME: ugly
    var frames = window.partyanimal.frames;
    var frameIdx;
    var canvasWidth;
    var canvasHeight;
    var ctx;

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
    
    function animate() {
        var canvas = document.getElementById(canvas_el);
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        ctx = canvas.getContext("2d");
        frameIdx = 0;
        return setInterval(draw, 150);
    }

    function clear() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function draw() {
        clear();
        var imageData = ctx.createImageData(64, 50);
        var frame = frames[frameIdx];
        for (i = 0; i < frame.length; i++) {
            x = i % 64;
            y = Math.floor(i / 64);
            drawPixel(imageData, x, y, frame[i]);
        }
        ctx.putImageData(imageData, 0, 0);
        frameIdx = (frameIdx + 1) % 4;
    }
    
    animate();
};

