var dog,sadDog,happyDog, database;
var foods = 0;
var foodStock;
var addFood,foodObj,lastFed,currentTime;
var displayTime = "0:00 am";
var half = "am";

//create feed and lastFed variable here
var feed;
var lastFed = 0;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodstock=database.ref('dog/food');
  foodstock.on("value", readStock);

  lastFed=database.ref('dog/lastFed');
  lastFed.on("value", readTime);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  time1 = new Date()
  time = 
  {
    minutes: time1.getMinutes(),
    hours: time1.getHours()%12,
    half: Math.floor(time1.getHours()/12)
  }
  if(time.half == 0){
    half = "am";
  } else {
    half = "pm";
  }
  if(time.minutes > 9){
    time2 = time.hours.toString() + ":" + time.minutes.toString() + " " + half;
  } else {
    time2 = time.hours.toString() + ":0" + time.minutes.toString() + " " + half;
  }
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  stroke(0);
  fill(0);
  textSize(20);
  text("last fed: " + displayTime, 800, 20);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);
}


function feedDog(){
  dog.addImage(happyDog);
  foods -= 2;
  addFoods();
  updateTime();

}

//function to add food in stock
function addFoods(){
  foods++;
  database.ref('dog').update({
    food:foods
  })
}

function updateTime(){
  currentTime = time2;
  database.ref('dog').update({
    lastFed: currentTime
  })
}

function readTime(data){
  displayTime=data.val();
}