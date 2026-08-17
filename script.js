const healthForm = document.getElementById("healthForm");

healthForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const activity = Number(document.getElementById("activity").value);

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    // Validation
    if (!name || !age || !height || !weight || !activity || !gender) {
        showToast("Please complete all fields.");
        return;
    }

    /*
        BMI
        BMI = weight / height²
        Height is converted from cm to meters.
    */

    const heightMeter = height / 100;

    const bmi = weight / (heightMeter * heightMeter);

    /*
        BMR
        Mifflin-St Jeor equation
    */

    let bmr;

    if (gender.value === "male") {

        bmr = (10 * weight) +
              (6.25 * height) -
              (5 * age) +
              5;

    } else {

        bmr = (10 * weight) +
              (6.25 * height) -
              (5 * age) -
              161;
    }


    /*
        Daily calories
        BMR × activity multiplier
    */

    const dailyCalories = bmr * activity;


    /*
        Estimated water intake

        Approximation:
        35 ml per kg body weight
    */

    const water = (weight * 35) / 1000;


    // Update results

    document.getElementById("bmiResult").textContent =
        bmi.toFixed(1);

    document.getElementById("bmrResult").textContent =
        Math.round(bmr);

    document.getElementById("calorieResult").textContent =
        Math.round(dailyCalories);

    document.getElementById("waterResult").textContent =
        water.toFixed(2);


    // BMI category

    const bmiStatus = document.getElementById("bmiStatus");

    if (bmi < 18.5) {

        bmiStatus.textContent = "Underweight";

    } else if (bmi < 25) {

        bmiStatus.textContent = "Normal";

    } else if (bmi < 30) {

        bmiStatus.textContent = "Overweight";

    } else {

        bmiStatus.textContent = "Obese";
    }


    // Scroll to result section

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });


    // Show message

    showToast(`Health calculation completed for ${name}.`);
});


/* ================= RESET ================= */

function resetCalculator() {

    document.getElementById("healthForm").reset();

    document.getElementById("bmiResult").textContent = "--";
    document.getElementById("bmrResult").textContent = "--";
    document.getElementById("calorieResult").textContent = "--";
    document.getElementById("waterResult").textContent = "--";

    document.getElementById("bmiStatus").textContent = "Waiting";

    showToast("Calculator has been reset.");
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);
}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.flexDirection = "column";
        nav.style.gap = "20px";
        nav.style.borderBottom = "1px solid #eee";
    }
}