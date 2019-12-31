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

function createLines(doc, page_size) {
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
  btn.addEventListener(("click"), function() {
    generateCopyBook();
  });
}
function insertProverb() {
  btn = document.getElementById('insert-proverb')
  heading = document.getElementById('heading')
  heading.value=todayProverb()
  btn.addEventListener(("click"), function() {
      heading = document.getElementById('heading')
      heading.value=randomProverb()
  });
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
  var heading=document.getElementById('heading').value
  drawData(doc, heading)
  // window.open(doc.output('bloburl',{
  //   filename:'CopyBook.pdf',
  // }));
  doc.save('CopyBook.pdf');
}
insertProverb()
start()
