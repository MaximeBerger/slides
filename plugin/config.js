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
                    }
                ]
    },
    chalkboard: {
        src: 'chalkboard.json',
        chalkWidth: 3,
        chalkEffect: 0.0001,
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