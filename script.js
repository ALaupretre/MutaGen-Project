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
	${element.getAttribute("branche") + element.getAttribute("gen2")}`;
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