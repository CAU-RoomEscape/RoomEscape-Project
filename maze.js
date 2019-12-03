
//----함수 정의----//

Function.prototype.member = function(name, value){
	this.prototype[name] = value
}

// 게임 정의
function Game(){}
Game.start = function(room, welcome){
	game.start(room.id)
	if(welcome !== undefined){
		game.printStory(welcome)
	} else{
		// Nothing
	}
}
Game.end = function(){
	game.clear()
}
Game.move = function(room){
	game.move(room.id)
}
Game.handItem = function(){
	return game.getHandItem()
}

// Room 정의
function Room(name, background){
	this.name = name
	this.background = background
	this.id = game.createRoom(name, background)
}
Room.member('setRoomLight', function(intensity){
	this.id.setRoomLight(intensity)
})

// Object 정의
function Object(room, name, image){
	this.room = room
	this.name = name
	this.image = image

	if (room !== undefined){
		this.id = room.id.createObject(name, image)
	}
}

Object.STATUS = { OPENED: 0, CLOSED: 1, LOCKED: 2 }

Object.member('setSprite', function(image){
	this.image = image
	this.id.setSprite(image)
})
Object.member('resize', function(width){
	this.id.setWidth(width)
})
Object.member('setDescription', function(description){
	this.id.setItemDescription(description)
})
Object.member('getX', function(){
	return this.id.getX()
})
Object.member('getY', function(){
	return this.id.getY()
})
Object.member('locate', function(x, y){
	this.room.id.locateObject(this.id, x, y)
})
Object.member('move', function(x, y){
	this.id.moveX(x)
	this.id.moveY(y)
})
Object.member('moveX', function(x){
	this.id.moveX(x)
})
Object.member('moveY', function(y){
	this.id.moveY(y)
})
Object.member('show', function(){
	this.id.show()
})
Object.member('hide', function(){
	this.id.hide()
})
Object.member('open', function(){
	this.id.open()
})
Object.member('close', function(){
	this.id.close()
})
Object.member('lock', function(){
	this.id.lock()
})
Object.member('unlock', function(){
	this.id.unlock()
})
Object.member('isOpened', function(){
	return this.id.isOpened()
})
Object.member('isClosed', function(){
	return this.id.isClosed()
})
Object.member('isLocked', function(){
	return this.id.isLocked()
})
Object.member('pick', function(){
	this.id.pick()
})
Object.member('isPicked', function(){
	return this.id.isPicked()
})

// Direction 정의
function Direction(room, name, Image, connectedTo){
	Object.call(this, room, name, Image)

	this.Image = Image
	this.connectedTo = connectedTo
}

Direction.prototype = new Object() // Object 상속

Direction.member('onClick', function(){
	Game.move(this.connectedTo)
})

// Arrow 정의
function Arrow(room, name, connectedTo){
	if(name == 'Right'){
		Direction.call(this, room, name, '화살표-오른쪽.png', connectedTo) // Direction 상속
	} else if(name == 'Left'){
		Direction.call(this, room, name, '화살표-왼쪽.png', connectedTo)
	} else if(name == 'Up'){
		Direction.call(this, room, name, '화살표-위.png', connectedTo)
	} else if(name == 'Down'){
		Direction.call(this, room, name, '화살표-아래.png', connectedTo)
	}
  this.resize(50)
}

Arrow.prototype = new Direction() // Direction 상속

Arrow.member('onClick', function(){
	Game.move(this.connectedTo)
})

//-------Maze(미로) 정의----------//
function Maze(mzNum, mzRelated) {

  this.mzNum = mzNum
  this.mzRelated = mzRelated
  this.mzShape = new Array(4)

}


