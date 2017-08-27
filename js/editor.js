'use strict';
class Editor {

  constructor() {
    this.canvas = document.getElementById("myImagesEditor");
    this.isDown = false;
    this.mouseX, this.mouseY;
    this.ctx = this.canvas.getContext("2d");
    this.startX;
    this.startY;
    this.endX;
    this.endY;
  }

  color() {
    return document.getElementById('myColor').value;
  }

  lineWidth() {
    return document.getElementById('lineWidth').value;
  }

  clearCanvas() {
    document.getElementById('clearCanvas').onclick = e => {
      return this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    };
  }

  draw(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineWidth = this.lineWidth();
    this.ctx.strokeStyle = this.color();
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  addImgToCanvas(url, defX = 0, defY = 0, sWidth, sHeight) {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      this.ctx.drawImage(img, defX, defY);
    }
  }

  imgUrl() {
    let pushImg = document.getElementById('addMyImg');
    pushImg.onclick = e => {
      let file = document.getElementById('myImg').value;
      return this.addImgToCanvas(file);
    }
  };

  events() {

    this.canvas.onmousedown = e => {
      this.isDown = true;
      this.startX = parseInt(e.layerX);
      this.startY = parseInt(e.layerY);
    }

    this.canvas.onmousemove = e => {
      if (!this.isDown) return;
    }

    this.canvas.onmouseup = e => {
      let endX = parseInt(e.layerX);
      let endY = parseInt(e.layerY);
      this.draw(endX, endY);
    }
    
    this.clearCanvas();
  }

  init() {
    this.events();
    this.imgUrl();
  }
}

const app = new Editor();
app.init();