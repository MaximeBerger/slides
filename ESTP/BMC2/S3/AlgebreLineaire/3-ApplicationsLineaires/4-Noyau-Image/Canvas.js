const canvas = document.getElementById('mainCanvas');
const c = canvas.getContext('2d');

// Responsive canvas size
function resizeCanvas() {
	const container = canvas.parentElement;
	const size = Math.min(container.clientWidth - 48, 700);
	canvas.width = size;
	canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouseDown = false;
let vect = { x: 1, y: 1 };
let e1Abs = { x: 1, y: 0 };
let e2Abs = { x: 0, y: 1 };
let target = "";

// Couleurs du thème (mode clair)
const colors = {
	grid: '#e2e8f0',
	gridAxis: '#94a3b8',
	vectorX: '#e53e3e',
	vectorFx: '#0891b2',
	base: '#059669',
	result: '#7c3aed',
	text: '#1e293b'
};

// Coordonnées locales - calcul dynamique basé sur la taille du canvas
function getScale() {
	return canvas.width / 10; // 10 unités visibles
}

function toLocal(pos) {
	const scale = getScale();
	const center = canvas.width / 2;
	return { x: (pos.x - center) / scale, y: -(pos.y - center) / scale };
}

function toAbsolute(pos) {
	const scale = getScale();
	const center = canvas.width / 2;
	return { x: scale * pos.x + center, y: -scale * pos.y + center };
}

// Tracer un repère avec axes mis en évidence
function drawGrid() {
	const scale = getScale();
	const gridRange = 10;
	
	// Lignes de grille secondaires
	c.strokeStyle = colors.grid;
	c.lineWidth = 1;
	
	for (let i = -gridRange; i <= gridRange; i++) {
		if (i === 0) continue; // Skip axes
		
		let startPoint = toAbsolute({ x: i, y: -gridRange });
		let endPoint = toAbsolute({ x: i, y: gridRange });
		c.beginPath();
		c.moveTo(startPoint.x, startPoint.y);
		c.lineTo(endPoint.x, endPoint.y);
		c.stroke();
		
		startPoint = toAbsolute({ x: -gridRange, y: i });
		endPoint = toAbsolute({ x: gridRange, y: i });
		c.beginPath();
		c.moveTo(startPoint.x, startPoint.y);
		c.lineTo(endPoint.x, endPoint.y);
		c.stroke();
	}
	
	// Axes principaux
	c.strokeStyle = colors.gridAxis;
	c.lineWidth = 2;
	
	// Axe X
	let startPoint = toAbsolute({ x: -gridRange, y: 0 });
	let endPoint = toAbsolute({ x: gridRange, y: 0 });
	c.beginPath();
	c.moveTo(startPoint.x, startPoint.y);
	c.lineTo(endPoint.x, endPoint.y);
	c.stroke();
	
	// Axe Y
	startPoint = toAbsolute({ x: 0, y: -gridRange });
	endPoint = toAbsolute({ x: 0, y: gridRange });
	c.beginPath();
	c.moveTo(startPoint.x, startPoint.y);
	c.lineTo(endPoint.x, endPoint.y);
	c.stroke();
	
	// Graduations
	c.fillStyle = colors.text;
	c.font = '12px "Fira Code", monospace';
	c.textAlign = 'center';
	
	for (let i = -5; i <= 5; i++) {
		if (i === 0) continue;
		const pos = toAbsolute({ x: i, y: 0 });
		c.fillText(i.toString(), pos.x, pos.y + 18);
	}
	
	c.textAlign = 'right';
	for (let i = -5; i <= 5; i++) {
		if (i === 0) continue;
		const pos = toAbsolute({ x: 0, y: i });
		c.fillText(i.toString(), pos.x - 8, pos.y + 4);
	}
}

// Tracer une flèche avec style amélioré
function drawLineWithArrows(point, color, lineWidth = 4) {
	const globalOrigin = toAbsolute({ x: 0, y: 0 });
	const scale = getScale();
	const aWidth = 8;
	const aLength = 12;
	const angle = Math.atan2(-point.y, point.x);
	const length = scale * Math.sqrt(point.x * point.x + point.y * point.y);
	
	if (length < 1) return; // Ne pas dessiner si trop petit
	
	c.strokeStyle = color;
	c.lineWidth = lineWidth;
	c.lineCap = 'round';
	c.lineJoin = 'round';
	
	c.save();
	c.translate(globalOrigin.x, globalOrigin.y);
	c.rotate(angle);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(length, 0);
	
	// Tête de la flèche
	c.moveTo(length - aLength, -aWidth);
	c.lineTo(length, 0);
	c.lineTo(length - aLength, aWidth);
	c.stroke();
	c.restore();
}

// Dessiner un point interactif
function drawHandle(pos, color, isActive = false) {
	const absPos = toAbsolute(pos);
	
	c.beginPath();
	c.arc(absPos.x, absPos.y, isActive ? 10 : 7, 0, Math.PI * 2);
	c.fillStyle = color;
	c.fill();
	
	if (isActive) {
		c.strokeStyle = '#1e293b';
		c.lineWidth = 2;
		c.stroke();
	}
}

function sqrDist(p1, p2) {
	return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function matrixMult(M, vector) {
	return {
		x: M.a * vector.x + M.b * vector.y,
		y: M.c * vector.x + M.d * vector.y
	};
}

function matrixMultBase(M, vector, P) {
	const Pdet = P.a * P.d - P.b * P.c;
	
	if (Math.abs(Pdet) < 0.0001) {
		// Déterminant nul - base invalide
		a11epsSelector.innerHTML = "—";
		a12epsSelector.innerHTML = "—";
		a21epsSelector.innerHTML = "—";
		a22epsSelector.innerHTML = "—";
		return { x: 0, y: 0 };
	}
	
	const Pinv = { 
		a: P.d / Pdet, 
		b: -P.b / Pdet, 
		c: -P.c / Pdet, 
		d: P.a / Pdet 
	};

	const MnewBase = {
		a: M.a * Pinv.a * P.a + M.b * Pinv.a * P.c + M.c * Pinv.b * P.a + M.d * Pinv.b * P.c,
		b: M.a * Pinv.a * P.b + M.b * Pinv.a * P.d + M.c * Pinv.b * P.b + M.d * Pinv.b * P.d,
		c: M.a * Pinv.c * P.a + M.b * Pinv.c * P.c + M.c * Pinv.d * P.a + M.d * Pinv.d * P.c,
		d: M.a * Pinv.c * P.b + M.b * Pinv.c * P.d + M.c * Pinv.d * P.b + M.d * Pinv.d * P.d
	};
	
	const vectNewBase = {
		x: Pinv.a * vector.x + Pinv.b * vector.y,
		y: Pinv.c * vector.x + Pinv.d * vector.y
	};

	a11epsSelector.innerHTML = MnewBase.a.toFixed(2);
	a12epsSelector.innerHTML = MnewBase.b.toFixed(2);
	a21epsSelector.innerHTML = MnewBase.c.toFixed(2);
	a22epsSelector.innerHTML = MnewBase.d.toFixed(2);
	
	const vectorOld = matrixMult(MnewBase, vectNewBase);
	const newVector = {
		x: P.a * vectorOld.x + P.b * vectorOld.y,
		y: P.c * vectorOld.x + P.d * vectorOld.y
	};
	return newVector;
}

function transitionMatrix(eps1, eps2) {
	return { a: eps1.x, b: eps2.x, c: eps1.y, d: eps2.y };
}

// Animation
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	drawGrid();

	const M = { a: a11, b: a12, c: a21, d: a22 };
	const P = transitionMatrix(e1Abs, e2Abs);

	// Base e1, e2 (en arrière-plan)
	drawLineWithArrows(e1Abs, colors.base, 3);
	drawLineWithArrows(e2Abs, colors.base, 3);

	// Vecteur x
	drawLineWithArrows(vect, colors.vectorX, 4);

	// Vecteur f(x)
	drawLineWithArrows(matrixMult(M, vect), colors.vectorFx, 4);

	// Résultat dans la nouvelle base
	drawLineWithArrows(matrixMultBase(M, vect, P), colors.result, 4);

	// Points interactifs (handles)
	drawHandle(vect, colors.vectorX, target === "x");
	drawHandle(e1Abs, colors.base, target === "e1");
	drawHandle(e2Abs, colors.base, target === "e2");

	// Labels
	c.font = '600 16px "Plus Jakarta Sans", sans-serif';
	c.textBaseline = 'middle';
	
	const xPos = toAbsolute(vect);
	c.fillStyle = colors.vectorX;
	c.fillText("x", xPos.x + 15, xPos.y);

	const fxPos = toAbsolute(matrixMult(M, vect));
	c.fillStyle = colors.vectorFx;
	c.fillText("f(x)", fxPos.x + 15, fxPos.y);

	const e1Pos = toAbsolute(e1Abs);
	const e2Pos = toAbsolute(e2Abs);
	c.fillStyle = colors.base;
	c.fillText("e₁", e1Pos.x + 12, e1Pos.y + 15);
	c.fillText("e₂", e2Pos.x - 25, e2Pos.y - 5);
}

// Gestion des événements - sur le canvas pour mousedown, sur window pour move/up
function getMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return {
		x: (evt.clientX - rect.left) * scaleX,
		y: (evt.clientY - rect.top) * scaleY
	};
}

