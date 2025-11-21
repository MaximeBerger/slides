// --- Optimisation Performance & Rendu ---
let isRendering = false;
let pendingUpdate = null;

function requestUpdate(callback) {
    if (isRendering) {
        pendingUpdate = callback;
        return;
    }
    isRendering = true;
    requestAnimationFrame(() => {
        callback();
        isRendering = false;
        if (pendingUpdate) {
            const next = pendingUpdate;
            pendingUpdate = null;
            requestUpdate(next);
        }
    });
}

// Init KaTeX
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
        ],
        throwOnError : false
    });
    
    // Initialiser les graphs
    switchTab('ex1');
});


// --- Navigation Onglets ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('block'));
    
    document.getElementById(tabId).classList.remove('hidden');
    document.getElementById(tabId).classList.add('block');

    document.querySelectorAll('.tab-link').forEach(el => {
        el.classList.remove('border-cyan-500', 'text-gray-900');
        el.classList.add('border-transparent', 'text-gray-500');
    });
    
    const activeLink = document.getElementById('tab-' + tabId);
    activeLink.classList.remove('border-transparent', 'text-gray-500');
    activeLink.classList.add('border-cyan-500', 'text-gray-900');

    // Resize Plotly
    setTimeout(() => {
        if(tabId === 'ex1') { Plotly.Plots.resize('plot-ex1'); updateEx1(); }
        if(tabId === 'ex2') { Plotly.Plots.resize('plot-ex2-main'); updateEx2(); }
        if(tabId === 'ex3') { Plotly.Plots.resize('plot-ex3'); updateSignal(); }
    }, 50);
}

// --- Utilitaires Mathématiques ---
const EPSILON = 1e-5; 

function normLp(func, p, start, end, steps = 200) {
    if (p === Infinity) {
        let maxVal = 0;
        const dx = (end - start) / steps;
        for (let i = 0; i <= steps; i++) {
            const x = Math.max(start + i * dx, EPSILON);
            const val = Math.abs(func(x));
            if (val > maxVal) maxVal = val;
        }
        return maxVal;
    } else {
        const dx = (end - start) / steps;
        let sum = 0;
        for (let i = 0; i < steps; i++) {
            const x = Math.max(start + i * dx, EPSILON);
            const val = Math.abs(func(x));
            if (!isFinite(val)) return Infinity;
            sum += Math.pow(val, p);
        }
        return Math.pow(sum * dx, 1/p);
    }
}


// --- EXERCICE 1 ---
const f1ParamInput = document.getElementById('param-f1');
const f2ParamInput = document.getElementById('param-f2');
const customInput = document.getElementById('custom-func');

f1ParamInput.addEventListener('input', (e) => {
    document.getElementById('val-f1').textContent = e.target.value;
    requestUpdate(updateEx1);
});

f2ParamInput.addEventListener('input', (e) => {
    document.getElementById('val-f2').textContent = e.target.value;
    requestUpdate(updateEx1);
});

function getCustomFunc() {
    const code = customInput.value.trim();
    if (!code) return null;
    try {
        return new Function('x', `return ${code};`);
    } catch (e) {
        return null;
    }
}

function updateBadge(id, isConvergent) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isConvergent) {
        el.classList.remove('bg-gray-200', 'text-gray-500', 'bg-red-100', 'text-red-700');
        el.classList.add('bg-green-100', 'text-green-700');
        el.innerHTML = el.innerHTML.replace('NON', 'OUI').replace('?', ''); // Reset text if needed? No, LaTeX inside
        // Juste changer couleur pour indiquer succès
    } else {
        el.classList.remove('bg-gray-200', 'text-gray-500', 'bg-green-100', 'text-green-700');
        el.classList.add('bg-red-100', 'text-red-700');
    }
}

