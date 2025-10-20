// Points fixes en x
const xPoints = [-2, -1, 0, 1, 2];
let yPoints = [-1, 1, 0, 1, -1];

// Fonction pour calculer le polynôme de Lagrange
function lagrangeInterpolation(x, xPoints, yPoints) {
    let result = 0;
    
    for (let i = 0; i < xPoints.length; i++) {
        let term = yPoints[i];
        for (let j = 0; j < xPoints.length; j++) {
            if (i !== j) {
                term *= (x - xPoints[j]) / (xPoints[i] - xPoints[j]);
            }
        }
        result += term;
    }
    return result;
}

// Configuration du graphique
const ctx = document.getElementById('graphCanvas').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Points de contrôle',
            data: xPoints.map((x, i) => ({x: x, y: yPoints[i]})),
            backgroundColor: 'red'
        }, {
            label: 'Interpolation',
            data: [],
            borderColor: 'blue',
            showLine: true,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                min: -3,
                max: 3
            },
            y: {
                min: -3,
                max: 3
            }
        }
    }
});

// Création des contrôles
const controlsDiv = document.getElementById('pointControls');
yPoints.forEach((y, i) => {
    const input = document.createElement('input');
    input.type = 'range';
    input.min = -3;
    input.max = 3;
    input.step = 0.1;
    input.value = y;
    input.oninput = (e) => {
        yPoints[i] = parseFloat(e.target.value);
        updateGraph();
    };
    
    const label = document.createElement('label');
    label.textContent = `Point ${i+1} (x=${xPoints[i]}) : `;
    
    controlsDiv.appendChild(label);
    controlsDiv.appendChild(input);
    controlsDiv.appendChild(document.createElement('br'));
});

// Fonction de mise à jour du graphique
function updateGraph() {
    // Mise à jour des points de contrôle
    chart.data.datasets[0].data = xPoints.map((x, i) => ({x: x, y: yPoints[i]}));
    
    // Calcul des points pour la courbe d'interpolation
    const interpolationPoints = [];
    for (let x = -3; x <= 3; x += 0.1) {
        interpolationPoints.push({
            x: x,
            y: lagrangeInterpolation(x, xPoints, yPoints)
        });
    }
    chart.data.datasets[1].data = interpolationPoints;
    
    chart.update();
}

// Initialisation du graphique
updateGraph(); 