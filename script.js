let user = "";

// LOGIN
function login(){
    user = document.getElementById("username").value;

    if(user === ""){
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", user);

    document.getElementById("loginPage").style.display="none";
    document.getElementById("app").style.display="block";

    document.getElementById("userDisplay").innerText = user;
    document.getElementById("profileUser").innerText = user;

    showSection("home");
    loadProgress();
}

// NAVIGATION
function showSection(id){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if(id==="dashboard") loadProgress();
}

// OPEN COURSE
function openCourse(title, video, notes){
    document.getElementById("courseTitle").innerText = title;
    document.getElementById("videoPlayer").src = video;
    document.getElementById("notesLink").href = notes;

    showSection("player");
}

// ENROLL
function enroll(){
    let course = document.getElementById("courseTitle").innerText;

    let progress = JSON.parse(localStorage.getItem("progress")) || {};
    progress[course] = "Completed";

    localStorage.setItem("progress", JSON.stringify(progress));

    alert("Course Enrolled!");
}

// DASHBOARD
function loadProgress(){
    let box = document.getElementById("progressBox");
    let progress = JSON.parse(localStorage.getItem("progress")) || {};

    box.innerHTML = "";

    for(let c in progress){
        box.innerHTML += `<p>${c} - ${progress[c]}</p>`;
    }
}

// LOGOUT
function logout(){
    localStorage.clear();
    location.reload();
}

// AUTO LOGIN
window.onload = function(){
    let saved = localStorage.getItem("user");

    if(saved){
        user = saved;

        document.getElementById("loginPage").style.display="none";
        document.getElementById("app").style.display="block";

        document.getElementById("userDisplay").innerText = user;
        document.getElementById("profileUser").innerText = user;

        showSection("home");
        loadProgress();
    }
}