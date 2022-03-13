function getPointAtLength(length, element) {
    const point = element.getPointAtLength(length);
    const matrix = element.getCTM().inverse();
    return point.matrixTransform(matrix);
}
const path1 = document.getElementById("animated");
const path2 = document.getElementById("animated2");
const path3 = document.getElementById("animated3");
const line = document.getElementById("trace");
const svg = document.getElementById("svg");
let interval;
let a1, a2, a3;
let w, h;

function startTrace() {
    let d = "";

    let ml1 = path1.getTotalLength();
    let ml2 = path2.getTotalLength();
    let ml3 = path3.getTotalLength();


    let l1 = r(0, ml1);
    let l2 = r(0, ml2);
    let l3 = r(0, ml3);

    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        const p = getPointAtLength(l1, path1);
        const coor = `${parseInt(p.x)} ${parseInt(p.y)} `;
        let p2 = getPointAtLength(l2, path2);
        const coor2 = `${parseInt(p2.x)} ${parseInt(p2.y)} `;
        let p3 = getPointAtLength(l3, path3);
        const coor3 = `${parseInt(p3.x)} ${parseInt(p3.y)} `;
        if (d === "") {
            d = ` M ${coor} `;
        }
        d += ` C ${coor2} ${coor3} ${coor} `;

        trace.setAttribute("d", d);
        l1 += a1;
        if (l1 < 0 || l1 > ml1) {
            a1 = -a1;
            l1 += a1;
        }

        l2 += a2;
        if (l2 < 0 || l2 > ml2) {
            a2 = -a2;
            l2 += a2;
        }
        l3 += a3;
        if (l3 < 0 || l3 > ml3) {
            a3 = -a3;
            l3 += a3;
        }
    }, 20);
}

function createScenario() {
    trace.setAttribute("d", "");
    let d = `
	 M ${r(100, 400)} ${r(100, 300)}
	 C ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	`;
    path1.setAttribute("d", d);
    d = `
	 M ${r(100, 400)} ${r(100, 300)}
	 C ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	`;
    path2.setAttribute("d", d);
    d = `
	 M ${r(100, 400)} ${r(100, 300)}
	 C ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	`;
    path3.setAttribute("d", d);
    d = `
	 M ${r(100, 400)} ${r(100, 300)}
	 C ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	 ${r(200, 300)} ${r(100, 200)}
	`;
    a1 = rf(-2, 2);
    a2 = rf(-3, 3);
    a3 = rf(-4, 4);
    path1.setAttribute("dur", `${r(6, 30)}s`);
    path2.setAttribute("dur", `${r(12, 30)}s`);
    path3.setAttribute("dur", `${r(20, 30)}s`);

    line.setAttribute(
        "stroke",
        `hsla(${r(0, 360)}, ${r(0, 100)}%, ${r(0, 100)}%, .75)`
    );
    startTrace();
}

function r(min, max) {
    return parseInt(rf(min, max));
}

function rf(min, max) {
    const diff = max - min;
    return (Math.random() * diff) + min;
}

document.body.addEventListener("click", createScenario);
createScenario();