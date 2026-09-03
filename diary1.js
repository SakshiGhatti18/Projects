// Check whether a password already exists
window.onload = function () {

    const savedPassword = localStorage.getItem("diaryPassword");

    if (savedPassword) {
        document.getElementById("createBox").style.display = "none";
        document.getElementById("loginBox").style.display = "block";
    }
};


// Create a new password
function createPassword() {

    const password =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("createMessage");


    if (password === "" || confirmPassword === "") {

        message.style.color = "red";
        message.textContent =
            "Please enter and confirm your password.";

        return;
    }


    if (password.length < 4) {

        message.style.color = "red";
        message.textContent =
            "Password must contain at least 4 characters.";

        return;
    }


    if (password !== confirmPassword) {

        message.style.color = "red";
        message.textContent =
            "Passwords do not match.";

        return;
    }


    // Save password
    localStorage.setItem(
        "diaryPassword",
        password
    );


    message.style.color = "green";
    message.textContent =
        "✅ Password created successfully!";


    setTimeout(function () {

        document.getElementById("createBox")
            .style.display = "none";

        document.getElementById("loginBox")
            .style.display = "block";

    }, 1000);
}



// Login
function login() {

    const enteredPassword =
        document.getElementById("loginPassword").value;

    const savedPassword =
        localStorage.getItem("diaryPassword");

    const message =
        document.getElementById("loginMessage");


    if (enteredPassword === savedPassword) {

        document.getElementById("loginBox")
            .style.display = "none";

        document.getElementById("diaryBox")
            .style.display = "block";


        // Load saved diary
        const savedDiary =
            localStorage.getItem("diaryText");

        if (savedDiary) {

            document.getElementById("diaryText")
                .value = savedDiary;
        }

    } else {

        message.style.color = "red";
        message.textContent =
            "❌ Incorrect password!";
    }
}



// Save diary
function saveDiary() {

    const diary =
        document.getElementById("diaryText").value;


    localStorage.setItem(
        "diaryText",
        diary
    );


    document.getElementById("saveMessage")
        .textContent =
        "✅ Diary saved successfully!";
}



// Change password
function changePassword() {

    const oldPassword =
        prompt("Enter your current password:");

    const savedPassword =
        localStorage.getItem("diaryPassword");


    if (oldPassword !== savedPassword) {

        alert("❌ Incorrect current password!");
        return;
    }


    const newPassword =
        prompt("Enter your new password:");


    if (!newPassword || newPassword.length < 4) {

        alert(
            "Password must contain at least 4 characters."
        );

        return;
    }


    localStorage.setItem(
        "diaryPassword",
        newPassword
    );


    alert("✅ Password changed successfully!");
}



// Lock diary
function lockDiary() {

    document.getElementById("diaryBox")
        .style.display = "none";

    document.getElementById("loginBox")
        .style.display = "block";

    document.getElementById("loginPassword")
        .value = "";

    document.getElementById("saveMessage")
        .textContent = "";
}