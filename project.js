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


// Openclose 정의
function openclose(room, name, closedImage, openedImage){
	Object.call(this, room, name, closedImage)

	this.closedImage = closedImage
	this.openedImage = openedImage
}

openclose.prototype = new Object() // inherited from Object

openclose.member('onClick', function(){
	if (!this.id.isLocked() && this.id.isClosed()){
		this.id.open()
	} else if (this.id.isOpened){
		this.id.close()
	}
})
openclose.member('onOpen', function(){
	this.id.setSprite(this.openedImage)
})
openclose.member('onClose', function(){
	this.id.setSprite(this.closedImage)
})

// Keypad 정의
function Keypad(room, name, image, password, callback){
	Object.call(this, room, name, image)

	this.password = password
	this.callback = callback
}

Keypad.prototype = new Object() // inherited from Object

Keypad.member('onClick', function(){
	showKeypad('number', this.password, this.callback)
})

// Item 정의
function Item(room, name, image){
	Object.call(this, room, name, image)
}

Item.prototype = new Object() // inherited from Object

Item.member('onClick', function(){
	this.id.pick()
})
Item.member('isHanded', function(){
	return Game.handItem() == this.id
})




//================================================================================

//----방 생성----//
start = new Room('start', '검은방.png')
corridor1 = new Room('corridor1', '복도-1.jpg')
corridor2 = new Room('corridor2', '복도-2.jpg')
corridor3 = new Room('corridor3', '복도-3.png')
start_next = new Room('start_next', '방-2.jpg')
basement1 = new Room('basement1', '지하실-1.png')
basement2 = new Room('basement2', '지하실-2.png')
mirrorR = new Room('mirror', '거울속_.png')


//----첫번째 방----//

// 화살표->복도
start.Left = new Arrow(start, 'Left', corridor1)
start.Left.locate(40, 360)

// 흑염소 박제
start.goat = new Object(start, 'goat', '흑염소2.png')
start.goat.resize(90)
start.goat.locate(980, 80)
start.goat.lock()
start.goat.onClick = function(){
	if(!start_next.gemstone.isPicked() && this.id.isLocked()){
		printMessage('흑염소로 만든 박제인거 같다\n눈빛이 왠지 기분 나쁘다')
	} else if(start_next.gemstone.isPicked() && this.id.isLocked()){
		printMessage('흑염소의 머리와 함께 무언가가 같이 떨어졌다')
		this.id.unlock()
		this.id.setSprite('흑염소2_.png')
		start.goathead.show()
		start.head.show()
	} else if(!this.id.isLocked()){
		printMessage('머리 부분이 떨어지고 몸통 부분만이 남아있다')
	}
}

start.goathead = new Object(start, 'goathead', '흑염소3.png')
start.goathead.resize(105)
start.goathead.locate(865, 210)
start.goathead.hide()
start.goathead.onClick = function(){
	printMessage('흑염소 박제의 머리 부분이다')
}

start.head = new Item(start, 'head', '머리.png')
start.head.resize(64)
start.head.locate(936, 254)
start.head.hide()
start.head.onClick = function(){
	this.id.pick()
}

// 상자 - 레버 손잡이
start.box = new Object(start, 'box', 'Box(Closed).png')
start.box.resize(130)
start.box.locate(1050, 300)
start.box.onClick = function(){
	this.id.setSprite('Box(Opened).png')
	start.leverhandle.show()
}

// 레버 손잡이
start.leverhandle = new Item(start, 'leverhandle', '레버 손잡이.png')
start.leverhandle.resize(7)
start.leverhandle.locate(1050, 300)
start.leverhandle.hide()
start.leverhandle.onClick = function(){
	this.id.pick()
}




//----복도1----//
corridor1.door1 = new Direction(corridor1, 'door1', '투명.png', start)
corridor1.door1.resize(160)
corridor1.door1.locate(770, 365)

corridor1.door2 = new Direction(corridor1, 'door2', '투명.png', start_next)
corridor1.door2.resize(120)
corridor1.door2.locate(410, 380)

corridor1.Right = new Arrow(corridor1, 'Right', corridor2)
corridor1.Right.locate(1240, 360)

//----복도2----//
corridor2.door = new Direction(corridor2, 'door', '투명.png', corridor3)
corridor2.door.resize(200)
corridor2.door.locate(642, 480)
// corridor2.door.lock()
corridor2.door.onClick = function(){
	/* if(~.key.isHanded() && this.id.isLocked()){
		this.id.unlock()
	} */
	printMessage('밀어도 열리지 않는다\n잠겨 있는 것 같다')
	Game.move(this.connectedTo)
}

corridor2.Down = new Arrow(corridor2, 'Down', corridor1)
corridor2.Down.locate(642, 680)

//----복도3----//
corridor3.Down = new Arrow(corridor3, 'Down', corridor2)
corridor3.Down.locate(640, 680)


//----두번째 방----//

// 복도로 통하는 문
start_next.door1 = new Direction(start_next, 'door1', '투명.png', corridor1)
start_next.door1.resize(110)
start_next.door1.locate(350, 370)

