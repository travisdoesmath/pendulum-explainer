class Pendulum {
    constructor(n = 4, thetas = Array(n).fill(0.5*Math.PI), thetaDots = Array(n).fill(0)) {
        this.n = n;
        this.thetas = thetas;
        this.thetaDots = thetaDots;
        this.g = -9.8;
    }

    A(thetas) {
        let M = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push((this.n - Math.max(i, j)) * Math.cos(thetas[i] - thetas[j]));
            }
            M.push(row)
        }
        return M;
    }
    
    b(thetas, thetaDots) {
        let v = [];
        for (let i = 0; i < this.n; i++) {
            let b_i = 0;
            for (let j = 0; j < this.n; j++) {
                b_i -= (this.n - Math.max(i, j)) * Math.sin(thetas[i] - thetas[j]) * thetaDots[j] ** 2;
            }
            b_i -= this.g * (this.n - i) * Math.sin(thetas[i]);
            v.push(b_i);
        }
        return v;
    }
    
    fDot(thetas, thetaDots) {
        let A = this.A(thetas);
        let b = this.b(thetas, thetaDots);
        return [thetaDots, math.lusolve(A, b).map(x => x[0])];
    }
    
    // RK4(dt, thetas, thetaDots) {
    //     let k1 = this.fDot(thetas, thetaDots);
    //     let k2 = this.fDot(thetas.map((x, i) => x + 0.5*dt*k1[0][i]), thetaDots.map((x, i) => x + 0.5*dt*k1[1][i]));
    //     let k3 = this.fDot(thetas.map((x, i) => x + 0.5*dt*k2[0][i]), thetaDots.map((x, i) => x + 0.5*dt*k2[1][i]));
    //     let k4 = this.fDot(thetas.map((x, i) => x +     dt*k3[0][i]), thetaDots.map((x, i) => x +     dt*k3[1][i]));
  
    //     let thetaDeltas    = math.add(k1[0], k2[0].map(x => 2 * x), k3[0].map(x => 2 * x), k4[0]).map(x => x * dt/6);
    //     let thetaDotDeltas = math.add(k1[1], k2[1].map(x => 2 * x), k3[1].map(x => 2 * x), k4[1]).map(x => x * dt/6);
    
    //     return [math.add(thetas, thetaDeltas), thetaDots = math.add(thetaDots, thetaDotDeltas)]
    // }
    

    tick(dt = 1/60) {
        let thetas = this.thetas;
        let thetaDots = this.thetaDots;

        let stateDerivative = this.fDot(thetas, thetaDots);
        console.log(stateDerivative);
        this.thetas = math.add(this.thetas, stateDerivative[0].map(x => x * dt))
        this.thetaDots = math.add(this.thetaDots, stateDerivative[1].map(x => x * dt))
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