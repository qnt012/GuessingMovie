<template>
  <div>
    <div class="board-wrapper" :style="boardStyle">
      <div class="back"></div>
      <div class="draw-area">
        <canvas
          id="canvas"
          ref="canvas"
          :width="width"
          :height="height"
        ></canvas>
        <canvas
          id="cursor"
          ref="cursor"
          :width="width"
          :height="height"
        ></canvas>
      </div>
      <ul class="tools">
        <li id="tool-erase" @click="eraseALl()">
          <button class="tools-icon-btn">
            <i class="fas fa-eraser"></i>
          </button>
        </li>
        <li id="tool-undo" @click="undoDraw()">
          <button class="tools-icon-btn">
            <i class="fas fa-undo-alt"></i>
          </button>
        </li>
        <li id="tool-redo" @click="redoDraw()">
          <button class="tools-icon-btn" :disabled="!undoPoints.length">
            <i class="fas fa-redo-alt"></i>
          </button>
        </li>
        <li id="tool-download" @click="download()">
          <button class="tools-icon-btn">
            <i class="fas fa-download"></i>
          </button>
        </li>
        <li id="tool-predict" @click="predict">
          <button class="tools-icon-btn">P</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as tf from "@tensorflow/tfjs";
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
export default {
  props: {
    width: {
      type: Number,
      default: 700,
      //default: screen.width - 100
    },
    height: {
      type: Number,
      default: 700,
      //default: screen.height - Number(screen.height) / 100 * 35
    },
    outputName: {
      type: String,
      default: "canvas",
    },
  },
  data() {
    return {
      class_names: [
        "aircraft_carrier",
        "airplane",
        "alarm_clock",
        "ambulance",
        "angel",
        "animal_migration",
        "ant",
        "anvil",
        "apple",
        "arm",
        "asparagus",
        "axe",
        "backpack",
        "banana",
        "bandage",
        "barn",
        "baseball",
        "baseball_bat",
        "basket",
        "basketball",
        "bat",
        "bathtub",
        "beach",
        "bear",
        "beard",
        "bed",
        "bee",
        "belt",
        "bench",
        "bicycle",
        "binoculars",
        "bird",
        "birthday_cake",
        "blackberry",
        "blueberry",
        "book",
        "boomerang",
        "bottlecap",
        "bowtie",
        "bracelet",
        "brain",
        "bread",
        "bridge",
        "broccoli",
        "broom",
        "bucket",
        "bulldozer",
        "bus",
        "bush",
        "butterfly",
        "cactus",
        "cake",
        "calculator",
        "calendar",
        "camel",
        "camera",
        "camouflage",
        "campfire",
        "candle",
        "cannon",
        "canoe",
        "car",
        "carrot",
        "castle",
        "cat",
        "ceiling_fan",
        "cello",
        "cell_phone",
        "chair",
        "chandelier",
        "church",
        "circle",
        "clarinet",
        "clock",
        "cloud",
        "coffee_cup",
        "compass",
        "computer",
        "cookie",
        "cooler",
        "couch",
        "cow",
        "crab",
        "crayon",
        "crocodile",
        "crown",
        "cruise_ship",
        "cup",
        "diamond",
        "dishwasher",
        "diving_board",
        "dog",
        "dolphin",
        "donut",
        "door",
        "dragon",
        "dresser",
        "drill",
        "drums",
        "duck",
        "dumbbell",
        "ear",
        "elbow",
        "elephant",
        "envelope",
        "eraser",
        "eye",
        "eyeglasses",
        "face",
        "fan",
        "feather",
        "fence",
        "finger",
        "fireplace",
        "firetruck",
        "fire_hydrant",
        "fish",
        "flamingo",
        "flashlight",
        "flip_flops",
        "floor_lamp",
        "flower",
        "flying_saucer",
        "foot",
        "fork",
        "frog",
        "frying_pan",
        "garden",
        "garden_hose",
        "giraffe",
        "goatee",
        "golf_club",
        "grapes",
        "grass",
        "guitar",
        "hamburger",
        "hammer",
        "hand",
        "harp",
        "hat",
        "headphones",
        "hedgehog",
        "helicopter",
        "helmet",
        "hexagon",
        "hockey_puck",
        "hockey_stick",
        "horse",
        "hospital",
        "hot_air_balloon",
        "hot_dog",
        "hot_tub",
        "hourglass",
        "house",
        "house_plant",
        "hurricane",
        "ice_cream",
        "jacket",
        "jail",
        "kangaroo",
        "key",
        "keyboard",
        "knee",
        "knife",
        "ladder",
        "lantern",
        "laptop",
        "leaf",
        "leg",
        "lighter",
        "lighthouse",
        "lightning",
        "light_bulb",
        "line",
        "lion",
        "lipstick",
        "lobster",
        "lollipop",
        "mailbox",
        "map",
        "marker",
        "matches",
        "megaphone",
        "mermaid",
        "microphone",
        "microwave",
        "monkey",
        "moon",
        "mosquito",
        "motorbike",
        "mountain",
        "mouse",
        "moustache",
        "mouth",
        "mug",
        "mushroom",
        "nail",
        "necklace",
        "nose",
        "ocean",
        "octagon",
        "octopus",
        "onion",
        "oven",
        "owl",
        "paintbrush",
        "paint_can",
        "palm_tree",
        "panda",
        "pants",
        "paper_clip",
        "parachute",
        "parrot",
        "passport",
        "peanut",
        "pear",
        "peas",
        "pencil",
        "penguin",
        "piano",
        "pickup_truck",
        "picture_frame",
        "pig",
        "pillow",
        "pineapple",
        "pizza",
        "pliers",
        "police_car",
        "pond",
        "pool",
        "popsicle",
        "postcard",
        "potato",
        "power_outlet",
        "purse",
        "rabbit",
        "raccoon",
        "radio",
        "rain",
        "rainbow",
        "rake",
        "remote_control",
        "rhinoceros",
        "rifle",
        "river",
        "rollerskates",
        "roller_coaster",
        "sailboat",
        "sandwich",
        "saw",
        "saxophone",
        "school_bus",
        "scissors",
        "scorpion",
        "screwdriver",
        "sea_turtle",
        "see_saw",
        "shark",
        "sheep",
        "shoe",
        "shorts",
        "shovel",
        "sink",
        "skateboard",
        "skull",
        "skyscraper",
        "sleeping_bag",
        "smiley_face",
        "snail",
        "snake",
        "snorkel",
        "snowflake",
        "snowman",
        "soccer_ball",
        "sock",
        "speedboat",
        "spider",
        "spoon",
        "spreadsheet",
        "square",
        "squiggle",
        "squirrel",
        "stairs",
        "star",
        "steak",
        "stereo",
        "stethoscope",
        "stitches",
        "stop_sign",
        "stove",
        "strawberry",
        "streetlight",
        "string_bean",
        "submarine",
        "suitcase",
        "sun",
        "swan",
        "sweater",
        "swing_set",
        "sword",
        "syringe",
        "t-shirt",
        "table",
        "teapot",
        "teddy-bear",
        "telephone",
        "television",
        "tennis_racquet",
        "tent",
        "The_Eiffel_Tower",
        "The_Great_Wall_of_China",
        "The_Mona_Lisa",
        "tiger",
        "toaster",
        "toe",
        "toilet",
        "tooth",
        "toothbrush",
        "toothpaste",
        "tornado",
        "tractor",
        "traffic_light",
        "train",
        "tree",
        "triangle",
        "trombone",
        "truck",
        "trumpet",
        "umbrella",
        "underwear",
        "van",
        "vase",
        "violin",
        "washing_machine",
        "watermelon",
        "waterslide",
        "whale",
        "wheel",
        "windmill",
        "wine_bottle",
        "wine_glass",
        "wristwatch",
        "yoga",
        "zebra",
        "zigzag",
      ],
      model: null,
      firebase_movieDB: "",
      canvasCtx: null,
      cursorCtx: null,
      isDrawing: false,
      brushSize: 35,
      lastX: 0,
      lastY: 0,
      points: [],
      tools: [
        {
          name: "Pencil",
          color: "black",
        },
        {
          name: "Eraser",
        },
      ],
      selectedToolIdx: 0,
      undoPoints: [],
      p: false,
    };
  },
  computed: {
    boardStyle() {
      return {
        color: "white",
        height: `${this.height}px`,
        width: `${this.width + 30}px`,
        "grid-template-columns": `${this.width}px 50px`,
      };
    },
  },
  async mounted() {
    this.readOne();
    this.model = await tf.loadLayersModel(
      "https://storage.googleapis.com/guessing_movie_345/model.json"
    );
    console.log(this.model);
    this.setCanvas();
    this.bindEvents();
  },
  methods: {
    async readOne() {
      //once() : 한번만 읽음. DB내에서 바꿔도 내용이 바뀌지 않음.
      const movieDB = await this.$firebase.database().ref("movie");
      movieDB.on("value", (snapshot) => {
        this.firebase_movieDB = snapshot.val();
        console.log(this.firebase_movieDB[13]); // this.firebase_movieDB[0].keyword
        this.$emit("movieGet", this.firebase_movieDB);
      });
    },
    async predict() {
      this.p = true;
      var src = this.canvasCtx.getImageData(0, 0, 700, 700);
      var data = src.data;
      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      var c = this.preprocessCanvas(src);
      console.log(c.data());
      var p = await this.model.predict(c).data();
      var t = p.slice();
      console.log(p);
      t.sort(function (a, b) {
        return b - a;
      });
      console.log(t);
      var candi = [];
      for (var j = 0; j < 5; j++) {
        candi.push(this.class_names[p.indexOf(t[j])]);
      }
      this.$emit("candiGet", candi);
    },
    preprocessCanvas(canvas) {
      let tensor = tf
        .fromPixels(canvas) // Shape: (300, 300, 3) - RGB image
        .resizeNearestNeighbor([28, 28]) // Shape: (28, 28, 3) - RGB image
        .mean(2) // Shape: (28, 28) - grayscale
        .expandDims(2) // Shape: (28, 28, 1) - network expects 3d values with channels in the last dimension
        .expandDims() // Shape: (1, 28, 28, 1) - network makes predictions for "batches" of images
        .toFloat(); // Network works with floating points inputs
      return tensor.div(255.0); // Normalize [0..255] values into [0..1] range
    },
    setCanvas() {
      this.canvasCtx = this.$refs.canvas.getContext("2d");
      this.canvasCtx.lineJoin = "round";
      this.canvasCtx.lineCap = "round";
      this.canvasCtx.strokeStyle = this.tools[this.selectedToolIdx].color;
      this.cursorCtx = this.$refs.cursor.getContext("2d");
    },
    bindEvents() {
      this.$refs.canvas.addEventListener("mousedown", (event) => {
        this.p = false;
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
      if (!this.isDrawing) return;
      const point = {
        event,
        lastX: this.lastX,
        lastY: this.lastY,
        brushSize: this.brushSize,
        selectedToolIdx: this.selectedToolIdx,
        color: this.tools[this.selectedToolIdx].color,
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
      this.canvasCtx.fillStyle = "white";
      this.canvasCtx.fillRect(0, 0, 700, 700);
      this.points.forEach((point) => {
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
    },
  },
};
</script>