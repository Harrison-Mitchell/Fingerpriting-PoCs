// This is half a thousand lines of pure pain. It honestly has every bad practice in it
// You've got evals, copy and pasted code, aysnc code run sync, var names that were the
// first ones that came into mind, I mean one of the vars is `whateverGetsPassedToUsIDK`
// for Christ's sake, lack of documentation. Even the style is silly, you've got 9 line
// functions in one line because why not. My thinking was, once the fat backend is done
// you only ever need to refer to the front end for implementation of a certain finger-
// print measure.
// If you do venture further, and before I forget myself here's the general layout.
// We start with some global vars (hot) then we have some helper functions and then
// we add table rows one by one. Occasionally we want to implement promise values in
// which case we add the row but do a callback to the top here to populate the values.
// You know when you get further into a project than you anticipated and there's like
// 20% left to implement so you just smash it out and are completely done with it by
// the time it's barely functional? Well welcome.
// Again, this is not representative of me or my ability to code. This is merely
// desperation.
// Looking back, some of the strange workarounds are somewhat funny, I'm oddly proud.

IND = 25;
scrollPosz = [];
mainTable = document.getElementById("main-table");

function scrolled () {
	if (document.querySelector("body").getBoundingClientRect().top != scrollPosz[scrollPosz.length - 1]) {
		scrollPosz.push(document.querySelector("body").getBoundingClientRect().top);
	}
	if (scrollPosz.length == 8) {
		scrollSum = 0; // Ignore initial noisy data
		scrollSum += Math.abs(scrollPosz[3] - scrollPosz[4]);
		scrollSum += Math.abs(scrollPosz[4] - scrollPosz[5]);
		scrollSum += Math.abs(scrollPosz[5] - scrollPosz[6]);
		scrollSum += Math.abs(scrollPosz[6] - scrollPosz[7]);
		scrollDelta = Math.round(scrollSum / 4);
		addRow("scrollDelta","","50","The number of pixels your scroll wheel moves. Mouse fingerprinting. This is a poor measure on mobile devices or desktop smooth scrolling");
		addRow("","<br><br><br>","","");
	}
}

function getCPUSpeed() {
	startCPU = new Date();
	for (var i = 2500000000; i > 0; i--) {}
	endCPU = new Date();
	return((endCPU - startCPU) / 1000 + "s");
}

function loaded () {
	endTime = new Date().getTime();
	loadTime = (endTime - initTime) / 1000 + "s";
	addRow("loadTime","","2.679s","Gives ideas about connection and computer speeds, Firefox seems to round");
	addRow("","<br><br><br>","","");
	addRow("Rough CPU speed",getCPUSpeed(),"2.5s","Time taken to run 2,500,000,000 loops");
	addRow("","<br><br><br>","","");
}

function addRow (code, val, example, notes, indent, dep, span) {
	if (val == 0) {try{val = eval(code);} catch{val = "undefiend";}}
	var row = mainTable.insertRow(-1);
	if (dep == 1) {dep = "* ";} else {dep = "";}
	c = row.insertCell(0);
	c.innerHTML = dep + "<a href='https://developer.mozilla.org/en-US/search?q=" + code + "'>" + code + "</a>";
	v = row.insertCell(1);
	if ((""+val).startsWith("<td>")) {v.style.background = val.substring(4,);}
	else {v.innerHTML = val;}
	
	if (span == 1) {v.colSpan = 3;}
	else {
		if ((""+val).startsWith("<td>")) {row.insertCell(2).style.background = "#" + example;}
		else {row.insertCell(2).innerHTML = example;}
		row.insertCell(3).innerHTML = notes;
	}
	if (indent) {c.style.paddingLeft = indent + "px";}
}

