// import { AbilityTemplate } from '.../systems/dnd5e/module/canvas/ability-template.mjs';

// 	//trying to redefine parts of AbilityTemplate
// export class MobileAbilityTemplate extends AbilityTemplate {

// 	#moveTime = 0;

// 	#initialLayer;

// 	#events;
	
// 	/**
// 	 * Activate listeners for the template preview, including touch events.
// 	 * @param {CanvasLayer} initialLayer  The initially active CanvasLayer to re-activate after the workflow is complete
// 	 * @returns {Promise}                 A promise that resolves with the final measured template if created.
// 	 */
// 	activatePreviewListeners(initialLayer) {
// 		return new Promise((resolve, reject) => {
// 		this.#initialLayer = initialLayer;
// 		this.#events = {
// 			cancel: this._onCancelPlacement.bind(this),
// 			confirm: this._onConfirmPlacement.bind(this),
// 			move: this._onMovePlacement.bind(this),
// 			resolve,
// 			reject,
// 			rotate: this._onRotatePlacement.bind(this)
// 		};
	
// 		// Activate listeners for mouse events
// 		canvas.stage.on("mousemove", this.#events.move);
// 		canvas.stage.on("mousedown", this.#events.confirm);
// 		canvas.app.view.oncontextmenu = this.#events.cancel;
// 		canvas.app.view.onwheel = this.#events.rotate;
	
// 		// Activate listeners for touch events
// 		canvas.stage.on("touchmove", this.#events.move);
// 		canvas.stage.on("touchend", this.#events.confirm);
// 		});
// 	}
	
// 	/* -------------------------------------------- */
	
// 	/**
// 	 * Move the template preview when the mouse or touch moves.
// 	 * @param {Event} event  Triggering event.
// 	 */
// 	_onMovePlacement(event) {
// 		event.stopPropagation();
// 		const now = Date.now(); // Apply a 20ms throttle
// 		if ( now - this.#moveTime <= 20 ) return;
	
// 		// Determine position based on event type
// 		let center;
// 		if (event.data) { // Mouse event
// 		center = event.data.getLocalPosition(this.layer);
// 		} else if (event.touches && event.touches.length === 1) { // Touch event
// 		center = event.touches[0];
// 		}
	
// 		const interval = canvas.grid.type === CONST.GRID_TYPES.GRIDLESS ? 0 : 2;
// 		const snapped = canvas.grid.getSnappedPosition(center.x, center.y, interval);
// 		this.document.updateSource({x: snapped.x, y: snapped.y});
// 		this.refresh();
// 		this.#moveTime = now;
// 	}
	
// 	/* -------------------------------------------- */
	
// 	// Existing code...
	
// 	/* -------------------------------------------- */
	
// 	}

