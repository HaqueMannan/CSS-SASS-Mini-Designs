// let p;
let particles = [];

// Do not need to call on the functions manually. They get called automatically. Setup gets called once while draw gets called continuously.

function setup() {
   createCanvas(window.innerWidth, window.innerHeight);
   // console.log(random(100));
   // console.log(width, height);

   // p = new Particle();

   const particlesLength = Math.floor(window.innerWidth / 10);
   for(let i = 0 ; i < particlesLength; i++) {
      particles.push(new Particle());
   };
};

// Example 1:
// function draw() {
//    if(mouseIsPressed) {
//       console.log(mouseX, mouseY);

//       fill(0);
//    } else {
//       fill(100);
//    };

//    // circle(150, 150, 80);
//    circle(mouseX, mouseY, 80);
// };

function draw() {
   background(55, 100, 144);
   // p.update();
   // p.draw();

   particles.forEach((p, index) => {
      p.update();
      p.drawParticle();
      p.checkParticles(particles.slice(index));
   });
};

class Particle {
   constructor() {
      // Position:
      // this.pos = createVector(x, y);
      this.pos = createVector(random(width), random(height));

      // Velocity (movement):
      this.vel = createVector(random(-2, 2), random(-2, 2));

      // Size:
      this.size = 10;
   };

   // Update movement by adding velocity:
   update() {
      this.pos.add(this.vel);
      this.edges();
   };

   // Draw single particle:
   drawParticle() {
      noStroke();
      fill('rgba(255, 255, 255, 0.5)');
      circle(this.pos.x, this.pos.y, this.size);
   };

   // Detect edges:
   edges() {
      if(this.pos.x < 0 || this.pos.x > width) {
         this.vel.x *= -1;
      };

      if(this.pos.y < 0 || this.pos.y > height) {
         this.vel.y *= -1;
      };
   };

   // Connect particles:
   checkParticles(particles) {
      particles.forEach(particle => {
         const distance = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

         if(distance < 120) {
            stroke('rgba(255, 255, 255, 0.1)');
            line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
         };
      });
   };
};