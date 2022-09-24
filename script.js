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

createImgContainer = (element, parameterString) => {
	const imgContainer = document.createElement("div");
	imgContainer.classList.add("img-container");
	imgContainer.style.top = getRelativePosition(element).top + "px";
	imgContainer.style.left = getRelativePosition(element).left + "px";
	imgContainer.style.backgroundColor = palette[element.getAttribute("branche")];
	setTimeout(() => {
		imgContainer.style.left = "50%";
		imgContainer.style.top = "50%";
	}, 100);

	imgContainer.innerHTML = `
	<div class="img-box">
		<img class="img-small" src="./images-small/${element.getAttribute("branche") + element.getAttribute("gen2")}.png">
		<div class="img-info img-title">
		${element.getAttribute("branche") + element.getAttribute("gen2")}
		</div>
		<div class="img-info voir">VOIR EN<br>PLEINE RESOLUTION</div>
	</div>

	<div class="img-info parameter-box">
		<p class="img-info parameter">
				${parameterString}
		</p>
	</div>
	<button class="copy-btn">COPIER LES PARAMETRES</button>
	`;


	container.appendChild(imgContainer);
};


document.querySelectorAll(".noeud").forEach((noeud) => {
	noeud.addEventListener("click", () => {
		closeDivs("img-container");

		fetch(`./parameters/${noeud.getAttribute("branche") + noeud.getAttribute("gen2")}.txt`)
			.then(response => response.text())
			.then(text => {
				createImgContainer(noeud, text);

				document.querySelector(".copy-btn").addEventListener("click", (copyBtn) => {
					copyToClipboard(text);
					copyBtn.target.innerHTML = 'COPIÉS';
				});

				document.querySelector(".img-box").addEventListener("click", () => {
					createLargeImg(noeud.getAttribute("branche") + noeud.getAttribute("gen2"));
				});
			});
	});
});

createLargeImg = ((imgId) => {
	closeDivs("img-large-container");

	const imgLargeContainer = document.createElement("div");
	imgLargeContainer.classList.add("img-large-container");

	imgLargeContainer.innerHTML = `
	<img class="img-large" src="./images-large/${imgId}.png">
	`;

	document.body.appendChild(imgLargeContainer);
	imgLargeContainer.addEventListener("click", () => closeDivs("img-large-container"));
});

// document.body.addEventListener("click", () => closeDivs("img-large-container"));

closeDivs = (divClassName) => {
	document.querySelectorAll("." + divClassName).forEach(e => e.remove());
};


//COPY TO CLIPBOARD GENERAL FUNCTION
copyToClipboard = (string) => {
	navigator.clipboard.writeText(string);
	console.log("string copied to clipboard");
};