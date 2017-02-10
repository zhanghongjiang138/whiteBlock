;
BlackWorld = new
function(){
	function doResize() {
		caW = v ? window.innerWidth: 400;
		caH = v ? window.innerHeight: 600;
		caObj.width = caW;
		caObj.height = caH;
		var caL = (window.innerWidth - caW) * 0.5,
		caT = (window.innerHeight - caH) * 0.5;
		caObj.style.position = "absolute";
		caObj.style.left = caL + "px";
		caObj.style.top = caT +"px";
		cellW = caW / colC;
		cellH = caH / rowC;
		downSpeed = cellH * 0.4  +0.5;
		//downSpeed = 10;
		curOffset = -cellH;
		if(!v){
			caObjWOffset =parseFloat(caObj.style.left.replace("px",""));
			caObjHOffset = parseFloat(caObj.style.top.replace("px",""));
		}
	}
	function ca_click(e){
		e.preventDefault();
		//document.getElementById('btn_start').innerHTML="btnstart" + new Date();
		if (e.touches.length == 1) {
			e.stopPropagation();
			if(isStart && canTouch){
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				var right = false;
				var row = allRow[1];
				for(var i=0;i<row.length;i++){
					if(
						row[i].position.c * cellW <= x &&
						(row[i].position.c+1) * cellW >= x
					){
						if(row[i].isNeedClick){
							right = true;
							row[i].color = "lightblue";
							goodJump++;
						}else{
							row[i].color = "pink";
							downSpeed = cellH * 0.4  +0.5;
							errorTime++;
						}
						break;
					}
				}
				if(right){
					canGoOn=true;
					canTouch=false;
				}
			}else if(!isStart && !haveRest){
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				var right = false;
				var row = allRow[1];
				for(var i=0;i<row.length;i++){
				//console.log(row[i].position.c * cellW,(row[i].position.c+1) * cellW,x,row[i].isNeedClick );
					if(
						row[i].position.c * cellW <= x &&
						(row[i].position.c+1) * cellW >= x
					){
						if(row[i].isNeedClick){
							right = true;
							row[i].color = "lightblue";
							goodJump++;
						}
						break;
					}
				}
				if(right){
					isStart=true;
					canGoOn=true;
					canTouch = true;
					var now = (+new Date);
					startTime = now;
					lastFpsUpdateTime = now;
				}
			}
		}
    		//e.preventDefault();
		e.stopPropagation();
	}
	function ca_click2(e){
		e.preventDefault();
		//e.stopPropagation();
		if(!v && isStart && canTouch){
			var x = e.pageX - caObjWOffset;
			var y = e.pageY - caObjHOffset;
			var right = false;
			var row = allRow[1];
			for(var i=0;i<row.length;i++){
				if(
					row[i].position.c * cellW <= x &&
					(row[i].position.c+1) * cellW >= x
				){
					if(row[i].isNeedClick){
						right = true;
						row[i].color = "lightblue";
						goodJump++;
					}else{
						row[i].color = "pink";
						downSpeed = cellH * 0.4  +0.5;
						errorTime++;
					}
					break;
				}
			}
			if(right){
				canGoOn=true;
				canTouch=false;
			}
		}else if(!v && !isStart && !haveRest){
			var x = e.pageX - caObjWOffset;
			var y = e.pageY - caObjHOffset;
			var right = false;
			var row = allRow[1];
			for(var i=0;i<row.length;i++){
			//console.log(row[i].position.c * cellW,(row[i].position.c+1) * cellW,x,row[i].isNeedClick );
				if(
					row[i].position.c * cellW <= x &&
					(row[i].position.c+1) * cellW >= x
				){
					if(row[i].isNeedClick){
						right = true;
						row[i].color = "lightblue";
						goodJump++;
					}
					break;
				}
			}
			if(right){
				isStart=true;
				canGoOn=true;
				canTouch = true;
				var now = (+new Date);
				startTime = now;
				lastFpsUpdateTime = now;
			}
		}
    		//e.preventDefault();
		e.stopPropagation();
	}
	function doDraw(){
		ctxtObj.clearRect(0, 0, caObj.width, caObj.height);
		var curOff = curOffset;
		for(var i=0;i<allRow.length;i++){
			for(var j=0;j<allRow[i].length;j++){
				ctxtObj.beginPath();
				ctxtObj.fillStyle = allRow[i][j].color;
				if(!isStart && i==0)
				{
					ctxtObj.fillStyle = "yellow";
				}
				ctxtObj.fillRect(j*cellW,(rC-i)*cellH+curOff+0.5,cellW,cellH); 
				//ctxtObj.strokeStyle = "#0000ff";
ctxtObj.strokeRect(j*cellW+0.5,(rC-i)*cellH+curOff+0.5,cellW-1,cellH-1);
			}
		}
		if((curOffset+downSpeed)>=0){
			if(canGoOn){
				allRow.splice(0,1);
				curOffset = -cellH;
				isStart=true;
				doGenData(false);
				canGoOn=false;
				canTouch=true;
				downSpeed=(downSpeed + 1)>=cellH*0.4?cellH*0.4:(downSpeed + 1);
			}
		}else{
			curOffset += downSpeed;
		}
	}
	function animate(time){
		if(isStart){
			var hasTime = (timeDeadLine-Math.round(((new Date).getTime() - startTime) / 1E3 * 100) / 100);
			hasTime = Math.round(hasTime*100)/100
			hasTime =hasTime<0?0:hasTime
			btn_start.innerHTML="跨越: "+goodJump +" 块<br />剩余时间: "+ hasTime + " 秒<br />剩余机会:"+(bigError-errorTime+0)+" 次";
			if(errorTime>=bigError || hasTime<=0){
				isStart=false;
				btn_start.innerHTML+="<br />点击底部黑块重新开始<br /><div style='color:white;background-color:"+(goodJump>=winCount?"red":(goodJump>=normalCount?"green":(goodJump<=lostCount?"gray":"green")))+";font-size:40px;'>"+(goodJump>=winCount?"高手":(goodJump>=normalCount?"还行":(goodJump<=lostCount?"太糟了":"还行")))+"，30秒内跨越 "+goodJump +" 块"+"</div>";
				allRow=[];
				errorTime=0;
				BlackWorld.init();
				haveRest = true;
				setTimeout(function(){haveRest = false;},500);
				return;
			}
			var now = (+new Date);
			if (now - lastFpsUpdateTime > 50) {
				lastFpsUpdateTime = now;
				doDraw();
			}
		}
		window.requestNextAnimationFrame(animate);
	}
	function doGenData(allFlg){
		if(allFlg){
			var sel = 0;
			allRow = [];
			for(var i=0;i<rC+1;i++){
				var row = [];
				sel = Math.round(Math.random() * (rC-1));
				for(var j =0;j<cC;j++){
					row.push(new Cell(i,j,(sel==j?"black":"white"),(sel==j?true:false)));
				}
				allRow.push(row);
			}
		}else{
			var sel = 0;
			var row = [];
			sel = Math.round(Math.random() * (rC-1));
			for(var j =0;j<cC;j++){
				row.push(new Cell(i,j,(sel==j?"black":"white"),(sel==j?true:false)));
			}
			allRow.push(row);
		}
	}
	function stopEvent(e){e.preventDefault();e.stopPropagation();}
	function canEvent(e){alert();}
	var v = navigator.userAgent.toLowerCase().indexOf("android") != -1 || navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipad") != -1,
	caW = v ? window.innerWidth: 400,
	caH = v ? window.innerHeight: 600,
	lastFpsUpdateTime = (+new Date),
	caObj,ctxtObj,allRow = [],rowC = 3.4, colC = 4, cellW = caW / colC, cellH = caH / rowC ,rC=4,cC=4,isStart = false,canGoOn=false,canTouch=false,
	curOffset = -cellH,
	downSpeed = cellH / 2 +0.5,
	errorTime = 0,
	bigError = 1,
	goodJump = 0,
	startTime,
	caObjWOffset=0,
	caObjHOffset=0,
	winCount=120,
	lostCount=40,
	normalCount=60,
	timeDeadLine=30,
	haveRest = false,
	btn_start;
	this.init = function(){
		isStart = false;canTouch=false;goodJump = 0;
		//document.getElementById("worldOut").innerHTML = '<canvas id="world" width="900" height="550" style="position: absolute; left: 0px; top: 0px;"></canvas>';
		btn_start = document.getElementById("btn_start");
		caObj = document.getElementById("world");
		// if support canvase
		//if (caObj && caObj.getContext) {
			ctxtObj = caObj.getContext("2d");
			// event
			caObj.addEventListener("click", ca_click2, false);
			//caObj.addEventListener("touchstart", ca_click, false);
			caObj.addEventListener("touchstart", ca_click, false);
			caObj.addEventListener("touchend", stopEvent, false);
			caObj.addEventListener("touchmove", stopEvent, false);
			caObj.addEventListener("touchcancel", stopEvent, false);
			caObj.addEventListener("gesturestart", stopEvent, false);
			caObj.addEventListener("gesturechange", stopEvent, false);
			caObj.addEventListener("gestureend", stopEvent, false);
			//window.addEventListener("resize", function(e){}, false);
			caObj.addEventListener("mousedown", stopEvent, false);
			caObj.addEventListener("mouseup", stopEvent, false);
			caObj.addEventListener("mousemove", stopEvent, false);
			//window.addEventListener("resize", doResize, false);
		//}
		if (v) {
			caObj.style.border = "none";
		}
		doResize();
		doGenData(true);
		doDraw();
		animate();
		
	},
	this.start = function(){
		isStart = true;
		canTouch = true;
		var now = (+new Date);
		lastFpsUpdateTime = now;
	}
};
// cell object
function Cell(row, col, color, needClick) {
	this.position = {
		r: row,
		c: col
	}
	this.color = color;
	this.isOver = false;
	this.isNeedClick = needClick;
}
Cell.prototype.doCheckClick = function(x, y) {
	var result = false;
	if(true){
	// in this cell
		// if right return true;
		// else return false;
	}
	return result;
};
onload = function() {
	BlackWorld.init();
}