let n = 4;

let pendulum = new Pendulum(n);

pendulum.tick(1/60)

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var xScale = x => x * (200/n);
var yScale = x => -x * (200/n);


function draw() {
    pendulum.tick(1/60);
    let coords = pendulum.coordinates;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let x1 = 0.5*canvas.width;
    let y1 = 0.5*canvas.height    

    for (let i = 0; i < n; i++) {
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

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);