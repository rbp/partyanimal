window.partyanimal = function() {
    var canvas;
    var frames;
    // Misnomer; this is the delay between frames
    var animSpeed = 150;
    var frameIdx;
    var imgWidth;
    var imgHeight;
    var ctx;

    function centerInCanvas(imgWidth, imgHeight, canvasWidth, canvasHeight) {
        // Returns (x, y) where (imgWidth, imgHeight) can be drawn
        // and be centered in (canvasWidth, canvasHeight).

        // FIXME: currently, this assumes img{Width,Height} <= canvas{Width,Height}
        var widthOverflow = canvasWidth - imgWidth;
        var heightOverflow = canvasHeight - imgHeight;

        return (Math.floor(widthOverflow / 2), Math.floor(heightOverflow / 2));
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
    
    function animate(canvas_el) {
        canvas = document.getElementById(canvas_el);
        ctx = canvas.getContext("2d");
        frameIdx = 0;
        return setInterval(draw, animSpeed);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        if (! frames) {
            return;
        }

        clear();
        var imageData = ctx.createImageData(64, 50);
        var frame = frames[frameIdx];
        var pos = centerInCanvas(canvas.width, canvas.height);
        for (i = 0; i < frame.length; i++) {
            x = i % 64;
            y = Math.floor(i / 64);
            drawPixel(imageData, x, y, frame[i]);
        }
        ctx.putImageData(imageData, 0, 0);
        frameIdx = (frameIdx + 1) % 4;
    }
    

    return {
        party: animate,
        setFrames: setFrames
    }
}();

