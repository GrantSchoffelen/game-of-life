function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board


  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };
    var table = document.getElementById('board');
    var cells = table.getElementsByTagName('td');

    for(var i =0; i < cells.length; i++) {
        var id = cells[i].id;
        var cell = document.getElementById(id);
        cell.onclick = onCellClick;
    }
};

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  console.log("click");
  var table = document.getElementById('board');
  var cells = table.getElementsByTagName('td');

  var checkNeighbors = function(id) {
    var aliveCounter = 0;
    var idArr = id.split("-");
    var hash_id = {w: idArr[0], h: idArr[1]};
    var num_hash_w = parseInt(hash_id.w);
    var num_hash_h = parseInt(hash_id.h);
    
    // var otherthing = hash_id.w - 1;
    // console.log(otherthing);
    // var thisthing = document.getElementById((num_hash_w+1) + "-" + (num_hash_h+1));
    // console.log(thisthing);
      
      if(document.getElementById( (num_hash_w - 1) + "-" + (num_hash_h  - 1) ) !== null) {
        if(document.getElementById( (num_hash_w - 1) + "-" + (num_hash_h  - 1) ).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        }
      }
      if(document.getElementById((num_hash_w - 1) + "-" + num_hash_h) !== null) {
        if(document.getElementById((num_hash_w - 1) + "-" + num_hash_h).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById((num_hash_w - 1) + "-" + (num_hash_h+1)) !== null) {
        if(document.getElementById((num_hash_w - 1) + "-" + (num_hash_h+1)).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById(num_hash_w + "-" + (num_hash_h-1)) !== null) {
        if(document.getElementById(num_hash_w + "-" + (num_hash_h-1)).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById(num_hash_w + "-" + (num_hash_h+1)) !== null) {
        if(document.getElementById(num_hash_w + "-" + (num_hash_h+1)).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById((num_hash_w + 1) + "-" + (num_hash_h - 1)) !== null) {
        if(document.getElementById((num_hash_w + 1) + "-" + (num_hash_h - 1)).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById((num_hash_w + 1) + "-" + num_hash_h) !== null) {
        if(document.getElementById((num_hash_w + 1) + "-" + num_hash_h).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
      if(document.getElementById((num_hash_w + 1) + "-" + (num_hash_h + 1)) !== null) {
        if(document.getElementById((num_hash_w + 1) + "-" + (num_hash_h + 1)).getAttribute('data-status') === 'alive') {
          aliveCounter += 1;
        } 
      }
    
   return aliveCounter;
  }
  var deadArr = [];
  var aliveArr = [];
  for(var i =0; i < cells.length; i++) {
    var id = cells[i].id;
    // debugger;
    if(cells[i].getAttribute('data-status') === 'alive') {
      //if cells[i] has more than three neighbors || has less than two neighbors
      if(checkNeighbors(id) > 3 || checkNeighbors(id) < 2) {
        console.log("make dead");
        deadArr.push(cells[i]);
      }
      
    } else if(cells[i].getAttribute('data-status') === 'dead'){
        if(checkNeighbors(id) === 3) {
        console.log("make alive")
        aliveArr.push(cells[i]);
      }
    }
  }
  console.log(deadArr);
  deadArr.forEach(function(cell) {
    cell.className = "dead";
    cell.setAttribute('data-status', 'dead');
  });

  console.log(aliveArr);
  aliveArr.forEach(function(cell) {
    cell.className = "alive";
    cell.setAttribute('data-status', 'alive');
  });
  
};

GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  
};

var gol = new GameOfLife(20,20);
gol.createAndShowBoard();
var onStepClick = document.getElementsByClassName("btn btn-success");
console.log(onStepClick);
onStepClick[0].onclick = gol.step;
