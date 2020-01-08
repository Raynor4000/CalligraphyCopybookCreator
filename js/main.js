// function addFont(doc,font) {
//   if (!(font in doc.getFontList())) {
//     var new_font = document.createElement("script")
//     new_font.onload = function(){
//       document.getElementsByTagName("head")[0].appendChild(new_font)
//       alert('hello')
//     }
//     new_font.setAttribute("type", "text/javascript")
//     new_font.setAttribute("src", "js/fonts/" + font + ".js")
//   }
// }
function addCSS(doc, css) {
    var new_css = document.createElement("link")
    new_css.setAttribute("rel", "stylesheet")
    new_css.setAttribute('type', 'text/css')
    new_css.setAttribute("href", 'https://fonts.googleapis.com/css?family=' + css + '&display=swap')
    document.getElementsByTagName('head')[0].appendChild(new_css);
}

// function createSingleLines(doc, page_size) {
//     doc.setLineWidth(0.15)
//     doc.setDrawColor(200, 200, 200);
//     y = 15
//     while (y <= page_size - 5) {
//         doc.line(1, y, 215, y)
//         y += 10
//     }
//     doc.setDrawColor(100, 100, 100);
// }

// function createTripleLines(doc, page_size) {
//     doc.setLineWidth(0.15)
//     doc.setDrawColor(240, 240, 240);
//     y = 25
//     third = (1 / 3) * 10
//     while (y <= page_size - 5) {
//         doc.line(1, y - third, 215, y - third);
//         doc.line(1, y - (third * 2), 215, y - (third * 2));
//         y += 10
//     }
//     doc.setDrawColor(100, 100, 100);
// }

// function createSlantLines(doc, page_size, slant) {
//     doc.setLineWidth(0.15)
//     doc.setDrawColor(240, 240, 240);
//     y = 15
//     slant = (1 / Math.tan(slant * Math.PI / 180))
//     while (y <= page_size - 5) {
//         adjacent = (slant * y)
//         doc.line(1, y, adjacent, 15);
//         y += 10
//     }
//     x = 1
//     y -= 10
//     while (x <= 215) {
//         adjacent = (slant * y)
//         doc.line(x, y, adjacent + x - 1, 15);
//         x += (slant * 10)
//     }
//     doc.setDrawColor(100, 100, 100);
// }

// function createLines(doc, page_size) {
//     ruling = document.getElementById('ruling').value
//     switch (ruling) {
//         case "1":
//             createTripleLines(doc, page_size);
//             createSlantLines(doc, page_size, 52);
//             createSingleLines(doc, page_size);
//             break;
//         case "2":
//             createTripleLines(doc, page_size);
//             createSlantLines(doc, page_size, 55);
//             createSingleLines(doc, page_size);
//             break;
//         case "3":
//             createSingleLines(doc, page_size);
//             createTripleLines(doc, page_size);
//             break;
//         case "4":
//             createSingleLines(doc, page_size);
//             break;
//         case "5":
//             break;
//     }
// }
//=============================
function createSingleLine(doc, y) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(200, 200, 200);
    doc.line(1, y, 215, y)
}

function createTripleLine(doc, y) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(240, 240, 240);
    third = (1 / 3) * 10
    doc.line(1, y - third, 215, y - third);
    doc.line(1, y - (third * 2), 215, y - (third * 2));
}

function createSlantLine(doc, y, slant) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(240, 240, 240);
    slant = (1 / Math.tan(slant * Math.PI / 180))
    x = 1
    while (x <= 215) {
        adjacent = (slant * 10)
        doc.line(x, y, adjacent + x - 1, y - 10);
        x += adjacent
    }
}

function createLine(doc, y, ruling) {
    switch (ruling) {
        case "1":
            createTripleLine(doc, y);
            createSlantLine(doc, y, 52);
            createSingleLine(doc, y);
            break;
        case "2":
            createTripleLine(doc, y);
            createSlantLine(doc, y, 55);
            createSingleLine(doc, y);
            break;
        case "3":
            createSingleLine(doc, y);
            createTripleLine(doc, y);
            break;
        case "4":
            createSingleLine(doc, y);
            break;
        case "5":
            break;
    }
}

