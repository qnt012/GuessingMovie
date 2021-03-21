<template>
    <div class="container">
        <div class="item id1">
            <div class="img"></div>
            <div class="info">
                <h1>title1</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/902906-Travel-Magazine?list=popular&offset=16">Source</a>
            </div>
        </div>

        <div class="item id2">
            <div class="img"></div>
            <div class="info">
                <h1>title2</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/887990-Canada?list=popular&offset=8">Source</a>
            </div>
        </div>

        <div class="item id3">
            <div class="img"></div>
            <div class="info">
                <h1>title3</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/887232-WIP-Artwork?list=popular&offset=5">Source</a>
            </div>
        </div>
        <div class="item id4">
            <div class="img"></div>
            <div class="info left">
                <h1>title4</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/888253-New-IOS-App-design?list=popular&offset=8">Source</a>
            </div>
        </div>
        <div class="item id5">
            <div class="img"></div>
            <div class="info left">
                <h1>title5</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/888324-6Wunderkinder-Workspace?list=popular&offset=13">Source</a>
            </div>
        </div>
        <div class="item id6">
            <div class="img"></div>
            <div class="info left">
                <h1>title6</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/905472-Dyslexia-Sexia?list=popular&offset=10">Source</a>
            </div>
        </div>
        <div class="item id7">
            <div class="img"></div>
            <div class="info left">
                <h1>title7</h1>
                <p>word1</p>
                <p>word2</p>
                <p>word3</p>
                <p>word4</p>
                <a href="http://dribbble.com/shots/905943-iOS-Icons?list=popular&offset=4">Source</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            title: '',            
            theme: '',            
            text: ''
        }
    },   
    methods: {      
  },    
  async mounted() { 
    // Some random colors
    const colors = ["#93b3b7","#eaa18a","#ffcbcb","#ffcc00","#ff9797","#3CC157", "#2AA7FF", "#FCBC0F", "#F85F36"];

    const numBalls = 700;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}%`;
      ball.style.top = `${Math.floor(Math.random() * 90)}%`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()*2}em`;
      ball.style.height = ball.style.width;
      balls.push(ball);
      document.body.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -5 : 5),
        y: Math.random() * 5
      };

      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 5000, // random duration
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });   
  },
}
</script>