function updateEx1() {
    const a = parseFloat(f1ParamInput.value);
    const b = parseFloat(f2ParamInput.value);
    const customF = getCustomFunc();

    const xVals = [];
    const y1Vals = [];
    const y2Vals = [];
    const y4Vals = [];
    const yCustomVals = [];

    const steps = window.innerWidth < 600 ? 150 : 300;
    
    for (let i = 0; i <= steps; i++) {
        const x = 0.05 + (4 - 0.05) * (i / steps);
        xVals.push(x);
        y1Vals.push(1 / Math.pow(x, a));
        y2Vals.push(1 / Math.pow(x, b));
        y4Vals.push(Math.exp(-x));
        if (customF) {
             try { yCustomVals.push(customF(x)); } catch(e) { yCustomVals.push(0); }
        }
    }

    const traces = [
        { x: xVals, y: y1Vals, name: `f1`, line: {color: 'rgb(14, 116, 144)'} },
        { x: xVals, y: y2Vals, name: `f2`, line: {color: 'rgb(245, 158, 11)'} },
        { x: xVals, y: y4Vals, name: 'f4', line: {color: 'rgb(16, 185, 129)'} }
    ];
    
    if (customF) {
        traces.push({ x: xVals, y: yCustomVals, name: 'Custom', line: {dash: 'dot', color: 'purple'} });
    }

    const layout = {
        margin: { t: 10, r: 10, l: 30, b: 30 },
        xaxis: { title: '' },
        yaxis: { range: [0, 5] },
        legend: { orientation: 'h', y: 1.1 },
        dragmode: false
    };
    
    const config = {displayModeBar: false, responsive: true};

    Plotly.react('plot-ex1', traces, layout, config);

    // Update Badges directly
    const f1_L1_01 = a < 1;
    const f1_L1_inf = a > 1;
    const f2_L2_01 = (2*b) < 1; // b < 0.5

    updateBadge('badge-f1-l1-01', f1_L1_01);
    updateBadge('badge-f1-l1-inf', f1_L1_inf);
    updateBadge('badge-f2-l2-01', f2_L2_01);
}


// --- EXERCICE 2 ---
const nParamInput = document.getElementById('param-n');
const valN = document.getElementById('val-n');
let historyData = { n: [], l1: [], l2: [], linf: [] };

const bgN = Array.from({length: 100}, (_, i) => i + 1);
const bgL1 = bgN.map(x => 1/Math.sqrt(x));
const bgL2 = bgN.map(x => 1);
const bgLinf = bgN.map(x => Math.sqrt(x));

nParamInput.addEventListener('input', (e) => {
    const n = parseInt(e.target.value);
    valN.textContent = n;
    requestUpdate(() => updateEx2(n));
});

function updateEx2(n) {
    if (n === undefined) n = parseInt(nParamInput.value);

    const limit = 1/n;
    const height = Math.sqrt(n);

    const xVals = [0, limit, limit, 1];
    const yVals = [height, height, 0, 0];

    const trace = {
        x: xVals, y: yVals, 
        fill: 'tozeroy', type: 'scatter', mode: 'lines',
        line: {shape: 'hv', color: '#0e7490'}
    };

    const layout = {
        margin: { t: 10, b: 20, l: 20, r: 10 },
        xaxis: { range: [0, 1.05] },
        yaxis: { range: [0, 12] },
        dragmode: false
    };

    Plotly.react('plot-ex2-main', [trace], layout, {displayModeBar: false, staticPlot: true});

    const l1 = 1 / Math.sqrt(n);
    const l2 = 1;
    const linf = Math.sqrt(n);

    document.getElementById('val-l1').textContent = l1.toFixed(2);
    document.getElementById('val-l2').textContent = l2.toFixed(2);
    document.getElementById('val-linf').textContent = linf.toFixed(2);

    updateMiniPlots(n, l1, l2, linf);
}

function updateMiniPlots(n, valL1, valL2, valLinf) {
    const commonLayout = {
        margin: { t: 5, b: 15, l: 15, r: 5 },
        xaxis: {  showticklabels: false }, 
        yaxis: {  showticklabels: false },
        showlegend: false,
        dragmode: false
    };
    const config = {displayModeBar: false, staticPlot: true};

    Plotly.react('plot-hist-l1', [
        {x: bgN, y: bgL1, type: 'scatter', line: {color: '#cbd5e1', width: 1}},
        {x: [n], y: [valL1], mode: 'markers', marker: {size: 6, color: '#16a34a'}}
    ], {...commonLayout, yaxis: {range: [0, 1.1]}}, config);

    Plotly.react('plot-hist-l2', [
        {x: bgN, y: bgL2, type: 'scatter', line: {color: '#cbd5e1', width: 1}},
        {x: [n], y: [valL2], mode: 'markers', marker: {size: 6, color: '#ea580c'}}
    ], {...commonLayout, yaxis: {range: [0, 2]}}, config);

    Plotly.react('plot-hist-linf', [
        {x: bgN, y: bgLinf, type: 'scatter', line: {color: '#cbd5e1', width: 1}},
        {x: [n], y: [valLinf], mode: 'markers', marker: {size: 6, color: '#dc2626'}}
    ], {...commonLayout, yaxis: {range: [0, 11]}}, config);
}


