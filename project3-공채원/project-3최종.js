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
room=new Room('room','기억3시작.jpg')
Bigdoor=new Room('Bigdoor','오두막-문.png')
dining1=new Room('dining1','거실1.png')
dining2=new Room('dining2','거실2-완성.png')
dining3=new Room('dining3','거실1.png')
dining4=new Room('dining4','거실2.png')
room1=new Room('room1','방11.png')
room2=new Room('room2','방2.png')
attic=new Room('attic','다락방.png')
hiddenroom=new Room('hiddenroom','숨겨진.jpg')
//------------------------------------------------------------방 생성
room.arrow=new Direction(room,'arrow','화살표-위.png',Bigdoor)
room.arrow.resize(50)
room.arrow.locate(620,680)

Bigdoor.key=new Item(Bigdoor,'key','열쇠2.png')
Bigdoor.key.resize(100)
Bigdoor.key.locate(1000,650)//  열쇠 생성
Bigdoor.key.hide()

Bigdoor.door=new openclose(Bigdoor,'door','오두막-문-닫힘.png','오두막-문-열림.png')
Bigdoor.door.resize(570)
Bigdoor.door.locate(630,380)
Bigdoor.door.lock()

Bigdoor.plant=new Object(Bigdoor,'plant','화분.png')
Bigdoor.plant.resize(250)
Bigdoor.plant.locate(1000,560)//화분 생성

Bigdoor.arrow=new Direction(Bigdoor,'arrow','화살표-아래.png',room)
Bigdoor.arrow.resize(50)
Bigdoor.arrow.locate(620,680)

Bigdoor.arrow1=new Direction(Bigdoor,'arrow1','화살표-오른쪽.png',dining1)
Bigdoor.arrow1.resize(50)
Bigdoor.arrow1.locate(400,300)
Bigdoor.arrow1.hide()

Bigdoor.door.onClick=function(){
    if(Bigdoor.key.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.unlock()
        Bigdoor.arrow1.show()
    }
    else if(!Bigdoor.key.isHanded()){
        printMessage('문이 잠겨 있다. 열쇠로 열어야 할 것 같다.')
    }
}





//문 생성


   Bigdoor.plant.onClick=function(){
       if(this.id.moveX(100)){
           printMessage('화분을 밀었더니 열쇠가 나왔다.')
           Bigdoor.key.show()
       }
       else{printMessage('이곳에 어울리지 않는 화분이 있다.')}
   }

   
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

dining1.key1=new Item(dining1,'key1','열쇠3.png')
dining1.key1.resize(80)
dining1.key1.locate(870,190)
dining1.key1.hide()//열쇠 배치
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

