
var Hakioball = Object.create({
	x:170,y:151,s:1,a:1,d:5,xspeed:-1+(Math.random()*2),yspeed:0.1,angle:0,spin:-1+(Math.random()*2),distance:0,dist:0,hacked:false,vel:1,
	update:function(){
	       var A = App;
		this.vel = A.client.Math.Clamp(A.ext.input.getDuration(),0,1)*A.delta;
		this.distance+=1;
		this.x+=this.xspeed*A.delta;
		this.y+=A.client.Math.Clamp(this.yspeed,-10,10)*A.delta;
		this.xspeed*=0.99;
		this.yspeed+=0.1*A.delta;
		this.angle+=this.spin*A.delta;
		this.x>A.client.setWidth?(this.x = A.client.setWidth,this.xspeed=-this.xspeed):this.x<0?(this.x = 0,this.xspeed=-this.xspeed):null;
		this.y>A.client.setHeight+200?(this.rehack()):(this.yspeed+=0.1,this.y<0?(this.yspeed=5):null);
		if (A.ext.input.getReleased())
			this.hacked = false;
	},
	draw:function(){
	       var A = App;
		
		if (A.client.visuals.image_button(this.img,this.x,this.y,0.75,function(){Hakioball.hack();},this.img,4,3,0.00001,true))
			{
			if (A.ext.input.getReleased())
				{
				this.hack();
				this.hacked = true;
				}
			}
		A.client.visuals.image_rotate(this.img,this.x,this.y,0.3,this.angle,1,0,0);
	},
	hack:function(){
	       var A = App;
		if ((A.ext.input.dist.y>0)&&(this.yspeed>0))
			return;
			
		if (!this.hacked){
		var s = -A.ext.input.getStartX() + ( A.ext.input.getX());
		var r = (A.client.Math.Clamp(A.ext.input.getDuration(),0,5));
		this.yspeed=-this.vel-r;
		this.spin+=Math.sin(s);
		this.xspeed=A.client.Math.Clamp(s,-2,2);}
	},
	rehack:function(){
	       var A = App;
		this.yspeed=-this.vel;
		this.y = 200;
		this.spin = 0;
		this.x=A.client.setWidth/2;
		this.y=A.client.setHeight/3;
	}
});
var Hakiohud = Object.create({
	lastx:0,
	lasty:0,
	draw:function(){
	       var A = App;
		A.client.visuals.circle_free(A.ext.input.getX(),A.ext.input.getY(),A.client.Math.Clamp(A.ext.input.getDuration(),0,15),"#FFFFFF");
		A.client.visuals.circle_free(A.ext.input.getStartX(),A.ext.input.getStartY(),A.client.Math.Clamp(A.ext.input.getDuration(),0,15),"#FFFFFF",0.1);
	},
});