// --- EXERCICE 3 ---
let currentSigType = 'sinus';
const ampInput = document.getElementById('sig-amp');
const periodInput = document.getElementById('sig-period');

ampInput.addEventListener('input', () => {
    document.getElementById('disp-amp').textContent = ampInput.value;
    requestUpdate(updateSignal);
});
periodInput.addEventListener('input', () => {
    document.getElementById('disp-period').textContent = periodInput.value;
    requestUpdate(updateSignal);
});

function setSignalType(type) {
    currentSigType = type;
    document.querySelectorAll('.sig-type-btn').forEach(b => {
        b.classList.remove('bg-cyan-600', 'text-white', 'border-cyan-700');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    });
    const activeBtn = document.getElementById('btn-' + type);
    activeBtn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    activeBtn.classList.add('bg-cyan-600', 'text-white', 'border-cyan-700');
    
    requestUpdate(updateSignal);
}

function updateSignal() {
    const A = parseFloat(ampInput.value);
    const T = parseFloat(periodInput.value);
    const omega = 2 * Math.PI / T;

    const numPoints = 150;
    const plotEnd = 2 * T;
    const xVals = [];
    const yVals = [];
    
    if (currentSigType === 'sinus') {
        for(let i=0; i<=numPoints; i++) {
            const t = (i/numPoints) * plotEnd;
            xVals.push(t);
            yVals.push(A * Math.sin(omega * t));
        }
    } else if (currentSigType === 'square') {
        for(let i=0; i<=numPoints; i++) {
            const t = (i/numPoints) * plotEnd;
            xVals.push(t);
            yVals.push((Math.sin(omega * t) >= 0) ? A : -A);
        }
    } else if (currentSigType === 'triangle') {
        for(let i=0; i<=numPoints; i++) {
            const t = (i/numPoints) * plotEnd;
            const p = (t % T) / T;
            let val;
            if (p < 0.25) val = A * (4*p);
            else if (p < 0.75) val = A * (1 - 4*(p-0.25));
            else val = A * (-1 + 4*(p-0.75));
            xVals.push(t);
            yVals.push(val);
        }
    }

    Plotly.react('plot-ex3', [{
        x: xVals, y: yVals, type: 'scatter', line: {color: '#2563eb', width: 2}
    }], {
        margin: {t:10, b:20, l:30, r:10},
        yaxis: {range: [-11, 11]},
        dragmode: false
    }, {displayModeBar: false, staticPlot: true});

    let valL1, valL2, valLinf;
    if (currentSigType === 'sinus') {
        valLinf = A;
        valL1 = (2 * A * T) / Math.PI;
        valL2 = A * Math.sqrt(T/2);
    } else if (currentSigType === 'square') {
        valLinf = A;
        valL1 = A * T;
        valL2 = A * Math.sqrt(T);
    } else if (currentSigType === 'triangle') {
        valLinf = A;
        valL1 = (A * T) / 2;
        valL2 = A * Math.sqrt(T/3);
    }

    document.getElementById('sig-l1').textContent = valL1.toFixed(1);
    document.getElementById('sig-l2').textContent = valL2.toFixed(1);
    document.getElementById('sig-linf').textContent = valLinf.toFixed(1);
}

function checkQuiz(answer) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden', 'text-green-700', 'text-red-700');

    if (answer === 'Linf') {
        feedback.innerHTML = "<strong>Correct !</strong> La norme \(L^\\infty\) correspond à l'amplitude maximale (pic).";
        feedback.classList.add('text-green-700');
    } else {
        feedback.innerHTML = "<strong>Non.</strong> Cette norme mesure une moyenne (énergie ou charge). Cherchez le <em>maximum</em>.";
        feedback.classList.add('text-red-700');
    }
    renderMathInElement(feedback);
}
