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
	printMessage("문은 자물쇠로 잠겨있다.")
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
Mroom1.box2=new Object(Mroom1,'box2','마우스.png')
Mroom1.box2.resize(100)
Mroom1.box2.locate(1000,380)
Mroom1.box2.close()
Mroom1.box2.onClick=function(){
    if(Mroom1.box2.isClosed()){
        printMessage("잠겨있다.")
        showKeypad("number", "1457" , function(){ // 키패드 1 - 숫자4자리
            printMessage("열렸다!!")
            Mroom1.box2.open();


     })}
     else if(Mroom1.box2.isOpened()){
        showImageViewer("box2.png","")
        Mroom1.handle.pick();
        printMessage("안에서 드라이버 손잡이를 주웠다.")
     }
}

//손잡이 생성
Mroom1.handle=new Item(Mroom1,'handle','손잡이.png')
Mroom1.handle.resize(800)
Mroom1.handle.locate(540,350)
Mroom1.handle.hide()



//Mroom1U 표시 보기
Mroom1U.markR1U=new Object(Mroom1U,'markR1U','마우스.png')
Mroom1U.markR1U.resize(100)
Mroom1U.markR1U.locate(370,150)

Mroom1U.markR1U.onClick = function(){
	if(Mroom2.scope.isHanded()){
		showImageViewer("이미지.png","");
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
	printMessage("밖에는 눈이 내리고 있다..")
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
Mroom2.head=new Item(Mroom2,'head','앞부분.png')
Mroom2.head.resize(60)
Mroom2.head.locate(1050,650)

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
		printMessage("찢어진 부분에 딱 맞았다.")
		Mroom3.Mpainting1.show()
		Mroom3.painting.hide()
	}	else {
		printMessage("그림이 조금 찢어져있다.")
	}
}

// 이상해 보이는 문
Mroom3.text=new Object(Mroom3,'text','마우스.png')
Mroom3.text.resize(200)
Mroom3.text.locate(650,350)
Mroom3.text.onClick=function(){
	printMessage("문이 반대편에서 잠겨있는 듯하다.. \n작은 글씨로 '들어오지마 여보' 라고 적혀있다.")
}

//2층 발견
Mroom3U.text=new Object(Mroom3U,'text','마우스.png')
Mroom3U.text.resize(500)
Mroom3U.text.locate(650,400)
Mroom3U.text.onClick=function(){
	printMessage("2층이 있다 사다리로 올라갈 수 있을 거 같은데..")
}

//책 생성
Mroom4.MbookClo=new Object(Mroom4,'MbookClo','책.png')
Mroom4.MbookClo.resize(100)
Mroom4.MbookClo.locate(500,350)

Mroom4.MbookClo.onClick = function(){
    if(Mroom4.MbookClo.isClosed()){
        printMessage("책은 잠겨있다.")
        showKeypad("alphabet", "EFCBH" , function(){ // 키패드 1 - 숫자4자리
            printMessage("책이 열렸다 !!")
            Mroom4.MbookClo.setSprite("책open.png")
            Mroom4.MbookClo.open();
            Mroom4.key1.show();


     });}
    else{
		showImageViewer("일기1.png","")
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


Game.makeCombination(Mroom1.handle,Mroom2.head,Mroom4U.driver)


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
			Mroom2F.paper1.pick()
			printMessage("뭔가 적혀있는 종이와 그림 조각을 얻었다 \n Mroom3의 그림과 비슷하다!")
    }
}

Mroom2F.paper=new Item(Mroom2F,'paper','종이조각.png')
Mroom2F.paper.resize(150)
Mroom2F.paper.locate(450,600)
Mroom2F.paper.hide()

Mroom2F.paper1=new Item(Mroom2F,'paper1','일기2.png')
Mroom2F.paper1.resize(150)
Mroom2F.paper1.locate(450,600)
Mroom2F.paper1.hide()

//기억1에서 기억2로 이동
Mpainting2.inside=new Direction(Mpainting2,'inside','마우스.png',Mbook)
Mpainting2.inside.resize(800)
Mpainting2.inside.locate(600,430)

Game.start(Mbook,'환영합니다.')

//--------------------------------------------------------기억 1**************************************
