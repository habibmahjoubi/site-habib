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
//JS animé pour outils
const canvasTools = document.getElementById('tools-canvas');
if(canvasTools){
  const ctxTools = canvasTools.getContext('2d');
  canvasTools.width = 260; 
  canvasTools.height = 110;

  // Exemple : animation d'un petit graphique/heatmap/scatter
  let ticks = 0;
  function drawToolsAnim(){
    ctxTools.clearRect(0,0,260,110);

    // Axes du "graphe"
    ctxTools.strokeStyle = "#11bba8";
    ctxTools.lineWidth = 2.2;
    ctxTools.beginPath();
    ctxTools.moveTo(32,90);
    ctxTools.lineTo(220,90);  // X axis
    ctxTools.moveTo(32,90);
    ctxTools.lineTo(32,30);  // Y axis
    ctxTools.stroke();

    // Petits points data "scatter"
    for(let i=0;i<8;i++){
      let x = 32 + i*25;
      let y = 90 - (45+28*Math.sin((i+ticks/24)*.72));
      ctxTools.beginPath();
      ctxTools.arc(x, y, 7, 0, 6.3);
      ctxTools.fillStyle = i%2 ? "#0fa" : "#ffc905";
      ctxTools.globalAlpha = .65 + .28*Math.sin(ticks/17+i);
      ctxTools.fill();
    }
    ctxTools.globalAlpha = 1;

    // Légende
    ctxTools.font = "bold 13px monospace";
    ctxTools.fillStyle = "#247a95";
    ctxTools.fillText("DATA", 202, 104);
    ctxTools.font = "bold 10.5px Arial";
    ctxTools.fillStyle = "#11bba8";
    ctxTools.fillText("Visualisation", 39, 32);

    ticks++;
    requestAnimationFrame(drawToolsAnim);
  }
  drawToolsAnim();
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

//adapttion triskel compétences page d'accueil
function adaptTriskel() {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const bulles = document.querySelectorAll('.triskel-bulle');
  const base = vw < 505 ? Math.max(46, vw * 0.18) : vw < 800 ? Math.max(60, vw*0.12) : 78;

  bulles.forEach(bulle => {
    bulle.style.width  = base + "px";
    bulle.style.height = base + "px";
    bulle.style.fontSize = (base/80*1.07) + "em";
    bulle.querySelector('i').style.fontSize = (base/1.8) + "px";
    // keyword 
    let kw = bulle.querySelector('.triskel-keyword');
    if(kw) kw.style.fontSize = (base/82*1.06) + "em";
    let mini = bulle.querySelector('.triskel-mini');
    if(mini) mini.style.fontSize = (base/95*1.04) + "em";
  });
}
window.addEventListener("resize", adaptTriskel);
window.addEventListener("DOMContentLoaded", adaptTriskel);

//JS pour modale outils
// Afficher le modal quand on clique sur "essayer" (chart-bar)
function loadCSV(input) {
  if (!input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    let txt = e.target.result;
    txt = txt.replaceAll(';',' ').replaceAll(',',' ');
    document.getElementById('datamatrix').value = txt;
  };
  reader.readAsText(input.files[0]);
}

function parseBioMatrix(txt) {
  let rows = txt.trim().split('\n').filter(Boolean);
  let cols = rows[0].split(/[\t,; ]+/).slice(1);
  let y = [], z = [];
  for(let i=1;i<rows.length;i++) {
    let parts = rows[i].split(/[\t,; ]+/).filter(Boolean);
    y.push(parts[0]);
    z.push(parts.slice(1).map(Number));
  }
  return {x:cols, y:y, z:z};
}

function mean(nums) {
  let n = nums.length;
  return (n>0) ? nums.reduce((a, b) => a + b, 0) / n : 0;
}
function std(nums, m) {
  let n = nums.length;
  return n>0 ? Math.sqrt(nums.reduce((a, b) => a + Math.pow(b - m, 2), 0) / n) : 0;
}

// Calcule R2 pour la première série
function calcR2(x, y) {
  let avgY = mean(y), n = y.length;
  let ssTotal = y.reduce((a,yi) => a + Math.pow(yi - avgY, 2),0);
  let m = (y[n-1]-y[0])/(x[n-1]-(x[0]));
  let b = y[0] - m*x[0];
  let ssRes = 0;
  for(let i=0;i<n;i++) {
    let yi_hat = m*x[i]+b;
    ssRes += Math.pow(y[i] - yi_hat,2);
  }
  return ssTotal ? 1 - (ssRes/ssTotal) : 0;
}

function drawViz() {
  let txt = document.getElementById('datamatrix').value;
  let type = document.getElementById('viz-type').value;
  let title = document.getElementById("viz-title").value.trim();
  let xaxis = document.getElementById("viz-xaxis").value.trim();
  let yaxis = document.getElementById("viz-yaxis").value.trim();
  let notes = document.getElementById("viz-notes").value.trim();
  if(!txt.trim()) return false;
  let {x, y, z} = parseBioMatrix(txt);
  if(x.length === 0 || y.length === 0) return false;
  let cmin = document.getElementById('color-min').value;
  let cmax = document.getElementById('color-max').value;
  let plotDiv = document.getElementById('dataviz-plot');
  let infoDiv = document.getElementById('dataviz-info');
  let notesDiv = document.getElementById('viz-notes-display');
  let config = {responsive:true,toImageButtonOptions:{filename:"dataviz"}};
  let data = [], layout={}, hovertemplate='', showlegend=true, addInfo = '';

  if(type === "heatmap") {
    data = [{
      z:z, x:x, y:y, type:'heatmap', colorscale:[[0,cmin],[1,cmax]],
      colorbar:{title:yaxis||"Valeur"}, zmin:Math.min(...z.flat()), zmax:Math.max(...z.flat())
    }];
    layout = {
      title: title||"Heatmap",
      margin:{t:45,r:5,l:65,b:30},
      yaxis:{automargin:true, title:yaxis||'Gene'},
      xaxis:{title:xaxis||'Expériences'},
      hovermode:'closest'
    };
    showlegend = false;
  } else if(type==="bar") {
    if(z.length==1) {
      let stat = calcFastStats(z[0]);
      hovertemplate = "Valeur : %{y}<br>Moyenne : "+stat.mean.toFixed(2)+"<br>Écart-type : "+stat.std.toFixed(2)+"<extra></extra>";
      addInfo = `Moyenne : <b>${stat.mean.toFixed(2)}</b> &mdash; Écart-type : <b>${stat.std.toFixed(2)}</b>`;
      data = [{
        x: x, y: z[0], type: "bar", marker:{color:cmax},
        hovertemplate, name:y[0], text: stat.mean.toFixed(2), textposition: 'auto'
      }];
    } else {
      data = y.map((gene,i)=>{
        let stat = calcFastStats(z[i]);
        addInfo += `<b>${gene}</b> : Moyenne=${stat.mean.toFixed(2)}, Écart-type=${stat.std.toFixed(2)}<br>`;
        return {
          x: x, y: z[i], type:'bar', name:gene,
          marker:{color:cmax},
          hovertemplate:"Valeur : %{y}<br>Moyenne : "+stat.mean.toFixed(2)+"<br>Écart-type : "+stat.std.toFixed(2)+"<extra></extra>",
        }
      });
      layout = {barmode:'group'};
    }
    layout = Object.assign(layout, {
      title: title||"Barplot",
      margin:{t:45,r:5,l:48,b:30},
      yaxis:{automargin:true, title:yaxis||'Y'},
      xaxis:{title:xaxis||'X'}
    });
  } else if(type==="scatter" || type==="line") {
    data = y.map((gene,i)=>{
      let stat = calcFastStats(z[i]); let r2 = calcR2(x.map(Number),z[i]);
      addInfo += `<b>${gene}</b> : Moyenne=${stat.mean.toFixed(2)}, Écart-type=${stat.std.toFixed(2)}, R²=${r2.toFixed(2)}<br>`;
      return {
        x: x,
        y: z[i],
        type:'scatter',
        mode: (type==="line"?"lines":"lines+markers"),
        name: gene,
        marker:{size:10,color:cmax},
        hovertemplate:"Valeur : %{y}<br>Moyenne : "+stat.mean.toFixed(2)
        +"<br>Écart-type : "+stat.std.toFixed(2)
        +"<br>R² : "+r2.toFixed(2)+"<extra></extra>"
      }
    });
    layout = {
      title: title||(type==="line"?"Courbe linéaire":"Scatterplot"),
      margin:{t:45,r:5,l:48,b:30},
      yaxis:{automargin:true,title:yaxis||'Y'},
      xaxis:{title:xaxis||'X'}
    }
  } else if(type==="box") {
    data = [];
    for(let i=0;i<x.length;i++) {
      let vals = z.map(row=>row[i]);
      let stat = calcFastStats(vals);
      addInfo += `<b>${x[i]}</b> : Moyenne=${stat.mean.toFixed(2)}, SD=${stat.std.toFixed(2)}, Min=${stat.min.toFixed(2)}, Max=${stat.max.toFixed(2)}<br>`;
      data.push({
        y: vals, name: x[i], type: "box", marker:{color:cmin},
        boxmean: true,
        hovertemplate: "Médiane : %{median}<br>Moyenne : "
          +stat.mean.toFixed(2)+"<br>Écart-type : "
          +stat.std.toFixed(2)+"<br>Min : "+stat.min.toFixed(2)+"<br>Max : "
          +stat.max.toFixed(2)+"<extra></extra>"
      });
    }
    layout = {
      title: title||"Boxplot",
      margin:{t:45,r:5,l:45,b:30},
      yaxis:{automargin:true, title:yaxis||'Y'},
      xaxis:{title:xaxis||'X'}
    };
    showlegend = false;
  } else if(type==="hist") {
    let all = z.flat(), stat = calcFastStats(all);
    addInfo = `Moyenne : <b>${stat.mean.toFixed(2)}</b> &mdash; SD : <b>${stat.std.toFixed(2)}</b> &mdash; Min : <b>${stat.min.toFixed(2)}</b> &mdash; Max : <b>${stat.max.toFixed(2)}</b>`;
    data = [{
      x: all, type:'histogram', marker:{color:cmax},
      nbinsx:10,
      hovertemplate: "n=%{y}<br>Moyenne : "+stat.mean.toFixed(2)+"<br>Écart-type : "+stat.std.toFixed(2)
    }];
    layout = {
      title: title||"Histogramme",
      margin:{t:45,r:5,l:45,b:30},
      yaxis:{automargin:true, title:yaxis||'Y'},
      xaxis:{title:xaxis||'X'}
    };
    showlegend = false;
  }
  layout.showlegend = showlegend;
  Plotly.newPlot(plotDiv, data, layout, {responsive:true});
  document.getElementById('btn-download').style.display = '';
  document.getElementById('dataviz-info').innerHTML = addInfo;
  document.getElementById('viz-notes-display').style.display = notes ? "" : "none";
  document.getElementById('viz-notes-display').innerHTML = notes ? '<b>Note :</b> ' + notes : '';
  return false;
}
function savePlot() {
  Plotly.downloadImage('dataviz-plot', {format:"png", filename:"dataviz"});
}
function calcFastStats(arr){
  let n=arr.length,mean=n>0?arr.reduce((a,b)=>a+Number(b),0)/n:0;
  let std=n>0?Math.sqrt(arr.reduce((a,b)=>a+Math.pow(Number(b)-mean,2),0)/n):0;
  let min=Math.min(...arr),max=Math.max(...arr); return {mean,std,min,max};
}
function calcR2(x, y) {
  let avgY = mean(y), n = y.length;
  let ssTotal = y.reduce((a,yi) => a + Math.pow(yi - avgY, 2),0);
  let m = (y[n-1]-y[0])/(x[n-1]-(x[0]));
  let b = y[0] - m*x[0];
  let ssRes = 0;
  for(let i=0;i<n;i++) {
    let yi_hat = m*x[i]+b;
    ssRes += Math.pow(y[i] - yi_hat,2);
  }
  return ssTotal ? 1 - (ssRes/ssTotal) : 0;
}