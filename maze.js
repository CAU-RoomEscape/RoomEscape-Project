
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
  this.resize(40)
}

Arrow.prototype = new Direction() // Direction 상속
Arrow.member('onClick', function(){
	Game.move(this.connectedTo)
})

function Maze(mzNum, mzRelated) {

  //Maze properties
  this.mzNum = mzNum//6
  this.mzRelated = mzRelated//5 10 7 2
  this.mzShape = new Array()

}
Maze.member('initShape',function(){
  for (var i = 0; i < 4; i++) {
    if (this.mzRelated[i] !== 0) {
      var check = 0
      for (var j = 1; j < 4; j++) {
        check = check + (j+1)*(this.mzRelated[(i+j)%4] > 0)
      }

      var a = String(this.mzNum)
      var b = String(i)
      var c = a+"mz"+b

      switch (check) {
        case 0:
          this.mzShape[i] = new Room(c,'미로0.jpg')
          break;
        case 2:
          this.mzShape[i] = new Room(c,'미로우0.jpg')
          break;
        case 3:
          this.mzShape[i] = new Room(c,'미로.jpg')
          break;
        case 4:
          this.mzShape[i] = new Room(c,'미로좌0.jpg')
          break;
        case 5:
          this.mzShape[i] = new Room(c,'미로우.jpg')
          break;
        case 6:
          this.mzShape[i] = new Room(c,'미로좌우0.jpg')
          break;
        case 7:
          this.mzShape[i] = new Room(c,'미로좌.jpg')
          break;
        case 9:
          this.mzShape[i] = new Room(c,'미로좌우.jpg')
          break;
      }
      this.mzShape[i].arrow = new Array()
    }
  }
})
Maze.member('initArrow',function(mzWhole){
  for (var i = 0; i < 4; i++) {
    if(this.mzShape[i] != undefined) {
        this.mzShape[i].Down.push(new Arrow(this.mzShape[i],'Down',mzWhole[this.mzRelated[i]-1].mzShape[(i+2)%4]))
        this.mzShape[i].Down[0].locate(640,680)
        switch (this.mzShape[i].background) {
          case '미로좌우.jpg':
            this.mzShape[i].Right.push(new Arrow(this.mzShape[i],'Right',mzWhole[this.mzRelated[(i+1)%4]-1].mzShape[(i+3)%4]))
            this.mzShape[i].Right[this.mzShape[i].Right.length-1].locate(1240,360)
          case '미로좌.jpg':
            this.mzShape[i].Up.push(new Arrow(this.mzShape[i],'Up',mzWhole[this.mzRelated[(i+2)%4]-1].mzShape[(i+4)%4]))
            this.mzShape[i].Up[this.mzShape[i].Up.length-1].locate(640,40)
          case '미로좌0.jpg':
            this.mzShape[i].Left.push(new Arrow(this.mzShape[i],'Left',mzWhole[this.mzRelated[(i+3)%4]-1].mzShape[(i+5)%4]))
            this.mzShape[i].Left[this.mzShape[i].Left.length-1].locate(40,360)
            break;
          case '미로우.jpg':
            this.mzShape[i].Up.push(new Arrow(this.mzShape[i],'Up',mzWhole[this.mzRelated[(i+2)%4]-1].mzShape[(i+4)%4]))
            this.mzShape[i].Up[this.mzShape[i].Up.length-1].locate(640,40)
          case '미로우0.jpg':
            this.mzShape[i].Right.push(new Arrow(this.mzShape[i],'Right',mzWhole[this.mzRelated[(i+1)%4]-1].mzShape[(i+2)%4]))
            this.mzShape[i].Right[this.mzShape[i].Right.length-1].locate(1240,360)
            break;
          case '미로.jpg':
            this.mzShape[i].Up.push(new Arrow(this.mzShape[i],'Up',mzWhole[this.mzRelated[(i+2)%4]-1].mzShape[(i+4)%4]))
            this.mzShape[i].Up[this.mzShape[i].Up.length-1].locate(640,40)
          case '미로0.jpg':
            break;
          case '미로좌우0.jpg':
            this.mzShape[i].Right.push(new Arrow(this.mzShape[i],'Right',mzWhole[this.mzRelated[(i+1)%4]-1].mzShape[(i+2)%4]))
            this.mzShape[i].Right[this.mzShape[i].Right.length-1].locate(1240,360)
            this.mzShape[i].Left.push(new Arrow(this.mzShape[i],'Left',mzWhole[this.mzRelated[(i+3)%4]-1].mzShape[(i+5)%4]))
            this.mzShape[i].Left[this.mzShape[i].Left.length-1].locate(40,360)
            break;
          }
        }
  }
})


//--미로 생성--//
//4x4모두열림
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

for (var i = 0; i < maze.length; i++) {
  maze[i].initShape()
}
for (var i = 1; i < maze.length-1; i++) {
  maze[i].initArrow(maze)
}

//--시작--//
Game.start(maze[10].mzShape[2])
