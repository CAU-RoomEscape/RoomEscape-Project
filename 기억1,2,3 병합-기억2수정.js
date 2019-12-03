
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

//-------------------------------------------------------함수생성 완료

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
Mroom3.painting.onClick = function(){
    printMessage("그림이 조금 찢어져있다.")
}

Mroom3.Mpainting1=new Direction(Mroom3,'Mpainting1','마우스.png',Mpainting1)
Mroom3.Mpainting1.resize(80)
Mroom3.Mpainting1.locate(270,350)
Mroom3.Mpainting1.hide()

Mroom3.painting.onClick = function(){
    if(Mroom2F.paper.isHanded()){
		Mroom3.Mpainting1.show()
		Mroom3.painting.hide()
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
Mroom.arrow=new Direction(Mroom,'arrow','화살표-위.png',Bigdoor)
Mroom.arrow.resize(50)
Mroom.arrow.locate(620,680)
Mroom.arrow.onClick=function(){
    Game.move(connectedTo)
    printMessage('문이 열려있다..')
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

/*Bigdoor.key=new Item(Bigdoor,'key','열쇠5.png')
Bigdoor.key.resize(100)
Bigdoor.key.locate(1000,650)//  열쇠 생성
Bigdoor.key.hide()*/

Bigdoor.door=new Direction(Bigdoor,'door','오두막-문-열림.png',dining)
Bigdoor.door.resize(570)
Bigdoor.door.locate(630,380)


Bigdoor.plant=new Object(Bigdoor,'plant','화분.png')
Bigdoor.plant.resize(250)
Bigdoor.plant.locate(1000,560)//화분 생성

Bigdoor.arrow=new Direction(Bigdoor,'arrow','화살표-아래.png',Mroom)
Bigdoor.arrow.resize(50)
Bigdoor.arrow.locate(620,680)

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

dining1.arrow2=new Direction(dining1,'arrow2','화살표-위.png',attic)
dining1.arrow2.resize(50)
dining1.arrow2.locate(370,400)
dining1.arrow2.hide()//화살표 배치 완료

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
			dining1.arrow2.show()
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

dining2.cube2=new Item(dining2,'cube2','큐브-.png')
dining2.cube2.resize(70)
dining2.cube2.locate(605,280)
dining2.cube2.hide()


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
dining4.arrow2=new Direction(dining4,'arrow2','화살표-위.png',Mroom6)
dining4.arrow2.resize(50)
dining4.arrow2.locate(370,300)
dining4.arrow2.hide()

dining4.crack.onClick=function(){
	if(dining3.ax.isHanded()){
		this.id.setSprite(this.openedImage)
		this.id.unlock()
		printMessage('망치로 벽을 부쉈다!! 여기는 어디로 통하는 거지?')
		dining4.arrow2.show()
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
Mroom5.arrow=new Direction(Mroom5,'arrow','화살표-아래.png',dining3)
Mroom5.arrow.resize(50)
Mroom5.arrow.locate(700,680)

Mroom5.girl=new Object(Mroom5,'girl','유령.png')
Mroom5.girl.resize(160)
Mroom5.girl.locate(650,300)

Mroom5.cube3=new Item(Mroom5,'cube3','큐브-초록.png')
Mroom5.cube3.resize(70)
Mroom5.cube3.locate(650,390)
Mroom5.cube3.hide()
//큐브 배치


Mroom5.girl.onClick=function(){
    if(dining1.bear.isHanded()){
        Mroom5.girl.hide()
        printMessage('소녀가 사라졌다...')
        Mroom5.cube3.show()
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
Mroom6.arrow=new Direction(Mroom6,'arrow','화살표-아래.png',dining4)
Mroom6.arrow.resize(50)
Mroom6.arrow.locate(640,680)

/*Mroom6.key2=new Item(Mroom6,'key2','열쇠4.png')
Mroom6.key2.resize(150)
Mroom6.key2.locate(400,600)
Mroom6.key2.onClick=function(){
    printMessage('열쇠를 얻었다.')
    this.id.pick()
}*/
//열쇠 배치 완료

//방2 배치 완료
attic.arrow=new Direction(attic,'arrow','화살표-아래.png',dining1)
attic.arrow.resize(50)
attic.arrow.locate(640,680)

/*attic.cube4=new Item(attic,'cube4','큐브-노량.png')
attic.cube4.resize(70)
attic.cube4.locate(690,500)
attic.cube4.hide()*/

attic.angel=new Object(attic,'angel','천사-완성.png')
attic.angel.resize(200)
attic.angel.locate(690,350)
/*attic.angel.lock()
attic.angel.onClick=function(){
    if(Mroom5.head.isHanded())
    {this.id.setSprite(this.openedImage)
        this.id.unlock()
        attic.cube4.show()
        printMessage('석상의 조각을 맞췄더니 큐브가 나타났다!')
    }
    else if(!Mroom5.head.isHanded()){
        printMessage('석상에 머리가 없다...')
    }
}*/
//천사 배치

attic.chest=new openclose(attic,'chest','chest-close.png','chest-open.png')
attic.chest.resize(200)
attic.chest.locate(100,500)
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
    else if(!dining1.kkey.isHanded())
    printMessage('상자가 잠겨있는 것 같다.. 비슷한 상자가 있었던 것 같은데..?')
}

//다락방 배치 완료
/*dining4.chest.onClick=function(){
    if(dining1.keyy.isHanded()){
      {  this.id.unlock()
            this.id.setSprite(this.openedImage)}
            printMessage('상자가 열렸다! 그런데 이 신기하게 생긴 물체는 뭐지..?')
            dining4.cube1.show()
    }
    else if(!dining1.kkey.isHanded())
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
        dining2.cube2.show()
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
Mroom6.moldy.lock()
//틀 배치*/

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
    if(dining4.cube1.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 붉은 큐브를 끼워 넣었다.')
    }
    else if(!dining4.cube1.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브 1

Mroom6.moldb.onClick=function(){
    if(dining2.cube2.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 파란 큐브를 끼워 넣었다.')
    }
    else if(!dining2.cube2.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브2
/*Mroom6.moldg.onClick=function(){
    if(Mroom5.cube3.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 초록 큐브를 끼워 넣었다.')
    }
    else if(!Mroom5.cube3.isHanded()){
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
}*/



Mroom6.transparent=new Object(Mroom6,'transparent','투명.png')
Mroom6.transparent.resize(100)
Mroom6.transparent.locate(640,250)
Mroom6.transparent.show()

Mroom6.paper=new Object(Mroom6,'paper','종이-힌트.png')
Mroom6.paper.resize(80)
Mroom6.paper.locate(800,600)

Mroom6.paper.onClick=function(){
    showImageViewer('종이-힌트2.png')
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
if(Mroom6.moldg.isOpened()&&Mroom6.moldb.isOpened()&&Mroom6.moldr.isOpened()&&Mroom6.moldy.isOpened())
{
    Mroom6.transparent.hide()
    Mroom6.totheForest.show()
   
   // room2.totheForest.show()
    //room2.arrow1.show()
//this.id.setSprite(this.openedImage)
    printMessage('큐브를 모두 꽂으니 사진이 나타났다..! 아까처럼 새로운 공간으로 이동할 수 있을까..?')
}
else{printMessage('여기 뭔가 걸려있었던 흔적이 있다..')}
}

//화살표
dining1.arrow=new Direction(dining1,'arrow','화살표-오른쪽.png',dining2)
dining1.arrow.resize(50)
dining1.arrow.locate(1220,350)

dining1.arrow1=new Direction(dining1,'arrow1','화살표-왼쪽.png',dining4)
dining1.arrow1.resize(50)
dining1.arrow1.locate(60,350)

dining2.arrow=new Direction(dining2,'arrow','화살표-오른쪽.png',dining3)
dining2.arrow.resize(50)
dining2.arrow.locate(1220,350)

dining2.arrow1=new Direction(dining2,'arrow1','화살표-왼쪽.png',dining1)
dining2.arrow1.resize(50)
dining2.arrow1.locate(60,350)

dining3.arrow=new Direction(dining3,'arrow','화살표-오른쪽.png',dining4)
dining3.arrow.resize(50)
dining3.arrow.locate(1220,350)

dining3.arrow1=new Direction(dining3,'arrow1','화살표-왼쪽.png',dining2)
dining3.arrow1.resize(50)
dining3.arrow1.locate(60,350)

dining4.arrow=new Direction(dining4,'arrow','화살표-오른쪽.png',dining1)
dining4.arrow.resize(50)
dining4.arrow.locate(1220,350)


dining4.arrow1=new Direction(dining4,'arrow1','화살표-왼쪽.png',dining3)
dining4.arrow1.resize(50)
dining4.arrow1.locate(60,350)
//화살표 완료
//기억2 배치&함수 완료


//화살표 생성
pathstart.parrow1=new Direction(pathstart,'parrow1','화살표-위.png',path6)
pathstart.parrow1.resize(50)
pathstart.parrow1.locate(640,300)
pathstart.parrow1.hide()

pathstart.parrow2=new Direction(pathstart,'parrow2','화살표-왼쪽.png',path1)
pathstart.parrow2.resize(50)
pathstart.parrow2.locate(150,550)
pathstart.parrow2.hide()

pathstart.parrow3=new Direction(pathstart,'parrow3','화살표-오른쪽.png',path2)
pathstart.parrow3.resize(50)
pathstart.parrow3.locate(1130,550)
pathstart.parrow3.hide()

path1.parrow=new Direction(path1,'parrow','화살표-아래.png',pathstart)
path1.parrow.resize(50)
path1.parrow.locate(640,650)
///path1.parrow.hide()

path2.parrow=new Direction(path2,'parrow','화살표-아래.png',pathstart)
path2.parrow.resize(50)
path2.parrow.locate(640,650)
///path2.parrow.hide()

path2.parrow1=new Direction(path2,'parrow1','화살표-위.png',path4)
path2.parrow1.resize(50)
path2.parrow1.locate(640,300)
path2.parrow1.hide()

path2.parrow2=new Direction(path2,'parrow2','화살표-오른쪽.png',path3)
path2.parrow2.resize(50)
path2.parrow2.locate(1130,550)
path2.parrow2.hide()


path3.parrow=new Direction(path3,'parrow','화살표-아래.png',path2)
path3.parrow.resize(50)
path3.parrow.locate(640,650)
///path3.parrow.hide()

path4.parrow=new Direction(path4,'parrow','화살표-아래.png',path2)
path4.parrow.resize(50)
path4.parrow.locate(640,650)
///path4.parrow.hide()


path6.parrow=new Direction(path6,'parrow','화살표-아래.png',pathstart)
path6.parrow.resize(50)
path6.parrow.locate(640,650)
///path6.parrow.hide()

path6.parrow1=new Direction(path6,'parrow1','화살표-위.png',path7)
path6.parrow1.resize(50)
path6.parrow1.locate(640,300)
path6.parrow1.hide()

path6.parrow2=new Direction(path6,'parrow2','화살표-오른쪽.png',path8)
path6.parrow2.resize(50)
path6.parrow2.locate(1130,550)
path6.parrow2.hide()

path7.parrow=new Direction(path7,'parrow','화살표-아래.png',path6)
path7.parrow.resize(50)
path7.parrow.locate(640,650)
///path7.parrow.hide()

path8.parrow=new Direction(path8,'parrow','화살표-아래.png',path6)
path8.parrow.resize(50)
path8.parrow.locate(640,650)
///path8.parrow.hide()

path8.parrow1=new Direction(path8,'parrow1','화살표-왼쪽.png',path9)
path8.parrow1.resize(50)
path8.parrow1.locate(150,550)
path8.parrow1.hide()

path8.parrow2=new Direction(path8,'parrow2','화살표-위.png', pathfinal)
path8.parrow2.resize(50)
path8.parrow2.locate(640,300)
path8.parrow2.hide()

path9.parrow=new Direction(path9,'parrow','화살표-아래.png',path8)
path9.parrow.resize(50)
path9.parrow.locate(640,650)
///path9.parrow.hide()

pathfinal.parrow=new Direction(pathfinal,'parrow','화살표-아래.png',path8)
pathfinal.parrow.resize(50)
pathfinal.parrow.locate(640,650)
///pathfinal.parrow.hide()

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
    printMessage('아까 본 그 커플이다..여전히 행복해 보이는데... 지금 내가 느끼는 이 불안감은 뭐지..?\n그리고 이건 누구의 기억이지..?')
}
else{  printMessage('어떤 커플의 결혼사진이다. 그런데 이 둘 모두 너무 낯이 익다.. \n 그리고 여자쪽은.. 아까 사라졌던 그림자와 너무 비슷하게 생겼다.')}
  
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
    printMessage('점점 일기의 내용이 불안하다.. 여기 이 숲길은 지금 이곳과 비슷한 것 같고..오두막은 내가 아까 갔던 그곳이 분명하다.')
    path7.photo4.open()
}

path9.photo5=new Object(path9,'photo5','다이어리.png')
path9.photo5.resize(100)
path9.photo5.locate(1100,500)
path9.photo5.lock()

path9.photo5.onClick=function(){
    showImageViewer('기억5다이어리.png')
    printMessage('이게 무슨 끔찍한 일인가..!! 여기는 아까 갔던 오두막 안 인것 같다.. 그곳에서 도대체 무슨일이 일어났던 것이지..?\n 그리고..난.. 누구지..?')
path9.photo5.open()
}

//사진배치object

pathstart.woman.onClick=function(){
    this.id.hide()
    pathstart.parrow1.show()
    pathstart.parrow2.show()
    pathstart.parrow3.show()
    printMessage('여자가 사라졌다...')

}

path2.woman.onClick=function(){
    this.id.hide()
    path2.parrow1.show()
    path2.parrow2.show()
    path2.parrow3.show()
    printMessage('여자가 사라졌다...')
}

path6.woman.onClick=function(){
    this.id.hide()
    path6.parrow1.show()
    path6.parrow2.show()
    printMessage('여자가 사라졌다...')
}

path8.woman.onClick=function(){
    this.id.hide()
    path8.parrow1.show()
    path8.parrow2.show()
    printMessage('여자가 사라졌다...')
}

pathfinal.people=new Direction(pathfinal,'people','사람들.png',man)
pathfinal.people.resize(400)
pathfinal.people.locate(630,360)
pathfinal.people.show()
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
pathfinal.mirror=new Object(pathfinal,'mirror','거울1.png')
pathfinal.mirror.resize(100)
pathfinal.mirror.locate(640,100)
pathfinal.mirror.hide()//거울 배치 합칠때 Direction으로 바꿔서 사이비 본거지로 이동하기
//-------------------------------------------------------------------------------------------------
man.arrow=new Direction(man,'arrow','화살표-아래.png',pathfinal)
man.arrow.resize(50)
man.arrow.locate(640,650)

man.diary=new Object(man,'diary','다이어리.png')
man.diary.resize(300)
man.diary.locate(640,400)

pathfinal.people.onClick=function(){
    if(path1.photo1.isOpened()&&path3.photo2.isOpened()&&path4.photo3.isOpened()&&path7.photo4.isOpened()&&path9.photo5.isOpened())
{
    Game.move(this.connectedTo)
    printMessage('낯선 남자가 다이어리를 건네고 있다. 이 다이어리는 지금까지 봤던 남자의 다이어리와 같은 것이다..')
    }
    else{
        printMessage('이 사람들은 뭐지..? 나에게 뭔가 말하고 있다\n\n사람들 : 모든 기억을 찾아 돌아오면 사건의 진실을 알려주겠다... ')
    }
}

man.diary.onClick=function(){
    showImageViewer('마지막 다이어리.png')
    printMessage('이 일기를 보게 될 나에게..? 이것은.. 내가.. 쓴거다..아.. 이제야 모든 기억이 떠올랐다.. 지금까지 봤던 기억들은..내 것이었다..')
pathfinal.mirror.show()
}
//기억 3 함수 &&배치 완료
//--------------------------------------------------------------------------------
//Game.start(Mroom,'뭐지..?? 방금 전에 그림에서 보았던 곳과 같은 곳이다. 여기에 어떻게 들어온거지...?')


Game.start(Mbook,'환영합니다.')




