(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"final_project_ofriLinoyNoaLiel_atlas_1", frames: [[0,0,2024,1179]]},
		{name:"final_project_ofriLinoyNoaLiel_atlas_2", frames: [[0,1454,1303,259],[0,1181,1305,271],[0,1715,1303,259],[0,0,1281,1179]]},
		{name:"final_project_ofriLinoyNoaLiel_atlas_3", frames: [[1754,1780,163,204],[1041,910,299,198],[0,0,1303,259],[0,261,1303,259],[0,1757,369,257],[1011,1674,184,184],[1220,1183,185,183],[691,935,334,367],[1027,1487,185,185],[1779,1225,183,183],[1395,805,342,376],[1220,1368,184,183],[1590,1552,183,182],[691,1304,334,367],[1011,1860,184,184],[1568,1738,184,181],[1395,423,346,380],[1661,0,370,387],[1305,0,354,421],[0,1353,338,402],[0,522,346,416],[1406,1552,182,184],[1779,1410,183,183],[1775,1595,182,183],[1027,1110,191,187],[1027,1299,191,186],[698,522,341,402],[348,522,348,411],[1383,1738,183,182],[0,940,346,411],[1197,1674,184,184],[1197,1860,184,184],[681,1673,328,361],[1407,1183,186,182],[1407,1367,184,183],[1739,947,276,276],[371,1727,277,277],[1743,668,276,277],[340,1353,339,372],[348,935,341,413],[1593,1367,184,183],[1041,522,352,386],[1743,389,277,277]]},
		{name:"final_project_ofriLinoyNoaLiel_atlas_4", frames: [[923,0,84,84],[967,86,42,108],[349,368,145,145],[496,368,145,145],[734,367,229,95],[967,196,42,108],[917,198,42,107],[923,86,42,110],[166,374,145,145],[313,515,108,108],[643,464,145,145],[790,464,145,145],[183,184,164,188],[0,366,164,186],[368,0,183,181],[553,0,183,181],[0,184,181,180],[368,183,181,183],[738,0,183,181],[0,0,182,182],[184,0,182,182],[551,183,181,183],[734,183,181,182]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_2385 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2367 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2387 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2388 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2368 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3052 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2365 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2362 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2363 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2360 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2361 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2364 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2386 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2359 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2354 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2356 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2348 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2357 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2351 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2355 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2342 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2343 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2344 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2345 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2339 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2341 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2340 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3067 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2337 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2338 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2333 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2334 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2331 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2336 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2332 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2330 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2328 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2335 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2327 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2325 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2324 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3068 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2329 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2323 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2326 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2319 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2322 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2321 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2318 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2313 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2315 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2316 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2314 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2320 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2309 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2317 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2312 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2310 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2311 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2307 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2306 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2303 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.linoy_pic = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.liel_pic = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.ofri_pic = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2305 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2308 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2304 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2302 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.noa_pic = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2301 = function() {
	this.initialize(ss["final_project_ofriLinoyNoaLiel_atlas_4"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_yes = new cjs.Text("כן", "bold 40px 'Calibri'");
	this.TXT_yes.name = "TXT_yes";
	this.TXT_yes.textAlign = "right";
	this.TXT_yes.lineHeight = 51;
	this.TXT_yes.lineWidth = 32;
	this.TXT_yes.alpha = 0.92549020;
	this.TXT_yes.parent = this;
	this.TXT_yes.setTransform(50.3,13.1);

	this.timeline.addTween(cjs.Tween.get(this.TXT_yes).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_2386();
	this.instance.setTransform(-1,-1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2387();
	this.instance_1.setTransform(-1,-1,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2388();
	this.instance_2.setTransform(-1,-1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,72.5,72.5);


(lib.X = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2385();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.X, new cjs.Rectangle(0,0,42,42), null);


(lib.ofri = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ofri_pic();
	this.instance.setTransform(32.95,57.2,0.6099,0.6099,-12.198);

	this.instance_1 = new lib.CachedBmp_2367();
	this.instance_1.setTransform(59.7,202.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ofri, new cjs.Rectangle(33,21.7,200.2,234.8), null);


(lib.odot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("אודות", "bold 33px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 42;
	this.text.lineWidth = 70;
	this.text.parent = this;
	this.text.setTransform(56.1,6.6);

	this.instance = new lib.CachedBmp_3052();
	this.instance.setTransform(-1,-1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.odot, new cjs.Rectangle(-1,-1,114.5,49.9), null);


(lib.noa = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.noa_pic();
	this.instance.setTransform(35.4,59.95,0.5825,0.5825,-12.9223);

	this.instance_1 = new lib.CachedBmp_2365();
	this.instance_1.setTransform(62.95,197.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.noa, new cjs.Rectangle(35.4,23.9,193.4,227.5), null);


(lib.logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_2364();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo, new cjs.Rectangle(0,0,149.5,99), null);


(lib.linoy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.linoy_pic();
	this.instance.setTransform(34.3,60.85,0.5873,0.5873,-13.9741);

	this.instance_1 = new lib.CachedBmp_2363();
	this.instance_1.setTransform(63.9,198.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.linoy, new cjs.Rectangle(34.3,21.7,196.5,232.10000000000002), null);


(lib.liel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.liel_pic();
	this.instance.setTransform(37,56.45,0.5706,0.5706,-11.9085);

	this.instance_1 = new lib.CachedBmp_2362();
	this.instance_1.setTransform(61.1,192.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.liel, new cjs.Rectangle(37,23.9,187.3,221.7), null);


(lib.job = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_2361();
	this.instance.setTransform(0,0,0.4694,0.4694);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.job, new cjs.Rectangle(0,0,50.7,50.7), null);


(lib.no = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.text = new cjs.Text("לא", "bold 40px 'Calibri'");
	this.text.textAlign = "right";
	this.text.lineHeight = 51;
	this.text.lineWidth = 40;
	this.text.alpha = 0.92941176;
	this.text.parent = this;
	this.text.setTransform(54.25,16.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_2386();
	this.instance.setTransform(-1,-1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2359();
	this.instance_1.setTransform(-1,-1,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2360();
	this.instance_2.setTransform(-1,-1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,72.5,72.5);


(lib.horaot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.horaot_TXT = new cjs.Text(".תחילה, סנן על פי דרישה ללימודים\nלאחר מכן, בחר בסינון המשרות על פי התחומים או לחץ על .המקצוע הרצוי על מנת להציג מידע נוסף על המקצוע הרלוונטי", "22px 'Calibri'");
	this.horaot_TXT.name = "horaot_TXT";
	this.horaot_TXT.textAlign = "right";
	this.horaot_TXT.lineHeight = 29;
	this.horaot_TXT.lineWidth = 506;
	this.horaot_TXT.parent = this;
	this.horaot_TXT.setTransform(439.55,2);

	this.timeline.addTween(cjs.Tween.get(this.horaot_TXT).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.horaot, new cjs.Rectangle(-68.8,0,510.40000000000003,88.6), null);


(lib.hand_o = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer_1
	this.text = new cjs.Text("אומנותי", "bold 40px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 51;
	this.text.lineWidth = 135;
	this.text.parent = this;
	this.text.setTransform(70.15,48.7,1,1,-14.9992);

	this.instance = new lib.CachedBmp_2355();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2356();
	this.instance_1.setTransform(-467.85,5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2357();
	this.instance_2.setTransform(-467.85,11.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{color:"#000000",x:70.15,y:48.7}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{color:"#CCCCCC",x:70.15,y:48.7}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{color:"#000000",x:2.35,y:45.65}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-467.8,0,652.5,140.7);


(lib.hand_m = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer_1
	this.text = new cjs.Text("משרדי", "bold 40px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 51;
	this.text.lineWidth = 135;
	this.text.parent = this;
	this.text.setTransform(68.8,47.05,1,1,-14.9992);

	this.instance = new lib.CachedBmp_2355();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2356();
	this.instance_1.setTransform(-467.85,5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2354();
	this.instance_2.setTransform(-467.85,11.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{color:"#000000",x:68.8}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{color:"#CCCCCC",x:68.8}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{color:"#000000",x:3.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-467.8,0,652.5,140.7);


(lib.hand_h = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer_1
	this.text = new cjs.Text("הדרכתי", "bold 40px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 51;
	this.text.lineWidth = 135;
	this.text.parent = this;
	this.text.setTransform(68.8,47.05,1,1,-14.9992);

	this.instance = new lib.CachedBmp_2355();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2356();
	this.instance_1.setTransform(-467.85,5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2351();
	this.instance_2.setTransform(-467.85,11.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{color:"#000000",x:68.8}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{color:"#CCCCCC",x:68.8}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{color:"#000000",x:3.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-467.8,0,652.5,140.7);


(lib.hand_f = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer_1
	this.text = new cjs.Text("פיזי", "bold 40px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 51;
	this.text.lineWidth = 135;
	this.text.parent = this;
	this.text.setTransform(63.95,48.7,1,1,-14.9992);

	this.instance = new lib.CachedBmp_2355();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2356();
	this.instance_1.setTransform(-467.85,5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2348();
	this.instance_2.setTransform(-467.85,11.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text,p:{color:"#000000",x:63.95,y:48.7}}]}).to({state:[{t:this.instance_1},{t:this.text,p:{color:"#CCCCCC",x:63.95,y:48.7}}]},1).to({state:[{t:this.instance_2},{t:this.text,p:{color:"#000000",x:2.85,y:47}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-467.8,0,652.5,140.7);


(lib.waiter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_waiter = new cjs.Text("מלצר/ית", "22px 'Calibri'");
	this.TXT_waiter.name = "TXT_waiter";
	this.TXT_waiter.textAlign = "center";
	this.TXT_waiter.lineHeight = 29;
	this.TXT_waiter.lineWidth = 119;
	this.TXT_waiter.parent = this;
	this.TXT_waiter.setTransform(63.0933,103.8,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_waiter).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2343();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2344();
	this.instance_1.setTransform(-33.2,-14.95,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2345();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.2,-14.9,167,183.5);


(lib.Travel_Guide = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_TG = new cjs.Text("מדריכ/ת טיולים", "22px 'Calibri'");
	this.TXT_TG.name = "TXT_TG";
	this.TXT_TG.textAlign = "center";
	this.TXT_TG.lineHeight = 29;
	this.TXT_TG.lineWidth = 143;
	this.TXT_TG.parent = this;
	this.TXT_TG.setTransform(51.5933,100.95,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_TG).wait(2).to({text:"מדריך/ת טיולים",color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2340();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2341();
	this.instance_1.setTransform(-34.9,-10.35,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2342();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.9,-10.3,171,188);


(lib.teacher = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_teacher = new cjs.Text("מורה", "22px 'Calibri'");
	this.TXT_teacher.name = "TXT_teacher";
	this.TXT_teacher.textAlign = "center";
	this.TXT_teacher.lineHeight = 29;
	this.TXT_teacher.lineWidth = 119;
	this.TXT_teacher.parent = this;
	this.TXT_teacher.setTransform(46.7433,100.6,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_teacher).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2337();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2338();
	this.instance_1.setTransform(-35.15,-12.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2339();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.1,-12.8,167,183.5);


(lib.Social_Worker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_SW = new cjs.Text("עובד/ת סוציאלי/ת", "22px 'Calibri'");
	this.TXT_SW.name = "TXT_SW";
	this.TXT_SW.textAlign = "center";
	this.TXT_SW.lineHeight = 29;
	this.TXT_SW.lineWidth = 169;
	this.TXT_SW.parent = this;
	this.TXT_SW.setTransform(46.7933,104.05,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_SW).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2334();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2335();
	this.instance_1.setTransform(-49.25,-9.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2336();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.2,-9.5,185,193.5);


(lib.secretary = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_secretary = new cjs.Text("מזכיר/ה", "22px 'Calibri'");
	this.TXT_secretary.name = "TXT_secretary";
	this.TXT_secretary.textAlign = "center";
	this.TXT_secretary.lineHeight = 29;
	this.TXT_secretary.lineWidth = 119;
	this.TXT_secretary.parent = this;
	this.TXT_secretary.setTransform(48.3433,95.75,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_secretary).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2331();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2332();
	this.instance_1.setTransform(-44.45,-17.25,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2333();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.4,-17.2,173,190);


(lib.programmer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_programmer = new cjs.Text("מתכנת", "22px 'Calibri'");
	this.TXT_programmer.name = "TXT_programmer";
	this.TXT_programmer.textAlign = "center";
	this.TXT_programmer.lineHeight = 29;
	this.TXT_programmer.lineWidth = 69;
	this.TXT_programmer.parent = this;
	this.TXT_programmer.setTransform(48.2237,101.35,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_programmer).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2328();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2329();
	this.instance_1.setTransform(-37,-14.8,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2330();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-14.8,177,210.5);


(lib.Nurse = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_Nurse = new cjs.Text("אח/ות", "22px 'Calibri'");
	this.TXT_Nurse.name = "TXT_Nurse";
	this.TXT_Nurse.textAlign = "center";
	this.TXT_Nurse.lineHeight = 29;
	this.TXT_Nurse.lineWidth = 119;
	this.TXT_Nurse.parent = this;
	this.TXT_Nurse.setTransform(51.5933,103.8,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_Nurse).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2325();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2326();
	this.instance_1.setTransform(-38.6,-21.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2327();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.6,-21.4,173,208);


(lib.Lawyer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_Lawyer = new cjs.Text("עורכ/ת דין", "22px 'Calibri'");
	this.TXT_Lawyer.name = "TXT_Lawyer";
	this.TXT_Lawyer.textAlign = "center";
	this.TXT_Lawyer.lineHeight = 29;
	this.TXT_Lawyer.lineWidth = 119;
	this.TXT_Lawyer.parent = this;
	this.TXT_Lawyer.setTransform(57.8933,102.2,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_Lawyer).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2322();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2323();
	this.instance_1.setTransform(-37.65,-11.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2324();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.6,-11.6,169,201);


(lib.Graphic_Designer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_GD = new cjs.Text("מעצב/ת גרפי/ת", "22px 'Calibri'");
	this.TXT_GD.name = "TXT_GD";
	this.TXT_GD.textAlign = "center";
	this.TXT_GD.lineHeight = 29;
	this.TXT_GD.lineWidth = 151;
	this.TXT_GD.parent = this;
	this.TXT_GD.setTransform(51.2933,99.65,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_GD).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2319();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2320();
	this.instance_1.setTransform(-40.2,-12.25,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2321();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.2,-12.2,174,205.5);


(lib.Building_Engineer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_BE = new cjs.Text("מהנדס בניין", "22px 'Calibri'");
	this.TXT_BE.name = "TXT_BE";
	this.TXT_BE.textAlign = "center";
	this.TXT_BE.lineHeight = 29;
	this.TXT_BE.lineWidth = 119;
	this.TXT_BE.parent = this;
	this.TXT_BE.setTransform(48.3933,100.8,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_BE).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2316();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2317();
	this.instance_1.setTransform(-42.8,-15.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2318();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.8,-15.7,173,205.5);


(lib.beautician = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_beautician = new cjs.Text("קוסמטיקאית", "22px 'Calibri'");
	this.TXT_beautician.name = "TXT_beautician";
	this.TXT_beautician.textAlign = "center";
	this.TXT_beautician.lineHeight = 29;
	this.TXT_beautician.lineWidth = 119;
	this.TXT_beautician.parent = this;
	this.TXT_beautician.setTransform(51.6433,103.8,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_beautician).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2313();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2314();
	this.instance_1.setTransform(-39.2,-21.1,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2315();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.2,-21.1,170.5,201);


(lib.banker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_banker = new cjs.Text("בנקאי/ת", "22px 'Calibri'");
	this.TXT_banker.name = "TXT_banker";
	this.TXT_banker.textAlign = "center";
	this.TXT_banker.lineHeight = 29;
	this.TXT_banker.lineWidth = 119;
	this.TXT_banker.parent = this;
	this.TXT_banker.setTransform(61.0933,97.3,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_banker).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2310();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2311();
	this.instance_1.setTransform(-32.45,-11.15,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2312();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.4,-11.1,164,180.5);


(lib.Attendant = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_Attendant = new cjs.Text("דייל/ת", "22px 'Calibri'");
	this.TXT_Attendant.name = "TXT_Attendant";
	this.TXT_Attendant.textAlign = "center";
	this.TXT_Attendant.lineHeight = 29;
	this.TXT_Attendant.lineWidth = 69;
	this.TXT_Attendant.parent = this;
	this.TXT_Attendant.setTransform(58.2237,102.9,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_Attendant).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2307();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2308();
	this.instance_1.setTransform(-38.25,-14.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2309();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.2,-14.8,170.5,206.5);


(lib.architect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_architect = new cjs.Text("אדריכל/ית", "22px 'Calibri'");
	this.TXT_architect.name = "TXT_architect";
	this.TXT_architect.textAlign = "center";
	this.TXT_architect.lineHeight = 29;
	this.TXT_architect.lineWidth = 119;
	this.TXT_architect.parent = this;
	this.TXT_architect.setTransform(52.9433,96.75,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_architect).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2304();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2305();
	this.instance_1.setTransform(-29.75,-15.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2306();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.7,-15.5,169.5,186);


(lib.Actress = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// TXT
	this.TXT_Actress = new cjs.Text("שחקנ/ית", "22px 'Calibri'");
	this.TXT_Actress.name = "TXT_Actress";
	this.TXT_Actress.textAlign = "center";
	this.TXT_Actress.lineHeight = 29;
	this.TXT_Actress.lineWidth = 119;
	this.TXT_Actress.parent = this;
	this.TXT_Actress.setTransform(54.5933,103.8,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get(this.TXT_Actress).wait(2).to({color:"#CCCCCC"},0).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_2301();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2302();
	this.instance_1.setTransform(-42.7,-20.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2303();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.7,-20.7,176,193);


(lib.window = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		this.stop();
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_8 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_10 = function() {
		this.stop();
	}
	this.frame_11 = function() {
		this.stop();
	}
	this.frame_12 = function() {
		this.stop();
	}
	this.frame_13 = function() {
		this.stop();
	}
	this.frame_14 = function() {
		this.stop();
	}
	this.frame_15 = function() {
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(1).call(this.frame_10).wait(1).call(this.frame_11).wait(1).call(this.frame_12).wait(1).call(this.frame_13).wait(1).call(this.frame_14).wait(1).call(this.frame_15).wait(1));

	// x
	this.my_x = new lib.X();
	this.my_x.name = "my_x";
	this.my_x.setTransform(17.5,18.15);

	this.timeline.addTween(cjs.Tween.get(this.my_x).wait(15).to({x:-166,y:24.65},0).wait(1));

	// icon
	this.instance = new lib.CachedBmp_2368();
	this.instance.setTransform(539.6,20.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},15).wait(1));

	// Layer_1
	this.text = new cjs.Text("דרוש: מעצב גרפי", "bold 53px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 67;
	this.text.lineWidth = 584;
	this.text.parent = this;
	this.text.setTransform(320.85,30.65);

	this.text_1 = new cjs.Text("\nהסבר על המקצוע- אדם היוצר שילוב של טקסט ותמונה לשם העברתו של ,מסר מסוים, בא לידי ביטוי בעיצוב של טקסטים מודפסים עיצוב אריזות .עיצוב ממשקים ועיצוב ממשק המשתמש ותחומים נוספים\n\n.לימודים נדרשים- תואר/לימודי תעודה בעיצוב גרפי\n\n.שכר ממוצע- 7000-8000 ש\"ח\n\n.היקף משרה- פרילנסר- לפי פרוייקטים. תחת ארגון- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה- בכל פלטפורמה לחיפוש עבודה", "22px 'Calibri'");
	this.text_1.textAlign = "right";
	this.text_1.lineHeight = 35;
	this.text_1.lineWidth = 574;
	this.text_1.parent = this;
	this.text_1.setTransform(602.9,122.55);

	this.instance_1 = new lib.CachedBmp_3067();
	this.instance_1.setTransform(-2.5,-2.5,0.5,0.5);

	this.instance_2 = new lib.job();
	this.instance_2.setTransform(123.35,56.75,1.0652,1,-14.9992,0,0,25.4,25.4);

	this.text_2 = new cjs.Text("נועה ברונפלד", "bold 23px 'Calibri'");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 30;
	this.text_2.lineWidth = 143;
	this.text_2.alpha = 0.99607843;
	this.text_2.parent = this;
	this.text_2.setTransform(489.2,550.6);

	this.text_3 = new cjs.Text("לינוי אלבחרי", "bold 23px 'Calibri'");
	this.text_3.textAlign = "center";
	this.text_3.lineHeight = 30;
	this.text_3.lineWidth = 143;
	this.text_3.alpha = 0.99607843;
	this.text_3.parent = this;
	this.text_3.setTransform(728.9,550.6);

	this.instance_3 = new lib.liel();
	this.instance_3.setTransform(-85.75,462.4,1,1,0,0,0,105.9,122.6);

	this.instance_4 = new lib.ofri();
	this.instance_4.setTransform(176.85,458.25,1,1,0,0,0,111.4,128);

	this.instance_5 = new lib.linoy();
	this.instance_5.setTransform(672.65,460.35,1,1,0,0,0,109,128.8);

	this.text_4 = new cjs.Text("תשפ\"א | 2021", "25px 'Calibri'");
	this.text_4.textAlign = "right";
	this.text_4.lineHeight = 33;
	this.text_4.lineWidth = 496;
	this.text_4.parent = this;
	this.text_4.setTransform(761.1,281.65);

	this.instance_6 = new lib.noa();
	this.instance_6.setTransform(433.1,480.65,1,1,0,0,0,108.2,147.3);

	this.hit_link = new cjs.Text("הפקולטה לטכנולוגיות למידה", "bold 25px 'Calibri'", "#018285");
	this.hit_link.name = "hit_link";
	this.hit_link.textAlign = "center";
	this.hit_link.lineHeight = 33;
	this.hit_link.lineWidth = 268;
	this.hit_link.parent = this;
	this.hit_link.setTransform(22.2312,214.7,0.8286,0.8286);

	this.hit_logo = new lib.logo();
	this.hit_logo.name = "hit_logo";
	this.hit_logo.setTransform(25.6,161.65,0.8286,0.8286,0,0,0,74.9,49.5);

	this.text_5 = new cjs.Text("ייצוג זה הופק כחלק מפרויקט משותף לקורסים \"ארגון \"וייצוג ידע\" ו\"מבוא לתכנות אינטראקציה ואנימציה בפקולטה לטכנולוגיות למידה", "30px 'Calibri'");
	this.text_5.textAlign = "right";
	this.text_5.lineHeight = 39;
	this.text_5.lineWidth = 575;
	this.text_5.parent = this;
	this.text_5.setTransform(761.1,143.7);

	this.text_6 = new cjs.Text("?אודות - איזה עובד את/ה", "bold 65px 'Calibri'");
	this.text_6.textAlign = "right";
	this.text_6.lineHeight = 81;
	this.text_6.lineWidth = 615;
	this.text_6.parent = this;
	this.text_6.setTransform(761.1,53.05);

	this.instance_7 = new lib.CachedBmp_3068();
	this.instance_7.setTransform(-188.3,-2.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- אדם היוצר שילוב של טקסט ותמונה לשם העברתו של ,מסר מסוים, בא לידי ביטוי בעיצוב של טקסטים מודפסים עיצוב אריזות .עיצוב ממשקים ועיצוב ממשק המשתמש ותחומים נוספים\n\n.לימודים נדרשים- תואר/לימודי תעודה בעיצוב גרפי\n\n.שכר ממוצע- 7000-8000 ש\"ח\n\n.היקף משרה- פרילנסר- לפי פרוייקטים. תחת ארגון- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה- בכל פלטפורמה לחיפוש עבודה",lineHeight:34.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:320.85,y:30.65,text:"דרוש: מעצב גרפי",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]}).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- אדם שעוסק בהדרכה והעברת מידע למטיילים ותיירים .בארץ ובחו\"ל\n\nלימודים נדרשים- קורס הדרכת טיולים, קיימים 2 סוגים- הדרכה בארץ .והדרכה בחו\"ל\n\n.שכר ממוצע-  4000-9000 ש\"ח\n\n.היקף משרה- לפי פרוייקטים\n\n,פלטפורמות לחיפוש עבודה-  החברה להגנת הטבע, דרושים, משרות   ..ועוד ALLJOBS ",lineHeight:34.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מדריכ/ת טיולים",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- עובד העוסק בענייני המנהלה (אדמיניסטרציה) של .ארגון\n\nלימודים נדרשים- לא נדרשים לימודים אקדמיים, אך לרוב נדרשת היכרות .עם מערכות מסויימות\n\n.שכר ממוצע-  5000-7000 ש\"ח\n\n.היקף משרה- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  בכל פלטפורמה לחיפוש עבודה",lineHeight:34.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מזכיר/ה",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- בנקאי הוא נציג של הבנק המטפל בחשבונות בנק של לקוחות. בנקאי יכול לטפל בלקוחות פרטיים או בלקוחות עסקיים של .הבנק\n\nלימודים נדרשים- ישנם מספר דרכים ללמוד בנקאות. ניתן ללמוד לימודי תעודה בהנהלת חשבונות או במסלול בנקאות וכן, ניתן גם ללמוד תואר .בכלכלה/ ראיית חשבון\n\nשכר ממוצע- 7000-9000 לבעלי תואר אקדמי (לימודי תעודה ירוויחו .(פחות\n\n.היקף משרה- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  בכל פלטפורמה לחיפוש עבודה",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: בנקאי/ת",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\n,הסבר על המקצוע- עוסק בתכנון מבנים, מתמחה לעיתים בתכנון עירוני .אדריכלות נוף ועיצוב פנים\n\nלימודים נדרשים- לימודי אדריכלות ועיצוב לתואר דורשים 5  שנות לימוד .לעומת לימודים לתעודת הנדסאי שנתיים וחצי של לימוד \n\n.שכר ממוצע- 6,000-14,000 ש\"ח\n\n.היקף משרה- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה- בכל פלטפורמה לחיפוש עבודה",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: אדריכל/ית",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- מתן סיוע לאנשים הנתונים במצב משברי או במצוקה .כחלק ממדיניות מדינת הרווחה\n\n.לימודים- תואר ראשון בעבודה סוציאלית \n\n.שכר ממוצע-  5000- 9000 ש\"ח\n\n.היקף משרה-  נע בין חצי משרה למשרה מלאה\n\nפלטפורמות לחיפוש עבודה-  אתר שתיל, ביטוח לאומי, בכל פלטפורמה .לחיפוש עבודה\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:304.9,y:30.95,text:"דרוש: עובד/ת סוציאלי/ת",font:"bold 48px 'Calibri'",lineHeight:60.6,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- אדם שמשחק או מציג תפקיד בהפקה אמנותית. בדרך ,כלל המונח מתייחס לאדם המופיע בסרט קולנוע, בתיאטרון, או בטלוויזיה .ולעיתים מתייחס גם להופעות רחוב\n\nלימודים- לימודי משחק הינם לימודים מעשיים הנמשכים על פני שלוש שנים. ניתן ללמוד משחק באוניברסיטאות ובמכללות וכן בבתי ספר .המיועדים אך ורק למטרה זו\n\n.שכר ממוצע-  300-350 פר הצגה\n\n.היקף משרה-  עבודה לפי פרוייקטים\n\n.פלטפורמות לחיפוש עבודה-  אודישנים דרך חברות שונות\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: שחקנ/ית",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- ביצוע טיפולים לטיפוח מראה וניקיון הגוף, טיפוח .העור, שיער וציפורניים\n\nלימודים- תעודה- באורך של כ-650 שעות בסופם הבוגר מקבל  תעודת .גמר בקוסמטיקה, מטעם משרד העבודה והמוסד המלמד\n\n.שכר ממוצע-  7000 ש\"ח\n\n.היקף משרה-  עצמאי- לפי בחירתו. תחת ארגון- משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  בכל פלטפורמה לחיפוש עבודה",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: קוסמטיקאי/ת",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- מתן שירות, תפקידו להגיש אוכל ומשקאות לסועדים .בבית קפה, מסעדה או כל אירוע חברתי\n\n.לימודים נדרשים- נדרש לעבור הכשרה/ התלמדות מבעל המסעדה\n\n.שכר ממוצע-  6000-7000 ש\"ח\n\n.היקף משרה- משמרות\n\n.פלטפורמות לחיפוש עבודה-  בכל פלטפורמה לחיפוש עבודה\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מלצר/ית",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\n,הסבר על המקצוע- הסיעוד הוא תחום בבריאות המתמקד בטיפול ביחידים משפחות וקהילות, על מנת לעזור להשיג, לשמור, או לשחזר בריאות אופטימלית ואיכות החיים. העוסקים בסיעוד נקראים אחים או אחיות\n.לימודים נדרשים- תואר של 4 שנים והתמחות\n\n.שכר ממוצע-  7500-12000 ש\"ח\n\n.היקף משרה- משרה מלאה- לעיתים עבודה במשמרות יום ולילה\n\nפלטפורמות לחיפוש עבודה-  בתי חולים, קופות חולים בכל פלטפורמה .לחיפוש עבודה\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: אח/ות",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע-   מורה הוא אדם העוסק בהוראה אשר עבר הכשרה למקצוע ספציפי אותו הוא מלמד בבית ספר/חטיבה/תיכון כחלק מחינוך .פורמלי. המורה אחראי על לימוד וחינוך תלמידיו \n\nלימודים-   מורה נדרש להשלים תואר ראשון בהוראה ובשלב השני לרכוש .תעודת הוראה בתחום ההתמחות רלוונטי\n\n.שכר ממוצע-  8000-9000 ש\"ח\n\n.היקף משרה-  35-40 שעות שבועיות\n\nפלטפורמות לחיפוש עבודה- ארגון המורים, הסתדרות המורים, כל .פלטפורמה לחיפוש עבודה\n\n\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מורה",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.45}},{t:this.text_1,p:{text:"\nהסבר על המקצוע-   עוסק בעריכת דין, כלומר תפקידו לתת יעוץ והכוונה לקליינט להתנהלות נכונה ביחס לחוק. תחום עריכת דין מתחלק לתתי ,תחומים רבים הנוגעים לחיי היום יום ובניהם: דיני משפחה, פלילים ..רשלנות רפואית וכו\n\nלימודים-   תואר במשפטים שעורך 3 שנים. לאחר סיום התואר הסטודנט עובר למסלול התמחות שעורך שנתיים במשרד עורכי דין. בסיום המסלול .יש לצלוח מבחני לשכה שמתקיימים פעמיים בשנה\n\n.שכר ממוצע-  11,500 ש\"ח\n\n.היקף משרה-  משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  לינקדין, כל פלטפורמה לחיפוש עבודה\n\n\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: עורכ/ת דין",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\n.הסבר על המקצוע-  תכנון קונסטרוקציה של מבנים שונים\n\n.לימודים-  ארבע שנים שבסופם זכאים הבוגרים לתעודת מהנדס\n\n.שכר ממוצע-  8000-12000 שח\n\n.היקף משרה-  משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  לינקדין, כל פלטפורמה לחיפוש עבודה\n\n\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מהנדס בניין",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- מתכנת הוא אדם שעוסק בפיתוח ותחזוק תוכנה של .המחשב בעזרת קידוד ע\"י שפות תכנות שונות\n\nלימודים-  מתכנת נדרש לבצע תואר ראשון במדעי המחשב/ הנדסת .תוכנה\n\n.שכר ממוצע-  10,000-20,000 ש\"ח\n\n.היקף משרה-  משרה מלאה\n\n.פלטפורמות לחיפוש עבודה-  לינקדין, כל פלטפורמה לחיפוש עבודה\n\n\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: מתכנת/ת",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_1,p:{x:-2.5}},{t:this.text_1,p:{text:"\nהסבר על המקצוע- איש צוות אוויר בחברת תעופה, הממונה על בטיחותם .ורווחתם של הנוסעים, ועל מתן מידע ושירותים שונים להם\n\n.לימודים- הכשרה מטעם חברת התעופה לאחר מיונים\n\n.שכר ממוצע-  7000- 9000 ש\"ח\n\n.היקף משרה-  מינימום 25 שעות טיסה בחודש\n\nפלטפורמות לחיפוש עבודה-  חברות תעופה שונות, בכל פלטפורמה .לחיפוש עבודה\n\n",lineHeight:29.85,x:602.9,y:122.55,font:"22px 'Calibri'",textAlign:"right",lineWidth:574}},{t:this.text,p:{x:294.05,y:30.95,text:"דרוש: דייל/ת",font:"bold 53px 'Calibri'",lineHeight:66.7,lineWidth:584}}]},1).to({state:[{t:this.instance_7},{t:this.text_6},{t:this.text_5},{t:this.hit_logo},{t:this.hit_link},{t:this.instance_6},{t:this.text_4},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.text_3},{t:this.text_2},{t:this.text_1,p:{text:"ליאל בך",lineHeight:30.1,x:-48.25,y:550.6,font:"bold 23px 'Calibri'",textAlign:"center",lineWidth:143}},{t:this.text,p:{x:218.5,y:550.6,text:"עפרי פניאס",font:"bold 23px 'Calibri'",lineHeight:30.1,lineWidth:143}},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.3,-2.5,1012,721.1);


// stage content:
(lib.final_project_ofriLinoyNoaLiel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var self = this;
		stage.enableMouseOver(24);
		self.my_window.visible = false; //הסתרת חלוניות
		addallListenerOverOut();
		
		var status = "clear";
			
		//הפעלת כל הליסינרים של מעבר עכבר
		function addallListenerOverOut() {
			addallListenerClick();
			//מעבר עכבר תפקידים
			self.my_GD.addEventListener("mouseover", overmy_GD);
			self.my_TG.addEventListener("mouseover", overmy_TG);
			self.my_secretary.addEventListener("mouseover", overmy_secretary);
			self.my_banker.addEventListener("mouseover", overmy_banker);
			self.my_architect.addEventListener("mouseover", overmy_architect);
			self.my_SW.addEventListener("mouseover", overmy_SW);
			self.my_Actress.addEventListener("mouseover", overmy_Actress);
			self.my_beautician.addEventListener("mouseover", overmy_beautician);
			self.my_waiter.addEventListener("mouseover", overmy_waiter);
			self.my_Nurse.addEventListener("mouseover", overmy_Nurse);
			self.my_teacher.addEventListener("mouseover", overmy_teacher);
			self.my_Lawyer.addEventListener("mouseover", overmy_Lawyer);
			self.my_BE.addEventListener("mouseover", overmy_BE);
			self.my_programmer.addEventListener("mouseover", overmy_programmer);
			self.my_Attendant.addEventListener("mouseover", overmy_Attendant);
			
			//יציאת עכבר תפקידים
			self.my_GD.addEventListener("mouseout", outmy_GD);
			self.my_TG.addEventListener("mouseout", outmy_TG);
			self.my_secretary.addEventListener("mouseout", outmy_secretary);
			self.my_banker.addEventListener("mouseout", outmy_banker);
			self.my_architect.addEventListener("mouseout", outmy_architect);
			self.my_SW.addEventListener("mouseout", outmy_SW);
			self.my_Actress.addEventListener("mouseout", outmy_Actress);
			self.my_beautician.addEventListener("mouseout", outmy_beautician);
			self.my_waiter.addEventListener("mouseout", outmy_waiter);
			self.my_Nurse.addEventListener("mouseout", outmy_Nurse);
			self.my_teacher.addEventListener("mouseout", outmy_teacher);
			self.my_Lawyer.addEventListener("mouseout", outmy_Lawyer);
			self.my_BE.addEventListener("mouseout", outmy_BE);
			self.my_programmer.addEventListener("mouseout", outmy_programmer);
			self.my_Attendant.addEventListener("mouseout", outmy_Attendant);
			
			//מעבר עכבר-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.addEventListener("mouseover", overhadrachati);
			self.misradi.addEventListener("mouseover", overmisradi);
			self.omanoti.addEventListener("mouseover", overomanoti);
			self.fizi.addEventListener("mouseover", overfizi);
			
			//יציאת עכבר-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.addEventListener("mouseout", outhadrachati);
			self.misradi.addEventListener("mouseout", outmisradi);
			self.omanoti.addEventListener("mouseout", outomanoti);
			self.fizi.addEventListener("mouseout", outfizi);
			
			//תואר-כן/לא
			self.my_yes.addEventListener("mouseover", overmy_yes);
			self.my_yes.addEventListener("mouseout", outmy_yes);
			self.my_no.addEventListener("mouseover", overmy_no);
			self.my_no.addEventListener("mouseout", outmy_no);
			
			//אודות
			self.odot_btn.addEventListener("mouseover", overodot);
			self.odot_btn.addEventListener("mouseout", outodot);
			self.my_window.hit_logo.addEventListener("mouseover", overlogo);
			self.my_window.hit_logo.addEventListener("mouseout", outlogo);
			self.my_window.hit_link.addEventListener("mouseover", overlink);
			self.my_window.hit_link.addEventListener("mouseout", outlink);
		
			
			self.my_GD.mouseEnabled=true;
			self.my_TG.mouseEnabled=true;
			self.my_secretary.mouseEnabled=true;
			self.my_banker.mouseEnabled=true;
			self.my_architect.mouseEnabled=true;
			self.my_SW.mouseEnabled=true;
			self.my_Actress.mouseEnabled=true;
			self.my_beautician.mouseEnabled=true;
			self.my_waiter.mouseEnabled=true;
			self.my_Nurse.mouseEnabled=true;
			self.my_teacher.mouseEnabled=true;
			self.my_Lawyer.mouseEnabled=true;
			self.my_BE.mouseEnabled=true;
			self.my_programmer.mouseEnabled=true;
			self.my_Attendant.mouseEnabled=true;
			
			self.hadrachati.mouseEnabled=true;
			self.misradi.mouseEnabled=true;
			self.omanoti.mouseEnabled=true;
			self.fizi.mouseEnabled=true;
			
			self.my_yes.mouseEnabled=true;
			self.my_yes.mouseEnabled=true;
			self.my_yes.mouseEnabled=true;
			self.my_no.mouseEnabled=true;
			self.my_no.mouseEnabled=true;
			self.my_no.mouseEnabled=true;
			
			self.odot_btn.mouseEnabled=true;
			self.my_window.hit_logo.mouseEnabled=true;
			self.my_window.hit_link.mouseEnabled=true;
			
			
			//שינוי תצורת עכבר
			self.my_GD.cursor = "pointer";
			self.my_TG.cursor = "pointer";
			self.my_secretary.cursor = "pointer";
			self.my_banker.cursor = "pointer";
			self.my_architect.cursor = "pointer";
			self.my_SW.cursor = "pointer";
			self.my_Actress.cursor = "pointer";
			self.my_beautician.cursor = "pointer";
			self.my_waiter.cursor = "pointer";
			self.my_Nurse.cursor = "pointer";
			self.my_teacher.cursor = "pointer";
			self.my_Lawyer.cursor = "pointer";
			self.my_BE.cursor = "pointer";
			self.my_programmer.cursor = "pointer";
			self.my_Attendant.cursor = "pointer";
			
			self.my_yes.cursor = "pointer";
			self.my_no.cursor = "pointer";
			
			self.hadrachati.cursor = "pointer";
			self.misradi.cursor = "pointer";
			self.omanoti.cursor = "pointer";
			self.fizi.cursor = "pointer";
			
			self.odot_btn.cursor = "pointer";
			self.my_window.hit_link.cursor = "pointer";
			self.my_window.hit_logo.cursor = "pointer";
		}
			
		
		
		//הפעלת כל הליסינרים של קליקים
		function addallListenerClick(){
			
		//קליק תפקידים
			self.my_GD.addEventListener("click", clickmy_GD);
			self.my_TG.addEventListener("click", clickmy_TG);
			self.my_secretary.addEventListener("click", clickmy_secretary);
			self.my_banker.addEventListener("click", clickmy_banker);
			self.my_architect.addEventListener("click", clickmy_architect);
			self.my_SW.addEventListener("click", clickmy_SW);
			self.my_Actress.addEventListener("click", clickmy_Actress);
			self.my_beautician.addEventListener("click", clickmy_beautician);
			self.my_waiter.addEventListener("click", clickmy_waiter);
			self.my_Nurse.addEventListener("click", clickmy_Nurse);
			self.my_teacher.addEventListener("click", clickmy_teacher);
			self.my_Lawyer.addEventListener("click", clickmy_Lawyer);
			self.my_BE.addEventListener("click", clickmy_BE);
			self.my_programmer.addEventListener("click", clickmy_programmer);
			self.my_Attendant.addEventListener("click", clickmy_Attendant);
		
		//קליק-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.addEventListener("click", clickhadrachati);
			self.misradi.addEventListener("click", clickmisradi);
			self.omanoti.addEventListener("click", clickomanoti);
			self.fizi.addEventListener("click", clickfizi);
		
			//תואר-כן/לא
			self.my_yes.addEventListener("click", clickmy_yes);
			self.my_no.addEventListener("click", clickmy_no);
			//אודות
			self.odot_btn.addEventListener("click", clickodot);
			self.my_window.hit_logo.addEventListener("click", hitlogo);
			self.my_window.hit_link.addEventListener("click",hitlink);
		}
			
		
		//ביטול כל הליסינרים
		function removeallListener() {
			self.my_GD.removeEventListener("mouseover", overmy_GD);
		    self.my_TG.removeEventListener("mouseover", overmy_TG);
			self.my_secretary.removeEventListener("mouseover", overmy_secretary);
			self.my_banker.removeEventListener("mouseover", overmy_banker);
			self.my_architect.removeEventListener("mouseover", overmy_architect);
			self.my_SW.removeEventListener("mouseover", overmy_SW);
			self.my_Actress.removeEventListener("mouseover", overmy_Actress);
			self.my_beautician.removeEventListener("mouseover", overmy_beautician);
			self.my_waiter.removeEventListener("mouseover", overmy_waiter);
			self.my_Nurse.removeEventListener("mouseover", overmy_Nurse);
			self.my_teacher.removeEventListener("mouseover", overmy_teacher);
			self.my_Lawyer.removeEventListener("mouseover", overmy_Lawyer);
			self.my_BE.removeEventListener("mouseover", overmy_BE);
			self.my_programmer.removeEventListener("mouseover", overmy_programmer);
			self.my_Attendant.removeEventListener("mouseover", overmy_Attendant);
			
			self.my_GD.removeEventListener("mouseout", outmy_GD);
			self.my_TG.removeEventListener("mouseout", outmy_TG);
			self.my_secretary.removeEventListener("mouseout", outmy_secretary);
			self.my_banker.removeEventListener("mouseout", outmy_banker);
			self.my_architect.removeEventListener("mouseout", outmy_architect);
			self.my_SW.removeEventListener("mouseout", outmy_SW);
			self.my_Actress.removeEventListener("mouseout", outmy_Actress);
			self.my_beautician.removeEventListener("mouseout", outmy_beautician);
			self.my_waiter.removeEventListener("mouseout", outmy_waiter);
			self.my_Nurse.removeEventListener("mouseout", outmy_Nurse);
			self.my_teacher.removeEventListener("mouseout", outmy_teacher);
			self.my_Lawyer.removeEventListener("mouseout", outmy_Lawyer);
			self.my_BE.removeEventListener("mouseout", outmy_BE);
			self.my_programmer.removeEventListener("mouseout", outmy_programmer);
			self.my_Attendant.removeEventListener("mouseout", outmy_Attendant);
			
			self.my_GD.removeEventListener("click", clickmy_GD);
			self.my_TG.removeEventListener("click", clickmy_TG);
			self.my_secretary.removeEventListener("click", clickmy_secretary);
			self.my_banker.removeEventListener("click", clickmy_banker);
			self.my_architect.removeEventListener("click", clickmy_architect);
			self.my_SW.removeEventListener("click", clickmy_SW);
			self.my_Actress.removeEventListener("click", clickmy_Actress);
			self.my_beautician.removeEventListener("click", clickmy_beautician);
			self.my_waiter.removeEventListener("click", clickmy_waiter);
			self.my_Nurse.removeEventListener("click", clickmy_Nurse);
			self.my_teacher.removeEventListener("click", clickmy_teacher);
			self.my_Lawyer.removeEventListener("click", clickmy_Lawyer);
			self.my_BE.removeEventListener("click", clickmy_BE);
			self.my_programmer.removeEventListener("click", clickmy_programmer);
			self.my_Attendant.removeEventListener("click", clickmy_Attendant);
			
				
			//מעבר עכבר-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.removeEventListener("mouseover", overhadrachati);
			self.misradi.removeEventListener("mouseover", overmisradi);
			self.omanoti.removeEventListener("mouseover", overomanoti);
			self.fizi.removeEventListener("mouseover", overfizi);
			
			//יציאת עכבר-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.removeEventListener("mouseout", outhadrachati);
			self.misradi.removeEventListener("mouseout", outmisradi);
			self.omanoti.removeEventListener("mouseout", outomanoti);
			self.fizi.removeEventListener("mouseout", outfizi);
			
			//יציאת עכבר-הדרכתי/משרדי/אומנותי/פיזי
			self.hadrachati.removeEventListener("click", clickhadrachati);
			self.misradi.removeEventListener("click", clickmisradi);
			self.omanoti.removeEventListener("click", clickomanoti);
			self.fizi.removeEventListener("click", clickfizi);
			
		
			self.my_yes.removeEventListener("mouseover", overmy_yes);
			self.my_yes.removeEventListener("mouseout", outmy_yes);
			self.my_yes.removeEventListener("click", clickmy_yes);
			self.my_no.removeEventListener("mouseover", overmy_no);
			self.my_no.removeEventListener("mouseout", outmy_no);
			self.my_no.removeEventListener("click", clickmy_no);
			
			self.my_window.hit_logo.removeEventListener("click", hitlogo);
			self.my_window.hit_logo.removeEventListener("mouseover", overlogo);
			self.my_window.hit_logo.removeEventListener("mouseout", outlogo);
		
			self.my_window.hit_link.removeEventListener("click",hitlink);
			self.my_window.hit_link.removeEventListener("mouseover", overlink);
			self.my_window.hit_link.removeEventListener("mouseout", outlink);
			
			self.odot_btn.removeEventListener("click", clickodot);
			self.odot_btn.removeEventListener("mouseover", overodot);
			self.odot_btn.removeEventListener("mouseout", outodot);
		
		
		}
		
		//ביטול אינטראקציית עכבר
		function mouseEnabledFalse(){
			self.my_GD.mouseEnabled=false;
			self.my_TG.mouseEnabled=false;
			self.my_secretary.mouseEnabled=false;
			self.my_banker.mouseEnabled=false;
			self.my_architect.mouseEnabled=false;
			self.my_SW.mouseEnabled=false;
			self.my_Actress.mouseEnabled=false;
			self.my_beautician.mouseEnabled=false;
			self.my_waiter.mouseEnabled=false;
			self.my_Nurse.mouseEnabled=false;
			self.my_teacher.mouseEnabled=false;
			self.my_Lawyer.mouseEnabled=false;
			self.my_BE.mouseEnabled=false;
			self.my_programmer.mouseEnabled=false;
			self.my_Attendant.mouseEnabled=false;
			
			self.hadrachati.mouseEnabled=false;
			self.misradi.mouseEnabled=false;
			self.omanoti.mouseEnabled=false;
			self.fizi.mouseEnabled=false;
			
			self.my_yes.mouseEnabled=false;
			self.my_yes.mouseEnabled=false;
			self.my_yes.mouseEnabled=false;
			self.my_no.mouseEnabled=false;
			self.my_no.mouseEnabled=false;
			self.my_no.mouseEnabled=false;
			
			self.odot_btn.mouseEnabled=false;
			self.my_window.hit_logo.mouseEnabled=false;
			self.my_window.hit_link.mouseEnabled=false;
		}
		
		
		//מקצועות - אפור
		function jobgrey(){
			self.my_GD.gotoAndStop(2);
			self.my_TG.gotoAndStop(2);
			self.my_secretary.gotoAndStop(2);
			self.my_banker.gotoAndStop(2);
			self.my_architect.gotoAndStop(2);
			self.my_SW.gotoAndStop(2);
			self.my_Actress.gotoAndStop(2);
			self.my_beautician.gotoAndStop(2);
			self.my_waiter.gotoAndStop(2);
			self.my_Nurse.gotoAndStop(2);
			self.my_teacher.gotoAndStop(2);
			self.my_Lawyer.gotoAndStop(2);
			self.my_BE.gotoAndStop(2);
			self.my_programmer.gotoAndStop(2);
			self.my_Attendant.gotoAndStop(2);
			}
			
			
			//סינון ידיים-אפור
		function handGREY(){
			self.hadrachati.gotoAndStop(1);
			self.misradi.gotoAndStop(1);
			self.omanoti.gotoAndStop(1);
			self.fizi.gotoAndStop(1);
		}
		
		//חזרה לפריים 0-איפוס
		function frameZero() {
			self.my_GD.gotoAndStop(0);
			self.my_TG.gotoAndStop(0);
			self.my_secretary.gotoAndStop(0);
			self.my_banker.gotoAndStop(0);
			self.my_architect.gotoAndStop(0);
			self.my_SW.gotoAndStop(0);
			self.my_Actress.gotoAndStop(0);
			self.my_beautician.gotoAndStop(0);
			self.my_waiter.gotoAndStop(0);
			self.my_Nurse.gotoAndStop(0);
			self.my_teacher.gotoAndStop(0);
			self.my_Lawyer.gotoAndStop(0);
			self.my_BE.gotoAndStop(0);
			self.my_programmer.gotoAndStop(0);
			self.my_Attendant.gotoAndStop(0);
			self.hadrachati.gotoAndStop(0);
			self.misradi.gotoAndStop(0);
			self.omanoti.gotoAndStop(0);
			self.fizi.gotoAndStop(0);
			
			self.my_no.gotoAndStop(0);
			self.my_yes.gotoAndStop(0);
			
			self.hadrachati.gotoAndStop(0);
			self.misradi.gotoAndStop(0);
			self.omanoti.gotoAndStop(0);
			self.fizi.gotoAndStop(0);
		}
		
		
		//X כפתור 
		self.my_window.my_x.addEventListener("mouseover", overmy_x);
		self.my_window.my_x.addEventListener("mouseout", outmy_x);
		self.my_window.my_x.addEventListener("click", clickmy_x);
		
		function overmy_x() {
			self.my_window.my_x.cursor = "pointer";
			self.my_window.my_x.alpha = 0.5;
		}
		
		function outmy_x() {
			self.my_window.my_x.alpha = 1;
		}
		
		function clickmy_x() {
			self.my_window.visible = false;
			addallListenerOverOut();
			frameZero ();
		}
		
		//פונקציה לתפקידים עם סינון של תואר
		function yesjob () {
			self.my_GD.gotoAndStop(1);
			self.my_TG.gotoAndStop(2);
			self.my_secretary.gotoAndStop(2);
			self.my_banker.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_SW.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			self.my_beautician.gotoAndStop(2);
			self.my_waiter.gotoAndStop(2);
			self.my_Nurse.gotoAndStop(1);
			self.my_teacher.gotoAndStop(1);
			self.my_Lawyer.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_programmer.gotoAndStop(1);
			self.my_Attendant.gotoAndStop(2);
		}
		
		
		//פונקציה לתפקידים עם סינון בלי תואר
		function nojob () {
			self.my_GD.gotoAndStop(2);
			self.my_TG.gotoAndStop(1);
			self.my_secretary.gotoAndStop(1);
			self.my_banker.gotoAndStop(2);
			self.my_architect.gotoAndStop(2);
			self.my_SW.gotoAndStop(2);
			self.my_Actress.gotoAndStop(2);
			self.my_beautician.gotoAndStop(1);
			self.my_waiter.gotoAndStop(1);
			self.my_Nurse.gotoAndStop(2);
			self.my_teacher.gotoAndStop(2);
			self.my_Lawyer.gotoAndStop(2);
			self.my_BE.gotoAndStop(2);
			self.my_programmer.gotoAndStop(2);
			self.my_Attendant.gotoAndStop(1);
		}
		
		
		//כפתור סינון תואר-------------------------------------------
		//כן-מעבר עכבר
		function overmy_yes() {
			self.my_yes.gotoAndStop(1);
			yesjob ();
			}
			
		function outmy_yes() {
			frameZero();
			}
		
		//כן-לחיצה
		function clickmy_yes() {
			if(status!="yes"){
			removeallListener();
			addallListenerClick();
			yesjob ();
			self.my_yes.gotoAndStop(2);
			mouseEnabledFalse();
			self.my_GD.mouseEnabled=true;
			self.my_banker.mouseEnabled=true;
			self.my_architect.mouseEnabled=true;
			self.my_SW.mouseEnabled=true;
			self.my_Actress.mouseEnabled=true;
			self.my_Nurse.mouseEnabled=true;
			self.my_teacher.mouseEnabled=true;
			self.my_Lawyer.mouseEnabled=true;
			self.my_BE.mouseEnabled=true;
			self.my_programmer.mouseEnabled=true;
			self.my_yes.mouseEnabled=true;
			status="yes";
			}
			else {
			yesjob ();
			status = "clear";
			addallListenerOverOut();
				}
		}
		
		//לא-מעבר עכבר
		function overmy_no() {
			self.my_no.gotoAndStop(1);
			nojob ();
			}
			
			function outmy_no() {
			self.my_no.gotoAndStop(0);
			frameZero();
			}
		
		//לא-לחיצה
		function clickmy_no() {
			if(status!="no"){
			removeallListener();
			addallListenerClick();
			nojob ();
			self.my_no.gotoAndStop(2);
			mouseEnabledFalse();
			self.my_TG.mouseEnabled=true;
			self.my_secretary.mouseEnabled=true;
			self.my_beautician.mouseEnabled=true;
			self.my_waiter.mouseEnabled=true;
			self.my_Attendant.mouseEnabled=true;
			self.my_no.mouseEnabled=true;
			status="no";
			} 
			else {
			nojob ();
			status = "clear";
			addallListenerOverOut();
			self.my_no.gotoAndStop(2);
			}
		}
			
			
			
			
		//סינון סוגי משרות----------------------------------------
		//מעבר עכבר הדרכתי
		function overhadrachati (){
			jobgrey();
			self.my_TG.gotoAndStop(1);
			self.my_teacher.gotoAndStop(1);
			
			self.hadrachati.gotoAndStop(2);
			self.misradi.gotoAndStop(1);
			self.omanoti.gotoAndStop(1);
			self.fizi.gotoAndStop(1);
		}
		
		//יציאת עכבר הדרכתי
		function outhadrachati (){
			frameZero ();
		}
		
		//קליק הדרכתי
		function clickhadrachati(){
			if(status!="had"){
			jobgrey();
			removeallListener();
			
			addallListenerClick();
			self.my_TG.gotoAndStop(1);
			self.my_teacher.gotoAndStop(1);
			
			
			mouseEnabledFalse();
			self.my_TG.mouseEnabled=true;
			self.my_teacher.mouseEnabled=true;
			self.hadrachati.mouseEnabled=true;
			status="had";
		} 
		else {
			jobgrey();
			self.my_TG.gotoAndStop(1);
			self.my_teacher.gotoAndStop(1);
			status = "clear";
			addallListenerOverOut();
			self.hadrachati.gotoAndStop(2);
			}
		}
		
		//מעבר עכבר משרדי
		function overmisradi (){
			jobgrey();
			self.my_GD.gotoAndStop(1);
			self.my_secretary.gotoAndStop(1);
			self.my_banker.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_SW.gotoAndStop(1);
			self.my_Lawyer.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_programmer.gotoAndStop(1);
			
			self.hadrachati.gotoAndStop(1);
			self.misradi.gotoAndStop(2);
			self.omanoti.gotoAndStop(1);
			self.fizi.gotoAndStop(1);
		}
		
		//יציאת עכבר משרדי
		function outmisradi (){
			frameZero ();
		}
		
		//קליק משרדי
		function clickmisradi (){
		if(status!="mis"){
			jobgrey();
			removeallListener();
			addallListenerClick();
			self.my_GD.gotoAndStop(1);
			self.my_secretary.gotoAndStop(1);
			self.my_banker.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_SW.gotoAndStop(1);
			self.my_Lawyer.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_programmer.gotoAndStop(1);
			mouseEnabledFalse();
			status="mis";
			
			self.my_GD.mouseEnabled=true;
			self.my_secretary.mouseEnabled=true;
			self.my_banker.mouseEnabled=true;
			self.my_architect.mouseEnabled=true;
			self.my_SW.mouseEnabled=true;
			self.my_Lawyer.mouseEnabled=true;
			self.my_BE.mouseEnabled=true;
			self.my_programmer.mouseEnabled=true;
			self.misradi.mouseEnabled=true;
		} else {
			jobgrey();
			self.my_GD.gotoAndStop(1);
			self.my_secretary.gotoAndStop(1);
			self.my_banker.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_SW.gotoAndStop(1);
			self.my_Lawyer.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_programmer.gotoAndStop(1);
			status = "clear";
			addallListenerOverOut();
			self.misradi.gotoAndStop(2);
			}
		}
		
		//מעבר עכבר אומנותי
		function overomanoti (){
			jobgrey();
			self.my_GD.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			
			self.hadrachati.gotoAndStop(1);
			self.misradi.gotoAndStop(1);
			self.omanoti.gotoAndStop(2);
			self.fizi.gotoAndStop(1);
		}
		
		//יציאת עכבר אומנותי
		function outomanoti (){
			frameZero ();
		}
		
		//קליק אומנותי
		function clickomanoti (){
			if(status!="oman"){
			jobgrey();
			removeallListener();
			
			addallListenerClick();
			self.my_GD.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			status="oman";
			
			
			mouseEnabledFalse();
			self.my_GD.mouseEnabled=true;
			self.my_architect.mouseEnabled=true;
			self.my_Actress.mouseEnabled=true;
			self.omanoti.mouseEnabled=true;
		} else {
			jobgrey();
			self.my_GD.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			status = "clear";
			addallListenerOverOut();
			self.omanoti.gotoAndStop(2);
			
		}
		}
		
		//מעבר עכבר פיזי
		function overfizi (){
			jobgrey();
			self.my_TG.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			self.my_beautician.gotoAndStop(1);
			self.my_waiter.gotoAndStop(1);
			self.my_Nurse.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_Attendant.gotoAndStop(1);
			
			self.hadrachati.gotoAndStop(1);
			self.misradi.gotoAndStop(1);
			self.omanoti.gotoAndStop(1);
			self.fizi.gotoAndStop(2);
		}
		
		//יציאת עכבר פיזי
		function outfizi (){
			frameZero ();
		}
		
		//קליק פיזי
		function clickfizi (){
			if(status!="fiz"){
			jobgrey();
			removeallListener();
			
			addallListenerClick();
			self.my_TG.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			self.my_beautician.gotoAndStop(1);
			self.my_waiter.gotoAndStop(1);
			self.my_Nurse.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_Attendant.gotoAndStop(1);
			status="fiz";
			
			
			mouseEnabledFalse();
			self.my_TG.mouseEnabled=true;
			self.my_architect.mouseEnabled=true;
			self.my_Actress.mouseEnabled=true;
			self.my_beautician.mouseEnabled=true;
			self.my_waiter.mouseEnabled=true;
			self.my_Nurse.mouseEnabled=true;
			self.my_BE.mouseEnabled=true;
			self.my_Attendant.mouseEnabled=true;
			self.fizi.mouseEnabled=true;
		} else {
			jobgrey();
			self.my_TG.gotoAndStop(1);
			self.my_architect.gotoAndStop(1);
			self.my_Actress.gotoAndStop(1);
			self.my_beautician.gotoAndStop(1);
			self.my_waiter.gotoAndStop(1);
			self.my_Nurse.gotoAndStop(1);
			self.my_BE.gotoAndStop(1);
			self.my_Attendant.gotoAndStop(1);
			status = "clear";
			addallListenerOverOut();
			self.fizi.gotoAndStop(2);
			
		}
		}
		
		
		//מקצועות-----------------------------------------------------
		
		//מעצב גרפי
		function clickmy_GD() {
			self.my_window.visible = true;
			mouseEnabledFalse();
			self.my_window.gotoAndStop(0);
			jobgrey();
		}
		
		function overmy_GD() {
			jobgrey();
			self.my_GD.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.omanoti.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		function outmy_GD() {
			frameZero ();
		}
		
		
		//מדריך טיולים
		function outmy_TG() {
			frameZero ();
		}
			
		function clickmy_TG() {
			self.my_window.visible = true;
			mouseEnabledFalse();
			self.my_window.gotoAndStop(1);
			jobgrey();
		}
		
		function overmy_TG() {
			jobgrey();
			self.my_TG.gotoAndStop(1);
			handGREY();
			self.fizi.gotoAndStop(2);
			self.my_no.gotoAndStop(1);
		}
		
		//מזכירה
		function outmy_secretary() {
			frameZero ();
		}
			
		function clickmy_secretary() {
			self.my_window.visible = true;
			mouseEnabledFalse();
			self.my_window.gotoAndStop(2);
			jobgrey();
		}
		
		function overmy_secretary() {
			jobgrey();
			self.my_secretary.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.my_no.gotoAndStop(1);
		}
		
		
		//בנקאי
		function outmy_banker() {
			frameZero ();
		}
			
		function clickmy_banker() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(3);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_banker() {
			jobgrey();
			self.my_banker.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		//אדריכל
		function outmy_architect() {
			frameZero ();
		}
			
		function clickmy_architect() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(4);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_architect() {
			jobgrey();
			self.my_architect.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.omanoti.gotoAndStop(2);
			self.fizi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//עובד סוציאלי
		function outmy_SW() {
			frameZero ();
		}
			
		function clickmy_SW() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(5);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_SW() {
			jobgrey();
			self.my_SW.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//שחקן
		function outmy_Actress() {
			frameZero ();
		}
			
		function clickmy_Actress() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(6);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_Actress() {
			jobgrey();
			self.my_Actress.gotoAndStop(1);
			handGREY();
			self.omanoti.gotoAndStop(2);
			self.fizi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//קוסמטיקאית
		function outmy_beautician() {
			frameZero ();
		}
			
		function clickmy_beautician() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(7);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_beautician() {
			jobgrey();
			self.my_beautician.gotoAndStop(1);
			handGREY();
			self.fizi.gotoAndStop(2);
			self.my_no.gotoAndStop(1);
		}
		
		
		//מלצר
		function outmy_waiter() {
			frameZero ();
		}
			
		function clickmy_waiter() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(8);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_waiter() {
			jobgrey();
			self.my_waiter.gotoAndStop(1);
			handGREY();
			self.fizi.gotoAndStop(2);
			self.my_no.gotoAndStop(1);
		}
		
		
		//אחות
		function outmy_Nurse() {
			frameZero ();
		}
			
		function clickmy_Nurse() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(9);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_Nurse() {
			jobgrey();
			self.my_Nurse.gotoAndStop(1);
			handGREY();
			self.fizi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//מורה
		function outmy_teacher() {
			frameZero ();
		}
			
		function clickmy_teacher() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(10);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_teacher() {
			jobgrey();
			self.my_teacher.gotoAndStop(1);
			handGREY();
			self.hadrachati.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//עורך דין
		function outmy_Lawyer() {
			frameZero ();
		}
			
		function clickmy_Lawyer() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(11);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_Lawyer() {
			jobgrey();
			self.my_Lawyer.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		
		//מהנדס בניין
		function outmy_BE() {
			frameZero ();
		}
			
		function clickmy_BE() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(12);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_BE() {
			jobgrey();
			self.my_BE.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.fizi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		
		//מתכנת
		function outmy_programmer() {
			frameZero ();
		}
			
		function clickmy_programmer() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(13);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_programmer() {
			jobgrey();
			self.my_programmer.gotoAndStop(1);
			handGREY();
			self.misradi.gotoAndStop(2);
			self.my_yes.gotoAndStop(1);
		}
		
		
		//דייל
		function outmy_Attendant() {
			frameZero ();
		}
			
		function clickmy_Attendant() {
			self.my_window.visible = true;
			self.my_window.gotoAndStop(14);
			mouseEnabledFalse();
			jobgrey();
		}
		
		function overmy_Attendant() {
			jobgrey();
			self.my_Attendant.gotoAndStop(1);
			handGREY();
			self.fizi.gotoAndStop(2);
			self.my_no.gotoAndStop(1);
		}
		
		
		//אודות--------------------------------------------------------------------
		function clickodot(){
			self.my_window.visible = true;
			self.my_window.gotoAndStop(15);
			mouseEnabledFalse();
			self.my_window.hit_logo.mouseEnabled=true;
			self.my_window.hit_link.mouseEnabled=true;
			jobgrey();
			}
		
		function overodot(){
			self.odot_btn.alpha = 0.5;
			//self.odot_btn.cursor = "pointer";
		}
		
		function outodot(){
			frameZero ();
			self.odot_btn.alpha = 1;
		}
		
		//קישור לHIT
		function hitlogo(){
		    window.open("https://www.hit.ac.il");
		}
			
		function overlogo(){
			self.my_window.hit_logo.alpha = 0.5;
			//self.my_window.hit_logo.cursor = "pointer";
		}
			
		function outlogo(){
			self.my_window.hit_logo.alpha = 1;
		}
			
			
		function hitlink(){
		    window.open("https://www.hit.ac.il/telem/overview");
		}
			
		function overlink(){
			self.my_window.hit_link.alpha = 0.5;
			//self.my_window.hit_link.cursor = "pointer";
		}
		
		function outlink(){
			self.my_window.hit_link.alpha = 1;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// windows
	this.my_window = new lib.window();
	this.my_window.name = "my_window";
	this.my_window.setTransform(630.85,370.8,1,1,0,0,0,317.7,292.2);

	this.timeline.addTween(cjs.Tween.get(this.my_window).wait(1));

	// odot
	this.odot_btn = new lib.odot();
	this.odot_btn.name = "odot_btn";
	this.odot_btn.setTransform(84.2,56.6,1,1,0,0,0,56.4,22.7);

	this.timeline.addTween(cjs.Tween.get(this.odot_btn).wait(1));

	// main
	this.instance = new lib.horaot();
	this.instance.setTransform(1012.1,129.65,1,1,0,0,0,218.4,33.5);

	this.text = new cjs.Text("?איזה עובד את/ה", "bold 58px 'Calibri'");
	this.text.textAlign = "center";
	this.text.lineHeight = 73;
	this.text.lineWidth = 377;
	this.text.parent = this;
	this.text.setTransform(1044.95,29.45);

	this.omanoti = new lib.hand_o();
	this.omanoti.name = "omanoti";
	this.omanoti.setTransform(1179.1,506.1,1,1,0,0,0,92.2,64.3);

	this.misradi = new lib.hand_m();
	this.misradi.name = "misradi";
	this.misradi.setTransform(1179.1,387.35,1,1,0,0,0,92.2,64.3);

	this.hadrachati = new lib.hand_h();
	this.hadrachati.name = "hadrachati";
	this.hadrachati.setTransform(1179.1,271.9,1,1,0,0,0,92.2,64.3);

	this.text_1 = new cjs.Text("?סנן: האם המשרה שאתה מחפש דורשת תואר אקדמי ", "25px 'Calibri'");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 33;
	this.text_1.lineWidth = 512;
	this.text_1.parent = this;
	this.text_1.setTransform(468.4,58);

	this.my_yes = new lib.yes();
	this.my_yes.name = "my_yes";
	this.my_yes.setTransform(539.35,137.35,1,1,0,0,0,35.2,35.2);

	this.my_no = new lib.no();
	this.my_no.name = "my_no";
	this.my_no.setTransform(413,137.35,1,1,0,0,0,35.2,35.2);

	this.fizi = new lib.hand_f();
	this.fizi.name = "fizi";
	this.fizi.setTransform(1179.1,621.95,1,1,0,0,0,92.2,64.3);

	this.my_teacher = new lib.teacher();
	this.my_teacher.name = "my_teacher";
	this.my_teacher.setTransform(40.2,559.4,0.9705,0.9705);

	this.my_Lawyer = new lib.Lawyer();
	this.my_Lawyer.name = "my_Lawyer";
	this.my_Lawyer.setTransform(313.25,625.15,0.9705,0.9705,0,0,0,57.9,69.3);

	this.my_BE = new lib.Building_Engineer();
	this.my_BE.name = "my_BE";
	this.my_BE.setTransform(459.1,557.9,0.9705,0.9705);

	this.my_programmer = new lib.programmer();
	this.my_programmer.name = "my_programmer";
	this.my_programmer.setTransform(707.05,601.95,0.9705,0.9705,0,0,0,45.6,45.4);

	this.my_Attendant = new lib.Attendant();
	this.my_Attendant.name = "my_Attendant";
	this.my_Attendant.setTransform(914.55,607.85,0.9705,0.9705,0,0,0,40.4,51.7);

	this.my_SW = new lib.Social_Worker();
	this.my_SW.name = "my_SW";
	this.my_SW.setTransform(47.95,382.85,0.9705,0.9705);

	this.my_Actress = new lib.Actress();
	this.my_Actress.name = "my_Actress";
	this.my_Actress.setTransform(259.15,383.2,0.9705,0.9705);

	this.my_beautician = new lib.beautician();
	this.my_beautician.name = "my_beautician";
	this.my_beautician.setTransform(454.4,383.5,0.9705,0.9705);

	this.my_waiter = new lib.waiter();
	this.my_waiter.name = "my_waiter";
	this.my_waiter.setTransform(663.5,382.55,0.9705,0.9705);

	this.my_Nurse = new lib.Nurse();
	this.my_Nurse.name = "my_Nurse";
	this.my_Nurse.setTransform(877.4,382.9,0.9705,0.9705);

	this.my_GD = new lib.Graphic_Designer();
	this.my_GD.name = "my_GD";
	this.my_GD.setTransform(41,209.2,0.9705,0.9705);

	this.my_TG = new lib.Travel_Guide();
	this.my_TG.name = "my_TG";
	this.my_TG.setTransform(252.9,207.6,0.9705,0.9705);

	this.my_secretary = new lib.secretary();
	this.my_secretary.name = "my_secretary";
	this.my_secretary.setTransform(459.75,211.25,0.9705,0.9705);

	this.my_banker = new lib.banker();
	this.my_banker.name = "my_banker";
	this.my_banker.setTransform(663.15,209.95,0.9705,0.9705);

	this.my_architect = new lib.architect();
	this.my_architect.name = "my_architect";
	this.my_architect.setTransform(868.65,210.25,0.9705,0.9705);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.my_architect},{t:this.my_banker},{t:this.my_secretary},{t:this.my_TG},{t:this.my_GD},{t:this.my_Nurse},{t:this.my_waiter},{t:this.my_beautician},{t:this.my_Actress},{t:this.my_SW},{t:this.my_Attendant},{t:this.my_programmer},{t:this.my_BE},{t:this.my_Lawyer},{t:this.my_teacher},{t:this.fizi},{t:this.my_no},{t:this.my_yes},{t:this.text_1},{t:this.hadrachati},{t:this.misradi},{t:this.omanoti},{t:this.text},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(652.1,387.5,619.3000000000001,304.79999999999995);
// library properties:
lib.properties = {
	id: '4E2A3C12B898784888062B27958CF3DA',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/final_project_ofriLinoyNoaLiel_atlas_1.png?1624740422959", id:"final_project_ofriLinoyNoaLiel_atlas_1"},
		{src:"images/final_project_ofriLinoyNoaLiel_atlas_2.png?1624740422959", id:"final_project_ofriLinoyNoaLiel_atlas_2"},
		{src:"images/final_project_ofriLinoyNoaLiel_atlas_3.png?1624740422963", id:"final_project_ofriLinoyNoaLiel_atlas_3"},
		{src:"images/final_project_ofriLinoyNoaLiel_atlas_4.png?1624740422964", id:"final_project_ofriLinoyNoaLiel_atlas_4"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['4E2A3C12B898784888062B27958CF3DA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;