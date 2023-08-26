
TARGET_CLASSES = {
  0: 'akiec, Rogowacenie słoneczne (Actinic Keratoses/Solar Keratoses) lub Nabłoniak (intraepithelial Carcinoma - Bowen’s disease)',
  1: 'bcc, Nabłoniak podstawnokomórkowy (Basal Cell Carcinoma)',
  2: 'bkl, Łagodne rogowacenie(Benign Keratosis)',
  3: 'df, Dermatofibroma',
  4: 'mel, Czerniak (Melanoma)',
  5: 'nv, Znamię melanocytowe (Melanocytic Nevi)', 
  6: 'vasc, Naczyniowa zmiana skórna (Vascular skin lesion)'

};
	
// 	// Append the file name to the prediction list
// 	$("#prediction-list").append(`<li class="w3-text-purple fname-font" style="list-style-type:none;">Plik poddany analizie:  
// 	${fname}</li>`);
	
// 	//$("#prediction-list").empty();
// 	top5.forEach(function (p, index) {
// 		let link = '';
	
// 		switch (p.className) {
// 			case 'akiec, Rogowacenie słoneczne (Actinic Keratoses/Solar Keratoses) lub Nabłoniak (intraepithelial Carcinoma - Bowen’s disease)':
// 				link = 'aciec.html';
// 				break;
// 			case 'bcc, Nabłoniak podstawnokomórkowy (Basal Cell Carcinoma)':
// 				link = 'bcc.html';
// 				break;
// 			case 'bkl, Łagodne rogowacenie(Benign Keratosis)':
// 				link = 'bkl.html';
// 				break;
// 			case 'df, Dermatofibroma':
// 				link = 'df.html';
// 				break;
// 			case 'mel, Czerniak (Melanoma)':
// 				link = 'mel.html';
// 				break;
// 			case 'nv, Znamię melanocytowe (Melanocytic Nevi)':
// 				link = 'nv.html';
// 				break;
// 			case 'vasc, Naczyniowa zmiana skórna (Vascular skin lesion)':
// 				link = 'vasc.html';
// 				break;
// 		}
	
// 		$("#prediction-list").append(`<li style="list-style-type:none;"><a href="${link}">${index + 1}. ${p.className}: ${p.probability.toFixed(3)}</a></li>`);
// 	});


// 	// Add a space after the prediction for each image
// 	$("#prediction-list").append(`<br>`);
		
// }
