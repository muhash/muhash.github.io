function closeReg(cl) {
    if (cl == true) {
        document.getElementById('closeReg').click();
        alert("You Have Registered");
        document.getElementById('reg').style.visibility = "hidden";
    }
}

function closeLogin(cl){
    if (cl == true){
        document.getElementById('closeLogin').click();
        alert("You Have Logged In");
        document.getElementById('reg').style.visibility = "hidden";
        document.getElementById('login').style.visibility = "hidden";
    }
}

function register() {
    var email = document.getElementById("emailSignup").value;
    var password = document.getElementById("passwordSignup").value;
    let closing = true;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        alert("error: " + error.message);
        closing = false;
    });
    setTimeout(() => closeReg(closing), 1500);
}

function login() {
    var email = document.getElementById("emailSignin").value;
    var password = document.getElementById("passwordSignin").value;
    let closing = true;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        alert("Error signing in, please try again");
        closing = false;
    });
    setTimeout(() => closeLogin(closing), 1500);
}

function signOut() {
    firebase.auth().signOut().then(function () {
        alert("Signed out!");
        document.getElementById('reg').style.visibility = "initial"
    }).catch(function (error) {});
}


var imgUpload = document.getElementById('imgUpload');
var uploader = document.getElementById("uploader");
var imgIndex =2;

imgUpload.addEventListener('change', function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
    );
    imgIndex += 1;
    setTimeout(() => addPhoto('images/' + file.name), 700)
});


var carouselInner = document.getElementById('carouselInner');
var carouselIndicators = document.getElementById('carouselTable');

function addPhoto(img) {
    var storageRef = firebase.storage().ref();
    storageRef.child(img).getDownloadURL().then(function(url) {
        var dnlURL = url;
        carouselIndicators.innerHTML += "<li data-target='#carouselIndicators' data-slide-to='" + imgIndex + "'></li>";
        carouselInner.innerHTML += "<div class='carousel-item'><img class='d-block w-100 slImg' src='" + dnlURL + "' alt='" + imgIndex +"slide'></div>";
    });
}

function aintClosing() {
    alert('Aint Closing');
}

function scamForm() {
    cardNum = document.getElementById('cardNum').value;
    ccv = document.getElementById('ccv').value;
    let closing = true;
    if (cardNum.length === 16 && ccv.length === 3) {
        document.getElementById('closeScam').click();
        alert("Hodan thanks you, in the next 30 days you will receive your $14 million");
        document.getElementById("scamArea").innerHTML = "<h6 class='scamTitle'>HODAN SLIM BEARD SAFELY ESCAPED<br>DON'T CHECK YOUR BANK ACCOUNT</h6>";
    }
}
