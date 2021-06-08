<template>
    <div class="container">
        <div class="item id1">
            <div class="img"></div>
            <div class="info">
                <h1>The Jungle Book</h1>
                <p>tiger</p>
                <p>bear</p>
                <p>hand</p>
                <p>face</p>
                <a href="http://image.tmdb.org/t/p/w500/9hNDhwenNsopdkBpOjxG8lmcZ6n.jpg">Source</a>
            </div>
        </div>

        <div class="item id2">
            <div class="img"></div>
            <div class="info">
                <h1>Kung Fu Panda</h1>
                <p>snake</p>
                <p>tiger</p>
                <p>monkey</p>
                <p>panda</p>
                <a href="http://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg">Source</a>
            </div>
        </div>

        <div class="item id3">
            <div class="img"></div>
            <div class="info">
                <h1>Mission: Impossible II</h1>
                <p>computer</p>
                <p>skyscraper</p>
                <p>helicopter</p>
                <p>car</p>
                <a href="http://image.tmdb.org/t/p/w500/12mI7kU22nJrmtAgGcDP8tbAz4a.jpg">Source</a>
            </div>
        </div>
        <div class="item id4">
            <div class="img"></div>
            <div class="info left">
                <h1>August Rush</h1>
                <p>guitar</p>
                <p>cello</p>
                <p>star</p>
                <p>church</p>
                <a href="http://image.tmdb.org/t/p/w500/oA6ZeICPINiS6YtD5WZeBaGVmuT.jpg">Source</a>
            </div>
        </div>
        <div class="item id5">
            <div class="img"></div>
            <div class="info left">
                <h1>Back to the Future</h1>
                <p>lightning</p>
                <p>car</p>
                <p>fish</p>
                <p>clock</p>
                <a href="http://image.tmdb.org/t/p/w500/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg">Source</a>
            </div>
        </div>
        <div class="item id6">
            <div class="img"></div>
            <div class="info left">
                <h1>The Tigger Movie</h1>
                <p>tiger</p>
                <p>owl</p>
                <p>rabbit</p>
                <p>bear</p>
                <a href="http://image.tmdb.org/t/p/w500/lxuiGvLHIL1ZyePP7bn6FcKj0Mr.jpg">Source</a>
            </div>
        </div>
        <div class="item id7">
            <div class="img"></div>
            <div class="info left">
                <h1>Kiki's Delivery Service</h1>
                <p>broom</p>
                <p>cat</p>
                <p>bicycle</p>
                <p>clock</p>
                <a href="http://image.tmdb.org/t/p/w500/7nO5DUMnGUuXrA4r2h6ESOKQRrx.jpg">Source</a>
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
  mounted() { 
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
