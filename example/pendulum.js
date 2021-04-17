function A(thetas) {
    let M = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push((n - Math.max(i, j)) * Math.cos(thetas[i] - thetas[j]));
        }
        M.push(row)
    }
    return M;
}

function b(thetas, thetaDots) {
    let v = [];
    for (let i = 0; i < n; i++) {
        let b_i = 0;
        for (let j = 0; j < n; j++) {
            b_i += (n - Math.max(i, j)) * Math.sin(thetas[i] - thetas[j]) * thetaDots[j] ** 2;
        }
        b_i += g * (n - i) * Math.sin(thetas[i]);
        v.push(b_i);
    }
    return v;
}

class Pendulum {
    constructor(n = 4, thetas = Array(n).fill(0.5*Math.PI), thetaDots = Array(n).fill(0)) {
        this.n = n;
        this.thetas = thetas;
        this.thetaDots = thetaDots;
        this.g = -9.8;
    }

    tick(dt) {
        let n = this.n;
        let g = this.g;
        let thetas = this.thetas;
        let thetaDots = this.thetaDots;





        let thetaDoubleDots = math.lusolve(A, b);
        
        return thetaDoubleDots;
    }

    get coordinates() {
        let x = 0;
        let y = 0;
        let coords = [];
        for (let i = 0; i < this.thetas.length; i++) {
            let theta = this.thetas[i]
            x += Math.sin(theta);
            y += Math.cos(theta);
            coords.push({x:x, y:y})
        }
        return coords;
    }

}