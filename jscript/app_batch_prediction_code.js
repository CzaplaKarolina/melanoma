


function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
}


// LOAD THE MODEL

let model;
(async function () {
	
    model = await tf.loadModel('https://czaplakarolina.github.io/melanoma/final_model_kaggle_version1/model.json');
     $("#selected-image").attr("src", "https://czaplakarolina.github.io/melanoma/assets/samplepic.jpg")
	
	// Hide the model loading spinner
	// This line of html gets hidden:
	// <div class="progress-bar">Ai is Loading...</div>
	$('.progress-bar').hide();
	
	
	// Simulate a click on the predict button.
	// Make a prediction on the default front page image.
	predictOnLoad();
	
	
	
})();


$("#image-selector").change(async function () {
	
	// the FileReader reads one image at a time
	fileList = $("#image-selector").prop('files');
	
	//$("#prediction-list").empty();
	
	// Start predicting
	// This function is in the app_batch_prediction_code.js file.
	model_processArray(fileList);
	
});



// the model images have size 96x96

async function model_makePrediction(fname) {
	
	//console.log('met_cancer');
	
	// clear the previous variable from memory.
	let image = undefined;
	
	image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.fromPixels(image)
	.resizeNearestNeighbor([224,224])
	.toFloat();
	
	
	let offset = tf.scalar(127.5);
	
	tensor = tensor.sub(offset)
	.div(offset)
	.expandDims();

	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] 
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 3);
		
	const now = new Date(); // Aktualna data i czas
	const formattedDate = now.toLocaleString(); // Sformatowana data i czas

	$("#prediction-list").append(`<li class="w3-text-purple fname-font" style="list-style-type:none;">Plik poddany analizie:  
	${fname}</li>`);
	$("#prediction-list_history").append(`<li class="w3-text-purple fname-font" style="list-style-type:none;">Plik poddany analizie:  
	${fname}. <br> Data i godzina wczytania pliku: ${formattedDate}</li>`);
	top5.forEach(function (p, index) {
		let link = '';
		switch (p.className) {
			case 'akiec, Rogowacenie słoneczne (Actinic Keratoses/Solar Keratoses) lub Nabłoniak (intraepithelial Carcinoma - Bowen’s disease)':
				link = 'aciec.html';
				break;
			case 'bcc, Nabłoniak podstawnokomórkowy (Basal Cell Carcinoma)':
				link = 'bcc.html';
				break;
			case 'bkl, Łagodne rogowacenie(Benign Keratosis)':
				link = 'bkl.html';
				break;
			case 'df, Dermatofibroma':
				link = 'df.html';
				break;
			case 'mel, Czerniak (Melanoma)':
				link = 'mel.html';
				break;
			case 'nv, Znamię melanocytowe (Melanocytic Nevi)':
				link = 'nv.html';
				break;
			case 'vasc, Naczyniowa zmiana skórna (Vascular skin lesion)':
				link = 'vasc.html';
				break;
		}
	

			
		$("#prediction-list").append(`<li style="list-style-type:none;"><a href="${link}">${index + 1}. ${p.className}: ${p.probability.toFixed(3)}</a></li>`);

		$("#prediction-list_history").append(`<li style="list-style-type:none;"><a href="${link}">${index + 1}. ${p.className}: ${p.probability.toFixed(3)}</a></li>`);

	});

	$("#prediction-list").append(`<br>`);
		
}







// =====================
// The following functions help to solve the problems relating to delays 
// in assigning the src attribute and the delay in model prediction.
// Without this the model will produce unstable predictions because
// it will not be predicting on the correct images.


// This tutorial explains how to use async, await and promises to manage delays.
// Tutorial: https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795
// =====================



function model_delay() {
	
	return new Promise(resolve => setTimeout(resolve, 200));
}
async function model_delayedLog(item, dataURL) {
	
	// We can await a function that returns a promise.
	// This delays the predictions from appearing.
	// Here it does not actually serve a purpose.
	// It's here to show how a delay like this can be implemented.
	await model_delay();
	// display the user submitted image on the page by changing the src attribute.
	// The problem is here. Too slow.
	$("#selected-image").attr("src", dataURL);
	$("#displayed-image").attr("src", dataURL); //#########
	
	// log the item only after a delay.
	//console.log(item);
}
// This step by step tutorial explains how to use FileReader.
// Tutorial: http://tutorials.jenkov.com/html5/file-api.html

async function model_processArray(array) {
	
	for(var item of fileList) {
		
		
		let reader = new FileReader();
		
		// clear the previous variable from memory.
		let file = undefined;
	
		
		reader.onload = async function () {
			
			let dataURL = reader.result;
			
			await model_delayedLog(item, dataURL);
			
			
			
			var fname = file.name;
			
			// clear the previous predictions
			$("#prediction-list").empty();
			
			// 'await' is very important here.
			await model_makePrediction(fname);
		}
		
		file = item;
		
		// Print the name of the file to the console
        //console.log("i: " + " - " + file.name);
			
		reader.readAsDataURL(file);

	}

	
}

