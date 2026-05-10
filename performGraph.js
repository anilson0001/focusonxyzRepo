
function createCircularGraph(indexer, color)
{
    return  "<div id=\"divCircle_" + indexer + "\" class=\"circle\">" + 
                "<svg id=\"svgCircle_" + indexer + "\" class=\"svgCircle\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">" +
                    "<circle cx=\"25\" cy=\"25\" r=\"20\" style=\"stroke-dasharray:125.664; stroke-dashoffset:0; stroke:#cccccc\"></circle>" +
                    "<circle id=\"Circle_" + indexer + "\" stroke-linecap=\"round\"></circle>" +
                    "<text id=\"textCircle_" + indexer + "\" stroke-width=\"0\"  text-anchor=\"middle\" alignment-baseline=\"middle\"></text>" +
                "</svg>" +
            "</div>";
/*
    return  "<div id=\"divCircle" + indexer + "\" class=\"circle\">" + 
                "<svg id=\"svgCircle" + indexer + "\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">" +
                    "<circle id=\"Circle" + indexer + "\" stroke-linecap=\"round\"></circle>" +
                    "<text id=\"textCircle" + indexer + "\" stroke-width=\"0\"  text-anchor=\"middle\" alignment-baseline=\"middle\"></text>" +
                "</svg>" +
            "</div>";
*/
}


function setCircleAttribute(circleID, pDiv, vpw, vph, vb, r, percent, cColor, foot) 
{
   let pdiv = document.getElementById(`div${circleID}`);
   let svgc = document.getElementById(`svg${circleID}`);
   let c = document.getElementById(`${circleID}`);
   let tc = document.getElementById(`text${circleID}`);
   
   let cx = Number(vpw)/2;
   let cy = Number(vph)/2;
   
   pdiv.style.left = `${pDiv}px`;

   svgc.setAttribute("viewBox", `${vb}`);
   svgc.setAttribute("height", `${vph}px`);
   svgc.setAttribute("width", `${vpw}px`);
   
   c.setAttribute("cx", `${cx}`);
   c.setAttribute("cy", `${cy}`);
   c.setAttribute("r", `${r}`);
   
   svgc.style.stroke = cColor;
   
   
   tc.setAttribute("x", `${cx}`);
   tc.setAttribute("y", `${cy}`);
   
   updateCircle(circleID, percent); 
   
   if(foot)
   {    tc.classList.add("footCircleText"); }
   else
   {    tc.classList.add("headCircleText"); }
}




function updateCircle(circleID, percentage) 
{
    let thisCircle = document.getElementById(circleID);
    let circleRadius = thisCircle.getAttribute("r");
    let circleCircumference = 2 * Math.PI * circleRadius;
    let offsetPercentage = ((100 - percentage) / 100) * circleCircumference;

    thisCircle.style.strokeDasharray = `${circleCircumference}`;
    thisCircle.style.strokeDashoffset = `${offsetPercentage}`;
/*
    document.getElementById(`text${circleID}`).textContent = `<tspan x="25" dy="0">${points}</tspan>
                                                              <tspan x="25" dy="10">pts</tspan>`;

    document.getElementById(`text${circleID}`).innerHTML = `<tspan x="25" dy="0">${(kpi*100).toFixed(2)}%</tspan>
                                                              <tspan x="25" dy="10">kp</tspan>`;
*/                                                              
    document.getElementById(`text${circleID}`).innerHTML = `<tspan x="25" dy="0">${percentage}%</tspan>`;     
}


