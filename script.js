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

    let lastX, lastY;

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];
    }

    function startDrawingTouch(e) {
        isDrawing = true;
        const touch = e.touches[0];
        [lastX, lastY] = [touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top];
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const [x, y] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];
        if (lastX === undefined || lastY === undefined) {
            [lastX, lastY] = [x, y];
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    function drawTouch(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const touch = e.touches[0];
        const [x, y] = [touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top];
        if (lastX === undefined || lastY === undefined) {
            [lastX, lastY] = [x, y];
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    function stopDrawing() {
        isDrawing = false;
        [lastX, lastY] = [undefined, undefined];
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
