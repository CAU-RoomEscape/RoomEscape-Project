//----함수 정의----//

Function.prototype.member = function(name, value){

	this.prototype[name] = value

}



// Game Definition

function Game(){}

Game.start = function(room, welcome){

	game.start(room.id)

	if(welcome !== undefined){

		game.printStory(welcome)

	} else{

		//nothing

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


//추가
Game.makeCombination = function(object1,object2,object3){
	game.makeCombination(object1.id,object2.id,object3.id)
}



// Room Definition

function Room(name, background){

	this.name = name

	this.background = background

	this.id = game.createRoom(name, background)

}

Room.member('setRoomLight', function(intensity){

	this.id.setRoomLight(intensity)

})//밝게하기?



// Object Definition

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



// Door Definition

function Door(room, name, closedImage, openedImage, connectedTo){

	Object.call(this, room, name, closedImage)



	// Door properties

	this.closedImage = closedImage

	this.openedImage = openedImage

	this.connectedTo = connectedTo

}



Door.prototype = new Object() // inherited from Object



Door.member('onClick', function(){

	if (!this.id.isLocked() && this.id.isClosed()){

		this.id.open()

	}

	else if (this.id.isOpened()){

		if (this.connectedTo !== undefined){

			Game.move(this.connectedTo)

		}

		else {

			Game.end()

		}

	}

})

Door.member('onOpen', function(){

	this.id.setSprite(this.openedImage)

})

Door.member('onClose', function(){

	this.id.setSprite(this.closedImage)

})



// Direction Definition

function Direction(room, name, Image, connectedTo){

	Object.call(this, room, name, Image)



	this.Image = Image

	this.connectedTo = connectedTo

}



Direction.prototype = new Object() // inherited from Object



Direction.member('onClick', function(){

	Game.move(this.connectedTo)

})



// openclose Definition

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



// Keypad Definition

function Keypad(room, name, image, password, callback){

	Object.call(this, room, name, image)



	this.password = password

	this.callback = callback

}



Keypad.prototype = new Object() // inherited from Object



Keypad.member('onClick', function(){

	showKeypad('number', this.password, this.callback)

})



// Item Definition

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

// 방생성
room1a=new Room('room1a','room1.png')
room2a=new Room('room2a','room2.png')
room3=new Room('room3','room3.png')
room4=new Room('room4','room4.png')
room1U=new Room('room1U','room1U.png')
room3U=new Room('room3U','room3U.png')
room4U=new Room('room4U','room4U.png')
room2F=new Room('room2F','2floor.png')
book=new Room('book','책속.png')
book1=new Room('book1','책속1.png')
book2=new Room('book2','책속2.png')
painting1=new Room('painting1','그림속.png')
painting2=new Room('painting2','그림속1.png')


//책속으로 입장, 이동
book.inside=new Direction(book,'inside','마우스.png',book1)
book.inside.resize(600)
book.inside.locate(880,430)

book1.inside=new Direction(book1,'inside','마우스.png',book2)
book1.inside.resize(800)
book1.inside.locate(800,430)

book2.inside=new Direction(book2,'inside','마우스.png',room1U)
book2.inside.resize(800)
book2.inside.locate(800,430)

//그림속으로 이동
painting1.inside=new Direction(painting1,'inside','마우스.png',painting2)
painting1.inside.resize(800)
painting1.inside.locate(600,430)

//오른쪽 이동, 이동
room1a.dirR=new Direction(room1a,'dirR','마우스.png',room2a)
room1a.dirR.resize(100)
room1a.dirR.locate(1200,430)

room2a.dirR=new Direction(room2a,'dirR','마우스.png',room3)
room2a.dirR.resize(100)
room2a.dirR.locate(1200,430)

room3.dirR=new Direction(room3,'dirR','마우스.png',room4)
room3.dirR.resize(100)
room3.dirR.locate(1200,430)

room4.dirR=new Direction(room4,'dirR','마우스.png',room1a)
room4.dirR.resize(100)
room4.dirR.locate(1200,430)

//왼쪽 방향, 이동

room1a.dirL=new Direction(room1a,'dirL','마우스.png',room4)
room1a.dirL.resize(100)
room1a.dirL.locate(100,430)

room4.dirL=new Direction(room4,'dirL','마우스.png',room3)
room4.dirL.resize(100)
room4.dirL.locate(100,430)

room3.dirL=new Direction(room3,'dirL','마우스.png',room2a)
room3.dirL.resize(100)
room3.dirL.locate(100,430)

room2a.dirL=new Direction(room2a,'dirL','마우스.png',room1a)
room2a.dirL.resize(100)
room2a.dirL.locate(100,430)

room2F.dirL=new Direction(room2F,'dirL','마우스.png',room4U)
room2F.dirL.resize(100)
room2F.dirL.locate(100,430)

//윗 방향 설정, 이동
room1a.dirU=new Direction(room1a,'dirU','마우스.png',room1U)
room1a.dirU.resize(100)
room1a.dirU.locate(650,80)

room3.dirU=new Direction(room3,'dirU','마우스.png',room3U)
room3.dirU.resize(100)
room3.dirU.locate(650,80)

room4.dirU=new Direction(room4,'dirU','마우스.png',room4U)
room4.dirU.resize(100)
room4.dirU.locate(220,80)

//아래 방향 설정, 이동
room1U.dirD=new Direction(room1U,'dirD','마우스.png',room1a)
room1U.dirD.resize(100)
room1U.dirD.locate(100,600)

room3U.dirD=new Direction(room3U,'dirD','마우스.png',room3)
room3U.dirD.resize(100)
room3U.dirD.locate(100,600)

room4U.dirD=new Direction(room4U,'dirD','마우스.png',room4)
room4U.dirD.resize(100)
room4U.dirD.locate(100,600)

//box1 생성
room1a.box1=new Object(room1a,'box1','마우스.png')
room1a.box1.resize(50)
room1a.box1.locate(320,380)
room1a.box1.onClick=function(){
    if(room4.key1.isHanded()){
        showImageViewer("box1.png","")
        printMessage("열렸다.")
    }
    else{
        printMessage("잠겨있다.")
    }
}

//잠겨있는 문 
room1a.text=new Object(room1a,'text','마우스.png')
room1a.text.resize(200)
room1a.text.locate(650,350)
room1a.text.onClick=function(){
	printMessage("문은 자물쇠로 잠겨있다.")
}

// 전등
room1a.text1=new Object(room1a,'text1','마우스.png')
room1a.text1.resize(100)
room1a.text1.locate(1050,125)
room1a.text1.onClick=function(){
	printMessage("불이 켜진 것도 있고.. 꺼진 것도 있고.. ")
}

// 얼룩
room1a.text2=new Object(room1a,'text2','마우스.png')
room1a.text2.resize(100)
room1a.text2.locate(1050,600)
room1a.text2.onClick=function(){
	printMessage("검붉은 얼룩이 묻어있다..")
}


//box2 생성
room1a.box2=new Object(room1a,'box2','마우스.png')
room1a.box2.resize(100)
room1a.box2.locate(1000,380)
room1a.box2.close()
room1a.box2.onClick=function(){
    if(room1a.box2.isClosed()){
        printMessage("잠겨있다.")
        showKeypad("number", "1457" , function(){ // 키패드 1 - 숫자4자리
            printMessage("열렸다!!")
            room1a.box2.open();
            

     })}
     else if(room1a.box2.isOpened()){
        showImageViewer("box2.png","")
        room1a.handle.pick();
        printMessage("안에서 드라이버 손잡이를 주웠다.")
     }
}

//손잡이 생성 
room1a.handle=new Item(room1a,'handle','손잡이.png')
room1a.handle.resize(800)
room1a.handle.locate(540,350)
room1a.handle.hide()



//room1U 표시 보기
room1U.markR1U=new Object(room1U,'markR1U','마우스.png')
room1U.markR1U.resize(100)
room1U.markR1U.locate(370,150)

room1U.markR1U.onClick = function(){
	if(room2a.scope.isHanded()){
		showImageViewer("이미지.png","");
	}
	else {
		printMessage("너무 멀어서 보이지 않는다..");
	}
}

// 창밖
room1U.text=new Object(room1U,'text','마우스.png')
room1U.text.resize(250)
room1U.text.locate(650,400)
room1U.text.onClick=function(){
	printMessage("밖에는 눈이 내리고 있다..")
}

//쌍안경 생성
room2a.scope=new Item(room2a,'scope','쌍안경.png')
room2a.scope.resize(100)
room2a.scope.locate(600,400)

//그림 보기
room2a.picture=new Object(room2a,'picture','마우스.png')
room2a.picture.resize(100)
room2a.picture.locate(615,260)
room2a.picture.onClick =function(){
    showImageViewer("그림.png");
}

//드라이버 앞부분 생성
room2a.head=new Item(room2a,'head','앞부분.png')
room2a.head.resize(60)
room2a.head.locate(1050,650)

//painting 통로
room3.painting=new Object(room3,'painting','마우스.png')
room3.painting.resize(80)
room3.painting.locate(270,350)
room3.painting.onClick = function(){
    printMessage("그림이 조금 찢어져있다.")
}

room3.painting1=new Direction(room3,'painting1','마우스.png',painting1)
room3.painting1.resize(80)
room3.painting1.locate(270,350)
room3.painting1.hide()

room3.painting.onClick = function(){
    if(room2F.paper.isHanded()){
		room3.painting1.show()
		room3.painting.hide()
	}
}

// 이상해 보이는 문
room3.text=new Object(room3,'text','마우스.png')
room3.text.resize(200)
room3.text.locate(650,350)
room3.text.onClick=function(){
	printMessage("문이 반대편에서 잠겨있는 듯하다.. \n작은 글씨로 '들어오지마 여보' 라고 적혀있다.")
}

//2층 발견
room3U.text=new Object(room3U,'text','마우스.png')
room3U.text.resize(500)
room3U.text.locate(650,400)
room3U.text.onClick=function(){
	printMessage("2층이 있다 사다리로 올라갈 수 있을 거 같은데..")
}

//책 생성
room4.bookClo=new Object(room4,'bookClo','책.png')
room4.bookClo.resize(100)
room4.bookClo.locate(500,350)

room4.bookClo.onClick = function(){
    if(room4.bookClo.isClosed()){
        printMessage("책은 잠겨있다.")
        showKeypad("alphabet", "EFCBH" , function(){ // 키패드 1 - 숫자4자리
            printMessage("책이 열렸다 !!")
            room4.bookClo.setSprite("책open.png")
            room4.bookClo.open();
            room4.key1.show();


     });}
    else{
		showImageViewer("일기1.png","")
	}
}

// 책안의 열쇠 생성
room4.key1=new Item(room4,'key1','열쇠1.png')
room4.key1.resize(40)
room4.key1.locate(540,350)
room4.key1.hide()


// 드라이버 조합
room4U.driver=new Item(room4U,'driver','드라이버.png')
room4U.driver.resize(200)
room4U.driver.locate(200,350)
room4U.driver.hide()


Game.makeCombination(room1a.handle,room2a.head,room4U.driver)


//2층문 생성
room4U.doorC=new Object(room4U,'doorC','문close.png')
room4U.doorC.resize(460)
room4U.doorC.locate(640,260)

room4U.doorO=new Direction(room4U,'doorO','문open.png',room2F)
room4U.doorO.resize(460)
room4U.doorO.locate(640,260)
room4U.doorO.hide()

room4U.doorC.onClick = function(){
    if (room4U.driver.isHanded()){
        room4U.doorC.setSprite("문open.png");
        printMessage("문이 열렸다.")
        room4U.doorC.hide();
        room4U.doorO.show()
    }
    else{
        printMessage("나사가 조여져있다.")
    }
}


//2층 금고
room2F.locker=new Object(room2F,'locker','마우스.png')
room2F.locker.resize(150)
room2F.locker.locate(450,600)

room2F.locker.onClick = function(){
    if(room2F.locker.isClosed()){
        printMessage("암호가 걸려있다.")
        showKeypad("number","1323",function(){
            room2F.locker.open();
            printMessage("금고가 열렸다.");
        })
    }
    else{
        showImageViewer("box3.png","")
			room2F.paper.pick()
			room2F.paper1.pick()
			printMessage("뭔가 적혀있는 종이와 그림 조각을 얻었다 \n room3의 그림과 비슷하다!")
    }
}

room2F.paper=new Item(room2F,'paper','종이조각.png')
room2F.paper.resize(150)
room2F.paper.locate(450,600)
room2F.paper.hide()

room2F.paper1=new Item(room2F,'paper1','일기2.png')
room2F.paper1.resize(150)
room2F.paper1.locate(450,600)
room2F.paper1.hide()

//기억1에서 기억2로 이동
painting2.inside=new Direction(painting2,'inside','마우스.png',book)
painting2.inside.resize(800)
painting2.inside.locate(600,430)

Game.start(book,'환영합니다.')

//--------------------------------------------------------기억 1**************************************
