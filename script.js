$(
	function(){
		$( document ).keydown(
			function ( event ) {
				Typer.addText( event );
			}
		);
	}
);

var Typer={
	text: null,
	accessCountimer:null,
	index:0,
	speed:4, 
	file:"", 
	init: function(){
		this.accessCountimer=setInterval(function(){Typer.updLstChr();},500);
		$.get(Typer.file,function(data){
			Typer.text=data;
		});
	},

	content:function(){
		return $("#console").html();
	},

	write:function(str){
		$("#console").append(str);
		return false;
	},

	addText:function(key){
	  var console=$("#console")
		if(key.key==='Alt'){
			Typer.accessCount++;
			if(Typer.accessCount>=3){
				Typer.makeAccess();
			}
		}else if(key.key==='CapsLock'){
			Typer.deniedCount++;
			if(Typer.deniedCount>=3){
				Typer.makeDenied();
			}
		}else if(key.key==='Esc' || key.key==='Escape'){
			Typer.hidepop();
		}else if(Typer.text){
			var cont=Typer.content();
			if(cont.substring(cont.length-1,cont.length)==="|")
				console.html(console.html().substring(0,cont.length-1));
			if(key.key!=='Backspace'){
				Typer.index+=Typer.speed;
			}else{
				if(Typer.index>0)
					Typer.index-=Typer.speed;
			}
			var text=$("<div/>").text(Typer.text.substring(0,Typer.index)).html();
			var rtn= new RegExp("\n", "g");
			var rts= new RegExp("\\s", "g");
			var rtt= new RegExp("\\t", "g");
      console.html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));
			window.scrollBy(0,50);
		}
		if ( key.preventDefault && key.key !== 'F11' ) {
			key.preventDefault()
		}
		if(key.key !== 'F11'){
			key.returnValue = false;
		}
	},

	updLstChr:function(){
	  var console=$("#console")
		var cont=this.content();
		if(cont.substring(cont.length-1,cont.length)==="|")
			console.html(console.html().substring(0,cont.length-1));
		else
			this.write("|");
	}
}