function late (res, part) {
	tableBody = mainTable.children[0];
	for (i = 0; i < tableBody.children.length; i++) {
		c1 = tableBody.children[i].children[0];
		c2 = c1.parentNode.children[1];
		cT = c1.innerText.trim();
		
		overwrite = "";
		if (part == "mediaCapabilities") {
			if (cT == "result.supported") {overwrite = res.supported;}
			if (cT == "result.smooth") {overwrite = res.smooth;}
			if (cT == "result.powerEfficient") {overwrite = res.powerEfficient;}
		}
		if (part == "clipboard") {
			if (cT == "navigator.clipboard.readText()") {overwrite = res;}
		}
		if (part == "geolocation") {
			if (cT == "pos.coords.latitude") {overwrite = res.coords.latitude;}
			if (cT == "pos.coords.longitude") {overwrite = res.coords.longitude;}
			if (cT == "pos.coords.altitude") {overwrite = res.coords.altitude;}
			if (cT == "pos.coords.accuracy") {overwrite = res.coords.accuracy;}
			if (cT == "pos.coords.altitudeAccuracy") {overwrite = res.coords.altitudeAccuracy;}
			if (cT == "pos.coords.heading") {overwrite = res.coords.heading;}
			if (cT == "pos.coords.speed") {overwrite = res.coords.speed;}
		}
		if (part == "mediaDevices") {
			if (cT == ".enumerateDevices()") {overwrite = res;}
		}
		if (part == "p0") {if (cT == "P: accelerometer") {overwrite = res;}}
		if (part == "p1") {if (cT == "P: ambient-light-sensor") {overwrite = res;}}
		if (part == "p2") {if (cT == "P: background-fetch") {overwrite = res;}}
		if (part == "p3") {if (cT == "P: background-sync") {overwrite = res;}}
		if (part == "p4") {if (cT == "P: bluetooth") {overwrite = res;}}
		if (part == "p5") {if (cT == "P: camera") {overwrite = res;}}
		if (part == "p6") {if (cT == "P: clipboard") {overwrite = res;}}
		if (part == "p7") {if (cT == "P: device-info") {overwrite = res;}}
		if (part == "p8") {if (cT == "P: display-capture") {overwrite = res;}}
		if (part == "p9") {if (cT == "P: geolocation") {overwrite = res;}}
		if (part == "p10") {if (cT == "P: gyroscope") {overwrite = res;}}
		if (part == "p11") {if (cT == "P: magnetometer") {overwrite = res;}}
		if (part == "p12") {if (cT == "P: microphone") {overwrite = res;}}
		if (part == "p13") {if (cT == "P: midi") {overwrite = res;}}
		if (part == "p14") {if (cT == "P: nfc") {overwrite = res;}}
		if (part == "p15") {if (cT == "P: notifications") {overwrite = res;}}
		if (part == "p16") {if (cT == "P: persistent-storage") {overwrite = res;}}
		if (part == "p17") {if (cT == "P: push") {overwrite = res;}}
		if (part == "p18") {if (cT == "P: speaker") {overwrite = res;}}
		if (part == "storage") {
			if (cT == "navigator.storage.estimate()") {overwrite = res;}
		}
		if (part == "battery") {
			if (cT == ".charging") {overwrite = res.charging;}
			if (cT == ".chargingTime") {overwrite = res.chargingTime;}
			if (cT == ".dischargingTime") {overwrite = res.dischargingTime;}
			if (cT == ".level") {overwrite = res.level;}
		}

		if (overwrite != "") {c2.innerText = overwrite;}
	}
}

function fill (row, labe, valu) {
	newRow = document.createElement("tr");
	newRow = row.parentNode.insertBefore(newRow, row.nextSibling);
	labels = document.createElement("td");
	values = document.createElement("td");
	labels.innerHTML = labe;
	values.innerHTML = valu;
	labels.style.paddingLeft = IND * 2 + "px";
	values.colSpan = 3;
	newRow.appendChild(labels);
	newRow.appendChild(values);
}

