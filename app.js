$(() => {
    // Questions in Array
    const questions = [
        {
            image: "images/Espresso.png",
            answers: [
                { text: 'Espresso', correct: true, points: 0},
                { text2: 'Cortado', correct2: false, points2: -1 },
            ]
        },
        {
            image: "images/Americano.png",
            answers: [
                { text: 'Affogato', correct: false, points: -1},
                { text2: 'Americano', correct2: true, points2: 0 },
            ]
        },
        {
            image:"images/Cafe au Lait.png",
            answers: [
                { text: 'Affogato', correct: false, points: -1},
                { text2: 'Cafe au Lait', correct2: true, points2: 0 },
            ]
        },
        {
            image: "images/Caffe Breve.png" ,
            answers: [
                { text: 'Breve', correct: true, points: 0 },
                { text2: 'Cold Brew', correct2: false, points2: -1},
            ]
        },
        {
            image: "images/Caffe Latte.png" ,
            answers: [
                { text: 'Caffe Latte', correct: true, points: 0 },
                { text2: 'Irish Coffee', correct2: false, points2: -1 },
            ]
        },
        {
            image: "images/Caffe Mocha.png",
            answers: [
                { text: 'Lungo', correct: false, points: -1 },
                { text2: 'Caffe Mocha', correct2: true, points2: 0},
            ]
        },
        {
            image: "images/Espresso con Panna.png",
            answers: [
                { text: 'Con Panna', correct: true, points: 0 },
                { text2: 'Flat White', correct2: false, points2: -1 }
            ]
        },
        {
            image: "images/Espresso Macchiato.png" ,
            answers: [
                { text: "Machiato", correct: true, points: 0},
                { text2: 'Mocha', correct2: false, points2: -1 },
            ]
        },
        {
            image: "images/Flat White.png",
            answers: [
                { text: 'Doppio', correct: false, points: -1},
                { text2: 'Flat White', correct2: true, points2: 0 },
            ]
        },
        {
            image: "images/Red Eye.png" ,
            answers: [
                { text: 'Red Eye', correct: true, points: 0 },
                { text2: 'Ristretto', correct2: false, points2: -1 },
            ]
        }
    ]

    // Cached Dom Nodes
    const $startButton = $('#start-btn');
    const $nextButton = $('#next-btn');
    const $questionImage = $('#question-image');
    const $answerButtons= $('#answer-buttons');
    const $progressBarFull = $('#progressBarFull'); //////not sure yet///
    const $points= $('#bean');
    const $btn1= $('#btn1');
    const $btn2= $('#btn2');
    const $imageContainer= $('#imageContainer');
    const $progress= $('#progress');
    const $rules_btn= $('#rules-btn');
    const $title= $('#title');

    // Variables
    const highestIndex = questions.length;
    let currentQuestionIndex = 0;
    let isCorrect = false;

    // Player Class
    class Player {
        constructor(name, beans) {
            this.name = name;
            this.beans = beans.toString(); //beans are points
        }
    }

    // The Point is to have to have more Beans than the Barista Expertista to be Queen Winner!
    const barista1 = new Player('Barista 1', 3); // You, the user, starts with 3 beans.
    const barista2= new Player('Barista 2', 0); // Barista 2 is the Barista Expertista. You want to come on top!


    // Start Game
    const startGame = () => {
        $startButton.addClass('hide');

        $btn1.remove('hide');
        $btn2.remove('hide');
        $imageContainer.remove('hide');
        $progress.remove('hide');

        $btn1.addClass('show');
        $btn2.addClass('show');
        $imageContainer.addClass('show');
        $progress.addClass('show');


        setNextQuestion();
    }

    function showQuestion(q) {
        console.log("next")
        console.log(q);
        $btn1.html(questions[q]["answers"][0]['text']);
        $btn2.html(questions[q]["answers"][1]['text2']);
        updateProgress();


        $progress.addClass('hide');
        $rules_btn.addClass('hide');
        $title.addClass('hide');

        $progress.remove('show');
        $rules_btn.remove('show');
        $title.remove('show');

    };

    const updateProgress = () =>{
        $progress.html(currentQuestionIndex + "/" + highestIndex);
    }

    const restart = () =>{
        currentQuestionIndex = 0;
        barista1.beans = 3;
        setNextQuestion();
        $points.html("<h3>" + barista1.beans + "</h3>")

        $progress.remove('hide');
        $rules_btn.remove('hide');
        $title.remove('hide');

        $progress.addClass('show');
        $rules_btn.addClass('show');
        $title.addClass('show');

        $btn1.remove('show');
        $btn2.remove('show');

        $btn1.addClass('hide');
        $btn2.addClass('hide');

        startGame();
    }

    const setNextQuestion = () => {
        showQuestion(currentQuestionIndex);
    }

    const setChoice1 = () => {
        if(currentQuestionIndex >= highestIndex) {
            alert("YOU WON!");
            restart();
        }else{
            isCorrect = questions[currentQuestionIndex]["answers"][0]['correct'];
            $nextButton.click();
        }
    }
    const setChoice2 = () => {
        if(currentQuestionIndex >= highestIndex) {
            alert("YOU WON!");
            restart();
        }else{
            isCorrect = questions[currentQuestionIndex]["answers"][1]['correct2'];
            $nextButton.click();
        }
    }


    // Show Next Image
    const nextImg = () => {
        currentQuestionIndex++;

        if(currentQuestionIndex >= highestIndex && barista1.beans > 0) {
            alert("YOU WON!");
            restart();
        }else if(currentQuestionIndex < highestIndex){
            if(barista1.beans <= 0){
                alert("You lost.");
                restart();
            }else{
                let tempImg = questions[currentQuestionIndex]["image"];
                $imageContainer.attr("src", tempImg);
                showQuestion(currentQuestionIndex);
                if(isCorrect){

                }else{
                    barista1.beans = barista1.beans - 1;
                    $points.html("<h3>" + barista1.beans + "</h3>")
                    if(barista1.beans <= 0){
                        alert("You lost.");
                        restart();
                    }
                }

            }
        }


    }

    // EVENT LISTENERS
    $startButton.on('click', startGame)
    $nextButton.on('click', nextImg);
    $btn1.on('click', setChoice1);
    $btn2.on('click', setChoice2);

    // *MW*-Src https://www.w3schools.com/howto/howto_css_modals.asp
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("rules-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

});















