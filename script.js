// ADN animé
const canvasADN = document.getElementById('dna-canvas');
if(canvasADN){
  const ctxADN = canvasADN.getContext('2d');
  canvasADN.width = 260;
  canvasADN.height = 110;
  function dnaHelix(time=0){
    ctxADN.clearRect(0,0,canvasADN.width,canvasADN.height);
    let cx=canvasADN.width/2, cy=canvasADN.height/2, n=24, radius=35;
    for(let i=0;i<n;i++){
      let phi=i*0.32+time*0.001;
      let y=cy+(i-n/2)*3.1, x1=cx+Math.cos(phi)*radius, x2=cx-Math.cos(phi)*radius;
      ctxADN.beginPath(); ctxADN.moveTo(x1,y); ctxADN.lineTo(x2,y);
      ctxADN.strokeStyle='#e6e5e5ff'; ctxADN.globalAlpha=0.5; ctxADN.lineWidth=2.2; ctxADN.stroke();
      ctxADN.globalAlpha=1;
      ctxADN.beginPath(); ctxADN.arc(x1,y,5,0,6.3); ctxADN.fillStyle="#1abc9c"; ctxADN.fill();
      ctxADN.beginPath(); ctxADN.arc(x2,y,5,0,6.3); ctxADN.fillStyle="#0fa"; ctxADN.fill();
    }
    ctxADN.globalAlpha=1;
    requestAnimationFrame(dnaHelix);
  }
  dnaHelix();
}

// Code animé
const canvasCode = document.getElementById('code-canvas');
if(canvasCode){
  const ctxCode = canvasCode.getContext('2d');
  canvasCode.width = 260; canvasCode.height = 110;
  const lines = [
    'def test_qa():',
    '    assert quality == "Habib"',
    '    for bug in bugs:',
    '        fix(bug)',
    '    print("Tests OK")'
  ];
  let offset=0;
  function animCode(){
      ctxCode.clearRect(0,0,canvasCode.width,canvasCode.height);
      ctxCode.font="14px monospace";
      ctxCode.fillStyle="#0fa";
      for (let i=0;i<lines.length;i++)
        ctxCode.fillText(lines[i], 10, 30+i*18-offset);
      offset+=0.45; if(offset>18) offset=0;
      requestAnimationFrame(animCode);
  }
  animCode();
}

// Business animé simple (ex: cercles et flèches mouvants)
const canvasBus = document.getElementById('business-canvas');
if(canvasBus){
  const ctx = canvasBus.getContext('2d');
  canvasBus.width=260; canvasBus.height=110;
  function animBusiness(t=0){
    ctx.clearRect(0,0,canvasBus.width,canvasBus.height);
    // Cercles + flèche
    for(let i=0;i<3;i++){
      let x=50+i*80, y=56+Math.sin(t/400+i)*7;
      ctx.beginPath();
      ctx.arc(x,y,32,0,6.3);
      ctx.strokeStyle=["#1abc9c","#0fa","#ffc905"][i];
      ctx.lineWidth=3; ctx.stroke();
      ctx.font="15px Arial"; ctx.fillStyle="#020202ff";
      ctx.fillText(["Team","Projet","Budget"][i],x-18,y+4);
      // Flèche animée
      if(i<2){
        let fx=x+28, fy=y, tx=x+76-23, ty=56+Math.sin(t/400+i+1)*7;
        ctx.beginPath();
        ctx.moveTo(fx,fy); ctx.lineTo(tx,ty);
        ctx.strokeStyle="rgba(7, 7, 7, 0.47)"; ctx.lineWidth=2.5; ctx.stroke();
      }
    }
    requestAnimationFrame(animBusiness);
  }
  animBusiness();
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('contact-form').reset();
  let popup = document.getElementById('popup-confirm');
  popup.style.display = "block";
  setTimeout(function(){
    popup.style.display = "none";
  }, 2200); // visible ~2 secondes
});

// ajout pour le retour sur la page bio
window.addEventListener('scroll', function() {
  const topBtn = document.getElementById('top-btn');
  if(window.scrollY > 250) topBtn.style.display = 'block';
  else topBtn.style.display = 'none';
});

//animation entete (page accueil : project manager...)
const phrases = [
  "Project manager passionné",
  "Ingénieur QA Polyvalent"
];
let ti = 0, pi = 0;
function typeLoop() {
  let d = document.getElementById("animated-header");
  if(!d) return;
  let txt = phrases[pi].slice(0, ti);
  d.innerHTML = txt + '<span style="opacity:.3;">|</span>';
  if(ti < phrases[pi].length) {
    ti++;
    setTimeout(typeLoop, 50 + Math.random()*35);
  } else {
    setTimeout(() => {
      let del = setInterval(() => {
        ti--;
        d.innerHTML = phrases[pi].slice(0, ti) + '<span style="opacity:.3;">|</span>';
        if(ti <= 0) {
          clearInterval(del);
          pi = (pi + 1) % phrases.length;
          setTimeout(typeLoop, 320);
        }
      }, 25);
    }, 1100);
  }
}
typeLoop();