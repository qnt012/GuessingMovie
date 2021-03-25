<template>
  <div>
    <div v-show="showSlider" class="slider-div">
      <div class="value">
        {{brushSize}}
      </div>
      <input type="range" min="1" max="100" v-model="brushSize" class="slider" id="myRange">
    </div>
    <div
    class="board-wrapper"
    :style="boardStyle">
      <div
      class="draw-area">
        <canvas id="canvas" ref="canvas" :width="width" :height="height"></canvas>
        <canvas id="cursor" ref="cursor" :width="width" :height="height"></canvas>
      </div>
      <ul class="tools">
        <li id="tool-pencil" :class="{ active: selectedToolIdx === 0 }" @click="changeTool(0)">
          <button class="tools-icon-btn" :class="{ active: selectedToolIdx === 0 }">
            <i class="fas fa-pencil-alt"></i>
          </button>
        </li>
        <li id="tool-download" @click="eraseALl()">
          <button class="tools-icon-btn">
            <i class="fas fa-eraser"></i>
          </button>
        </li>
        <li id="tool-download" @click="undoDraw()">
          <button class="tools-icon-btn">
            <i class="fas fa-undo-alt"></i>
          </button>
        </li>
        <li id="tool-download" @click="redoDraw()">
          <button class="tools-icon-btn" :disabled="!undoPoints.length">
            <i class="fas fa-redo-alt"></i>
          </button>
        </li>
        <li id="tool-download" @click="download()">
          <button class="tools-icon-btn">
            <i class="fas fa-download"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
export default {
  props: {
    width: {
      type: Number,
      default: 800
      //default: screen.width - 100
    },
    height: {
      type: Number,
      default: 700
      //default: screen.height - Number(screen.height) / 100 * 35
    },
    outputName: {
      type: String,
      default: "canvas"
    }
  },
  data() {
    return {
      showSlider: false,
      canvasCtx: null,
      cursorCtx: null,
      isDrawing: false,
      brushSize: 5,
      lastX: 0,
      lastY: 0,
      points: [],
      tools: [
        {
          name: "Pencil",
          color: "#000000"
        },
        {
          name: "Eraser"
        }
      ],
      selectedToolIdx: 0,
      undoPoints: []
    };
  },
  computed: {
    boardStyle() {
      return {
        color: "red",
        height: `${this.height}px`,
        width: `${this.width + 30}px`,
        "grid-template-columns": `${this.width}px 50px`
      };
    }
  },
  mounted() {
    this.setCanvas();
    this.bindEvents();
  },
  methods: {
    setCanvas() {
      this.canvasCtx = this.$refs.canvas.getContext("2d");
      this.canvasCtx.lineJoin = "round";
      this.canvasCtx.lineCap = "round";
      this.canvasCtx.strokeStyle = this.tools[this.selectedToolIdx].color;
      this.cursorCtx = this.$refs.cursor.getContext("2d");
    },
    bindEvents() {
      this.$refs.canvas.addEventListener("mousedown", event => {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
      });
      this.$refs.canvas.addEventListener("mousemove", this.handleMouseMove);
      this.$refs.canvas.addEventListener(
        "mouseup",
        () => (this.isDrawing = false)
      );
      this.$refs.canvas.addEventListener(
        "mouseout",
        () => (this.isDrawing = false)
      );
    },
    changeTool(tool) {
      this.selectedToolIdx = tool;
    },
    handleMouseMove(event) {
      this.drawCursor(event);
      if (!this.isDrawing || this.showSlider) return;
      const point = {
        event,
        lastX: this.lastX,
        lastY: this.lastY,
        brushSize: this.brushSize,
        selectedToolIdx: this.selectedToolIdx,
        color: this.tools[this.selectedToolIdx].color
      };
      this.points.push(point);
      this.redrawAll();
    },
    undoDraw() {
      const len = this.points.length;
      if (!len) return;
      const point = this.points.pop();
      this.undoPoints.push(point);
      this.redrawAll();
    },
    redoDraw() {
      const len = this.undoPoints.length;
      if (!len) return;
      const point = this.undoPoints.pop();
      this.points.push(point);
      this.redrawAll();
    },
    redrawAll() {
      this.canvasCtx.clearRect(0, 0, this.width, this.height);
      this.points.forEach(point => {
        if (this.tools[point.selectedToolIdx].name === "Eraser") {
          this.canvasCtx.globalCompositeOperation = "destination-out";
        } else {
          this.canvasCtx.globalCompositeOperation = "source-over";
          this.canvasCtx.strokeStyle = point.color;
        }
        this.canvasCtx.lineWidth = point.brushSize;
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(point.lastX, point.lastY);
        this.canvasCtx.lineTo(point.event.offsetX, point.event.offsetY);
        this.canvasCtx.stroke();
        [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
      });
    },
    drawCursor(event) {
      this.cursorCtx.beginPath();
      this.cursorCtx.ellipse(
        event.offsetX,
        event.offsetY,
        this.brushSize * 0.65,
        this.brushSize * 0.65,
        Math.PI / 4,
        0,
        2 * Math.PI
      );
      this.cursorCtx.stroke();
      setTimeout(() => {
        this.cursorCtx.clearRect(0, 0, this.width, this.height);
      }, 10);
    },
    showColorPalette() {
      const colorPalette = document.createElement("input");
      colorPalette.addEventListener("change", event => {
        this.tools[0].color = event.target.value;
      });
      colorPalette.type = "color";
      colorPalette.value = this.tools[0].color;
      colorPalette.click();
    },
    download() {
      const link = document.createElement("a");
      link.download = `${this.outputName}.png`;
      link.href = this.$refs.canvas.toDataURL();
      link.click();
    },
    eraseALl() {
      this.points = [];
      this.undoPoints = [];
      this.changeTool(0);
      this.canvasCtx.clearRect(0, 0, this.width, this.height);
    }
  }
};
</script>