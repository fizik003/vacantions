const colors = ["#eb7272", "#b766b9", "#7384e5", "#52b1bf", "#58b38e"];
class ProgressBar {
  constructor(
    percent = 0,
    colors = ["red", "blue", "green"],
    container = "canvas-wrap",
    lineWidth = 12
  ) {
    this.container = document.querySelector(`.${container}`);
    this.canvas = this.container.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.bigPercent = percent > 100 ? percent - 100 : 0;
    this.percent = percent - this.bigPercent;

    this.procentSpan = this.container.querySelector("#procent");
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
    this.gradient = null;
    this.startColor = null;
    this.endColor = null;
    this.procentSpan.textContent = (this.percent + this.bigPercent).toFixed();
    this.ctx.lineCap = "round";
    this.backColor = "#e1e2e5";
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
      this.startColor = this.colors[i];
      this.endColor = this.colors[i + 1];
      let xStart = this.xc + Math.cos(this.start) * this.r;
      let xEnd = this.xc + Math.cos(this.start + this.partLength) * this.r;
      let yStart = this.yc + Math.sin(this.start) * this.r;
      let yEnd = this.yc + Math.sin(this.start + this.partLength) * this.r;
      this.gradient = this.ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
      this.gradient.addColorStop(0, this.startColor);
      this.gradient.addColorStop(1.0, this.endColor);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.gradient;
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
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.gradient;
      this.ctx.arc(
        this.xc,
        this.yc,
        this.r,
        start,
        start + (6.28 * this.bigPercent) / 100
      );
      this.ctx.lineWidth = this.lineWidth + 0.9;
      this.ctx.strokeStyle = "#eece4d";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}

const a = new ProgressBar(110, colors);
a.drawBackGround();
a.drawGradient();