// Seuil de détection plus grand pour faciliter la sélection
const SELECTION_THRESHOLD = 0.3;

canvas.addEventListener('mousedown', function(evt) {
	mouseDown = true;
	const mousePos = getMousePos(evt);
	const relMousePos = toLocal(mousePos);
	
	// Vérifier quel vecteur est le plus proche
	const distX = sqrDist(vect, relMousePos);
	const distE1 = sqrDist(e1Abs, relMousePos);
	const distE2 = sqrDist(e2Abs, relMousePos);
	
	const minDist = Math.min(distX, distE1, distE2);
	
	if (minDist <= SELECTION_THRESHOLD) {
		if (minDist === distX) target = "x";
		else if (minDist === distE1) target = "e1";
		else if (minDist === distE2) target = "e2";
	} else {
		target = "";
	}
}, false);

// Événements sur window pour permettre le drag en dehors du canvas
window.addEventListener('mouseup', function(evt) {
	mouseDown = false;
}, false);

window.addEventListener('mousemove', function(evt) {
	if (!mouseDown || !target) return;
	
	const mousePos = getMousePos(evt);
	const relMousePos = toLocal(mousePos);
	
	// Pas de limite - les vecteurs peuvent aller n'importe où
	if (target === "x") {
		vect.x = relMousePos.x;
		vect.y = relMousePos.y;
	}
	if (target === "e1") {
		e1Abs.x = relMousePos.x;
		e1Abs.y = relMousePos.y;
	}
	if (target === "e2") {
		e2Abs.x = relMousePos.x;
		e2Abs.y = relMousePos.y;
	}
}, false);

