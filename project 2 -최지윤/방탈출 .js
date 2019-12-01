room1 = game.createRoom("room1", "room1.png");
room2 = game.createRoom("room2", "room2.png");
room3 = game.createRoom("room3", "room3.png");
room4 = game.createRoom("room4", "room4.png");
room1U = game.createRoom("room1U","room1U.png");
room4U = game.createRoom("room4U","room4U.png");
room3U = game.createRoom("room3U","room3U.png");



// 오른쪽 방향 설정

room1.dirR = room1.createObject("dirR", "마우스.png");
room1.dirR.setWidth(100);
room1.locateObject(room1.dirR,1200,430);

room2.dirR = room2.createObject("dirR", "마우스.png");
room2.dirR.setWidth(100);
room2.locateObject(room2.dirR,1200,430);

room3.dirR = room3.createObject("dirR", "마우스.png");
room3.dirR.setWidth(100);
room3.locateObject(room3.dirR,1200,430);

room4.dirR = room4.createObject("dirR", "마우스.png");
room4.dirR.setWidth(100);
room4.locateObject(room4.dirR,1200,430);

// 왼쪽 방향 설정


room1.dirL = room1.createObject("dirL", "마우스.png");
room1.dirL.setWidth(100);
room1.locateObject(room1.dirL,100,430);

room2.dirL = room2.createObject("dirL", "마우스.png");
room2.dirL.setWidth(100);
room2.locateObject(room2.dirL,100,430);

room3.dirL = room3.createObject("dirL", "마우스.png");
room3.dirL.setWidth(100);
room3.locateObject(room3.dirL,100,430);

room4.dirL = room4.createObject("dirL", "마우스.png");
room4.dirL.setWidth(100);
room4.locateObject(room4.dirL,100,430);

// 윗 방향 설정
room1.dirU = room1.createObject("dirU","마우스.png");
room1.dirU.setWidth(100);
room1.locateObject(room1.dirU,650,80);

room3.dirU = room3.createObject("dirU","마우스.png");
room3.dirU.setWidth(100);
room3.locateObject(room3.dirU,650,80);

room4.dirU = room4.createObject("dirU","마우스.png");
room4.dirU.setWidth(100);
room4.locateObject(room4.dirU,220,80);

//아래 방향 설정
room1U.dirD = room1U.createObject("dirD","마우스.png");
room1U.dirD.setWidth(100);
room1U.locateObject(room1U.dirD,100,600);

room3U.dirD = room3U.createObject("dirD","마우스.png");
room3U.dirD.setWidth(100);
room3U.locateObject(room3U.dirD,100,600);

room4U.dirD = room4U.createObject("dirD","마우스.png");
room4U.dirD.setWidth(100);
room4U.locateObject(room4U.dirD,100,600);



// 왼쪽 방향으로 이동
room1.dirL.onClick = function(){
	game.move(room4);
	
}

room4.dirL.onClick = function(){
	game.move(room3);
	
}

room3.dirL.onClick = function(){
	game.move(room2);
	
}

room2.dirL.onClick = function(){
	game.move(room1);
	
}


// 오른쪽 방향으로 이동


room1.dirR.onClick = function(){
	game.move(room2);
	
}

room2.dirR.onClick = function(){
	game.move(room3);
	
}

room3.dirR.onClick = function(){
	game.move(room4);
	
}

room4.dirR.onClick = function(){
	game.move(room1);
	
}

// 윗 방향 이동

room1.dirU.onClick = function(){
	game.move(room1U);
	
}

room3.dirU.onClick = function(){
	game.move(room3U);
	
}

room4.dirU.onClick = function(){
	game.move(room4U);
	
}

//아래방향 이동
room1U.dirD.onClick = function(){
	game.move(room1);
	
}

room3U.dirD.onClick = function(){
	game.move(room3);
	
}

room4U.dirD.onClick = function(){
	game.move(room4);
	
}


