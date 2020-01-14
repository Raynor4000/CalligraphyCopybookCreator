function addCSS(doc, css) {
    var new_css = document.createElement("link")
    new_css.setAttribute("rel", "stylesheet")
    new_css.setAttribute('type', 'text/css')
    new_css.setAttribute("href", 'https://fonts.googleapis.com/css?family=' + css + '&display=swap')
    document.getElementsByTagName('head')[0].appendChild(new_css);
}

function start() {
    btn = document.getElementById('generate-book')
    btn.addEventListener("click", function() {
        generateCopyBook();
    });
    btn = document.getElementById('dismiss-jumbotron')
    btn.addEventListener("click", function() {
      jmbo = document.getElementById('jumbo-msg')
      jmbo.style.display = "none";
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

insertProverb()
start()
previewFont()