//----------미로 생성------------//
/*
//4x4모두연결
maze = new Array(16)
maze[0] = new Maze(1, [-1,5,2,0])
maze[1] = new Maze(2, [1,6,3,0])
maze[2] = new Maze(3, [2,7,4,0])
maze[3] = new Maze(4, [3,8,0,0])
maze[4] = new Maze(5, [0,9,6,1])
maze[5] = new Maze(6, [5,10,7,2])
maze[6] = new Maze(7, [6,11,8,3])
maze[7] = new Maze(8, [7,12,0,4])
maze[8] = new Maze(9, [0,13,10,5])
maze[9] = new Maze(10, [9,14,11,6])
maze[10] = new Maze(11, [10,15,12,7])
maze[11] = new Maze(12, [11,16,0,8])
maze[12] = new Maze(13, [0,0,14,9])
maze[13] = new Maze(14, [13,0,15,10])
maze[14] = new Maze(15, [14,0,16,11])
maze[15] = new Maze(16, [15,0,-1,12])
*/

maze = new Array(16)
maze[0] = new Maze(1, [-1,5,2,0])
maze[1] = new Maze(2, [1,0,0,0])
maze[2] = new Maze(3, [0,7,4,0])
maze[3] = new Maze(4, [3,8,0,0])
maze[4] = new Maze(5, [0,9,6,1])
maze[5] = new Maze(6, [5,0,7,0])
maze[6] = new Maze(7, [6,11,0,3])
maze[7] = new Maze(8, [0,12,0,4])
maze[8] = new Maze(9, [0,13,0,5])
maze[9] = new Maze(10, [0,14,0,0])
maze[10] = new Maze(11, [0,15,0,7])
maze[11] = new Maze(12, [0,0,0,8])
maze[12] = new Maze(13, [0,0,14,9])
maze[13] = new Maze(14, [13,0,0,10])
maze[14] = new Maze(15, [0,0,16,11])
maze[15] = new Maze(16, [15,0,-1,0])

