var webshot = require('webshot');
var name="Corbris";
var rank = "#5";
var level = "100";
var xp = "204";
var xpNeed = "1.25K";
var bar = "10%";

function ss()
{
webshot(

`<!DOCTYPE html>
<html>
<head>
<style>
.cardBorder{
	display: -webkit-flex;
	width: 840px;
	height: 240px;
	background-color: #9932CC;
	-webkit-align-items: center;
    -webkit-justify-content: center;
	border-radius: 7px;
}

.fullCard{
	display: -webkit-inline-flex;
	width: 800px;
	height: 200px;
}

.avatar{
	display: -webkit-flex;
	width: 200px;
	height: 200px;
	background-color: #202020;
	border-radius: 7px 0px 0px 7px;
	-webkit-align-items: center;
    -webkit-justify-content: center;
}

.userLogo{
	display: -webkit-flex;
	border-style: solid;
    border-width: 3px;
	height: 160px;
	width: 160px;
	border-radius: 50%;
}

.cardInfo{

}

.row1{
    display: -webkit-flex;
	-webkit-align-items: flex-end;
    -webkit-justify-content: flex-end;
	width: 600px;
	height: 80px;
	background-color: #202020;
	border-radius: 0px 7px 0px 0px;
}

.rankCon{
	display: -webkit-inline-flex;
	-webkit-align-items: flex-end;
	padding-right: 20px;
}

.rankCon > p1 {
	font-size: 20px;
    color: white;
	padding-bottom: 9px;
	padding-right: 5px;
}

.rank{
	font-size: 60px;
    color: white;
    padding-right: 5px;
}

.rankCon > p2 {
	font-size: 20px;
    color: #9932CC;
	padding-bottom: 9px;
}

.level{
	font-size: 60px;
    color: #9932CC;
    padding-right: 5px;
}

.row2{
    display: -webkit-inline-flex;
	
}

.nameCon{
	display: -webkit-flex;
	-webkit-justify-content: flex-start;
	-webkit-align-items: flex-end;
	width: 300px;
	height: 60px;
	background-color: #202020;
}

.name{
	font-size: 30px;
    color: white;
	padding-left: 20px;
	padding-bottom: 5px;
}

.xpCon{
	display: -webkit-flex;
	-webkit-justify-content: flex-end;
	-webkit-align-items: flex-end;
	width: 300px;
	height: 60px;
	background-color: #202020;

}

.xp{
	font-size: 20px;
    color: white;
	padding-right: 2px;
	padding-bottom: 5px;
}

.xpNeed{
	font-size: 20px;
    color: gray;
	padding-right: 27px;
	padding-bottom: 5px;
}

.row3{
	display: -webkit-flex;
    -webkit-justify-content: center;
	width: 600px;
	height: 60px;
	background-color: #202020;
	border-radius: 0px 0px 7px 0px;
}

.barCon{
	padding-right: 12px;
}

.myProgress {
    width: 553px;
	height: 30px;
	border-style: solid;
    border-width: 2px;
    background-color: grey;
    border-radius: 30px;
}

.myBar {
    width: 45%;
    height: 30px;
    background-color: #9932CC;
    border-radius: 30px;
	
}

</style>
</head>
<body>
<div class = "cardBorder">
	<div class = "fullCard">
		<div class="avatar">
			<img src="https://cdn.discordapp.com/avatars/150424235880218624/cafb1dfc3a994511703165be5b7865bf.png?size=2048" alt="" class="userLogo">
		</div>
		<div class ="cardInfo">
			<div class="row1">
				<div class="rankCon">
					<p1>RANK</p1>
					<div class="rank">#1</div>
					<p2>LEVEL</p2>
					<div class="level">123</div>
				</div>
			</div>
			<div class="row2">
				<div class="nameCon">
					<div class="name">Corbris</div>
				</div>
				<div class="xpCon">
					<div class="xp">123</div>
					<div class="xpNeed">/123 XP</div>
				</div>
			</div>
			<div class="row3">
				<div class="barCon">
					<div class="myProgress">
						<div class="myBar"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>
`, 'UserCard.png', {siteType:'html', shotSize:{ width: 850,height: 250}} , function(err) {
  console.log("screenshot now saved to UserCard.png");
});

}

ss();