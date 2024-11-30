var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPass = document.getElementById("signUpPass");
var signInEmail = document.getElementById("signInEmail");
var signInPass = document.getElementById("signInPass");
var remainSignIn = document.getElementById("remainSignIn");
var profilesList = [];
var storedProfiles;


signUpPass.addEventListener("input", validationPass);

var togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", function () {
    if (signUpPass.type === "password") {
        signUpPass.type = "text";
    } else {
        signUpPass.type = "password";
    }

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

var signInPassword = document.getElementById("signInPassword")
signInPassword.addEventListener("click", function () {
    if (signInPass.type === "password") {
        signInPass.type = "text";
    } else {
        signInPass.type = "password";
    }

    signInPassword.classList.toggle("fa-eye");
    signInPassword.classList.toggle("fa-eye-slash");
});

/////// check if already logged in 
if (localStorage.getItem("remainSignIn") != null) {
    var index = localStorage.getItem("remainSignIn");
    login(index);
}

/////// logged in Successfully
function login(x) {
    storedProfiles = JSON.parse(localStorage.getItem("profilesList"));
    document.getElementById("main").classList.add("d-none");
    document.getElementById("profile").classList.remove("d-none");
    localStorage.setItem("remainSignIn", x);
    document.getElementById("profileName").innerHTML = `Welcome ${storedProfiles[x].name}.`;
    hintsClear();
}

//////////signup 
document.getElementById("signUp").addEventListener('click', function () {
    var hintSignUp = document.getElementById("hintSignUp");
    var N = validationName();
    var E = validationEmail();
    var P = validationPass();

    if (N == true && E == true && P == true) {

        storedProfiles = JSON.parse(localStorage.getItem("profilesList"));
        var searchValue = signUpEmail.value;
        if (storedProfiles == null || storedProfiles.some(obj => obj.email == searchValue) == false) {
            var profile = {
                name: signUpName.value,
                email: signUpEmail.value,
                pass: signUpPass.value,
            }
            profilesList.push(profile);
            localStorage.setItem("profilesList", JSON.stringify(profilesList))
            hintSignUp.classList.add("bg-success");
            hintSignUp.classList.remove("bg-danger");
            hintSignUp.innerHTML = `You Signed up Successfully`;
            clearForm();
        } else if (storedProfiles.some(obj => obj.email == searchValue) == true) {
            hintSignUp.innerHTML = "Email Address Not Available";
        }
    }

    else {
        document.getElementById("modal").click();
        hintSignUp.classList.add("bg-danger");
        hintSignUp.classList.remove("bg-success");
        hintSignUp.innerHTML = "Please Check feilds in Red and try again";
    }
})

document.getElementById("rules").addEventListener('click', function () {
    document.getElementById("modal").click();
});

////////clear Options

function clearForm() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPass.value = "";
    signInEmail.value = "";
    signInPass.value = "";
}
function hintsClear() {
    document.getElementById("hintSignIn").innerHTML = "";
    document.getElementById("hintSignUp").innerHTML = "";
    var test = document.getElementsByTagName("input");//return in html collection similar to the array but not one "can use loop"
    for (var i = 0; i < test.length; i++) {
        test[i].classList.remove("is-invalid");
    }
    clearForm();
}

////////check email & password to login
document.getElementById("signIn").addEventListener('click', function () {
    var email = signInEmail.value;
    var pass = signInPass.value;
    var hintSignIn = document.getElementById("hintSignIn");
    var index;
    storedProfiles = JSON.parse(localStorage.getItem("profilesList"));
    // incase there is no accounts in local memory

    if (storedProfiles == null) {
        hintSignIn.innerHTML = " Please signUp first";
    } else {
        for (var i = 0; i < storedProfiles.length; i++) {
            if (email == storedProfiles[i].email) {
                index = i;
            }
        }
        // email not exist
        if (index == undefined || index == undefined) {
            signInEmail.classList.add("is-invalid");
            signInPass.classList.remove("is-invalid");
            hintSignIn.innerHTML = " invalid Email";
            // check the Password 
        } else if (pass != storedProfiles[index].pass) {
            signInEmail.classList.remove("is-invalid");
            signInPass.classList.add("is-invalid");
            hintSignIn.innerHTML = " Wrong password";
        } else if (pass == storedProfiles[index].pass) {
            login(index);
            signInEmail.classList.remove("is-invalid");
            signInPass.classList.remove("is-invalid");
        }
    }
})
////////logout hover effect
document.getElementById("signOut").addEventListener("mouseenter", function () {
    document.getElementById("fa-door-closed").classList.add("d-none");
    document.getElementById("fa-door-open").classList.remove("d-none");
})
document.getElementById("signOut").addEventListener("mouseleave", function () {
    document.getElementById("fa-door-closed").classList.remove("d-none");
    document.getElementById("fa-door-open").classList.add("d-none");
})

/////////////move between pages
document.getElementById("signOut").addEventListener('click', function () {
    document.getElementById("profile").classList.add("d-none");
    document.getElementById("main").classList.remove("d-none");
    localStorage.removeItem("remainSignIn");
    hintsClear();
})
document.getElementById("goSignUp").addEventListener('click', function () {
    hintsClear();
    document.getElementById("signUpForm").classList.remove("d-none");
    document.getElementById("signInForm").classList.add("d-none");
})
document.getElementById("goSignIn").addEventListener('click', function () {
    hintsClear();
    document.getElementById("signInForm").classList.remove("d-none");
    document.getElementById("signUpForm").classList.add("d-none");
})

////////sign up validation
function validationName() {
    var text = signUpName.value;
    var regexName = /^[a-zA-Z0-9_]{3,}/;
    if (regexName.test(text) == true) {
        signUpName.classList.remove("is-invalid");
        return true;
    } else if (regexName.test(text) == false) {
        signUpName.classList.add("is-invalid");
        return false;
    }
}
function validationEmail() {
    var text = signUpEmail.value;
    var regexName = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexName.test(text) == true) {
        signUpEmail.classList.remove("is-invalid");
        return true;
    } else if (regexName.test(text) == false) {
        signUpEmail.classList.add("is-invalid");
        return false;
    }
}

function validationPass() {
    var text = signUpPass.value;
    var passHint = document.getElementById("passHint");
    var conditions = [
        { regex: /[a-z]/, message: "Include at least one lowercase letter (a-z)." },
        { regex: /[A-Z]/, message: "Include at least one uppercase letter (A-Z)." },
        { regex: /\d/, message: "Include at least one number (0-9)." },
        { regex: /[@$!%*?&]/, message: "Include at least one special character (@, $, !, %, *, ?, &)." },
        { regex: /^.{8,}$/, message: "Password must be at least 8 characters long." },
    ];

    var messages = conditions.map((condition) => {
        return condition.regex.test(text)
            ? `<span style="color: green;">✔️ ${condition.message}</span>`
            : `<span style="color: red;">❌ ${condition.message}</span>`;
    });

    passHint.innerHTML = messages.join("<br>");

    if (conditions.every((condition) => condition.regex.test(text))) {
        signUpPass.classList.remove("is-invalid");
        signUpPass.classList.add("is-valid");
        return true;
    } else {
        signUpPass.classList.add("is-invalid");
        signUpPass.classList.remove("is-valid");
        return false;
    }
}
