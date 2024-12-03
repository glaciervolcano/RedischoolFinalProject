const urlParams = new URLSearchParams(window.location.search);
const targetLanguage = urlParams.get('targetLanguage');
console.log(targetLanguage);

fetch('./grammarDataJson/grammar_structure.json')
    .then(response => response.json())
    .then(data => {

        const languageData = data.find(item => item.language === targetLanguage);
        if (!languageData) {
            console.error('Language data not found!');
            return;
        }

        const container = document.getElementById('grammarPointsContainer');
        container.innerHTML = '';

        if (!languageData.grammarPoints) {
            container.innerHTML = 'No grammar points available for this language.';
            return;
        }


        const languageImage = languageData.image;
        const imageContainer = document.getElementById('languageImageContainer');
        const imgElement = document.createElement('img');
        imgElement.src = languageImage;
        imgElement.alt = targetLanguage;
        imgElement.classList.add('country-picture');
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imgElement);


        document.getElementById('languageTitle').innerText = `Start practice your ${targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)}`;


        const btnContainer = document.getElementById('grammarButtons');


        languageData.grammarPoints.forEach(point => {

            const pointDiv = document.createElement('div');
            pointDiv.classList.add('grammar-point');

            const pointTitle = document.createElement('h3');
            pointTitle.classList.add('grammar-title');
            pointTitle.innerText = point.grammarType;
            pointDiv.appendChild(pointTitle);

            point.subCategories.forEach(subCategory => {
                const subCategoryButton = document.createElement('button');
                subCategoryButton.classList.add('grammar-btn');
                subCategoryButton.innerText = subCategory.name;
                subCategoryButton.onclick = () => {


                    const targetGrammar = `${point.grammarType}_${subCategory.id}`;  // fx. "verbs_pastTense"
                    console.log('targetGrammar:', targetGrammar)
                    const targetUrl = `practice.html?targetLanguage=${targetLanguage}&targetGrammar=${targetGrammar}`;

                    console.log('Redirecting to:', targetUrl);
                    window.open(targetUrl, '_blank');
                };
                pointDiv.appendChild(subCategoryButton);
            });


            btnContainer.appendChild(pointDiv);
        });
    })
    .catch(error => {
        console.error('Error loading grammar selection:', error);
    });