//Box 1 생성
room1.box1 = room1.createObject("box1","마우스.png")
room1.box1.setWidth(50);
room1.locateObject(room1.box1,320,380);
room1.box1.onClick = function(){
    if(game.getHandItem() == room1.key1F){
        showImageViewer("box1.png","");
        printMessage("열렸다.")
	}
	else {
		printMessage("잠겨있다.");
	}
}

// 키 생성 (임시)
room1.key1F = room1.createObject("key1F","열쇠1.png");
room1.key1F.setWidth(40);
room1.locateObject(room1.key1F,540,350);
room1.key1F.hide();

//box2 생성
room1.box2 = room1.createObject("box2","마우스.png");
room1.box2.setWidth(100);
room1.locateObject(room1.box2,1000,380);
room1.box2.close();

room1.box2.onClick = function(){
    if(room1.box2.isClosed()){
        printMessage("잠겨있다.")
        showKeypad("number", "1457" , function(){ // 키패드 1 - 숫자4자리
            printMessage("열렸다!!")
            room1.box2.open();
            

     });}
     else if(room1.box2.isOpened()){
        showImageViewer("box2.png","")
        room1.handle.pick();
        printMessage("안에서 드라이버 손잡이를 주웠다.")
     }
    
}

//손잡이 생성
room1.handle = room1.createObject("handle","손잡이.png");
room1.handle.setWidth(800);
room1.locateObject(room1.handle,540,350);
room1.handle.hide();


//쌍안경 생성
room1U.scope = room1U.createObject("scope","쌍안경.png")
room1U.scope.setWidth(100);
room1U.locateObject(room1U.scope,550,150);
room1U.scope.onClick = function(){
    room1U.scope.pick();
}

// room1U 표시 보기
room1U.markR1U = room1U.createObject("markR1U", "마우스.png");
room1U.markR1U.setWidth(100);
room1U.locateObject(room1U.markR1U,370,150);

room1U.markR1U.onClick = function(){
	if(game.getHandItem() == room1U.scope){
		showImageViewer("이미지.png","");
	}
	else {
		printMessage("너무 멀어서 보이지 않는다..");
	}
}

// 그림 보기
room2.picture = room2.createObject("picture","마우스.png");
room2.picture.setWidth(100);
room2.locateObject(room2.picture,615,260);
room2.picture.onClick =function(){
    showImageViewer("그림.png");
}

// 드라이버 앞부분 생성
room2.head = room2.createObject("head","앞부분.png");
room2.head.setWidth(60);
room2.locateObject(room2.head,1050,650);
room2.head.onClick = function(){
    room2.head.pick();
    printMessage("드라이버 앞부분을 주웠다.")
}

//painting 보기
room3.painting = room3.createObject("painting","마우스.png")
room3.painting.setWidth(80);
room3.locateObject(room3.painting,270,350);
room3.painting.onClick = function(){
    printMessage("그림이 조금 찢어져있다.")
}

// 책 생성
room4.bookClo = room4.createObject("bookClo", "책.png");
room4.bookClo.setWidth(100);
room4.locateObject(room4.bookClo,500,350);
room4.bookClo.close();



room4.bookClo.onClick = function(){
    if(room4.bookClo.isClosed()){
        printMessage("책은 잠겨있다.")
        showKeypad("alphabet", "EFCBH" , function(){ // 키패드 1 - 숫자4자리
            printMessage("책이 열렸다 !!")
            room4.bookClo.setSprite("책open.png")
            room4.bookClo.open();
            room4.key1.show();


     });}
    
}

//책 안의 열쇠 생성
room4.key1 = room4.createObject("key1","열쇠1.png");
room4.key1.setWidth(40);
room4.locateObject(room4.key1,540,350);
room4.key1.hide();
room4.key1.onClick = function(){
    room1.key1F.pick();
    room4.key1.hide();
}











game.start(room1); // 게임시작
printMessage("첫 번째 방탈출 게임에 오신 것을 환영합니다!\n단서를 찾아 탈출에 성공하시길 바랍니다!");