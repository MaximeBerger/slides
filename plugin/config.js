Reveal.initialize({
    hash: true,
    fragmentInURL: false,
    hashOneBasedIndex: true,
    navigationMode: 'linear',
    
    simplemenu: {
        barhtml: {
            header: "<div class='menubar'><ul class='menu'></ul></div>"
        }
    },
    customcontrols: {
        controls: [
                    { icon: '<i class="fa fa-pen-square"></i>',
                        title: 'Toggle chalkboard (B)',
                        action: 'RevealChalkboard.toggleChalkboard();'
                    },
                    { icon: '<i class="fa fa-pen"></i>',
                        title: 'Toggle notes canvas (C)',
                        action: 'RevealChalkboard.toggleNotesCanvas();'
	                    },
	                    { icon: '<i class="fa fa-th-large"></i>',
	                        title: 'Afficher/Masquer le plan (Esc)',
	                        action: 'Reveal.toggleOverview();'
	                    }
                ]
    },
    chalkboard: {
        src: 'chalkboard.json',
        chalkWidth: 2,
        chalkEffect: 0.0001,
        chalks: [
                { color: 'rgba(255,255,255,1)', cursor: 'url(' + path + 'img/chalk-white.png), auto'},
                { color: 'rgba(96, 154, 244, 1)', cursor: 'url(' + path + 'img/chalk-blue.png), auto'},
                { color: 'rgba(237, 20, 28, 1)', cursor: 'url(' + path + 'img/chalk-red.png), auto'},
                { color: 'rgba(20, 237, 28, 1)', cursor: 'url(' + path + 'img/chalk-green.png), auto'},
                { color: 'rgba(220, 133, 41, 1)', cursor: 'url(' + path + 'img/chalk-orange.png), auto'},
                { color: 'rgba(220,0,220, 1)', cursor: 'url(' + path + 'img/chalk-purple.png), auto'},
                { color: 'rgba(255,220,0, 1)', cursor: 'url(' + path + 'img/chalk-yellow.png), auto'}
        ]
    },  
    mathjax2: {
        config: 'TeX-AMS_HTML-full',
        TeX: {
            Macros: {
                R: '\\mathbb{R}',
                set: [ '\\left\\{#1 \\; ; \\; #2\\right\\}', 2 ]
            }
        }
    },

    // Learn about plugins: https://revealjs.com/plugins/
    plugins: [ RevealChalkboard, RevealCustomControls, Simplemenu, Multimodal, RevealMath.MathJax2 ]
});