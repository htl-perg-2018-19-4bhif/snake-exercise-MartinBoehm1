var keypress = require('keypress');
var ansi = require('ansi'), cursor = ansi(process.stdout);
var area = new Array (10);
var curX=1;
var curY=1;
var appleCurX=8;
var appleCurY=8;
var direction=0;
keypress(process.stdin);
process.stdout.write('\x1Bc');

process.stdin.on('keypress', function (ch, key) {
    setDirection(key.name);
  //if (key && key.ctrl && key.name == 'c') {
  //  process.stdin.pause()
  //}
});
process.stdin.setRawMode(true);
process.stdin.resume();


for (i = 0; i < area.length; i++) {
    area[i]=new Array(appleCurY);
}
for (i = 0; i < area.length; i++) {
    for (j = 0; j < area.length; j++) {
        area[i][j]=0;
    }
}
area[curX][curY]=1;//snake
area[appleCurX][appleCurY]=2;//apple
var ended=false;

runProgramm();
function sleep(ms) {
    try{
    return new Promise(resolve => setTimeout(resolve, ms));
    }catch(e){
    }
  }
async function runProgramm(){
    while(!ended){
        await sleep(1000);
        move();
        repaint();
        console.log("X"+curX);
        console.log("Y"+curY);
        while(curX==appleCurX&&curY==appleCurY){
            appleCurX=Math.floor(Math.random()*area.length-1)+1;
            appleCurY=Math.floor(Math.random()*area[area.length-1].length-1)+1;

        }
        area[appleCurX][appleCurY]=2;
    }
    process.exit();
}
function repaint(){
    
for (i = 0; i < area.length; i++) {
    for (j = 0; j < area.length; j++) {
        cursor.goto(i, j);
        if(area[i][j]===0){
            cursor.bg.white();
        }else{
            if(area[i][j]===1){
            cursor.bg.red();
            }else{
                cursor.bg.green();
            }
        }
        cursor.write(" ");
        cursor.bg.reset();
    }
}

    //cursor
    //.red()
    //.bg.grey()
    //.write('Hello World!')
    //.bg.reset()
    //.write('\n')

}
function move(){
    switch(direction) {
        case 0:
        area[curX][curY]=0;
            curX++;
            if(curX>=area.length){
                ended=true;
            }else{
                area[curX][curY]=1;
            }
            break;
        case 1:
        area[curX][curY]=0;
            curY++;
            if(curY>=area[0].length){
                ended=true;
            }else{
                area[curX][curY]=1;
            }
            break;
        case 2:
        area[curX][curY]=0;
            curX--;
            if(curX<=0){
                ended=true;
            }else{
                area[curX][curY]=1;
            }
            break;
        case 3:
        area[curX][curY]=0;
            curY--;
            if(curY<=0){
                ended=true;
            }else{
                area[curX][curY]=1;
            }
            break;
    }
    
}
function setDirection(x) {
    
    if(x=="a"){
        direction=2;
    }
    if(x=="d"){
        direction=0;
    }
    if(x=="s"){
        direction=1;
    }
    if(x=="w"){
        direction=3;
    }
}