function wide (whateverGetsPassedToUsIDK, ref) {
	tableBody = mainTable.children[0];
	for (i = 0; i < tableBody.children.length; i++) {
		row = tableBody.children[i];
		label = row.children[0].innerText.trim();
		if (label == ".enumerateDevices()" && ref == "eD") {
			for (a = 0; a < whateverGetsPassedToUsIDK.length; a++) {
				v = (whateverGetsPassedToUsIDK[a].kind + "<br>" +
					whateverGetsPassedToUsIDK[a].groupId + "<br>" +
					whateverGetsPassedToUsIDK[a].deviceId);
				fill(row, "kind<br>groupId<br>deviceId", v);
			}
		}
		if (label == "Installed fonts" && ref == "fnt") {
			fill(row, "Found: " + whateverGetsPassedToUsIDK.length, whateverGetsPassedToUsIDK.join(", "))
		}
		if (label == "Understood audio formats" && ref == "aud") {
			fill(row, "Found: " + whateverGetsPassedToUsIDK.length, whateverGetsPassedToUsIDK.join("<br>"))
		}
		if (label == "Understood video formats" && ref == "vid") {
			fill(row, "Found: " + whateverGetsPassedToUsIDK.length, whateverGetsPassedToUsIDK.join("<br>"))
		}
		if (label == "Canvas fingerprinting" && ref == "cvs") {
			fill(row, "Result: ", '<canvas id="myCanvas" width="300" height="50"></canvas>');
			fill(row, "Result hash: ", canvasPrint());
		}
		if (label == "Headers" && ref == "head") {
			fill(row, "Received: ", headers);
		}
	}
}

//
// Navigator methods
//

addRow("navigator.activeVRDisplays",0,"undefined","Very early days, not much info on it");
addRow("navigator.appCodeName",0,"Mozilla","Always Mozilla",0,1);
addRow("navigator.appName",0,"Netscape","Always Netscape",0,1);
addRow("navigator.appVersion",0,"5.0 (X11)","Legacy function to get browser version, now it's fed wrong values for backwards compatibility. Most always 5.0 and X11, sometimes also user agent string",0,1);
addRow("navigator.buildID",0,"20181001000000","Only Firefox returns a value, and it is always 20181001000000 for privacy measures");
addRow("navigator.connection",0,"[object NetworkInformation]","Only supported by Chrome");
	addRow("navigator.connection.downlink",0,4.25,"Estimated bandwidth in mb/s rounded to the nearest 25 kilobits per seconds",IND);
	addRow("navigator.connection.effectiveType",0,"4g","Returns the effective type of the connection from: slow-2g/2g/3g/4g",IND);
	addRow("navigator.connection.rtt",0,75,"The estimated round-trip time of the current connection, rounded to the nearest 25 milliseconds",IND);
	addRow("navigator.connection.saveData",0,false,"Returns true if the user has set a reduced data usage option on the user agent",IND);
addRow("navigator.clipboard",0,"[object Clipboard]","");
	addRow("navigator.clipboard.readText()",0,"Clipboard text","Reads clipboard, may request permission or be blocked by default (see also: writeText())",IND);
	try{navigator.clipboard.readText().then((clip) => {late(clip,"clipboard");});} catch{late("undefined","clipboard")}
addRow("navigator.cookieEnabled",0,true,"If you have an extension that blocks cookies, you'll find this still to be true, cookies are accepted then killed");
addRow("navigator.deviceMemory",0,4,"GiB ram closest to: 0.25/0.5/1/2/4/8");
addRow("navigator.doNotTrack",0,1,"Is a DNT header sent? 1 for yes, empty or 0 for no. DNT header is one of many examples where by trying to be less fingerprintable, by enabling DNT you suddenly stick out like a sore thumb and make it worse");
addRow("navigator.geolocation",0,"[object Geolocation]","If you accept the permission request, I can fill this in. Even if you deny the permission, rough location can be pulled out of your IP information");
	addRow("navigator.geolocation.getCurrentPosition( function(pos) {'...'});",0,"undefined","There's also watchPosition for frequent updates",IND);
		addRow("pos.coords.latitude",0,-33.82,"",IND*2);
		addRow("pos.coords.longitude",0,151.15,"",IND*2);
		addRow("pos.coords.altitude",0,1008,"Meters above sea level",IND*2);
		addRow("pos.coords.accuracy",0,3000,"Meters",IND*2);
		addRow("pos.coords.altitudeAccuracy",0,200,"Meters",IND*2);
		addRow("pos.coords.heading",0,190,"Clockwise degrees relative to North",IND*2);
		addRow("pos.coords.speed",0,15,"Meters per second",IND*2);
		navigator.geolocation.getCurrentPosition(function(pos){late(pos,"geolocation");})
