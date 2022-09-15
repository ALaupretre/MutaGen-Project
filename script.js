const container = document.getElementById("container");

const palette = ["#F5F2EC", "#1E0CBF", "#1E1F20", "#246743", "#62090E", "#DAADC0", "#E2C50A"];

createBranche = () => {
	let noeudId = {
		branche: i + 1,
		gen2: 0
	};

	const branche = document.createElement("div");
	branche.classList.add("branche");

	const gen2Container = document.createElement("div");
	gen2Container.classList.add("gen2-container");

	const bras = document.createElement("div");
	bras.classList.add("bras", "gen1");

	const tige = document.createElement("div");
	tige.classList.add("tige");

	bras.appendChild(tige);
	createNoeud(noeudId, bras);
	branche.appendChild(bras);
	branche.appendChild(gen2Container);

	container.appendChild(branche);

	for (j = 0; j < 6; j++) {
		let noeudId = {
			branche: i + 1,
			gen2: j + 1
		};

		const bras = document.createElement("div");
		bras.classList.add("bras", "gen2");

		const tige = document.createElement("div");
		tige.classList.add("tige");
		bras.style.transform = `rotate(${(j + 1) * (360 / 7) - 180}deg)`;

		bras.appendChild(tige);
		createNoeud(noeudId, bras);
		gen2Container.appendChild(bras);
		container.appendChild(branche);
	}

	branche.style.transform = `rotate(${i * 60}deg)`;
};

createNoeud = (noeudId, bras) => {
	const noeud = document.createElement("div");
	noeud.classList.add("noeud");
	noeud.style.backgroundColor = palette[i + 1];
	noeud.setAttribute("branche", noeudId.branche);
	noeud.setAttribute("gen2", noeudId.gen2);
	bras.appendChild(noeud);
};


for (i = 0; i < 6; i++) {
	createBranche();
}



getRelativePosition = (element) => {
	const relativeRect = container.getBoundingClientRect();
	const elemRect = element.getBoundingClientRect();

	const top = elemRect.top - relativeRect.top;
	const left = elemRect.left - relativeRect.left;

	return { top, left };
};

createImgContainer = (element) => {
	const imgContainer = document.createElement("div");
	imgContainer.classList.add("img-container");
	imgContainer.style.top = getRelativePosition(element).top + "px";
	imgContainer.style.left = getRelativePosition(element).left + "px";
	imgContainer.style.backgroundColor = palette[element.getAttribute("branche")];

	imgContainer.innerHTML = `
	<img class="img-small" src="./images/n0.png">
	
	<p>
		${element.getAttribute("branche") + element.getAttribute("gen2")}
		g.....50...Q6...w....2A...Ejj.FVDkY7.1C0HyLcTE3Ec0i1.u02hzvg0IbX.Crzz6i4CO1quTzD
		.................................A7mvCQuKz1........Y./..................y.2...wD
		...Uz6....EG..../Q.1/......X/...d/....E3.....MR0olKVQOqD/Q........Es0dkpXm1.OaNa
		z.....cD12../2E...uCCe8qzyzzjdmEpTyjyzz5A9zsSzf...KQgtXqz0U0.....y1...sD...../..
		.zXaNadD4jQ5bTBfWxHwbnU7pKqtyi19OkrqyZpDgldjWyt52xHCI7UQMEBNz.nRRac3WnojWE9miIIP
		Lx91JykfWaNIzY2E0L13t2qDU.....Yp0...s0........sD.6....sD..G.....................
		.............oAnAt1...sD....zw1.........................................A....k1.
		.....4iSoz1.......kz.wzzz1.U..6......Y6...EB....m....U1....F....6/...I1.....S/52
		...U.yzzzzzzzzzzzzzzzzzzz1663Qozzzzz..kYEkti4xyD6A72QifFjz1..........2.28.kFrA0.
		.Ub96aAIVz9.1se7Umvxz0........../EU0.wzzz1...........s/...................E.2c..
		zzzz.............0...................2./8.kzzzD............8....................
		/EU0.wzzz1....................................6U.0kzzzjv5W/U.06.zzzziHQ7.06U.wzz
		zvi5l.6U.0kzzzjvIx1U.06.zzzzi1eG.06U.wzzzvCgD/6U.0kzzzjvBF3U.06.zzzziLNK.06U.wzz
		zvyZa/6U.0kzzzjv..EsUa3feeWCNqGQIJ36wk8EwyLsUa3f................................
		E....I.//3E.....I....E....UFVJ4OmFLNi/.QgJ4S/tqNgJqQ............................
		...................wz.........yDJJJJJJJJJz9.....................OaNaNaNaty1.....
		...wz...........................................................................
		...........................3....0....wZEEx4PtVKNY7rPiFpPH/5OZ7LN................
		............................../E........E.2.....................................
		................................................................................
		.....................................E/....1....BJaPbJaQ9xqMc/..................
		................4MU/4MU/........J7ISELV41.YNaNaNaN4xzslIg/JCZrzD........6.2.....
		...................UUhLD7z9...wBlxepz0.............................sz.........yj
		..........................................E.....I....M....kLcx4QVlqPiR4.........
		..........................................UhbG7ApIRszMCz06J6ANxjOzlwgTmdezXlBi0K
		7Ocmz.PUeDBNnprDeqCHbj0/Rz1.....................................................
		.....................................................E.....3....A....2IPVdLOiRaE
		jVbA.soPNd3......................Q..4MU/....BAk......w7CnBxIEW.EYNaNaNaNKz1.....
		...wz...........xDrGe2231z9...k6adupzep.Dm33aOwDwur36Vwn2z1...................zD
		...........s4KkUjvANz0..........................................
	</p>
	`;

	imgContainer.addEventListener("click", () => closeImgContainer());
	container.appendChild(imgContainer);
};

document.querySelectorAll(".noeud").forEach((noeud) => {
	noeud.addEventListener("click", () => {
		console.log(noeud.getAttribute("branche"), noeud.getAttribute("gen2"));
		closeImgContainer();
		createImgContainer(noeud);
	});
});

closeImgContainer = () => {
	document.querySelectorAll(".img-container").forEach(e => e.remove());
};



// brasContainer.style.transform = `rotate(${(i + 1) * (360 / 7)}deg)`;