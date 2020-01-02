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

function createSingleLines(doc, page_size) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(200, 200, 200);
    y = 10
    doc.line(1, y, 215, y)
    while (y <= page_size - 5) {
        y += 10
        doc.line(1, y, 215, y)
    }
    doc.setDrawColor(100, 100, 100);
}

function createTripleLines(doc, page_size) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(240, 240, 240);
    y = 10
    third = (1 / 3) * 10
    while (y <= page_size - 10) {
        y += 10
        doc.line(1, y - third, 215, y - third);
        doc.line(1, y - (third * 2), 215, y - (third * 2));
    }
    doc.setDrawColor(100, 100, 100);
}

function createSlantLines(doc, page_size) {
    doc.setLineWidth(0.15)
    doc.setDrawColor(240, 240, 240);
    y = 10
    while (y <= page_size - 10) {
        y += 10
        adjacent = (0.781285627845389 * y)
        doc.line(1, y, adjacent, 10);
    }
    x = (7.81285627)
    while (x <= 215) {
        adjacent = (0.781285627845389 * y)
        doc.line(x, y, adjacent + x, 10);
        x += (7.81285627)
    }
    doc.setDrawColor(100, 100, 100);
}

function createLines(doc, page_size) {
    ruling = document.getElementById('ruling').value
    switch (ruling) {
        case "1":
            createSingleLines(doc, page_size);
            createTripleLines(doc, page_size);
            createSlantLines(doc, page_size);
            break;
        case "2":
            createSingleLines(doc, page_size);
            createTripleLines(doc, page_size);
            break;
        case "3":
            createSingleLines(doc, page_size);
            break;
        case "4":
            break;
    }
}

function drawData(doc, heading) {
    heading = doc.splitTextToSize(heading, 205)
    y = 10
    for (line of heading) {
        doc.text(5, y, line)
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
    header.addEventListener("change", function() {
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
    createLines(doc, page_size);
    doc.setFontSize(25);
    //add font and set it
    var font = document.getElementById('style').value
        // addFont(doc,font)
    doc.setFont(font)
        //add text
    var heading = document.getElementById('heading').value
    drawData(doc, heading)
        // window.open(doc.output('bloburl',{
        //   filename:'CopyBook.pdf',
        // }));
    doc.save('CopyBook.pdf');
}
insertProverb()
start()
previewFont()