addRow("navigator.hardwareConcurrency",0,4,"Number of logical CPU cores, some CPUs have two logical cores within a single core");
addRow("navigator.keyboard",0,"[object Keyboard]","No important child params, but support of Keyboard is a telling param in itself");
addRow("navigator.language",0,"en-US","Most preferred language");
addRow("navigator.languages",0,"en-US,en-GB,en","Other preferred language from highest to lowest preference");
addRow("navigator.maxTouchPoints",0,10,"No touchscreen = 0");
addRow("navigator.mediaCapabilities",0,"[object MediaCapabilities]","Little support");
	addRow("navigator.mediaCapabilities.decodingInfo( { type : 'file', audio : {contentType : 'audio/mp3' }}) .then( function (result) {'...'});",0,"[object Promise]","mp3 for the demo, others can be used",IND);
		addRow("result.supported",0,true,"",IND*2);
		addRow("result.smooth",0,true,"",IND*2);
		addRow("result.powerEfficient",0,true,"",IND*2);
		navigator.mediaCapabilities.decodingInfo({ type:'file',audio:{contentType:'audio/mp3'}}).then(function(mC){late(mC,"mediaCapabilities")});
addRow("navigator.mediaDevices",0,"[object MediaDevices]","");
	addRow(".enumerateDevices()",0,"[object MediaDeviceInfo]","Returns highly entropic IDs that persist sessions!",IND);
	navigator.mediaDevices.enumerateDevices().then(function(eD){wide(eD,"eD");});
	addRow("navigator.mediaDevices .getSupportedConstraints()",0,"[object Object]","Which of the following does the user agent understand?",IND);
		ref = navigator.mediaDevices.getSupportedConstraints();
		addRow(".autoGainControl",ref.autoGainControl,"true","",IND * 2);
		addRow(".browserWindow",ref.browserWindow,"true","",IND * 2);
		addRow(".channelCount",ref.channelCount,"true","",IND * 2);
		addRow(".deviceId",ref.deviceId,"true","",IND * 2);
		addRow(".echoCancellation",ref.echoCancellation,"true","",IND * 2);
		addRow(".facingMode",ref.facingMode,"true","",IND * 2);
		addRow(".frameRate",ref.frameRate,"true","",IND * 2);
		addRow(".groupId",ref.groupId,"true","",IND * 2);
		addRow(".height",ref.height,"true","",IND * 2);
		addRow(".mediaSource",ref.mediaSource,"true","",IND * 2);
		addRow(".noiseSuppression",ref.noiseSuppression,"true","",IND * 2);
		addRow(".scrollWithPage",ref.scrollWithPage,"true","",IND * 2);
		addRow(".viewportHeight",ref.viewportHeight,"true","",IND * 2);
		addRow(".viewportOffsetX",ref.viewportOffsetX,"true","",IND * 2);
		addRow(".viewportOffsetY",ref.viewportOffsetY,"true","",IND * 2);
		addRow(".viewportWidth",ref.viewportWidth,"true","",IND * 2);
		addRow(".width",ref.width,"true","",IND * 2);
addRow("navigator.mimeTypes",0,"[object MimeTypeArray]","What mime types (file types) does the web browser understand?");
	mimes = navigator.mimeTypes
	for (mime = 0; mime < mimes.length; mime++) {
		mimeLabel = "[" + mime + "].description<br>" + "[" + mime + "].type<br>" + "[" + mime + "].enabledPlugin.filename";
		mimeVal = mimes[mime].description + "<br>" + mimes[mime].type + "<br>" + mimes[mime].enabledPlugin.filename;
		addRow(mimeLabel,mimeVal,0,0,IND,0,1);
	}
