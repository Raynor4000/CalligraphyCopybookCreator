function addCSS(doc, css) {
    var new_css = document.createElement("link")
    new_css.setAttribute("rel", "stylesheet")
    new_css.setAttribute('type', 'text/css')
    new_css.setAttribute("href", 'https://fonts.googleapis.com/css?family=' + css + '&display=swap')
    document.getElementsByTagName('head')[0].appendChild(new_css);
}

function createSingleLine(doc, y, darkness) {
    doc.setLineWidth(0.15)
    var c = 150 + darkness
    doc.setDrawColor(c, c, c);
    doc.line(1, y, 215, y)
}

function createTripleLine(doc, y, darkness) {
    doc.setLineWidth(0.15)
    var c = 190 + darkness
    doc.setDrawColor(c, c, c);
    third = (1 / 3) * 10
    doc.line(1, y - third, 215, y - third);
    doc.line(1, y - (third * 2), 215, y - (third * 2));
}

function createSlantLine(doc, y, slant, darkness) {
    doc.setLineWidth(0.15)
    var c = 190 + darkness
    doc.setDrawColor(c, c, c);
    slant = (1 / Math.tan(slant * Math.PI / 180))
    x = 1
    third = (1 / 3) * 10
    while (x <= 215) {
        adjacent = (slant * 10)
        doc.line(x, y, adjacent + x - 1, y - 10);
        x += third
    }
}

function createLine(doc, y, ruling, darkness) {
    switch (ruling) {
        case "1":
            createTripleLine(doc, y, darkness);
            createSlantLine(doc, y, 52, darkness);
            createSingleLine(doc, y, darkness);
            break;
        case "2":
            createTripleLine(doc, y, darkness);
            createSlantLine(doc, y, 55, darkness);
            createSingleLine(doc, y, darkness);
            break;
        case "3":
            createSingleLine(doc, y, darkness);
            createTripleLine(doc, y, darkness);
            break;
        case "4":
            createSingleLine(doc, y, darkness);
            break;
        case "5":
            break;
    }
}

function drawStrokes(doc, line, y) {
    const principles = { A: '7332', B: '73223', C: '3232', D: '3232323', E: '3235', F: '733232', G: '2327', H: '27332', I: '67', J: '623', K: '2732232', L: '2732', M: '73332', N: '733', O: '5', P: '732', Q: '632', R: '732232', S: '27', T: '73232', U: '6212', V: '623', W: '6233', X: '632', Y: '6214', Z: '6324', a: '33212', b: '422', c: '21232', d: '33212', e: '232', f: '4322', g: '3324', h: '4312', i: '212', j: '24', k: '43212', l: '42', m: '3131312', n: '31312', o: '3322', p: '21312', q: '332123', r: '2312', s: '2322', t: '2121', u: '21212', v: '3122', w: '212122', x: '3232', y: '3124', z: '314', 0: '32', 1: '1', 2: '23232', 3: '23223', 4: '233', 5: '2231', 6: '323', 7: '1321', 8: '2323', 9: '321' }
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

function drawData(doc, heading, strokes, font, ruling, darkness, font_cutoff) {
    heading_split = doc.splitTextToSize(heading, font_cutoff)
    y = 0
    line_y = []
    for (line of heading_split) {
        if (strokes) {
            y += 2
            y = drawStrokes(doc, line, y) - 2
        }
        y += 10
        createLine(doc, y, "4", darkness);
        doc.setFont(font[0])
        doc.setFontSize(font[1]);
        line_y.push(y)
    }
    y += 10
    while (y < 280) {
        createLine(doc, y, ruling, darkness)
        y += 10
    }
    for (i in line_y) {
        doc.text(5, line_y[i], heading_split[i])
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
    font = document.getElementById('style').value;
    preview = document.getElementById('preview');
    text = document.getElementById('heading').value;
    var para = document.createElement("p");
    para.textContent = text;
    para.className = font;
    preview.innerHTML = para.outerHTML;
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
    var heading = document.getElementById('heading').value.split("\n")
    var strokes = document.getElementById('strokes').checked
    var ruling = document.getElementById('ruling').value
    var darkness = 100 - parseInt(document.getElementById('darkness').value)
    var font_cutoff = {
        'SpencerianScriptSW-Regular':185,
        'SpencerianLadysHandSW-Regular':185,
        'MonsieurLaDoulaise-Regular':200,
        'HerrVonMuellerhoff-Regular':200,
        'MissFajardose-Regular':200,
        'MrDeHaviland-Regular':200,
        'MrsSaintDelafield-Regular':200,
    }
    for( h  of heading){
        drawData(doc, h, strokes, [font, 25], ruling, darkness, font_cutoff[font])
        doc.addPage()
    }
    doc.deletePage(heading.length+1)
    doc.save('CopyBook.pdf');
}
insertProverb()
start()
previewFont()
