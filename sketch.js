let items = [
  { name: "BACKPACKS", donated: 45, goal: 50, color: "#d4145a", icon: "backpack.png" },
  { name: "WIRED EARBUDS", donated: 19, goal: 30, color: "#fbb03b", icon: "earbuds.png" },
  { name: "WIRED OVER-THE-EAR\nHEADPHONES", donated: 20, goal: 20, color: "#22b573", icon: "headphones.png" },
  { name: "WATER BOTTLES", donated: 30, goal: 30, color: "#29abe2", icon: "waterbottle.png" }
];

let icons = [];
let legend;


let moneyIcon;
let moneyChart = { donated: 2080, goal: 2000, color: "#22b573", icon: "money.png" };


function preload() {
  for (let item of items) {
    icons.push(loadImage(item.icon));
moneyIcon = loadImage(moneyChart.icon);

  }
  legend = loadImage("legend.png");
}

function setup() {
  createCanvas(1600, 800);
  textFont('Arial');
}

function draw() {
  background(255);
  
  //title
noStroke();
fill(0);
textAlign(CENTER, CENTER);
textSize(36);
text("2025 Back to School Drive", width / 2, 60);
  
// Subtitle
textSize(18);
fill(100);
text("Hover over each bar to see donation details.", width / 2, 95);


  
  let marginLeft = 300;
  let marginTop = 160;
  let barHeight = 100;
  let spacing = 130;
  let maxGoal = 50; // Fixed max scale
  let chartWidth = 750;

  // Draw tick marks and labels
  stroke(0);
  strokeWeight(0.2);
  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= maxGoal; i += 10) {
    let x = marginLeft + map(i, 0, maxGoal, 0, chartWidth);
    line(x, height - 140, x, height - 120);
    text(i, x, height - 110);
  }

  for (let i = 0; i < items.length; i++) {
    let y = marginTop + i * spacing;
    let item = items[i];

    let barValue = Math.min(item.donated, maxGoal); // Cap bar at 50
    let barWidth = map(barValue, 0, maxGoal, 0, chartWidth);
    let goalX = map(item.goal, 0, maxGoal, 0, chartWidth);

    // Draw bar
    fill(item.color);
    noStroke();
    rect(marginLeft, y, barWidth, barHeight);
    
    // Draw goal line
    stroke(item.color);
    strokeWeight(3);
    line(marginLeft + goalX, y, marginLeft + goalX, y + barHeight);

    // Draw label
    noStroke();
    fill(0);
    textSize(20);
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    text(item.name, marginLeft - 20, y + barHeight / 2);
    textStyle(NORMAL);

    // Draw icon if donated > 0
    if (item.donated > 0) {
      let iconSize = barWidth < 130 ? barWidth : 130;
      image(icons[i], marginLeft + barWidth - iconSize, y + (barHeight - iconSize) / 2 + 1, iconSize, iconSize);
    }

    // Hover interactivity
    if (
      mouseX > marginLeft &&
      mouseX < marginLeft + barWidth &&
      mouseY > y &&
      mouseY < y + barHeight
    ) {
      noStroke();
      textSize(18);
      textAlign(CENTER, CENTER);

      if (item.donated >= item.goal) {
        fill(255); // White text for contrast
        text(`Goal Completed:\n${item.donated} Donated`, marginLeft + barWidth / 2, y + barHeight / 2);
      } else {
        fill(0); // Black text
        textAlign(LEFT, BOTTOM);
        let remaining = item.goal - item.donated;
        text(`${item.donated} Donated\n${remaining} To Go!`, marginLeft + barWidth + 10, y + barHeight - 10);
      }
    }
  }

  // Axis label
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text("Amount of Items", width / 1.87, height - 50);

  // Draw legend
  let legendWidth = 320;
  let legendHeight = legend.height * (legendWidth / legend.width);
  image(legend, (width - legendWidth) / 1.07, 25, legendWidth, legendHeight);
  
  //------------------------------------------------------------------
  
  // Vertical Dollar Chart
let dollarX = 1270;
let dollarY = 160;
let dollarWidth = 200;
let dollarHeight = 500;
let dollarValue = Math.min(moneyChart.donated, moneyChart.goal);
let filledHeight = map(dollarValue, 0, moneyChart.goal, 0, dollarHeight);

// Draw bar
fill(moneyChart.color);
noStroke();
rect(dollarX, dollarY + (dollarHeight - filledHeight), dollarWidth, filledHeight);
  
  
// Vertical Y-axis line for dollar chart (drawn first so it's behind everything)
stroke(0);
strokeWeight(1);
line(dollarX, dollarY, dollarX, dollarY + dollarHeight);


// Tick marks and labels
stroke(0);
strokeWeight(0.2);
fill(0);
textSize(18);
textAlign(RIGHT, CENTER);
for (let i = 0; i <= moneyChart.goal; i += 500) {
  let y = dollarY + dollarHeight - map(i, 0, moneyChart.goal, 0, dollarHeight);
  line(dollarX - 10, y, dollarX, y);
  text(`$${i}`, dollarX - 15, y);
}

// Icon
let iconSize = 80;
let iconY;

if (moneyChart.donated <= 0) {
  // Sit at the base if no donations
  iconY = dollarY + dollarHeight - iconSize / 2;
} else {
  // Center on top of the filled bar
  iconY = dollarY + (dollarHeight - filledHeight) - iconSize / 2;
}

image(moneyIcon, dollarX + (dollarWidth - iconSize) / 2, iconY, iconSize, iconSize);




// Hover interactivity
if (
  mouseX > dollarX &&
  mouseX < dollarX + dollarWidth &&
  mouseY > dollarY &&
  mouseY < dollarY + dollarHeight
) {
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(moneyChart.donated >= moneyChart.goal ? 0 : 0);
  let remaining = moneyChart.goal - moneyChart.donated;
  let message = moneyChart.donated >= moneyChart.goal
  ? `Goal Completed:\n$${moneyChart.donated}`
    : `$${moneyChart.donated} Donated\n$${remaining} To Go!`;
  text(message, dollarX + dollarWidth / 2, dollarY + dollarHeight + 30);
}

  
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('chart', 'png');
  }
}