addRow("navigator.onLine",0,"true","Prone to false positives, use other methods of checking connectivity. Updates only occur on following a link or querying with JS");
addRow("navigator.permissions",0,"[object Permissions]","");
	addRow("navigator.permissions.query()",0,"[object Promise]","What permissions are understood and what are their states? granted / prompt / denied / undefined",IND);
	for (ii = 0; ii < permissions.length; ii++) {
		if (permissions[ii] == "accelerometer" || permissions[ii] == "background-fetch" || permissions[ii] == "background-sync" || permissions[ii] == "gyroscope" || permissions[ii] == "magnetometer" || permissions[ii] == "midi") {addRow("P: " + permissions[ii],0,"granted","",IND*2);}
		else {addRow("P: " + permissions[ii],0,"prompt","",IND*2);}
	}
	navigator.permissions.query({name:permissions[0]}).then(function(p0){late(p0.state,"p0");});
	navigator.permissions.query({name:permissions[1]}).then(function(p1){late(p1.state,"p1");});
	navigator.permissions.query({name:permissions[2]}).then(function(p2){late(p2.state,"p2");});
	navigator.permissions.query({name:permissions[3]}).then(function(p3){late(p3.state,"p3");});
	navigator.permissions.query({name:permissions[4]}).then(function(p4){late(p4.state,"p4");});
	navigator.permissions.query({name:permissions[5]}).then(function(p5){late(p5.state,"p5");});
	navigator.permissions.query({name:permissions[6]}).then(function(p6){late(p6.state,"p6");});
	navigator.permissions.query({name:permissions[7]}).then(function(p7){late(p7.state,"p7");});
	navigator.permissions.query({name:permissions[8]}).then(function(p8){late(p8.state,"p8");});
	navigator.permissions.query({name:permissions[9]}).then(function(p9){late(p9.state,"p9");});
	navigator.permissions.query({name:permissions[10]}).then(function(p10){late(p10.state,"p10");});
	navigator.permissions.query({name:permissions[11]}).then(function(p11){late(p11.state,"p11");});
	navigator.permissions.query({name:permissions[12]}).then(function(p12){late(p12.state,"p12");});
	navigator.permissions.query({name:permissions[13]}).then(function(p13){late(p13.state,"p13");});
	navigator.permissions.query({name:permissions[14]}).then(function(p14){late(p14.state,"p14");});
	navigator.permissions.query({name:permissions[15]}).then(function(p15){late(p15.state,"p15");});
	navigator.permissions.query({name:permissions[16]}).then(function(p16){late(p16.state,"p16");});
	navigator.permissions.query({name:permissions[17]}).then(function(p17){late(p17.state,"p17");});
	navigator.permissions.query({name:permissions[18]}).then(function(p18){late(p18.state,"p18");});
	navigator.permissions.query({name:permissions[19]}).then(function(p19){late(p19.state,"p19");});
addRow("navigator.platform",0,"Linux x86_64","Underlying OS");
addRow("navigator.plugins",0,"[object PluginArray]","Similar to mimetypes");
	plugs = navigator.plugins
	for (plug = 0; plug < plugs.length; plug++) {
		plugLabel = "[" + plug + "].description<br>" + "[" + plug + "].name<br>" + "[" + plug + "].filename";
		plugVal = plugs[plug].description + "<br>" + plugs[plug].name + "<br>" + plugs[plug].filename;
		addRow(plugLabel,plugVal,0,0,IND,0,1);
	}
