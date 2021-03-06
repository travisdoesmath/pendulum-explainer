let pendulum = new Pendulum();

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var xScale = x => x * (0.5*canvas.width/pendulum.n);
var yScale = x => -x * (0.5*canvas.height/pendulum.n);

function draw() {
    let coords = pendulum.coordinates;

    let x1 = 0.5*canvas.width;
    let y1 = 0.5*canvas.height    

    for (let i = 0; i < pendulum.n; i++) {
        let x2 = 0.5*canvas.width + xScale(coords[i].x);
        let y2 = 0.5*canvas.height + yScale(coords[i].y);

        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();

        context.beginPath();
        context.arc(x2, y2, 3, 0, Math.PI * 2, true);
        context.fill();

        x1 = x2;
        y1 = y2;
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    pendulum.tick(1/60);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);