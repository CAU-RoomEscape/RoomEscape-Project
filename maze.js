
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
//	this.background = background
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
}

Arrow.prototype = new Direction() // Direction 상속
Arrow.member('onClick', function(){
	Game.move(this.connectedTo)
})

function Maze(Name, Background, mzNum, related) {
  Room.call(this, Name, Background)

  //Maze properties
  this.mzNum = mzNum
  this.related = related
/*
  //화살표 생성(6시부터 반시계방향)
  Down = new Arrow(this,'화살표-아래.png',undefined)
  Right = new Arrow(this,'화살표-오른쪽.png',undefined)
  Up = new Arrow(this,'화살표-위.png',undefined)
  Left = new Arrow(this,'화살표-왼쪽.png',undefined)
  this.abcde = [Down, Right, Up, Left]
  this.Down.locate(640,360)
  //배열 원소(item)로 반복
/*
  this.Arrow.forEach(function() {
    item.resize(40)
  })
*/
}

//Maze.prototype = new Room() // Room 상속



//Maze.member('move', function(to))







//--미로 생성--//
//maze0 = new Room("maze0", "미로.jpg")
maze1 = new Maze("maze1", "미로.jpg", 1, [2,8])


//--시작--//
Game.start(maze1,'abc')
