import { apiDummyData } from "./data";

const app = document.getElementById("app") as HTMLElement;
const start = document.getElementById("start") as HTMLElement;
start.addEventListener("click", () => {
  app.classList.remove("hide");
  start.remove();
  nextQue();
});
let clicked: boolean;
let correct = 50;

function nextQue() {
  clicked = false;

  const random = Math.floor(Math.random() * apiDummyData.length);

  document.getElementById("question")!.textContent =
    apiDummyData[random].question;

  const optionElements = document.getElementsByClassName("option");
  for (let i = 0; i < optionElements.length; i++) {
    const element = optionElements[i] as HTMLElement;

    const newElement = element.cloneNode(true) as HTMLElement;
    element.parentNode!.replaceChild(newElement, element);

    const randomOption = Math.floor(
      Math.random() * apiDummyData[random].options.length
    );

    newElement.classList.remove("wrong", "correct", "disabled");

    newElement.textContent = apiDummyData[random].options[randomOption];

    apiDummyData[random].options.splice(randomOption, 1);

    newElement.addEventListener("click", () => {
      if (
        !(newElement.textContent === apiDummyData[random].correct) &&
        !clicked
      ) {
        newElement.classList.add("wrong");
        correct--;
      }
      answerQue(random);
      !clicked && apiDummyData.splice(random, 1);

      clicked = true;

      const optionElements = document.getElementsByClassName("option");
      for (let i = 0; i < optionElements.length; i++) {
        const option = optionElements[i] as HTMLElement;
        option.classList.add("disabled");
      }
    });
  }

  const next = document.getElementById("next")!;
  const newNext = next.cloneNode(true);
  next.parentNode!.replaceChild(newNext, next);

  newNext.addEventListener("click", () => {
    clicked && apiDummyData.length > 0 && nextQue();
    apiDummyData.length === 0 && endPage();
  });
}

function answerQue(random: number) {
  const optionElements = document.getElementsByClassName("option");
  for (let i = 0; i < optionElements.length; i++) {
    const element = optionElements[i] as HTMLElement;
    if (element.textContent === apiDummyData[random].correct) {
      element.classList.add("correct");
    }
  }
  console.log(apiDummyData.length);
}

function endPage() {
  document.getElementById("answer")!.textContent = "";
  document.getElementById(
    "question"
  )!.textContent = `Your score is: ${correct}`;
}