// Support tactile
canvas.addEventListener('touchstart', function(evt) {
	evt.preventDefault();
	const touch = evt.touches[0];
	const mouseEvent = new MouseEvent('mousedown', {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);
}, false);

window.addEventListener('touchend', function(evt) {
	const mouseEvent = new MouseEvent('mouseup', {});
	window.dispatchEvent(mouseEvent);
}, false);

window.addEventListener('touchmove', function(evt) {
	if (!mouseDown) return;
	evt.preventDefault();
	const touch = evt.touches[0];
	const mouseEvent = new MouseEvent('mousemove', {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	window.dispatchEvent(mouseEvent);
}, { passive: false });

// Sélecteurs de la matrice
const a11Selector = document.getElementById('a11');
a11Selector.value = 1;
a11Selector.addEventListener('input', (event) => {
	a11 = parseFloat(event.target.value) || 0;
});

const a12Selector = document.getElementById('a12');
a12Selector.value = 0;
a12Selector.addEventListener('input', (event) => {
	a12 = parseFloat(event.target.value) || 0;
});

const a21Selector = document.getElementById('a21');
a21Selector.value = 0;
a21Selector.addEventListener('input', (event) => {
	a21 = parseFloat(event.target.value) || 0;
});

const a22Selector = document.getElementById('a22');
a22Selector.value = 1;
a22Selector.addEventListener('input', (event) => {
	a22 = parseFloat(event.target.value) || 0;
});

const a11epsSelector = document.getElementById('a11eps');
const a12epsSelector = document.getElementById('a12eps');
const a21epsSelector = document.getElementById('a21eps');
const a22epsSelector = document.getElementById('a22eps');

// Démarrer l'animation
animate();
