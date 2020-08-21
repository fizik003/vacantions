const colors = ["#eb7272", "#b766b9", "#7384e5", "#52b1bf", "#58b38e"];
class ProgressBar {
  constructor(
    // percent = 0,
    colors = ["red", "blue", "green"],
    container = "canvas-wrap",
    lineWidth = 18
  ) {
    this.container = document.querySelector(`.${container}`);
    this.canvas = this.container.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.procentSpan = this.container.querySelector("#procent");
    this.currentNumbEl = this.container.querySelector(".current-numb");
    this.currentNumb = Number(
      this.currentNumbEl.children[1].innerHTML.replace(",", "")
    );
    this.targetNumb = this.container.querySelector(".target-numb .numb");

    this.targetNumb = Number(this.targetNumb.innerHTML.replace(",", ""));
    this.percent = (this.currentNumb / this.targetNumb) * 100;
    this.bigPercent = this.percent > 100 ? this.percent - 100 : 0;
    this.percent = this.percent - this.bigPercent;

    this.lineWidth = lineWidth;
    this.xc = this.canvas.width / 2;
    this.yc = this.canvas.height / 2;
    this.r = this.xc - this.lineWidth;
    this.colors = colors;
    this.ctx.lineCap = "round";
    this.colorsNumber = Math.ceil(
      (this.percent * (this.colors.length - 1)) / 100
    );
    this.partLength = (Math.PI * 2 * this.percent) / 100 / this.colorsNumber;
    this.start = (Math.PI / 180) * 270;
    this.procentSpan.textContent = (this.percent + this.bigPercent).toFixed();
    this.ctx.lineCap = "round";
    this.backColor = "#e1e2e5";
    console.log(this.canvas.width / 2);
  }

  drawBackGround() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.backColor;
    this.ctx.arc(this.xc, this.yc, this.r, this.start, this.start + 6.28);
    this.ctx.lineWidth = this.lineWidth - 0.5;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawGradient() {
    for (let i = 0; i < this.colorsNumber; i += 1) {
      let startColor = this.colors[i];
      let endColor = this.colors[i + 1];
      this.currentNumbEl.style.color = this.colors[i + 1];
      let xStart = this.xc + Math.cos(this.start) * this.r;
      let xEnd = this.xc + Math.cos(this.start + this.partLength) * this.r;
      let yStart = this.yc + Math.sin(this.start) * this.r;
      let yEnd = this.yc + Math.sin(this.start + this.partLength) * this.r;
      let gradient = this.ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1.0, endColor);
      this.ctx.beginPath();
      this.ctx.strokeStyle = gradient;
      this.ctx.arc(
        this.xc,
        this.yc,
        this.r,
        this.start,
        this.start + this.partLength
      );
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke();
      this.ctx.closePath();
      this.start += this.partLength;
    }

    const start = (Math.PI / 180) * 270;

    if (this.bigPercent) {
      let xStart = this.xc + Math.cos(start) * this.r;
      let xEnd =
        this.xc + Math.cos(start + (6.28 * this.bigPercent) / 100) * this.r;
      let yStart = this.yc + Math.sin(start) * this.r;
      let yEnd =
        this.yc + Math.sin(start + (6.28 * this.bigPercent) / 100) * this.r;
      let gradient = this.ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
      gradient.addColorStop(0, "#58b38e");
      gradient.addColorStop(0.01, "#eece4d");
      this.ctx.beginPath();
      this.ctx.strokeStyle = gradient;
      this.ctx.arc(
        this.xc,
        this.yc,
        this.r,
        start,
        start + (6.28 * this.bigPercent) / 100
      );
      this.ctx.lineWidth = this.lineWidth + 0.9;
      this.ctx.strokeStyle = gradient;
      this.ctx.stroke();
      this.ctx.closePath();
      this.currentNumbEl.style.color = "#eece4d";
    }
  }
}

const a = new ProgressBar(colors, "monthly-target");
a.drawBackGround();
a.drawGradient();

const b = new ProgressBar(colors, "yearly-target");
b.drawBackGround();
b.drawGradient();