addRow("navigator.product",0,"Gecko","Gecko in every browser",0,1);
addRow("navigator.productSub",0,"20030107","Subversion of the browser, most often pinned to 20030107 or 20100101 to prevent fingerprinting");
addRow("navigator.storage",0,"[object StorageManager]","");
	addRow("navigator.storage.estimate()",0,"20GB","GB of free space the browser can use. In Chrome this seems to be ±1GB of free hard drive space. Firefox seems to limit to ~1.5GB",IND);
	navigator.storage.estimate().then(function(st){late(+(st.quota/1024/1024/1024).toFixed(2) + "GB","storage");});
addRow("navigator.userAgent",0,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36","Only Tor browser is known to have a fixed user agent, otherwise this string is highly entropic and may expose lies in other params such as browser or platform",0,1);
addRow("navigator.vendor",0,"Google Inc.","Browser manufacturer",0);
addRow("navigator.vendorSub","","","Always an empty string");
addRow("navigator.webdriver",0,"false","Is the browser run by a script? Is the headless flag set? Is the browser reporting marionette?");
addRow("navigator.xr",0,"undefined","Another fresh VR thing with no support yet");

addRow("navigator.canShare()",0,"undefined","Would a share call be accepted? Not supported in any browser yet");
addRow("navigator.getBattery()",0,"[object Promise]","");
	addRow(".charging",0,"true","Plugged in?",IND);
	addRow(".chargingTime",0,"10","Time needed to fill battery",IND);
	addRow(".dischargingTime",0,"50","Time until computer suspends",IND);
	addRow(".level",0,"50%","Battery level. 100% if PC",IND);
	try{navigator.getBattery().then(function(bat){late(bat,"battery");});}catch{}
addRow("navigator.getGamepads()",0,"[object GamepadList]","");
	addRow("navigator.getGamepads().length",0,"4","Number of connected gamepads. Chrome pre allocates 4 channels, Firefox none",IND);
addRow("navigator.getVRDisplays()",0,"[object VRDisplays]","Many child parameters but no browsers currently support it");
addRow("navigator.javaEnabled()",0,"false","You'd hope in this day and age it'd always be false. Why is it a function and not a param anywho?");
addRow("navigator.taintEnabled()",0,"false","Legacy JS security feature",0,1);
addRow("","<br><br><br>","","");

//
// Font detection
//

addRow("Installed fonts","&nbsp;","","The moment you install a non-default font, you're gone. Has to be queryed one by one frustratingly");
found = [];
d = new Detector();
for (i = 0; i < fonts.length; i++) {
	if (d.detect(fonts[i])) {
		found.push(fonts[i]);
	}
}
wide(found, "fnt");
addRow("","<br><br><br>","","");

//
// Supported audio types
//

addRow("Understood audio formats","&nbsp;","","Which of 150 audio formats does the browser understand?");
found = [];
audio = document.createElement('audio');
for (i = 0; i < mimeAudio.length; i++) {
	if (audio.canPlayType(mimeAudio[i])) {
		found.push(mimeAudio[i] + ": " + audio.canPlayType(mimeAudio[i]));
	}
}
wide(found, "aud");
addRow("","<br><br><br>","","");

//
// Supported video types
//

addRow("Understood video formats","&nbsp;","","Which of 80 video formats does the browser understand?");
found = [];
video = document.createElement('video');
for (i = 0; i < mimeVideo.length; i++) {
	if (video.canPlayType(mimeVideo[i])) {
		found.push(mimeVideo[i] + ": " + video.canPlayType(mimeVideo[i]));
	}
}
wide(found, "vid");
addRow("","<br><br><br>","","");

//
// Datetime
//

addRow("new Date()","","Wed Dec 25 2019 06:30:00 GMT+0000 (Coordinated Universal Time)","Timezone is an easy way to increase entropy 48x");
addRow("","<br><br><br>","","");

//
// Screen
//

addRow("screen.availLeft","","0","Returns the first available pixel from the left of the screen");
addRow("screen.availTop","","0","Returns the first available pixel from the top of the screen");
addRow("screen.availWidth","","1280","Width of browser");
addRow("screen.availHeight","","1024","Height of browser");
addRow("screen.width","","1280","Width of browser");
addRow("screen.height","","1024","Height of browser");
addRow("screen.colorDepth","","24","");
addRow("screen.pixelDepth","","24","I believe this is the most concurrent layers of windows the OS can handle?");
addRow("screen.orientation","","[object ScreenOrientation]","");
	addRow("screen.orientation.angle","","0","Interestingly, this value isn't locked to 90 degree increments",IND);
	addRow("screen.orientation.type","","landscape-primary","portrait-primary / portrait-secondary / landscape-primary / landscape-secondary",IND);
addRow("","<br><br><br>","","");

//
// Window
//

addRow("window.devicePixelRatio",0,"1","Ratio of screen pixels to CSS pixels");
addRow("window.document.fullscreenEnabled",0,"true","Do any browsers not support fullscreen?");
addRow("window.fullScreen",0,"false","Only Firefox supports");
addRow("window.history.length",0,"5","How many pages has this tab been through since it was opened?");
addRow("window.innerHeight",0,"940","Browser height excluding URL bars, status bars etc.");
addRow("window.innerWidth",0,"1280","Likewise for width");
addRow("window.locationbar.visible",0,"true","");
addRow("window.menubar.visible",0,"true","");
addRow("window.name",0,"","Not used these days");
addRow("window.opener",0,"","Not used these days");
addRow("window.personalbar.visible",0,"true","");
addRow("window.scrollbars.visible",0,"true","");
addRow("window.status",0,"","Not used these days");
addRow("window.statusbar.visible",0,"true","");
addRow("window.toolbar.visible",0,"true","");
addRow("","<br><br><br>","","");

//
// AudioContext
//

try{ac = new AudioContext().createAnalyser()
addRow("new AudioContext().createAnalyser()",0,"[object AnalyserNode]","");
	addRow(".channelCount",ac.channelCount,"	2","",IND);
	addRow(".channelCountMode",ac.channelCountMode,"	max","",IND);
	addRow(".channelInterpretation",ac.channelInterpretation,"speakers	","",IND);
	addRow(".context.baseLatency",ac.context.baseLatency,"0.011609977324263039","",IND);
	addRow(".context.currentTime",ac.context.currentTime,"5","",IND);
	addRow(".context.sampleRate",ac.context.sampleRate,"44100","",IND);
	addRow(".fftSize",ac.fftSize,"2048","",IND);
	addRow(".frequencyBinCount",ac.frequencyBinCount,"1024","",IND);
	addRow(".maxDecibels",ac.maxDecibels,"	-30","",IND);
	addRow(".minDecibels",ac.minDecibels,"	-100","",IND);
	addRow(".numberOfInputs",ac.numberOfInputs,"1","",IND);
	addRow(".numberOfOutputs",ac.numberOfOutputs,"1","",IND);
addRow(".smoothingTimeConstant",ac.smoothingTimeConstant,"0.8","",IND);
addRow("","<br><br><br>","","");} catch{}


//
// Colors
//

for (col = 0; col < colors.length; col++) {addRow("background: "+colors[col]+";","<td>"+colors[col],colorExamples[col],"")}
addRow("","<br><br><br>","","");

//
// Sensors
//

addRow("HTML5 Sensors","&nbsp;","","I'd go into the values these produce but that's difficult to test on a PC");
	addRow("new AbsoluteOrientationSensor()","","[object AbsoluteOrientationSensor]","",IND);
	addRow("new Accelerometer()","","[object Accelerometer]","",IND);
	addRow("new AmbientLightSensor()","","undefined","",IND);
	addRow("new Gyroscope()","","[object Gyroscope]","",IND);
	addRow("new LinearAccelerationSensor()","","[object LinearAccelerationSensor]","",IND);
	addRow("new Magnetometer()","","undefined","Phones still come with magnetometers?",IND);
	addRow("new OrientationSensor()","","undefined","",IND);
addRow("","<br><br><br>","","");

//
// IP
//

addRow("IP information","&nbsp;","","There are many values that can be assumed based off IP, also serves to confirm or deny other characteristics such as timezone. These parameters are received from <a href='http://ip-api.com/json'>ip-api</a>. Click the link if the API call failed, it takes you straight to a JSON file");
	addRow("IPinfo.as","","AS7545 TPG Internet Pty Ltd","Stands for autonomous systems, it's some ISP thing...",IND);
	addRow("IPinfo.city","","Lane Cove","",IND);
	addRow("IPinfo.country","","Australia","",IND);
	addRow("IPinfo.countryCode","","AU","",IND);
	addRow("IPinfo.isp","","TPG Internet Pty Ltd","",IND);
	addRow("IPinfo.lat","","-33.1234","",IND);
	addRow("IPinfo.lon","","151.5678","",IND);
	addRow("IPinfo.org","","TPG Internet Pty Ltd","",IND);
	addRow("IPinfo.query","","60.100.200.300","Here's your IP, if you're not on a VPN, this is as fingerprinty as it gets",IND);
	addRow("IPinfo.region","","NSW","",IND);
	addRow("IPinfo.regionName","","New South Wales","",IND);
	addRow("IPinfo.timezone","","Australia/Sydney","",IND);
	addRow("IPinfo.zip","","2066","",IND);
addRow("","<br><br><br>","","");

//
// Load info
//

try{req = new XMLHttpRequest();req.open('GET', document.location, false);req.send(null);headers = req.getAllResponseHeaders();headers=headers.split("\n").join("<br>")
addRow("Headers","&nbsp;","","");
wide(headers,"head");
addRow("","<br><br><br>","","");
addRow("adblock","","true","Tries to load a Google ad library, if we can't load it, it's blocked i.e adblock");
addRow("","<br><br><br>","","");} catch{}

//
// WebGL
//

addRow("gl = document.createElement( 'canvas' ).getContext( 'webgl' );","","[object WebGLRenderingContext]","We can use webgl to get graphics card information. Full webgl report can be found <a href='https://browserleaks.com/webgl'>here</a>");
	addRow("gl.getParameter( gl.getExtension( 'WEBGL_debug_renderer_info' ).UNMASKED_VENDOR_WEBGL)","","NVIDIA Corporation","Graphics card manufacturer",IND);
	addRow("gl.getParameter( gl.getExtension( 'WEBGL_debug_renderer_info' ).UNMASKED_RENDERER_WEBGL)","","GeForce GTX 1060/PCIe/SSE2","Graphics card",IND);
	addRow("gl.getSupportedExtensions().length","","28","Number of methods webgl supports",IND);
addRow("","<br><br><br>","","");

//
// GetClientRecs
//

rex = document.getElementById('topH1').getClientRects()[0];
addRow("document.getElementById( 'topH1' ).getClientRects( )[0]","","[object DOMRect]","The same browser may render the same elements ever so slightly differently. Here getClientRects returns granular information regarding the extent of an element, here the introductory <h1>");
	addRow(".bottom",rex.bottom,"58.4375","",IND);
	addRow(".height",rex.height,"37","",IND);
	addRow(".left",rex.left,"8","",IND);
	addRow(".right",rex.right,"890","",IND);
	addRow(".top",rex.top,"21.4375","",IND);
	addRow(".width",rex.width,"882","",IND);
	addRow(".x",rex.x,"8","",IND);
	addRow(".y",rex.y,"21.4375","",IND);
addRow("","<br><br><br>","","");

//
// Canvas
//

addRow("Canvas fingerprinting","&nbsp;","","There are many complicated paint calls for this canvas. Each browser / OS / etc is going to render it marginally differently, which is perfect for a hash function because hash functions are designed to have wildly different results for a similar input. For more info about hash functions, <a href='https://harrisonm.com/blog/encryption'>read this</a>. For this canvas fingerprinting implementation, look at <a href='git'>the code</a>");
	wide("ja","cvs");
addRow("","<br><br><br>","","");

window.onload = loaded;