// 지하실 입구
start_next.door2 = new Direction(start_next, 'door2', '지하실-입구.png', basement1)
start_next.door2.resize(180)
start_next.door2.locate(530, 650)
start_next.door2.hide()
start_next.door2.lock()
start_next.door2.onClick = function(){
	if(this.id.isLocked()){
		printMessage('잠겨 있는 것 같다')
	} else if(!this.id.isLocked()){
		Game.move(this.connectedTo)
	}
}

// 중앙 테이블
start_next.table = new Object(start_next, 'table', '테이블-1.png')
start_next.table.resize(380)
start_next.table.locate(530, 570)
start_next.table.lock()
start_next.table.onClick = function(){
	if(!start_next.gemstone.isHanded() && this.id.isLocked()){
		printMessage('중앙에 무언가를 넣을만한 홈이 파여져 있다')
	} else if(start_next.gemstone.isHanded() && this.id.isLocked()){
		this.id.unlock()
		this.id.setSprite('테이블-1-보석.png')
		printMessage('(딸깍! 구르르르릉) 기계 장치들이 부딪히는 소리가 들린다')
		this.id.move(300, 0)
		start_next.question.move(300, 0)
		start_next.door2.show()
		start_next.leverL.unlock()
	} else if(!this.id.isLocked()){
		printMessage('더이상 움직이지 않는 모양이다')
	}
}

// 레버 받침
start_next.lever = new Object(start_next, 'lever', '레버 받침.png')
start_next.lever.resize(110)
start_next.lever.locate(260, 550)
start_next.lever.onClick = function(){
	if(start.leverhandle.isHanded()){
		printMessage('손잡이를 꽂아 넣었다')
		this.id.hide()
		start_next.leverL.show()
	} else{
		printMessage('기계 장치인거 같다')
	}
}

// 레버 본체
start_next.leverL = new Object(start_next, 'leverL', '레버 본체.png')
start_next.leverL.resize(110)
start_next.leverL.locate(260, 550)
start_next.leverL.hide()
start_next.leverL.lock()
start_next.leverL.onClick = function(){
	if(this.id.isLocked()){
		printMessage('손잡이가 움직이지 않는다')
	} else if(!this.id.isLocked()){
		printMessage('손잡이를 잡아 내렸다')
		start_next.door2.unlock()
		start_next.door2.setSprite('지하실-입구-열림.png')
		this.id.setSprite('레버-작동.png')
	}
}

// 상자
start_next.box = new Object(start_next, 'box', '비밀상자2.png')
start_next.box.resize(90)
start_next.box.locate(1030, 340)
start_next.box.onClick = function(){
	showKeypad('alphabet', 'AAAAB', function(){
		printMessage('(딸깍)')
		start_next.box.setSprite('비밀상자2_.png')
		start_next.gemstone.show()
	})
}

// 푸른 보석
start_next.gemstone = new Item(start_next, 'gemstone', '보석.png')
start_next.gemstone.resize(30)
start_next.gemstone.locate(1030, 340)
start_next.gemstone.hide()
start_next.gemstone.onClick = function(){
	this.id.pick()
}

// 수수께끼 종이
start_next.question = new Object(start_next, 'question', '종이.png')
start_next.question.resize(30)
start_next.question.locate(580, 490)
start_next.question.onClick = function(){
	printMessage('물질?..')
	showImageViewer('수수께끼1.png')
}

// 종이 뭉치
start_next.papers = new Object(start_next, 'papers', '종이 뭉치.png')
start_next.papers.resize(60)
start_next.papers.locate(90, 520)
start_next.papers.onClick = function(){
	printMessage('알 수 없는 문자가 빼곡히 적혀 있다')
}




//----지하실 입구----//
basement1.Up = new Arrow(basement1, 'Up', start_next)
basement1.Up.locate(290, 320)

basement1.Right = new Arrow(basement1, 'Right', basement2)
basement1.Right.locate(1240, 360)




//----지하실 시체방----//

// 화살표->지하실 입구
basement2.Left = new Arrow(basement2, 'Left', basement1)
basement2.Left.locate(40, 360)

// 시체0 - 팔 0 다리 0, 거울 생성
basement2.corpse0 = new Object(basement2, 'corpse0', '몸0.png')
basement2.corpse0.resize(400)
basement2.corpse0.locate(420, 550)
basement2.corpse0.onClick = function(){
	printMessage('으악!!.. 너무 끔찍하다.. 시체의 팔다리가 없다\n그나저나 이 사람 어딘가 낯이 익은데..')
	basement2.corpse0.hide()
	basement2.corpse1.show()
}

// 시체1 - 팔 0 다리 0
basement2.corpse1 = new Object(basement2, 'corpse1', '몸0.png')
basement2.corpse1.resize(400)
basement2.corpse1.locate(420, 550)
basement2.corpse1.hide()
basement2.corpse1.onClick = function(){
	printMessage('자세히 살펴보려 가까이 다가가자 옆의 벽에서 거울이 나타났다!')
	basement2.mirror.show()
}


// 시체2 - 팔 0 다리 1
// basement2.corpse2 = new Object(basement2, 'corpse2', '몸3.png')

basement2.mirror = new Object(basement2, 'mirror', '거울.png')
basement2.mirror.resize(200)
basement2.mirror.locate(1150, 340)
basement2.mirror.hide()



















Game.start(start, '찢어지는듯한 통증을 이겨내고 눈을 떴다\n\n주변은 조용하다\n\n도대체 여긴 어디지?...')