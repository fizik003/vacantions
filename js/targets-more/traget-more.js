function getDataFromCard(className) {
  const card1 = document.querySelector(`.${className}`);
  const canvas = card1.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const percentText = card1.querySelector("#percent");
  const curentEl = card1.querySelector(".value.current-numb");
  const curentText = card1
    .querySelector(".value.current-numb .numb")
    .textContent.replace(",", "");

  const targetText = card1
    .querySelector(".value.target-numb .numb")
    .textContent.replace(",", "");
  return {
    canvas,
    ctx,
    percentText,
    curentText,
    targetText,
    curentEl,
  };
}

function drawProgress(className) {
  const {
    canvas,
    ctx,
    percentText,
    curentText,
    targetText,
    curentEl,
  } = getDataFromCard(className);

  const colors = ["#eb7272", "#b766b9", "#7384e5", "#52b1bf", "#58b38e"];

  let percent = (Number(curentText) / Number(targetText)) * 100;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  let lineWidth = 15;
  const r = x - lineWidth / 2;

  let start = -Math.PI / 2;
  let step = (2 * Math.PI * percent) / 100 / 360;
  let end = (2 * Math.PI * percent) / 100 - Math.PI / 2;
  let endStart = start + step;
  let size = 0;

  let xStart = x + Math.cos(start) * r;
  let xEnd = x + Math.cos(start + Math.PI / 2) * r;
  let yStart = y + Math.sin(start) * r;
  let yEnd = y + Math.sin(start + Math.PI / 2) * r;
  let gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
  ctx.lineWidth = lineWidth;
  // ctx.lineCap = "round";

  gradient.addColorStop(0, "#eb7272");
  gradient.addColorStop(1, "#b766b9");

  function drawBackGround() {
    ctx.beginPath();
    ctx.strokeStyle = "#e1e2e5";
    ctx.arc(x, y, r, start, start + 6.28);
    ctx.lineWidth = lineWidth - 0.5;
    ctx.stroke();
    ctx.closePath();
  }

  drawBackGround();

  function makeGradient(col, from = 0, to = 1, endGradient = Math.PI / 2) {
    start = endStart;
    xStart = x + Math.cos(start) * r;
    xEnd = x + Math.cos(start + endGradient) * r;
    yStart = y + Math.sin(start) * r;
    yEnd = y + Math.sin(start + endGradient) * r;
    gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
    gradient.addColorStop(from, col[0]);
    gradient.addColorStop(to, col[1]);
  }

  requestAnimationFrame(function inner() {
    const i = requestAnimationFrame(inner);
    if (endStart >= end) {
      cancelAnimationFrame(i);
      percentText.textContent = percent.toFixed();
      return;
    }
    let per = ((endStart + Math.PI / 2) * 100) / (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(x, y, r, start, endStart + step);
    ctx.strokeStyle = gradient;
    ctx.stroke();
    ctx.closePath();

    if (per <= 26) {
      ctx.beginPath();
      ctx.arc(x, y, r, -1.67, -1.57);
      ctx.strokeStyle = "#e1e2e5";
      ctx.lineCap = "butt";
      ctx.lineWidth = lineWidth - 1;
      ctx.stroke();
      ctx.closePath();
      ctx.lineCap = "round";
    }

    percentText.textContent = per.toFixed();
    const indexColor = Math.round(((colors.length - 1) * per) / 100);
    const color = colors[indexColor];
    curentEl.style.color = per <= 100 ? color : "#F8CE1F";

    if (per >= 25 && per <= 27) {
      makeGradient(["#b766b9", "#7384e5"]);
    }
    if (per >= 50 && per <= 52) {
      makeGradient(["#7384e5", "#52b1bf"]);
    }

    // if (per >= 75 && per <= 77) {
    //   makeGradient(["#52b1bf", "#58b38e"]);
    //   ctx.lineWidth = lineWidth + 0.2;
    // }

    if (per >= 75 && per <= 77) {
      makeGradient(["#52b1bf", "#F8CE1F"], 0.5, 1);
      ctx.lineWidth = lineWidth + 0.2;
    }
    if (per >= 105) {
      makeGradient(["#F8CE1F", "#F8CE1F"]);
      ctx.lineWidth = lineWidth + 0.3;
    }
    // if (per >= 100 && per <= 102) {
    //   makeGradient(["#58b38e", "#F8CE1F"], 0, 1, (Math.PI * 5) / 50);
    //   ctx.lineWidth = lineWidth + 0.3;
    // }
    // if (per >= 107 && per <= 109) {
    //   makeGradient(["#F8CE1F", "#F8CE1F"], "5");
    //   ctx.lineWidth = lineWidth + 0.2;
    // }
    endStart += step;
  });
}

drawProgress("monthly-target");
drawProgress("yearly-target");