Hooks.once('init', function () {

	game.settings.register('simplemobile', 'lasttoken', {
		name: 'Last Token',
		hint: 'This is the value where the last selected token will be saved',
		scope: 'client',
		config: false,
		default: "0",
		type: String,
	});
	game.settings.register('simplemobile', 'movementdirection', {
		name: 'Movement Swich',
		hint: 'This is the value the movement values is saved',
		scope: 'client',
		config: false,
		default: "",
		type: String,
	});
	game.settings.register('simplemobile', 'cps', {
		name: 'Camera Pan Speed',
		hint: 'How many pixels the camera pans when tapping on the screen',
		scope: 'world',
		config: true,
		default: "25",
		type: String,
	});
	game.settings.register('simplemobile', 'autorotation', {
		name: 'Auto Rotate',
		hint: 'Automatically Rotate tokens based on where they are going',
		scope: 'world',
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register('simplemobile', 'invertrotation', {
		name: 'Invert Rotation',
		hint: 'Inverts the rotation of the token',
		scope: 'client',
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register('simplemobile', 'performanceop', {
		name: 'Performance Optimization',
		hint: 'Limits the functionality of simple mobile to optimize it for slower devices, also disabled the canvas (where scenes are rendered on)',
		scope: 'client',
		config: true,
		default: false,
		type: Boolean,
	});
	game.settings.register('simplemobile', 'loadlocalstyles', {
		name: 'Load Local files instead',
		hint: 'Loads local style files instead of getting them from github',
		scope: 'world',
		config: true,
		default: false,
		type: Boolean,
	});
});
Hooks.on('preRenderActorSheet5eCharacter', () => {
	const container = document.querySelector('. container')
	container.scrollTop
	container.scrollLeft
})
Hooks.on('renderPlayerList', () => {
	if (screen.availWidth < 1024) {
		game.user.setFlag("world", "simpleMobile", true);
		console.log("Mobile Mode");
	}
	else {
		game.user.setFlag("world", "simpleMobile", false);
		console.log("Desktop Mode");
	}
	for (let i = 0; i < game.users.entries.length; i++) {
		if (game.users.entries[i].data.flags.world != undefined) {
			if (game.users.entries[i].data.flags.world.simpleMobile) {
				for (let p = 0; p < document.getElementsByClassName('player-name').length; p++) {
					if (document.getElementsByClassName('player-name')[p].innerHTML.includes(game.users.entries[i].name)) {
						document.getElementsByClassName('player-name')[p].innerHTML += '<i class="fas fa-mobile-alt"></i>';
					}
				}
			}
		}
	}

})
Hooks.on('canvasInit', () => {
	if (game.settings.get('simplemobile', 'performanceop') & window.screen.width < 1080) {
		var node = document.getElementById("board");
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
		console.log("performance optimised");
		let mi = document.querySelector("#mobile-container");
	}
	if (screen.availWidth < 1024) {
		game.user.setFlag("world", "simpleMobile", true);
		//add fullscreen button to sidebar on load if mobile
		let sidebarNav = document.getElementById("sidebar-tabs");
		let fullscreenItem = document.createElement("a");
		let fullscreenIcon = document.createElement("i");
		let docElem = document.documentElement;
		fullscreenItem.classList.add("item");
		fullscreenItem.onclick = function () {
			if (document.fullscreenElement) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) { /* Safari */
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) { /* IE11 */
					document.msExitFullscreen();
				}
			} else {
				if (docElem.requestFullscreen) {
					docElem.requestFullscreen();
				} else if (docElem.webkitRequestFullscreen) { /* Safari */
					docElem.webkitRequestFullscreen();
				} else if (docElem.msRequestFullscreen) { /* IE11 */
					docElem.msRequestFullscreen();
				}
			}
		}
		fullscreenIcon.classList.add("fas", "fa-expand");
		fullscreenItem.prepend(fullscreenIcon);
		sidebarNav.appendChild(fullscreenItem);
		//if exists add manual roll button to sidebar on load if mobile
		let manualRoll = document.querySelectorAll("[data-tool='manualRoll']")[0];
		if (manualRoll) {
			function changeTag(node, tag) {
				const clone = createElement(tag)
				for (const attr of node.attributes) {
					clone.setAttributeNS(null, attr.name, attr.value)
				}
				while (node.firstChild) {
					clone.appendChild(node.firstChild)
				}
				node.replaceWith(clone)
				return clone
			}

			function createElement(tag) {
				if (tag === 'svg') {
					return document.createElementNS('http://www.w3.org/2000/svg', 'svg')
				} else {
					return document.createElementNS('http://www.w3.org/1999/xhtml', tag)
				}
			}
			manualRoll = changeTag(manualRoll, 'a');
			manualRoll.classList.add('item');
			manualRoll.onclick = function () {
				manualRoll.classList.toggle('active');
				let toggled = game.settings.get('df-manual-rolls', 'toggled');
				if (!toggled) {
					game.settings.set('df-manual-rolls', 'toggled', true);
				} else {
					game.settings.set('df-manual-rolls', 'toggled', false);
				}
			}
			sidebarNav.appendChild(manualRoll);
		}
		console.log("Mobile Mode");
	}
	else {
		game.user.setFlag("world", "simpleMobile", false);
		console.log("Desktop Mode");
	}
});

Hooks.on('canvasReady', function () {
	//Collapse Sidebar on load
	if (screen.availWidth < 1024) {
		if (document.getElementById('sidebar').className == "app") {
			ui.sidebar.collapse();
		}
		//Collapse MacroBar on load
		if (document.getElementById('action-bar').className == "flexrow ") {
			ui.hotbar.collapse();
		}
	}

});
Hooks.on('canvasReady', function () {
	function opencontrols() {
		Controls = new Controls();
		Controls.openDialog();
	}
	opencontrols();
	let charname = game.user.charname
	console.log("[Simple Mobile] Initialized");

	var src = document.getElementById("board");
	var clientX, clientY;

	src.addEventListener('touchstart', function (e) {
		//console.log("TouchStart");
		//toggling argon on mobile if it's already up
		if(ui.ARGON._state > 0){
			ui.ARGON.toggle();
		}
		if(ui.controls.activeControl === 'token'){
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
			console.log("touchstart token");
		} else if (ui.controls.activeControl === 'measure'){
			//make sure measure select tool is active
			document.querySelector(".control-tool[data-tool='select']").click();
			// Prevent default touch event behavior
			e.preventDefault();

			// Emulate mouse hover
			var hoverEvent = new MouseEvent('mouseover', {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			});

			// Dispatch the mouse hover event
			src.dispatchEvent(hoverEvent);
			console.log("touchstart measure");
		} else {
			//switch back to token controls
			document.querySelector(".scene-control").click();
		}
		//console.log("TouchStart at: "+"X:"+ clientX + " Y:" + clientY);
	}, false);

	src.addEventListener('touchmove', function (e) {
		if(ui.controls.activeControl === 'token'){
			var deltaX, deltaY;
			deltaX = (e.changedTouches[0].clientX - clientX) * 0.1;
			deltaY = (e.changedTouches[0].clientY - clientY) * 0.1;
			if (deltaX < 0.05 && deltaX > -0.05) return;
			if (deltaY < 0.05 && deltaY > -0.05) return;
			console.log("TouchMove token");
			canvas.animatePan({ duration: 0, x: canvas.scene._viewPosition.x - deltaX, y: canvas.scene._viewPosition.y - deltaY })
			//console.log("X:"+ canvas.scene._viewPosition.x + " Y:" + canvas.scene._viewPosition.y);
		} else if (ui.controls.activeControl === 'measure'){
			// Prevent default touch event behavior
			e.preventDefault();

			// Emulate mousemove event
			var mouseMoveEvent = new MouseEvent('mousemove', {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			});

			// Dispatch the mousemove event
			src.dispatchEvent(mouseMoveEvent);
			console.log("TouchMove measure");
		}
	}, false);

	src.addEventListener('touchend', function(e) {
		if (ui.controls.activeControl === 'measure'){
			// Prevent default touch event behavior
			e.preventDefault();
			
			// Emulate mouse click
			var mouseEvent = new MouseEvent('mousedown', {
				clientX: clientX,
				clientY: clientY
			});
		
			// Dispatch the mouse click event
			src.dispatchEvent(mouseEvent);

			//switch back to token controls
			document.querySelector(".scene-control").click();
			console.log("touchEnd");
		}
	}, false);

	/*src.addEventListener('touchend', function(e) {
		var deltaX, deltaY;
		deltaX = (e.changedTouches[0].clientX - clientX) * 0.2;
		deltaY = (e.changedTouches[0].clientY - clientY) * 0.2;
		console.log("TouchMove at: "+"X:"+ deltaX + " Y:" + deltaY);
		canvas.animatePan({duration: 100, x: canvas.scene._viewPosition.x - deltaX, y: canvas.scene._viewPosition.y - deltaY})
		//console.log("X:"+ canvas.scene._viewPosition.x + " Y:" + canvas.scene._viewPosition.y);
	}, false);*/

	// canvas.tokens.ownedTokens.length

	// //SELECT CHARACTER
	// if(canvas.tokens.ownedTokens.length > 0)
	// {
	// 	canvas.tokens.ownedTokens.map(token => token.control({releaseOthers: false}));
	// 	let tokens = canvas.tokens.controlled;
	// 	let lasttoken = parseInt(game.settings.get('simplemobile', 'lasttoken'));
	// 	if(tokens.length === 1){
	// 	lasttoken = 0;
	// 	}
	// 	else if( tokens.length -1 <= lasttoken){
	// 	lasttoken = 0;
	// 	}
	// 	else{
	// 	lasttoken += 1;
	// 	}
	// 	game.settings.set('simplemobile', 'lasttoken', lasttoken);
	// 	//console.log(lasttoken);
	// 	let x = tokens[lasttoken].x;
	// 	let y = tokens[lasttoken].y;
	// 	document.getElementById("sidebar");
	// 	let twidth = tokens[lasttoken].w / 2;
	// 	let theight = tokens[lasttoken].h / 2;
	// 	let view = canvas.scene._viewPosition;
	// 	canvas.animatePan({duration: 250, x: x+twidth, y: y+theight, scale: view.scale});
	// }

	//var sheet = document.createElement('style')
	//sheet.innerHTML = "div {border: 20px solid red; background-color: blue;}";
	//document.body.appendChild(sheet);
	if (game.settings.get('simplemobile', 'loadlocalstyles')) {
		console.log("[Simple Mobile] loading local files...");
		if (!document.getElementById(cssId)) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.id = cssId;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = '/modules/simplemobile/styles/' + game.system.id + '.css';
			link.media = 'all';
			head.appendChild(link);
		}
	}
	else {
		var cssId = 'myCss';  // you could encode the css path itself to generate id..
		console.log("[Simple Mobile] Loading Specific style for the " + game.system.id + " system...");
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://raw.githubusercontent.com/Handyfon/simplemobile/master/styles/" + game.system.id + ".css", true);
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200) {
					var link = document.createElement('style');
					link.innerHTML = xhttp.responseText;
					document.getElementsByTagName('head')[0].appendChild(link);
				}
			}
			if (xhttp.status === 404) {
				console.log("[Simple Mobile] The " + game.system.id + " system is not yet supported...");
			}
		}
		xhttp.send(null);
	}

	//trying to get the screen to staw awake. This would only work on chrome
	// let wakeLock = null;
	// wakeLock = navigator.wakeLock.request('screen');
});

//changing controls to token control whenever it changes on mobile
// Hooks.on('getSceneControlButtons', function () {
// 	//if on mobile allways switch to token control (the first scene-control)
// 	if (window.innerWidth < 600) {
// 		document.querySelector(".scene-control").click()
//     }
// });

export class Controls extends Application {
	openDialog() {
		let $dialog = $('.Controls-window');
		if ($dialog.length > 0) {
			$dialog.remove();
			return;
		}
		const templateData = { data: [] };
		templateData.title = "Controls";
		templateData.user = game.userId;
		templateData.charname = game.user.charname;
		const templatePath = "/modules/simplemobile/mobile-controls.html";;
		console.log(templateData);
		this.appId = "mobile-controls";
		Controls.renderMenu(templatePath, templateData);
	}
	static renderMenu(path, data) {
		const dialogOptions = {
			width: 300,
			top: event.clientY - 80,
			left: window.innerWidth - 510,
			classes: ['Controls-window'],
			id: 'mobile-controls'
		};
		renderTemplate(path, data).then(dlg => {
			new Dialog({
				content: dlg,
				buttons: {}
			}, dialogOptions).render(true);
		});
	}

}
