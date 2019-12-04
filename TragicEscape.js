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
Game.over = function(){
	game.gameover()
}


// Combination 정의
Game.makeCombination = function(object1,object2,object3){
	game.makeCombination(object1.id,object2.id,object3.id)
}

// Room 정의
function Room(name, background){
	this.name = name
	this.background = background
	this.id = game.createRoom(name, background)
}

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


//----방 생성----//
start = new Room('start', '검은방.png')
corridor1 = new Room('corridor1', '복도-1.jpg')
corridor2 = new Room('corridor2', '복도-2.jpg')
corridor3 = new Room('corridor3', '복도-3.png')
start_next = new Room('start_next', '방-2.jpg')
basement1 = new Room('basement1', '지하실-1.png')
basement2 = new Room('basement2', '지하실-2.png')
mirrorR = new Room('mirrorR', '거울속_.png')
ceiling = new Room('ceiling', '부활.png')


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
	if(!Mroom2F.paper.isPicked() && this.id.isLocked()){
		printMessage('흑염소로 만든 박제인거 같다\n눈빛이 왠지 기분 나쁘다')
	} else if(Mroom2F.paper.isPicked() && this.id.isLocked()){
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
corridor2.door1 = new Object(corridor2, 'door1', '투명.png')
corridor2.door1.resize(200)
corridor2.door1.locate(642, 480)
corridor2.door1.onClick = function(){
    printMessage('문에 가까이 다가가려 하자 정신이 아득해진다\n더이상 가면 안될거 같다')
    this.id.hide()
    corridor2.door2.show()
}

corridor2.door2 = new Object(corridor2, 'door2', '투명.png')
corridor2.door2.resize(200)
corridor2.door2.locate(642, 480)
corridor2.door2.hide()
corridor2.door2.onClick = function(){
    printMessage('그만 정신을 잃고 말았다...')
    Game.over()
}

corridor2.door3 = new Direction(corridor2, 'door3', '투명.png', corridor3)
corridor2.door3.resize(200)
corridor2.door3.locate(642, 480)
corridor2.door3.lock()
corridor2.door3.hide()
corridor2.door3.onClick = function(){
	printMessage('더이상 어지럽지 않다\n당장 이곳에서 벗어나야해..')
	Game.move(this.connectedTo)
}

corridor2.Down = new Arrow(corridor2, 'Down', corridor1)
corridor2.Down.locate(642, 680)
corridor2.Down.onClick = function(){
    if(corridor2.door3.isLocked()){
        corridor2.door1.show()
        corridor2.door2.hide()
        Game.move(this.connectedTo)
    } else if(!corridor2.door3.isLocked()){
        Game.move(this.connectedTo)
    }
}

//----복도3----//
corridor3.Down = new Arrow(corridor3, 'Down', corridor2)
corridor3.Down.locate(640, 680)
corridor3.Up = new Arrow(corridor3, 'Up', maze[0].mzShape[0])
corridor3.Up.locate(640, 630)
corridor3.Up.onClick=function(){
    Game.move(maze[0].mzShape[0])
    printMessage('아내가 쫓아온다!!! 도망가자')
		game.setTimer(100,1,"sec")
		game.showTimer()
}

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
	showKeypad('alphabet', 'WATER', function(){
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
	printMessage('으악!!.. 너무 끔찍하다.. 시체의 머리가 없다\n시체 주변에 피가 잔뜩 묻어있다..')
	this.id.hide()
	basement2.corpse1.show()
}

// 시체1 - 팔 0 다리 0
basement2.corpse1 = new Object(basement2, 'corpse1', '몸0.png')
basement2.corpse1.resize(400)
basement2.corpse1.locate(420, 550)
basement2.corpse1.hide()
basement2.corpse1.onClick = function(){
    if(!start.head.isHanded()){
        printMessage('자세히 살펴보려 가까이 다가가자 옆의 벽에서 거울이 나타났다!')
        basement2.mirror.show()
    } else if(start.head.isHanded()){
        this.id.hide()
        basement2.corpse2.show()
    }
}

basement2.corpse2 = new Direction(basement2, 'corpse2', '몸1.png', ceiling)
basement2.corpse2.resize(400)
basement2.corpse2.locate(420, 550)
basement2.corpse2.hide()
basement2.corpse2.onClick = function(){
    printMessage('갑자기 등이 차갑다.. 눈앞이 어두컴컴하다')
    this.id.hide()
    Game.move(this.connectedTo)
}

//----천장(부활)----//
ceiling.click = new Direction(ceiling, 'click', '투명.png', basement2)
ceiling.click.resize(800)
ceiling.click.locate(640, 360)
ceiling.click.onClick = function(){
    printMessage('몸을 되찾은 모양이다!..\n비틀거리면서 몸을 일으킨다 아직 목부분에 이질감이 느껴진다')
    Game.move(this.connectedTo)
    corridor2.door2.hide()
    corridor2.door3.show()
    corridor2.door3.unlock()
}

//
basement2.mirror = new Direction(basement2, 'mirror', '거울.png', mirrorR)
basement2.mirror.resize(200)
basement2.mirror.locate(1150, 340)
basement2.mirror.hide()
basement2.mirror.onClick = function(){
    Game.move(this.connectedTo)
    printMessage('"따라와라..."\n누군가의 목소리를 들으며 점점 거울로 몸이 끌려간다')
}




// 방생성
Mroom1=new Room('Mroom1','room1.png')
Mroom2=new Room('Mroom2','room2.png')
Mroom3=new Room('Mroom3','room3.png')
Mroom4=new Room('Mroom4','room4.png')
Mroom1U=new Room('Mroom1U','room1U.png')
Mroom3U=new Room('Mroom3U','room3U.png')
Mroom4U=new Room('Mroom4U','room4U.png')
Mroom2F=new Room('Mroom2F','2floor.png')
Mbook=new Room('Mbook','책속.png')
Mbook1=new Room('Mbook1','책속1.png')
Mbook2=new Room('Mbook2','책속2.png')
Mpainting1=new Room('Mpainting1','그림속.png')
Mpainting2=new Room('Mpainting2','그림속1.png')

mirrorR.tobook = new Direction(mirrorR, 'tobook', '투명.png', Mbook)
mirrorR.tobook.resize(800)
mirrorR.tobook.locate(640, 360)



//책속으로 입장, 이동
Mbook.inside=new Direction(Mbook,'inside','마우스.png',Mbook1)
Mbook.inside.resize(600)
Mbook.inside.locate(880,430)

Mbook1.inside=new Direction(Mbook1,'inside','마우스.png',Mbook2)
Mbook1.inside.resize(800)
Mbook1.inside.locate(800,430)

Mbook2.inside=new Direction(Mbook2,'inside','마우스.png',Mroom1U)
Mbook2.inside.resize(800)
Mbook2.inside.locate(800,430)

//그림속으로 이동
Mpainting1.inside=new Direction(Mpainting1,'inside','마우스.png',Mpainting2)
Mpainting1.inside.resize(800)
Mpainting1.inside.locate(600,430)

//오른쪽 이동, 이동
Mroom1.dirR=new Direction(Mroom1,'dirR','마우스.png',Mroom2)
Mroom1.dirR.resize(100)
Mroom1.dirR.locate(1200,430)

Mroom2.dirR=new Direction(Mroom2,'dirR','마우스.png',Mroom3)
Mroom2.dirR.resize(100)
Mroom2.dirR.locate(1200,430)

Mroom3.dirR=new Direction(Mroom3,'dirR','마우스.png',Mroom4)
Mroom3.dirR.resize(100)
Mroom3.dirR.locate(1200,430)

Mroom4.dirR=new Direction(Mroom4,'dirR','마우스.png',Mroom1)
Mroom4.dirR.resize(100)
Mroom4.dirR.locate(1200,430)

//왼쪽 방향, 이동

Mroom1.dirL=new Direction(Mroom1,'dirL','마우스.png',Mroom4)
Mroom1.dirL.resize(100)
Mroom1.dirL.locate(100,430)

Mroom4.dirL=new Direction(Mroom4,'dirL','마우스.png',Mroom3)
Mroom4.dirL.resize(100)
Mroom4.dirL.locate(100,430)

Mroom3.dirL=new Direction(Mroom3,'dirL','마우스.png',Mroom2)
Mroom3.dirL.resize(100)
Mroom3.dirL.locate(100,430)

Mroom2.dirL=new Direction(Mroom2,'dirL','마우스.png',Mroom1)
Mroom2.dirL.resize(100)
Mroom2.dirL.locate(100,430)

Mroom2F.dirL=new Direction(Mroom2F,'dirL','마우스.png',Mroom4U)
Mroom2F.dirL.resize(100)
Mroom2F.dirL.locate(100,430)

//윗 방향 설정, 이동
Mroom1.dirU=new Direction(Mroom1,'dirU','마우스.png',Mroom1U)
Mroom1.dirU.resize(100)
Mroom1.dirU.locate(650,80)

Mroom3.dirU=new Direction(Mroom3,'dirU','마우스.png',Mroom3U)
Mroom3.dirU.resize(100)
Mroom3.dirU.locate(650,80)

Mroom4.dirU=new Direction(Mroom4,'dirU','마우스.png',Mroom4U)
Mroom4.dirU.resize(100)
Mroom4.dirU.locate(220,80)

Mroom4.dirU1=new Direction(Mroom4,'dirU1','마우스.png',Mroom4U)
Mroom4.dirU1.resize(150)
Mroom4.dirU1.locate(220,150)

Mroom4.dirU2=new Direction(Mroom4,'dirU2','마우스.png',Mroom4U)
Mroom4.dirU2.resize(150)
Mroom4.dirU2.locate(220,250)

Mroom4.dirU3=new Direction(Mroom4,'dirU3','마우스.png',Mroom4U)
Mroom4.dirU3.resize(150)
Mroom4.dirU3.locate(220,350)

//아래 방향 설정, 이동
Mroom1U.dirD=new Direction(Mroom1U,'dirD','마우스.png',Mroom1)
Mroom1U.dirD.resize(100)
Mroom1U.dirD.locate(100,600)

Mroom3U.dirD=new Direction(Mroom3U,'dirD','마우스.png',Mroom3)
Mroom3U.dirD.resize(100)
Mroom3U.dirD.locate(100,600)

Mroom4U.dirD=new Direction(Mroom4U,'dirD','마우스.png',Mroom4)
Mroom4U.dirD.resize(100)
Mroom4U.dirD.locate(100,600)

//box1 생성
Mroom1.box1=new Object(Mroom1,'box1','마우스.png')
Mroom1.box1.resize(50)
Mroom1.box1.locate(320,380)
Mroom1.box1.onClick=function(){
    if(Mroom4.key1.isHanded()){
        showImageViewer("box1.png","")
        printMessage("열렸다.")
    }
    else{
        printMessage("잠겨있다.")
    }
}

//잠겨있는 문
Mroom1.text=new Object(Mroom1,'text','마우스.png')
Mroom1.text.resize(200)
Mroom1.text.locate(650,350)
Mroom1.text.onClick=function(){
	printMessage('문은 자물쇠로 잠겨있다')
}

// 전등
Mroom1.text1=new Object(Mroom1,'text1','마우스.png')
Mroom1.text1.resize(100)
Mroom1.text1.locate(1050,125)
Mroom1.text1.onClick=function(){
	printMessage("불이 켜진 것도 있고.. 꺼진 것도 있고.. ")
}

// 얼룩
Mroom1.text2=new Object(Mroom1,'text2','마우스.png')
Mroom1.text2.resize(100)
Mroom1.text2.locate(1050,600)
Mroom1.text2.onClick=function(){
	printMessage("검붉은 얼룩이 묻어있다..")
}


//box2 생성
Mroom1.box2 = new Object(Mroom1,'box2','마우스.png')
Mroom1.box2.resize(100)
Mroom1.box2.locate(1000,380)
Mroom1.box2.close()
Mroom1.box2.onClick = function(){
    if(Mroom1.box2.isClosed()){
        printMessage("잠겨있다")
        showKeypad("number", "1457" , function(){ // 키패드 1 - 숫자4자리
            printMessage("열렸다!")
            Mroom1.box2.open()
        })
    } else if(Mroom1.box2.isOpened()){
        showImageViewer('box2.png')
        printMessage('상자를 열면서 무언가가 바닥에 떨어졌다')
        Mroom1.handle.show()
     }
}

// 드라이버 손잡이 생성
Mroom1.handle = new Item(Mroom1,'handle','손잡이.png')
Mroom1.handle.resize(60)
Mroom1.handle.locate(1015,650)
Mroom1.handle.hide()

//Mroom1U 표시 보기
Mroom1U.markR1U=new Object(Mroom1U,'markR1U','마우스.png')
Mroom1U.markR1U.resize(100)
Mroom1U.markR1U.locate(370,150)

Mroom1U.markR1U.onClick = function(){
	if(Mroom2.scope.isHanded()){
        showImageViewer("이미지.png","");
        printMessage('"전등을 보아라"라는 글귀가 밑에 적혀 있다')
	}
	else {
		printMessage("너무 멀어서 보이지 않는다..");
	}
}

// 창밖
Mroom1U.text=new Object(Mroom1U,'text','마우스.png')
Mroom1U.text.resize(250)
Mroom1U.text.locate(650,400)
Mroom1U.text.onClick=function(){
	printMessage('밖에는 눈이 내리고 있다..')
}

//쌍안경 생성
Mroom2.scope=new Item(Mroom2,'scope','쌍안경.png')
Mroom2.scope.resize(100)
Mroom2.scope.locate(600,400)

//그림 보기
Mroom2.picture=new Object(Mroom2,'picture','마우스.png')
Mroom2.picture.resize(100)
Mroom2.picture.locate(615,260)
Mroom2.picture.onClick =function(){
    showImageViewer("그림.png");
}

//드라이버 앞부분 생성
Mroom2.dhead=new Item(Mroom2,'dhead','앞부분.png')
Mroom2.dhead.resize(60)
Mroom2.dhead.locate(1050,650)

//painting 통로
Mroom3.painting=new Object(Mroom3,'painting','마우스.png')
Mroom3.painting.resize(80)
Mroom3.painting.locate(270,350)

Mroom3.Mpainting1=new Direction(Mroom3,'Mpainting1','마우스.png',Mpainting1)
Mroom3.Mpainting1.resize(80)
Mroom3.Mpainting1.locate(270,350)
Mroom3.Mpainting1.hide()

Mroom3.painting.onClick = function(){
    if(Mroom2F.paper.isHanded()){
		printMessage('찢어진 부분에 딱 맞았다')
		Mroom3.Mpainting1.show()
		Mroom3.painting.hide()
	}	else if(!Mroom2F.paper.isHanded()) {
		printMessage('그림이 조금 찢어져있다')
	}
}

// 이상해 보이는 문
Mroom3.text = new Object(Mroom3,'text','마우스.png')
Mroom3.text.resize(200)
Mroom3.text.locate(650,350)
Mroom3.text.onClick = function(){
	printMessage('문이 반대편에서 잠겨있는 듯하다..\n작은 글씨로 "들어오지마 여보" 라고 적혀있다')
}

//2층 발견
Mroom3U.text=new Object(Mroom3U,'text','마우스.png')
Mroom3U.text.resize(500)
Mroom3U.text.locate(650,400)
Mroom3U.text.onClick=function(){
	printMessage('2층이 있다 사다리로 올라갈 수 있을 거 같은데..')
}

//책 생성
Mroom4.MbookClo=new Object(Mroom4,'MbookClo','책.png')
Mroom4.MbookClo.resize(100)
Mroom4.MbookClo.locate(500,350)

Mroom4.MbookClo.onClick = function(){
    if(Mroom4.MbookClo.isClosed()){
        printMessage('책이 잠겨있다')
        showKeypad("alphabet", "EFCBH" , function(){ // 키패드 1 - 숫자4자리
            printMessage('책이 열렸다!')
            Mroom4.MbookClo.setSprite('책open.png')
            Mroom4.MbookClo.open();
            Mroom4.key1.show();
        })
    } else if(Mroom4.MbookClo.isOpened()){
		showImageViewer('일기1.png')
	}
}

// 책안의 열쇠 생성
Mroom4.key1=new Item(Mroom4,'key1','열쇠1.png')
Mroom4.key1.resize(40)
Mroom4.key1.locate(540,350)
Mroom4.key1.hide()


// 드라이버 조합
Mroom4U.driver=new Item(Mroom4U,'driver','드라이버.png')
Mroom4U.driver.resize(200)
Mroom4U.driver.locate(200,350)
Mroom4U.driver.hide()


Game.makeCombination(Mroom1.handle,Mroom2.dhead,Mroom4U.driver)


//2층문 생성
Mroom4U.doorC=new Object(Mroom4U,'doorC','문close.png')
Mroom4U.doorC.resize(460)
Mroom4U.doorC.locate(640,260)

Mroom4U.doorO=new Direction(Mroom4U,'doorO','문open.png',Mroom2F)
Mroom4U.doorO.resize(460)
Mroom4U.doorO.locate(640,260)
Mroom4U.doorO.hide()

Mroom4U.doorC.onClick = function(){
    if (Mroom4U.driver.isHanded()){
        Mroom4U.doorC.setSprite("문open.png");
        printMessage("문이 열렸다.")
        Mroom4U.doorC.hide();
        Mroom4U.doorO.show()
    }
    else{
        printMessage("나사가 조여져있다.")
    }
}


//2층 금고
Mroom2F.locker=new Object(Mroom2F,'locker','마우스.png')
Mroom2F.locker.resize(150)
Mroom2F.locker.locate(450,600)

Mroom2F.locker.onClick = function(){
    if(Mroom2F.locker.isClosed()){
        printMessage("암호가 걸려있다.")
        showKeypad("number","1323",function(){
            Mroom2F.locker.open();
            printMessage("금고가 열렸다.");
        })
    }
    else{
        showImageViewer("box3.png","")
			Mroom2F.paper.pick()
			Mroom2F.paper1.show()
			printMessage("뭔가 적혀있는 종이와 그림 조각을 얻었다 \n Mroom3의 그림과 비슷하다!")
    }
}

Mroom2F.paper=new Item(Mroom2F,'paper','종이조각.png')
Mroom2F.paper.resize(150)
Mroom2F.paper.locate(450,600)
Mroom2F.paper.hide()

Mroom2F.paper1=new Object(Mroom2F,'paper1','일기2.png')
Mroom2F.paper1.resize(50)
Mroom2F.paper1.locate(550,680)
Mroom2F.paper1.hide()
Mroom2F.paper1.onClick = function(){
	showImageViewer("일기2.png","")
}



//기억1-------------------------------------------------------------------
Mroom=new Room('Mroom','기억3시작.jpg')
Bigdoor=new Room('Bigdoor','오두막-문.png')
dining1=new Room('dining1','거실1.png')
dining2=new Room('dining2','거실2-완성.png')
dining3=new Room('dining3','거실1.png')
dining4=new Room('dining4','거실2.png')
Mroom5=new Room('Mroom5','방11.png')
Mroom6=new Room('Mroom6','방2.png')
attic=new Room('attic','다락방.png')

//------------------------------------------------------------방 생성
Mroom.Up=new Arrow(Mroom,'Up',Bigdoor)
Mroom.Up.locate(620,680)
Mroom.Up.onClick=function(){
    Game.move(Bigdoor)
    printMessage('문이 열려 있다.. 들어가 보자..')
}
//기억1에서 기억2로 이동
Mpainting2.inside=new Direction(Mpainting2,'inside','마우스.png',Mroom)
Mpainting2.inside.resize(800)
Mpainting2.inside.locate(600,430)

Mpainting2.inside.onClick=function(){
    Game.move(this.connectedTo)
    printMessage('뭐지..?? 방금 전에 그림에서 보았던 곳과 같은 곳이다. 여기에 어떻게 들어온거지...?')
}

//기억2 방생성
pathstart=new Room('pathstart','숲배경-양쪽길.png')//시작 길
path1=new Room('path1','숲배경-한길.png')//시작길에서 왼쪽길
path2=new Room('path2','숲배경-오른쪽길.png')//시작길에서 오른쪽 길-세갈래길로 이어짐
path3=new Room('path3','숲배경-한길.png')//path2의 세갈래길 중 왼쪽
path4=new Room('path4','숲배경-한길.png')//path2의 세갈래 길 중 가운데


path6=new Room('path6','숲배경-오른쪽길.png')//시작길에서 직선길
path7=new Room('path7','숲배경-한길.png')//path6에서 직선길
path8=new Room('path8','숲배경-왼쪽길.png')//path6에서 오직선길

path9=new Room('path9','숲배경-한길.png')//path8에서 왼쪽길

pathfinal=new Room('pathfinal','숲배경-한길.png')//path8에서 직선길

man=new Room('man','사람.png')

//기억 3 방생성



Bigdoor.door=new Direction(Bigdoor,'door','오두막-문-열림.png',dining1)
Bigdoor.door.resize(570)
Bigdoor.door.locate(630,380)

Bigdoor.plant=new Object(Bigdoor,'plant','화분.png')
Bigdoor.plant.resize(250)
Bigdoor.plant.locate(1000,560)//화분 생성

Bigdoor.Down=new Arrow(Bigdoor,'Down',Mroom)
Bigdoor.Down.locate(620,680)

/*Bigdoor.arrow1=new Direction(Bigdoor,'arrow1','화살표-오른쪽.png',dining1)
Bigdoor.arrow1.resize(50)
Bigdoor.arrow1.locate(400,300)
Bigdoor.arrow1.hide()*/

/*Bigdoor.door.onClick=function(){
    if(Bigdoor.key.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.unlock()
        Bigdoor.arrow1.show()
    }
    else if(!Bigdoor.key.isHanded()){
        printMessage('문이 잠겨 있다. 열쇠로 열어야 할 것 같다.')
    }
}*/





//문 생성


  /* Bigdoor.plant.onClick=function(){
       if(this.id.moveX(100)){
           printMessage('화분을 밀었더니 열쇠가 나왔다.')
           Bigdoor.key.show()
       }
       else{printMessage('이곳에 어울리지 않는 화분이 있다.')}
   }*/


//------------------------------------------------------------//이제부터 방
dining1.fireplace=new openclose(dining1,'fireplace','벽난로.png','벽난로-불.png')
dining1.fireplace.resize(450)
dining1.fireplace.locate(800,300)
dining1.fireplace.lock()//벽난로 배치

dining1.wax=new Object(dining1,'wax','밀랍인형.png')
dining1.wax.resize(300)
dining1.wax.locate(850,180)//밀랍인형 배치

dining1.wax.onClick=function(){
	if(dining1.fireplace.isLocked())
	printMessage('밀랍인형이 놓여있다.')
	else
	printMessage('밀랍인형이 녹아버렸다.')
}
dining1.ladder=new Object(dining1,'ladder','사다리.png')
dining1.ladder.resize(380)
dining1.ladder.locate(420,180)
dining1.ladder.lock()
dining1.ladder.hide()//사다리 배치 완료

dining1.Up=new Arrow(dining1,'Up',attic)
dining1.Up.locate(370,400)
dining1.Up.hide()//화살표 배치 완료

dining1.bear=new Item(dining1,'bear','bear1.png')
dining1.bear.resize(200)
dining1.bear.locate(750,550)
//인형 완료

//밀랍인형 배치
dining1.keypad=new Object(dining1,'keypad','키패드-좌.png')
dining1.keypad.resize(50)
dining1.keypad.locate(200,300)
dining1.keypad.onClick=function(){
	if(dining1.ladder.isLocked()){
		showKeypad('number','0716',function(){
			dining1.ladder.unlock()
			dining1.ladder.show()
			dining1.Up.show()
			printMessage('으악! 뭐야, 천장에서 사다리가 내려왔다.. 어디로 통하는 거지?')
		})
	}
}
//사다리 등장-다락방으로 이동

dining1.keyy=new Item(dining1,'keyy','열쇠3.png')
dining1.keyy.resize(80)
dining1.keyy.locate(870,190)
dining1.keyy.hide()//열쇠 배치
//거실1 배치 완료
dining2.match=new Item(dining2,'match','성냥.png')
dining2.match.resize(80)
dining2.match.locate(800,400)
dining2.match.onClick=function(){
    printMessage('성냥을 얻었다!')
    this.id.pick()
}
//성냥
dining2.plant1=new openclose(dining2,'plant1','화분-흙.png','화분-씨앗.png')
dining2.plant1.resize(110)
dining2.plant1.locate(620,325)
dining2.plant1.lock()

dining2.cube1=new Item(dining2,'cube1','큐브-빨강.png')
dining2.cube1.resize(70)
dining2.cube1.locate(605,300)
dining2.cube1.hide()


//거실2 배치 완료

dining3.cabinet=new openclose(dining3,'cabinet','캐비닛2-2-닫힘.png','캐비닛2-2-열림.png')
dining3.cabinet.resize(320)
dining3.cabinet.locate(250,420)
dining3.cabinet.lock()

dining3.ax=new Item(dining3,'ax','도끼.png')
dining3.ax.resize(130)
dining3.ax.locate(230,280)
dining3.ax.hide()
dining3.ax.onClick=function(){
	printMessage('도끼를 얻었다.')
	this.id.pick()
}

dining3.seed=new Item(dining3,'seed','씨앗.png')
dining3.seed.resize(40)
dining3.seed.locate(230,330)
dining3.seed.hide()
dining3.seed.onClick=function(){
	printMessage('씨앗을 얻었다. 어떤 씨앗일까?')
    this.id.pick()
}
//씨앗 배치
dining3.door=new Direction(dining3,'door','방1-문.png',Mroom5)
dining3.door.resize(500)
dining3.door.locate(700,200)
dining3.door.lock()
dining3.door.onClick=function(){
	if(this.id.isLocked())
	printMessage('문이 잠겨있는 것 같다.')
	else if(!this.id.isLocked()){
		Game.move(this.connectedTo)
	}
}


//문 배치

dining3.cryptex=new Object(dining3,'cryptex','cryptex.png')
dining3.cryptex.resize(80)
dining3.cryptex.locate(380,80)
dining3.cryptex.onClick=function(){
	showKeypad('alphabet','RILEY',function(){
		dining3.door.unlock()
dining3.door.setSprite('방1-문-열림.png')
printMessage('문이 열렸다.')
})
}//문 키패드 완료

dining3.cabinet.onClick=function(){
	if(this.id.isLocked()||this.id.isClosed())
	{this.id.open()
	dining3.ax.show()
	dining3.seed.show()
this.id.setSprite(openedImage)}

	else if(this.id.isOpened())
	{this.id.close()
		dining3.seed.hide()
		dining3.ax.hide()
		this.id.setSprite(closedImage)
}}

//캐비닛 열고 닫기


//거실3 배치 완료
dining4.crack=new openclose(dining4,'crack','크랙.png','크랙-부서짐.png')
dining4.crack.resize(300)
dining4.crack.locate(300,235)
dining4.crack.lock()
//크랙 배치 완료
dining4.Up=new Arrow(dining4,'Up',Mroom6)
dining4.Up.locate(370,300)
dining4.Up.hide()

dining4.crack.onClick=function(){
	if(dining3.ax.isHanded()){
		this.id.setSprite(this.openedImage)
		this.id.unlock()
		printMessage('망치로 벽을 부쉈다!! 여기는 어디로 통하는 거지?')
		dining4.Up.show()
	}
else if(!dining3.ax.isHanded()){
	printMessage('벽에 심하게 균열이 나있다.')
}
}

//크랙 배치 완료
dining4.book=new Object(dining4,'book','책1-1.png')
dining4.book.resize(150)
dining4.book.locate(850,470)

dining4.book1=new Object(dining4,'book1','책a.png')
dining4.book1.resize(150)
dining4.book1.locate(800,580)
dining4.book1.onClick=function(){
    showImageViewer('종이1.png')
    printMessage('책 사이에 이상한 종이가 끼워져 있다...')
}

/*dining4.chest=new openclose(dining4,'chest','chest-close.png','chest-open.png')
dining4.chest.resize(200)
dining4.chest.locate(300,500)
dining4.chest.lock()

dining4.cube1=new Item(dining4,'cube1','큐브-빨강.png')
dining4.cube1.resize(70)
dining4.cube1.locate(305,505)
dining4.cube1.hide()//큐브 배치 */



//거실4 배치 완료


dining1.fireplace.onClick=function(){
	if(dining2.match.isHanded()){
		this.id.setSprite(this.openedImage)
		this.id.unlock()
		dining1.wax.setSprite('밀랍인형-녹음.png')
		dining1.keyy.show()
		printMessage('성냥으로 벽난로에 불을 붙였더니 그 위의 밀랍인형이 녹았다.')
	}
	else if(!dining2.match.isHanded())
	printMessage('아직 타다 만 장작이 남아있다.')
}//벽난로에 불붙이기
//_-------------------------------------------------
Mroom5.Down=new Arrow(Mroom5,'Down',dining3)
Mroom5.Down.locate(700,680)

Mroom5.girl=new Object(Mroom5,'girl','유령.png')
Mroom5.girl.resize(160)
Mroom5.girl.locate(650,300)

Mroom5.cube2=new Item(Mroom5,'cube2','큐브-파랑.png')
Mroom5.cube2.resize(70)
Mroom5.cube2.locate(650,390)
Mroom5.cube2.hide()
//큐브 배치


Mroom5.girl.onClick=function(){
    if(dining1.bear.isHanded()){
        Mroom5.girl.hide()
        printMessage('소녀가 사라졌다...')
        Mroom5.cube2.show()
    }
    else if(!dining1.bear.isHanded()){
printMessage('유령이 인형을 찾아달라고 말하고 있다..')
    }
}


/*Mroom5.chest=new openclose(Mroom5,'chest','chest1-닫힘.png','chest1-열림.png')
Mroom5.chest.resize(200)
Mroom5.chest.locate(240,600)
Mroom5.chest.lock()

Mroom5.head=new Item(Mroom5,'head','천사-머리.png')
Mroom5.head.resize(80)
Mroom5.head.locate(265,600)
Mroom5.head.hide()

Mroom5.chest.onClick=function(){
    if(dining1.keyy.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.unlock()
        Mroom5.head.show()
        printMessage('상자가 열렸다! 이건 또 어디에 쓸 수  있을까?')

    }
    else if(!dining1.keyy.isHanded()){
        printMessage('상자가 잠겨 있다... 이것도 자물쇠가 필요할까?')
    }
}*/

//방1 배치 완료
Mroom6.Down=new Arrow(Mroom6,'Down',dining4)
Mroom6.Down.locate(640,680)

/*Mroom6.key2=new Item(Mroom6,'key2','열쇠4.png')
Mroom6.key2.resize(150)
Mroom6.key2.locate(400,600)
Mroom6.key2.onClick=function(){
    printMessage('열쇠를 얻었다.')
    this.id.pick()
}*/
//열쇠 배치 완료

//방2 배치 완료
attic.Down=new Arrow(attic,'Down',dining1)
attic.Down.locate(640,680)

/*attic.cube4=new Item(attic,'cube4','큐브-노량.png')
attic.cube4.resize(70)
attic.cube4.locate(690,500)
attic.cube4.hide()*/

attic.angel=new Object(attic,'angel','천사-완성.png')
attic.angel.resize(200)
attic.angel.locate(690,350)
attic.angel.onClick=function(){
 printMessage('재단 같은 곳에 천사상이 올려져 있다..')
}
//천사 배치

attic.chest=new openclose(attic,'chest','chest-close.png','chest-open.png')
attic.chest.resize(200)
attic.chest.locate(120,500)
attic.chest.lock()

attic.water=new Item(attic,'water','물병.png')
attic.water.resize(50)
attic.water.locate(100,510)
attic.water.hide()

attic.chest.onClick=function(){
    if(dining1.keyy.isHanded()){
      {  this.id.unlock()
            this.id.setSprite(this.openedImage)}
            printMessage('상자가 열렸다! 웬 물병이 들어있다.')
            attic.water.show()
    }
    else if(!dining1.keyy.isHanded())
    printMessage('상자가 잠겨있는 것 같다..')
}

//다락방 배치 완료
/*dining4.chest.onClick=function(){
    if(Mroom6.key2.isHanded()){
      {  this.id.unlock()
            this.id.setSprite(this.openedImage)}
            printMessage('상자가 열렸다! 그런데 이 신기하게 생긴 물체는 뭐지..?')
            dining4.cube1.show()
    }
    else if(!Mroom6.key2.isHanded())
    printMessage('상자가 잠겨있는 것 같다.. 열쇠로 열어야 하나??')
}*/

dining2.plant1.onClick=function(){
    if(dining3.seed.isHanded()&&dining2.plant1.isLocked()){
        this.id.setSprite(this.openedImage)
        printMessage('화분에 씨앗을 심었다.')
        dining2.plant1.open()
    }
    else if(attic.water.isHanded()&&dining2.plant1.isOpened()){
        this.id.setSprite('화분-꽃.png')
        printMessage('화분에 꽃이 피었다. 그 속에서 큐브가 나왔다!')
        dining2.cube1.show()
    }
    else{
        printMessage('화분이 놓여 있다.')
    }
}

//공략
Mroom6.moldr=new openclose(Mroom6,'moldr','틀-빨강.png','틀완성-빨강.png')
Mroom6.moldr.resize(100)
Mroom6.moldr.locate(500,170)
Mroom6.moldr.lock()

Mroom6.moldb=new openclose(Mroom6,'moldb','틀-파랑.png','틀완성-파랑.png')
Mroom6.moldb.resize(100)
Mroom6.moldb.locate(780,170)
Mroom6.moldb.lock()

/*Mroom6.moldg=new openclose(Mroom6,'moldg','틀-초록.png','틀완성-초록.png')
Mroom6.moldg.resize(100)
Mroom6.moldg.locate(500,330)
Mroom6.moldg.lock()

Mroom6.moldy=new openclose(Mroom6,'moldy','틀-노랑.png','틀완성-노랑.png')
Mroom6.moldy.resize(100)
Mroom6.moldy.locate(780,330)
Mroom6.moldy.lock()*/
//틀 배치

Mroom6.angel1=new Object(Mroom6,'angel1','천사-왼쪽.png')
Mroom6.angel1.resize(300)
Mroom6.angel1.locate(200,500)

Mroom6.angel2=new Object(Mroom6,'angel2','천사-오른쪽.png')
Mroom6.angel2.resize(300)
Mroom6.angel2.locate(1080,500)

Mroom6.angel1.onClick=function(){
    printMessage('천사상이 놓여있다..')
}

Mroom6.angel2.onClick=function(){
    printMessage('천사상이 놓여있다..')
}

Mroom6.moldr.onClick=function(){
    if(dining2.cube1.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 붉은 큐브를 끼워 넣었다.')
    }
    else if(!dining2.cube1.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브 1

Mroom6.moldb.onClick=function(){
    if(Mroom5.cube2.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 파란 큐브를 끼워 넣었다.')
    }
    else if(!Mroom5.cube2.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브2
/*Mroom6.moldg.onClick=function(){
    if(Mroom5.cube2.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 초록 큐브를 끼워 넣었다.')
    }
    else if(!Mroom5.cube2.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브3

Mroom6.moldy.onClick=function(){
    if(attic.cube4.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 노란 큐브를 끼워 넣었다.')
    }
    else if(!attic.cube4.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}
*/


Mroom6.transparent=new Object(Mroom6,'transparent','투명.png')
Mroom6.transparent.resize(100)
Mroom6.transparent.locate(640,250)
Mroom6.transparent.hide()

Mroom6.paper=new Object(Mroom6,'paper','종이-힌트.png')
Mroom6.paper.resize(80)
Mroom6.paper.locate(800,600)

Mroom6.paper.onClick=function(){
    showImageViewer('종이-힌트1.png')
    printMessage('중요한 날..? 기억해 둬야 겠다.')
}

//기억3이랑 합칠때 여기를 이용
Mroom6.totheForest=new Direction(Mroom6,'totheForest','숲으로가는 사진.png',pathstart)
Mroom6.totheForest.resize(100)
Mroom6.totheForest.locate(640,250)
Mroom6.totheForest.hide()
Mroom6.totheForest.onClick=function(){
    Game.move(this.connectedTo)
    printMessage('이번에도 사진을 통해 다른 공간으로 넘어왔다..!! 그런데 저 여자는 누구지..? 매우 낯이 익다..')
}
//기억 3이랑 합칠 때 direction으로 바꾸기

Mroom6.transparent.onClick=function(){
if(Mroom6.moldb.isOpened()&&Mroom6.moldr.isOpened())
{
    Mroom6.totheForest.show()

   // room2.totheForest.show()
    //room2.arrow1.show()
//this.id.setSprite(this.openedImage)
    printMessage('큐브를 모두 꽂으니 사진이 나타났다..! 아까처럼 새로운 공간으로 이동할 수 있을까..?')
}
else{printMessage('여기 뭔가 걸려있었던 흔적이 있다..')}
}

//화살표
dining1.Right=new Arrow(dining1,'Right',dining2)
dining1.Right.locate(1220,350)

dining1.Left=new Arrow(dining1,'Left',dining4)
dining1.Left.locate(60,350)

dining2.Right=new Arrow(dining2,'Right',dining3)
dining2.Right.locate(1220,350)

dining2.Left=new Arrow(dining2,'Left',dining1)
dining2.Left.locate(60,350)

dining3.Right=new Arrow(dining3,'Right',dining4)
dining3.Right.locate(1220,350)

dining3.Left=new Arrow(dining3,'Left',dining2)
dining3.Left.locate(60,350)

dining4.Right=new Arrow(dining4,'Right',dining1)
dining4.Right.locate(1220,350)

dining4.Left=new Arrow(dining4,'Left',dining3)
dining4.Left.locate(60,350)
//화살표 완료
//기억2 배치&함수 완료


//화살표 생성
pathstart.Up=new Arrow(pathstart,'Up',path6)
pathstart.Up.locate(640,300)
pathstart.Up.hide()

pathstart.Left=new Arrow(pathstart,'Left',path1)
pathstart.Left.locate(150,550)
pathstart.Left.hide()

pathstart.Right=new Arrow(pathstart,'Right',path2)
pathstart.Right.locate(1130,550)
pathstart.Right.hide()

path1.Down=new Arrow(path1,'Down',pathstart)
path1.Down.locate(640,650)
///path1.Down.hide()

path2.Down=new Arrow(path2,'Down',pathstart)
path2.Down.locate(640,650)
///path2.Down.hide()

path2.Up=new Arrow(path2,'Up',path4)
path2.Up.locate(640,300)
path2.Up.hide()

path2.Right=new Arrow(path2,'Right',path3)
path2.Right.locate(1130,550)
path2.Right.hide()

path3.Down=new Arrow(path3,'Down',path2)
path3.Down.locate(640,650)
///path3.Down.hide()

path4.Down=new Arrow(path4,'Down',path2)
path4.Down.locate(640,650)
///path4.Down.hide()

path6.Down=new Arrow(path6,'Down',pathstart)
path6.Down.locate(640,650)
///path6.Down.hide()

path6.Up=new Arrow(path6,'Up',path7)
path6.Up.locate(640,300)
path6.Up.hide()

path6.Right=new Arrow(path6,'Right',path8)
path6.Right.locate(1130,550)
path6.Right.hide()

path7.Down=new Arrow(path7,'Down',path6)
path7.Down.locate(640,650)
///path7.Down.hide()

path8.Down=new Arrow(path8,'Down',path6)
path8.Down.locate(640,650)
///path8.Down.hide()

path8.Left=new Arrow(path8,'Left',path9)
path8.Left.locate(150,550)
path8.Left.hide()

path8.Up=new Arrow(path8,'Up', pathfinal)
path8.Up.locate(640,300)
path8.Up.hide()

path9.Down=new Arrow(path9,'Down',path8)
path9.Down.locate(640,650)
///path9.Down.hide()

pathfinal.Down=new Arrow(pathfinal,'Down',path8)
pathfinal.Down.locate(640,650)
///pathfinal.Down.hide()

//화살표 배치 완료

//사진 배치-direction

pathstart.woman=new Object(pathstart,'woman','실루엣.png')
pathstart.woman.resize(80)
pathstart.woman.locate(640,300)
pathstart.woman.show()

path2.woman=new Object(path2,'woman','실루엣.png')
path2.woman.resize(100)
path2.woman.locate(300,400)
path2.woman.show()

path6.woman=new Object(path6,'woman','실루엣.png')
path6.woman.resize(100)
path6.woman.locate(600,400)
path6.woman.show()

path8.woman=new Object(path8,'woman','실루엣.png')
path8.woman.resize(130)
path8.woman.locate(930,450)
path8.woman.show()
//사진 배치 object

path1.photo1=new Object(path1,'photo1','다이어리.png')
path1.photo1.resize(100)
path1.photo1.locate(640,450)
path1.photo1.lock()

path1.photo1.onClick=function(){
    showImageViewer('기억1다이어리.png')
    if(path3.photo2.isOpened()){
        printMessage('아까 결혼했다던 그 커플이다. 여전히 매우 낯이 익다.. 그런데 이것들은 다 누구의 기억이지..?')
    }
else
   { printMessage('행복해 보이는 커플이다.. 둘다 매우 낯이익은데..? 이 사람은 아까 본 그 여자와 비슷하게 생겼다. 그런데 이건 누구의 기억이지..?')}
    path1.photo1.open()
}

path3.photo2=new Object(path3,'photo2','다이어리.png')
path3.photo2.resize(100)
path3.photo2.locate(450,600)
path3.photo2.lock()

path3.photo2.onClick=function(){
    showImageViewer('기억2다이어리.png')
if(path1.photo1.isOpened()){
    printMessage('아까 본 그 커플이다..여전히 행복해 보이는데...\n지금 내가 느끼는 이 불안감은 뭐지..?\n그리고 이건 누구의 기억이지..?')
}
else{  printMessage('어떤 커플의 결혼사진이다. 그런데 이 둘 모두 너무 낯이 익다..\n 그리고 여자쪽은.. 아까 사라졌던 그림자와 비슷한 느낌인데..')}

    path3.photo2.open()
}

path4.photo3=new Object(path4,'photo3','다이어리.png')
path4.photo3.resize(100)
path4.photo3.locate(960,550)
path4.photo3.lock()

path4.photo3.onClick=function(){
    showImageViewer('기억3다이어리.png')
    printMessage('라일리..? 오두막에서 본 종이에 적혀있던 이름이다.. 도대체 무슨 일이 일어난거지..?')
    path4.photo3.open()
}

path7.photo4=new Object(path7,'photo4','다이어리.png')
path7.photo4.resize(100)
path7.photo4.locate(300,590)
path7.photo4.lock()

path7.photo4.onClick=function(){
    showImageViewer('기억4다이어리.png')
    printMessage('점점 일기의 내용이 불안하다..\n여기 이 숲길은 지금 이곳과 비슷한 것 같고..\n오두막은 내가 아까 갔던 그곳이 분명하다.')
    path7.photo4.open()
}

path9.photo5=new Object(path9,'photo5','다이어리.png')
path9.photo5.resize(100)
path9.photo5.locate(1100,500)
path9.photo5.lock()

path9.photo5.onClick=function(){
    showImageViewer('기억5다이어리.png')
    printMessage('이거는 아까 그 오두막 안 인것 같은데..\n도대체 무슨일이 있었던거지?!\n 그리고.. 난.. 누구지..?')
path9.photo5.open()
}

//사진배치object

pathstart.woman.onClick=function(){
    this.id.hide()
    pathstart.Up.show()
    pathstart.Left.show()
    pathstart.Right.show()
    printMessage('여자가 사라졌다...')

}

path2.woman.onClick=function(){
    this.id.hide()
    path2.Up.show()
    path2.Right.show()
    path2.Right.show()
    printMessage('여자가 사라졌다...')
}

path6.woman.onClick=function(){
    this.id.hide()
    path6.Up.show()
    path6.Right.show()
    printMessage('여자가 사라졌다...')
}

path8.woman.onClick=function(){
    this.id.hide()
    path8.Left.show()
    path8.Up.show()
    printMessage('여자가 사라졌다...')
}

pathfinal.people=new Direction(pathfinal,'people','사람들.png',man)
pathfinal.people.resize(400)
pathfinal.people.locate(630,360)
pathfinal.people.show()
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
pathfinal.mirror=new Direction(pathfinal,'mirror','거울1.png', basement2)
pathfinal.mirror.resize(100)
pathfinal.mirror.locate(640,100)
pathfinal.mirror.hide()//거울 배치 합칠때 Direction으로 바꿔서 사이비 본거지로 이동하기
pathfinal.mirror.onClick = function(){
    Game.move(this.connectedTo)
    printMessage('거울을 통해 다시 그 방으로 돌아왔다..\n몸을 되찾으려면 그들의 말대로 몸을 원래대로 돌려놔야 한다')
}
//-------------------------------------------------------------------------------------------------
man.Down=new Arrow(man,'Down',pathfinal)
man.Down.locate(640,650)

man.diary=new Object(man,'diary','다이어리.png')
man.diary.resize(300)
man.diary.locate(640,400)

pathfinal.people.onClick=function(){
    if(path1.photo1.isOpened()&&path3.photo2.isOpened()&&path4.photo3.isOpened()&&path7.photo4.isOpened()&&path9.photo5.isOpened())
{
    Game.move(this.connectedTo)
    printMessage('낯선 남자가 다이어리를 건네고 있다.\n이 다이어리는 지금까지 봤던 남자의 다이어리와 같은 것이다..')
    }
    else{
        printMessage('이 사람들은 뭐지..? 나에게 뭔가 말하고 있다\n"숲에서 모든 기억들을 찾아 돌아오면 마지막 진실을 알려주겠다.."')
    }
}

man.diary.onClick=function(){
    showImageViewer('마지막 다이어리.png')
    printMessage('이 일기를 보게 될 나에게..?\n이것은.. 내가 쓴거다.. 아.. 이제야 모든 기억이 떠올랐다..\n지금까지 봤던 기억들은.. 모두 내 것이었다..')
pathfinal.mirror.show()
}
//기억 3 함수 &&배치 완료
//--------------------------------------------------------------------------------
//Game.start(Mroom,'뭐지..?? 방금 전에 그림에서 보았던 곳과 같은 곳이다. 여기에 어떻게 들어온거지...?')



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


Game.start(start, '찢어지는듯한 통증을 이겨내고 눈을 떴다\n\n주변은 조용하다\n\n도대체 여긴 어디지?..')