const fs = require('fs');

let html = fs.readFileSync('d:\\jas bday web\\index.html', 'utf8');
html = html.replace(/class="([^"]*)"\s+data-aos="fade-right"/g, 'class="$1 gsap-slide-right"');
html = html.replace(/class="([^"]*)"\s+data-aos="fade-left"/g, 'class="$1 gsap-slide-left"');
html = html.replace(/class="([^"]*)"\s+data-aos="fade-up"/g, 'class="$1 gsap-slide-up"');
html = html.replace(/class="([^"]*)"\s+data-aos="zoom-in"/g, 'class="$1 gsap-zoom-in"');

// For elements where data-aos is alone or comes first
html = html.replace(/data-aos="fade-up"\s+class="([^"]*)"/g, 'class="gsap-slide-up $1"');
html = html.replace(/<([a-zA-Z0-9]+)\s+data-aos="fade-up">/g, '<$1 class="gsap-slide-up">');
html = html.replace(/<([a-zA-Z0-9]+)\s+data-aos="zoom-in">/g, '<$1 class="gsap-zoom-in">');

html = html.replace(/\s*data-aos-delay="\d+"/g, '');
html = html.replace(/\s*data-aos="[^"]+"/g, ''); // catch any stragglers

fs.writeFileSync('d:\\jas bday web\\index.html', html);

let js = fs.readFileSync('d:\\jas bday web\\script.js', 'utf8');
js = js.replace(/AOS\.refresh\(\);/g, '');
js = js.replace(/\/\/ Initialize AOS[\s\S]*?offset: 50,\n\}\);/g, '');
fs.writeFileSync('d:\\jas bday web\\script.js', js);

console.log('Migration complete');
