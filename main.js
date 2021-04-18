let pendulum = new Pendulum();

pendulum.tick(1/60)

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var xScale = x => x * (175/pendulum.n);
var yScale = x => -x * (175/pendulum.n);


function draw() {
    pendulum.tick(1/60);
    let coords = pendulum.coordinates;

    context.clearRect(0, 0, canvas.width, canvas.height);

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

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

let arc = d3.arc()

let x1 = 0;
let y1 = 0;

let coords = [
{
    theta: 0.2 * Math.PI,
    l: 125
    },
    {
    theta: 0.325 * Math.PI,
    l: 125
    },
    {
    theta: 0.1   * Math.PI,
    l: 175
    },
    {
    theta: 0.35 * Math.PI,
    l: 125
    }
];

let l = 125;

let g = d3.select('#diagram').append('g')
    .attr('transform', 'translate(50,50)')
    .attr('font-family', 'Times')

let rods = d3.select('svg').append('g')
    .attr('transform', 'translate(50,50)')

let bobs = d3.select('svg').append('g')
    .attr('transform', 'translate(50,50)')

for (let i = 0; i < coords.length; i++) {
    let x2 = x1 + coords[i].l * Math.cos(coords[i].theta);
    let y2 = y1 + coords[i].l * Math.sin(coords[i].theta);
    let line = rods.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'black')
        .attr('stroke-width', 3)
        .attr('stroke-linecap',"round")
    if (i == 2) {
        line.attr('stroke-dasharray', '4,10')
    }

    bobs.append('circle')
        .attr('cx', x2)
        .attr('cy', y2)
        .attr('r', 10)
        .attr('fill', '#F66')
        .attr('stroke', '#B00')
        .attr('stroke-width', 1.5)

    let xLabel = g.append('text')
        .attr('x', x2)
        .attr('dy', '-1em')
        .attr('text-anchor', 'middle')
        .attr('font-style', 'italic')

    xLabel.append('tspan')
        .attr('font-size', '1.25em')
        .text('x')

    xLabel.append('tspan')
        .attr('baseline-shift', 'sub')
        .attr('font-size', '.75em')
        .text(() => {
            if (i == coords.length - 1) return 'n'
            else if (i == coords.length - 2) return 'n-1'
            else return (i + 1)
        })

    let yLabel = g.append('text')
        .attr('y', y2)
        .attr('dx', '-1.25em')
        .attr('text-anchor', 'middle')
        .attr('font-style', 'italic')

    yLabel.append('tspan')
        .attr('font-size', '1.25em')
        .text('y')

    yLabel.append('tspan')
        .attr('baseline-shift', 'sub')
        .attr('font-size', '.75em')
        .text(() => {
            if (i == coords.length - 1) return 'n'
            else if (i == coords.length - 2) return 'n-1'
            else return (i + 1)
        })

        
    g.append('line')
        .attr('x1', x2)
        .attr('y1', 0)
        .attr('x2', x2)
        .attr('y2', (i == 1) || (i == 3) ? y2 : y2 + 75)
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '3,3')

    g.append('line')
        .attr('x1', 0)
        .attr('y1', y2)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '3,3')

    if (i !== 2) {
        g.append('path')
            .attr('d', arc({
                innerRadius:40,
                outerRadius:41,
                startAngle: 0.5*Math.PI + coords[i].theta,
                endAngle: Math.PI
            }))
            .attr('transform', `translate(${x1},${y1})`)
            .attr('fill', 'black')

        let thetaText = g.append('text')
            .attr('transform', `translate(${x1 + 50 * Math.cos(0.25*Math.PI + 0.5*coords[i].theta)-5},
            ${y1 + 50 * Math.sin(0.25*Math.PI + 0.5*coords[i].theta) + 15})`)
            .attr('font-style', 'italic')
        
        thetaText.append('tspan')
            .attr('font-size', '1.25em')
            .text('θ')

        thetaText.append('tspan')
            .attr('baseline-shift', 'sub')
            .attr('font-size', '.75em')
            .attr('font-weight', 900)
            .text(i == coords.length - 1 ? 'n' : (i + 1))

    }
    

    x1 = x2;
    y1 = y2;

}