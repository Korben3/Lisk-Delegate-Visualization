//  ______________________________________________
// |                                              |
// |lisk Delegate Visualization by korben3, 2019  |
// |______________________________________________|

//config global variables
var network="main"; // main or test
if(network=="test"){var networkClient=lisk.APIClient.createTestnetAPIClient();}else{var networkClient=lisk.APIClient.createMainnetAPIClient();}

var sphereScale=2.2;
var sphereMinSize=50;
var sphereRadius=0;
var canvasSize=1300;
var delegateNum=0;
var delegateTot=101;
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font="20px Arial";

var poolSherwood=["robinhood","liberspirita","liskpro.com","phoenix1969","bloqspace.io","liskascend"];
var poolSherwoodColor="rgba(10,220,10,0.75)";
var poolGDT=["5an1ty","alepop","bioly","cc001","corsaro","dakk","eclipsun","forrest","gdtpool","goldeneye","gr33ndrag0n","grumlin","hagie","hirish","hmachado","joo5ty","kushed.delegate","liskgate","liskit","mrv","nerigal","ntelo","ondin","philhellmuth","punkrock","redsn0w","sgdias","slasheks","splatters","tembo","tonyt908","vekexasia","vi1son"];
var poolGDTColor="rgba(10,10,220,0.75)";
var poolElite=["iii.element.iii","leo","badman0316","liskjp","spacetrucker","acheng","carbonara","bigfisher","rooney","panzer","xujian","will","crodam","luxiang7890","adrianhunter","phinx","mrgr","carolina","someonesomeone","eastwind_ja","chamberlain","honeybee","savetheworld","seven","liskroad","forger_of_lisk","grajsondelegate","hua","mac","luiz","bigtom","jixie","veriform","augurproject","goodtimes","crolisk","lwyrup","zy1349","hong","blackswan","bilibili","loveforever","jiandan","kc","threelittlepig","menfei","yuandian","khitan","kaystar","elonhan","cai","china","catstar","dakini"];
var poolEliteColor="rgba(220,10,10,0.75)";
var poolNoneColor="rgba(150,150,150,0.75)";
var poolColor="";

//draw the divider line between forging and standby delegats
ctx.beginPath();
var posl=sphereMinSize+((delegateTot)*(sphereMinSize*2.5));
ctx.moveTo(0, posl);
ctx.lineTo(canvasSize, posl);
ctx.strokeStyle="white";
ctx.stroke();

//add informative text
ctx.font="18px Arial";
ctx.fillStyle="white";
ctx.fillStyle=poolSherwoodColor;
ctx.fillText("Sherwood", 1150, 25);
ctx.fillStyle=poolGDTColor;
ctx.fillText("GDT", 1150, 55);
ctx.fillStyle=poolEliteColor;
ctx.fillText("Elite", 1150, 85);
ctx.fillStyle=poolNoneColor;
ctx.fillText("Other/independent", 1150, 115);
ctx.fillText("Lisk Delegate Visualization created by korben3", 5, 25);
if(network=="main"){ctx.fillText("mainnet", 5, 55);}else{ctx.fillText("testnet", 5, 55);}

ctx.font="26px Arial";
ctx.fillStyle="white";
ctx.fillText("Forging delegates", 0, posl-10);
ctx.fillStyle="#AAAAAA";
ctx.fillText("Standby delegates", 0, posl+25);


//get forging delegates
function visualizeDelegates(offset){
	networkClient.delegates.get({"limit":delegateTot,"offset":offset,"sort":"rank:asc"})
	.then(res => {
		for(delegateNum=0; delegateNum<delegateTot; delegateNum++){
			ctx.beginPath();
			sphereRadius=sphereMinSize+(sphereScale*res.data[delegateNum].approval);
			sphereX=sphereRadius+(Math.random()*(canvasSize-(sphereRadius*2)));
			sphereY=sphereMinSize+((delegateNum+offset+1)*(sphereMinSize*2.5));
			ctx.arc(sphereX,sphereY,sphereRadius,0,2*Math.PI);
			poolColor=poolNoneColor;
			if(poolSherwood.indexOf(res.data[delegateNum].username) > -1){poolColor=poolSherwoodColor;}
			if(poolGDT.indexOf(res.data[delegateNum].username) > -1){poolColor=poolGDTColor;}
			if(poolElite.indexOf(res.data[delegateNum].username) > -1){poolColor=poolEliteColor;}
			ctx.fillStyle=poolColor;
			ctx.fill();
			ctx.fillStyle = "white";
			ctx.fillText(res.data[delegateNum].username, sphereX-Math.round((ctx.measureText(res.data[delegateNum].username).width/2)), sphereY+6);
		}
	}).catch(console.error);
}

visualizeDelegates(0);

visualizeDelegates(101);
