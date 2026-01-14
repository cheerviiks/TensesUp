function check(button, correct) {
    const task = button.parentElement;
    const result = task.querySelector(".result");

    if (correct) {
        result.textContent = "✔ Правильно!";
        result.style.color = "green";
    } else {
        result.textContent = "✖ Неправильно";
        result.style.color = "red";
    }
}