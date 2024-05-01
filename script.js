document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', startDrawingTouch);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', drawTouch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);

    document.getElementById('clearButton').addEventListener('click', clearCanvas);
    document.getElementById('downloadJPGButton').addEventListener('click', downloadCanvas);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function startDrawingTouch(e) {
        isDrawing = true;
        drawTouch(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }

    function drawTouch(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const touch = e.touches[0];
        ctx.lineTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        ctx.moveTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadCanvas() {
        const dataURL = canvas.toDataURL('image/jpeg');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'drawing.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