//----------미로별 모양 설정------------//
for (var k = 0; k < maze.length; k++){
  for (var i = 0; i < 4; i++) {
    if (maze[k].mzRelated[i] !== 0) {
      var check = 0
      for (var j = 1; j < 4; j++) {
        check = check + (j+1)*(maze[k].mzRelated[(i+j)%4] > 0)
      }

      var a = String(maze[k].mzNum)
      var b = String(i)
      var c = "mz"+a+"_"+b

      switch (check) {
        case 0:
        eval(c + "= new Room(c,'미로0.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 2:
        eval(c + "= new Room(c,'미로우0.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 3:
        eval(c + "= new Room(c,'미로.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 4:
        eval(c + "= new Room(c,'미로좌0.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 5:
        eval(c + "= new Room(c,'미로우.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 6:
        eval(c + "= new Room(c,'미로좌우0.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 7:
        eval(c + "= new Room(c,'미로좌.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
        case 9:
        eval(c + "= new Room(c,'미로좌우.jpg')");
        eval("maze[k].mzShape[i] = " + c);
        break;
      }
    }
  }
}

//-------------미로간 연결--------------//
for (var j = 1; j < maze.length-1; j++){
  for (var i = 0; i < 4; i++) {
    if(maze[j].mzShape[i] != undefined) {
      maze[j].mzShape[i].Down = new Arrow(maze[j].mzShape[i],'Down',maze[maze[j].mzRelated[i]-1].mzShape[(i+2)%4])
      maze[j].mzShape[i].Down.locate(640,620)
      switch (maze[j].mzShape[i].background) {
        case '미로좌우.jpg':
        maze[j].mzShape[i].Right = new Arrow(maze[j].mzShape[i],'Right',maze[maze[j].mzRelated[(i+1)%4]-1].mzShape[(i+3)%4])
        maze[j].mzShape[i].Right.locate(690,580)
        case '미로좌.jpg':
        maze[j].mzShape[i].Up = new Arrow(maze[j].mzShape[i],'Up',maze[maze[j].mzRelated[(i+2)%4]-1].mzShape[(i+4)%4])
        maze[j].mzShape[i].Up.locate(640,540)
        case '미로좌0.jpg':
        maze[j].mzShape[i].Left = new Arrow(maze[j].mzShape[i],'Left',maze[maze[j].mzRelated[(i+3)%4]-1].mzShape[(i+1)%4])
        maze[j].mzShape[i].Left.locate(590,580)
        break;
        case '미로우.jpg':
        maze[j].mzShape[i].Up = new Arrow(maze[j].mzShape[i],'Up',maze[maze[j].mzRelated[(i+2)%4]-1].mzShape[(i+4)%4])
        maze[j].mzShape[i].Up.locate(640,540)
        case '미로우0.jpg':
        maze[j].mzShape[i].Right = new Arrow(maze[j].mzShape[i],'Right',maze[maze[j].mzRelated[(i+1)%4]-1].mzShape[(i+3)%4])
        maze[j].mzShape[i].Right.locate(690,580)
        break;
        case '미로.jpg':
        maze[j].mzShape[i].Up = new Arrow(maze[j].mzShape[i],'Up',maze[maze[j].mzRelated[(i+2)%4]-1].mzShape[(i+4)%4])
        maze[j].mzShape[i].Up.locate(640,540)
        case '미로0.jpg':
        break;
        case '미로좌우0.jpg':
        maze[j].mzShape[i].Right = new Arrow(maze[j].mzShape[i],'Right',maze[maze[j].mzRelated[(i+1)%4]-1].mzShape[(i+3)%4])
        maze[j].mzShape[i].Right.locate(690,580)
        maze[j].mzShape[i].Left = new Arrow(maze[j].mzShape[i],'Left',maze[maze[j].mzRelated[(i+3)%4]-1].mzShape[(i+1)%4])
        maze[j].mzShape[i].Left.locate(590,580)
        break;
      }
    }
  }
}
//----------미로 시작점 설정-------------//

//maze[0].mzShape[0].Down = new Arrow(maze[0].mzShape[0],'Down',//미로전방)
//maze[0].mzShape[0].Down.locate(640,600)
maze[0].mzShape[0].Up = new Arrow(maze[0].mzShape[0],'Up',maze[maze[0].mzRelated[2]-1].mzShape[0])
maze[0].mzShape[0].Up.locate(640,540)
maze[0].mzShape[0].Right = new Arrow(maze[0].mzShape[0],'Right',maze[maze[0].mzRelated[1]-1].mzShape[3])
maze[0].mzShape[0].Right.locate(690,580)

maze[0].mzShape[1].Down = new Arrow(maze[0].mzShape[1],'Down',maze[maze[0].mzRelated[1]-1].mzShape[3])
maze[0].mzShape[1].Down.locate(640,600)
maze[0].mzShape[1].Right = new Arrow(maze[0].mzShape[1],'Right',maze[maze[0].mzRelated[2]-1].mzShape[0])
maze[0].mzShape[1].Right.locate(690,580)
//maze[0].mzShape[1].Left = new Arrow(maze[0].mzShape[1],'Left',//미로전방)
//maze[0].mzShape[1].left.locate(590,580)

maze[0].mzShape[2].Down = new Arrow(maze[0].mzShape[2],'Down',maze[maze[0].mzRelated[2]-1].mzShape[0])
maze[0].mzShape[2].Down.locate(640,600)
//maze[0].mzShape[2].Up = new Arrow(maze[0].mzShape[2],'Up',//미로전방)
//maze[0].mzShape[2].Up.locate(640,540)
maze[0].mzShape[2].Left = new Arrow(maze[0].mzShape[2],'Left',maze[maze[0].mzRelated[1]-1].mzShape[3])
maze[0].mzShape[2].Left.locate(590,580)

//-----------미로 도착점 설정------------//

maze[15].mzShape[0].Down = new Arrow(maze[15].mzShape[0],'Down',maze[maze[15].mzRelated[0]-1].mzShape[2])
maze[15].mzShape[0].Down.locate(640,600)
maze[15].mzShape[0].Ending = new Object(maze[15].mzShape[0],'Ending','화살표-위.png')
maze[15].mzShape[0].Ending.locate(640,540)
maze[15].mzShape[0].Ending.resize(50)
maze[15].mzShape[0].Edladder = new Object(maze[15].mzShape[0],'Edladder','사다리mz.png')
maze[15].mzShape[0].Edladder.locate(640,320)
maze[15].mzShape[0].Edladder.resize(280)
maze[15].mzShape[0].Ending.onClick = function(){
	Game.end()
}



//---------------시작-------------------//

Game.start(maze[15].mzShape[0])
game.setTimer(300,1,"sec")
game.showTimer()