dining2.cube2=new Item(dining2,'cube2','큐브-파랑.png')
dining2.cube2.resize(70)
dining2.cube2.locate(605,300)
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
dining3.door=new Direction(dining3,'door','방1-문.png',room1)
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
	showKeypad('alphabet','AAAAA',function(){
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
dining4.arrow2=new Direction(dining4,'arrow2','화살표-위.png',room2)
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

dining4.book1=new Object(dining4,'book1','책.png')
dining4.book1.resize(150)
dining4.book1.locate(800,580)
dining4.book1.onClick=function(){
    showImageViewer('종이1.png')
    printMessage('책 사이에 이상한 종이가 끼워져 있다...')
}

dining4.chest=new openclose(dining4,'chest','chest-close.png','chest-open.png')
dining4.chest.resize(200)
dining4.chest.locate(300,500)
dining4.chest.lock()

dining4.cube1=new Item(dining4,'cube1','큐브-빨강.png')
dining4.cube1.resize(70)
dining4.cube1.locate(305,505)
dining4.cube1.hide()//큐브 배치 



//거실4 배치 완료


dining1.fireplace.onClick=function(){
	if(dining2.match.isHanded()){
		this.id.setSprite(this.openedImage)
		this.id.unlock()
		dining1.wax.setSprite('밀랍인형-녹음.png')
		dining1.key1.show()
		printMessage('성냥으로 벽난로에 불을 붙였더니 그 위의 밀랍인형이 녹았다.')
	}
	else if(!dining2.match.isHanded())
	printMessage('아직 타다 만 장작이 남아있다.')
}//벽난로에 불붙이기
//_-------------------------------------------------
room1.arrow=new Direction(room1,'arrow','화살표-아래.png',dining3)
room1.arrow.resize(50)
room1.arrow.locate(700,680)

room1.girl=new Object(room1,'girl','유령.png')
room1.girl.resize(160)
room1.girl.locate(650,300)

room1.cube3=new Item(room1,'cube3','큐브-초록.png')
room1.cube3.resize(70)
room1.cube3.locate(650,390)
room1.cube3.hide()
//큐브 배치


room1.girl.onClick=function(){
    if(dining1.bear.isHanded()){
        room1.girl.hide()
        printMessage('소녀가 사라졌다...')
        room1.cube3.show()
    }
    else if(!dining1.bear.isHanded()){
printMessage('유령이 인형을 찾아달라고 말하고 있다..')
    }
}


room1.chest=new openclose(room1,'chest','chest1-닫힘.png','chest1-열림.png')
room1.chest.resize(200)
room1.chest.locate(240,600)
room1.chest.lock()

room1.head=new Item(room1,'head','천사-머리.png')
room1.head.resize(80)
room1.head.locate(265,600)
room1.head.hide()

room1.chest.onClick=function(){
    if(dining1.key1.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.unlock()
        room1.head.show()
        printMessage('상자가 열렸다! 이건 또 어디에 쓸 수  있을까?')
        
    }
    else if(!dining1.key1.isHanded()){
        printMessage('상자가 잠겨 있다... 이것도 자물쇠가 필요할까?')
    }
}
//방1 배치 완료
room2.arrow=new Direction(room2,'arrow','화살표-아래.png',dining4)
room2.arrow.resize(50)
room2.arrow.locate(640,680)

room2.key2=new Item(room2,'key2','열쇠4.png')
room2.key2.resize(150)
room2.key2.locate(400,600)
room2.key2.onClick=function(){
    printMessage('열쇠를 얻었다.')
    this.id.pick()
}
//열쇠 배치 완료

//방2 배치 완료
attic.arrow=new Direction(attic,'arrow','화살표-아래.png',dining1)
attic.arrow.resize(50)
attic.arrow.locate(640,680)

attic.cube4=new Item(attic,'cube4','큐브-노량.png')
attic.cube4.resize(70)
attic.cube4.locate(690,500)
attic.cube4.hide()

attic.angel=new openclose(attic,'angel','천사-몸.png','천사-완성.png')
attic.angel.resize(200)
attic.angel.locate(690,350)
attic.angel.lock()
attic.angel.onClick=function(){
    if(room1.head.isHanded())
    {this.id.setSprite(this.openedImage)
        this.id.unlock()
        attic.cube4.show()
        printMessage('석상의 조각을 맞췄더니 큐브가 나타났다!')
    }
    else if(!room1.head.isHanded()){
        printMessage('석상에 머리가 없다...')
    }
}
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
    if(room2.key2.isHanded()){
      {  this.id.unlock()
            this.id.setSprite(this.openedImage)}
            printMessage('상자가 열렸다! 웬 물병이 들어있다.')
            attic.water.show()
    }
    else if(!room2.key2.isHanded())
    printMessage('상자가 잠겨있는 것 같다.. 비슷한 상자가 있었던 것 같은데..?')
}

//다락방 배치 완료
dining4.chest.onClick=function(){
    if(room2.key2.isHanded()){
      {  this.id.unlock()
            this.id.setSprite(this.openedImage)}
            printMessage('상자가 열렸다! 그런데 이 신기하게 생긴 물체는 뭐지..?')
            dining4.cube1.show()
    }
    else if(!room2.key2.isHanded())
    printMessage('상자가 잠겨있는 것 같다.. 열쇠로 열어야 하나??')
}

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
hiddenroom.arrow=new Direction(hiddenroom,'arrow','화살표-아래.png',room2)
hiddenroom.arrow.resize(50)
hiddenroom.arrow.locate(640,680)

//공략
room2.moldr=new openclose(room2,'moldr','틀-빨강.png','틀완성-빨강.png')
room2.moldr.resize(100)
room2.moldr.locate(500,170)
room2.moldr.lock()

room2.moldb=new openclose(room2,'moldb','틀-파랑.png','틀완성-파랑.png')
room2.moldb.resize(100)
room2.moldb.locate(780,170)
room2.moldb.lock()

room2.moldg=new openclose(room2,'moldg','틀-초록.png','틀완성-초록.png')
room2.moldg.resize(100)
room2.moldg.locate(500,330)
room2.moldg.lock()

room2.moldy=new openclose(room2,'moldy','틀-노랑.png','틀완성-노랑.png')
room2.moldy.resize(100)
room2.moldy.locate(780,330)
room2.moldy.lock()
//틀 배치ㅣ




room2.angel1=new Object(room2,'angel1','천사-왼쪽.png')
room2.angel1.resize(300)
room2.angel1.locate(200,500)

room2.angel2=new Object(room2,'angel2','천사-오른쪽.png')
room2.angel2.resize(300)
room2.angel2.locate(1080,500)

room2.angel1.onClick=function(){
    printMessage('천사상이 놓여있다..')
}

room2.angel2.onClick=function(){
    printMessage('천사상이 놓여있다..')
}

room2.moldr.onClick=function(){
    if(dining4.cube1.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 붉은 큐브를 끼워 넣었다.')
    }
    else if(!dining4.cube1.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브 1

room2.moldb.onClick=function(){
    if(dining2.cube2.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 파란 큐브를 끼워 넣었다.')
    }
    else if(!dining2.cube2.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브2
room2.moldg.onClick=function(){
    if(room1.cube3.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 초록 큐브를 끼워 넣었다.')
    }
    else if(!room1.cube3.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}//큐브3

room2.moldy.onClick=function(){
    if(attic.cube4.isHanded()){
        this.id.setSprite(this.openedImage)
        this.id.open()
     printMessage('틀에 노란 큐브를 끼워 넣었다.')
    }
    else if(!attic.cube4.isHanded()){
        printMessage('무언가 넣을 수 있는 틀이다.')
    }
}

room2.hall=new openclose(room2,'hall','벽.png','지하계단.png')
room2.hall.resize(300)
room2.hall.locate(635,465)
room2.hall.lock()

room2.arrow1=new Direction(room2,'arrow1','화살표-위.png',hiddenroom)
room2.arrow1.resize(50)
room2.arrow1.locate(640,500)
room2.arrow1.hide()

room2.hall.onClick=function(){
if(room2.moldg.isOpened()&&room2.moldb.isOpened()&&room2.moldr.isOpened()&&room2.moldy.isOpened())
{
    room2.hall.unlock()
    room2.hall.show()
    room2.arrow1.show()
this.id.setSprite(this.openedImage)
    printMessage('큐브를 모두 꽂으니 새로운 길이 나타났다!')
}
else{
    printMessage('이 벽은 가벽인 것 같다. 뒤에 공간이 느껴진다.')
}
}
//방2배치 

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

//--------------------------------------------------------------------------------
Game.start(room,'또다른 공간으로 넘어왔다.')