function drawStrokes(doc, line, y) {
    const principles = { A: '7332', B: '73223', C: '3232', D: '3232323', E: '3235', F: '733232', G: '2327', H: '27332', I: '67', J: '623', K: '2732232', L: '2732', M: '73332', N: '733', O: '5', P: '732', Q: '632', R: '732232', S: '27', T: '73232', U: '6212', V: '623', W: '6233', X: '632', Y: '6214', Z: '6324', a: '33212', b: '422', c: '21232', d: '33212', e: '232', f: '4322', g: '3324', h: '4312', i: '212', j: '24', k: '43212', l: '42', m: '3131312', n: '31312', o: '3322', p: '21312', q: '332123', r: '2312', s: '2322', t: '2121', u: '21212', v: '3122', w: '212122', x: '3232', y: '3124', z: '314' }
    doc.setFont('courier')
    doc.setFontSize(6)
    x = 5
    var init_y = y
    var max_y = y
    for (l of line) {
        doc.text(x, y, l)
        if (l in principles) {
            y += 1.6
            for (p of principles[l]) {
                doc.text(x, y, p)
                y += 1.6
            }
            max_y = Math.max(y, max_y)
            y = init_y
        }
        x += 2.5;
    }
    return (max_y - 1.6);
}

function drawData(doc, heading, strokes, font, ruling) {
    heading_split = doc.splitTextToSize(heading, 205)
    y = 0
    for (line of heading_split) {
        if (strokes) {
            y += 2
            y = drawStrokes(doc, line, y) - 2
        }
        y += 10
        createLine(doc, y, "4");
        doc.setFont(font[0])
        doc.setFontSize(font[1]);
        doc.text(5, y, line)
    }
    y += 10
    while (y < 280) {
        createLine(doc, y, ruling)
        y += 10
    }
}

function start() {
    btn = document.getElementById('generate-book')
    btn.addEventListener("click", function() {
        generateCopyBook();
    });
}

function insertProverb() {
    btn = document.getElementById('insert-proverb')
    heading = document.getElementById('heading')
    pool = document.getElementById('pool')
    heading.value = todayProverb(pool.value)
    changePreviewFont()
    btn.addEventListener(("click"), function() {
        heading = document.getElementById('heading')
        pool = document.getElementById('pool')
        heading.value = randomProverb(pool.value)
        changePreviewFont()
    });
    pool.addEventListener(("change"), function() {
        heading = document.getElementById('heading')
        pool = document.getElementById('pool')
        heading.value = todayProverb(pool.value)
        changePreviewFont()
    });
}

function changeStyle() {
    e = document.getElementById('style')
    e.addEventListener("change", function() {
        previewFont()
    });
}

function changePreviewFont() {
    font = document.getElementById('style').value
    preview = document.getElementById('preview')
    text = document.getElementById('heading').value
    var para = document.createElement("p");
    para.textContent = text
    para.className = font
    preview.innerHTML = para.outerHTML
}

function previewFont() {
    select = document.getElementById('style')
    header = document.getElementById('heading')
    select.addEventListener("change", function() {
        changePreviewFont()
    })
    header.addEventListener("input", function() {
        changePreviewFont()
    })
}
//Creates PDF report
function generateCopyBook() {
    const page_size = 280;
    //make new JSpdf document
    const doc_settings = {
        orientation: 'p',
        unit: 'mm',
        format: 'letter',
        hotfixes: [] // an array of hotfix strings to enable
    }
    var doc = new jsPDF(doc_settings);
    var font = document.getElementById('style').value
    var heading = document.getElementById('heading').value
    var strokes = document.getElementById('strokes').checked
    var ruling = document.getElementById('ruling').value
    drawData(doc, heading, strokes, [font, 25], ruling)
    doc.save('CopyBook.pdf');
}
insertProverb()
start()
previewFont()