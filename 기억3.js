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


//-----------------------------------------------------------함수생성 완료

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



//path 생성 완료

/*memory1=new Room('memory1','')
memory2=new Room('memory2','')
memory3=new Room('memory3','')
memory4=new Room('memory4','')
memory5=new Room('memory5','')
memory6=new Room('memory6','')*/

//기억 사진 생성 완료
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
pathfinal.mirror=new Object(pathfinal,'mirror','거울1.png')
pathfinal.mirror.resize(100)
pathfinal.mirror.locate(640,100)
pathfinal.mirror.hide()//거울 배치 합칠때 Direction으로 바꿔서 사이비 본거지로 이동하기
//-------------------------------------------------------------------------------------------------
man.arrow=new Direction(man,'arrow','화살표-아래.png',pathfinal)
man.arrow.resize(50)
man.arrow.locate(640,650)

man.diary=new Object(man,'diary','다이어리.png')
man.diary.resize(400)
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
    printMessage('이 일기를 보게 될 나에게..? 이것은.. 내가.. 쓴거다..아.. 이제야 모든 기억이 떠올랐다.. 지금까지 봤던 기억들은..')
pathfinal.mirror.show()
}





//함수


Game.start(pathstart,'여긴 어디지...? 설마 그림속으로 들어온건가..?\n 저 여자는 누구지..? 매우 낯이 익다..')
