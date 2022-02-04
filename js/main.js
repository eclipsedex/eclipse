const url = baseUrl + "socket.php";
const withdrawUrl = baseUrl + "withdraw.php";
const withdrawCancelUrl = baseUrl + "withdrawCancel.php";
const openPositionUrl = baseUrl + "openPosition.php";
const closeUrl = baseUrl + "forceClosePosition.php"
const updateTime = 2000;
const Prices = {}

var display = false;

var user = "user123@gmail.com";
var pass = "1234";
var balance = 0;
var send;
var deposit = false;
var contractPriceGlob;
var fee;

$(function () {

  document.addEventListener('prechange', function (event) {
    // console.log(event.tabItem.getAttribute('label'))
    $(".page__content").scrollTop(0)
  })

  window.onhashchange = function () {
    if (window.location.hash == "#home" || window.location.hash == "") {
      showMarket()
    }
  }

  // https://binomo.com/
  changeFavicon("favicon.ico")
  $("login").html(signInHtml)
})

function signIn() {
  emailSend = $(".signInEmailUN").val();
  passSend = $(".signInPinUN").val();

  if (emailSend == "" || passSend == "") {
    ons.notification.alert("E-mail or pin incorrect")
    return;
  }

  $.ajax({
    type: "POST",
    url: baseUrl + "signIn.php",
    data: { 'user': emailSend, 'pass': passSend },
    cache: false,
    success: function (res) {
      console.log(res)
      if (res == "OK") {
        user = emailSend;
        pass = passSend;
        App.update(user)
        App.loop()
        $(".logInOrSignIn").remove()
      } else {
        ons.notification.alert("E-mail or pin incorrect")
      }
    }
  });
}

function changeFavicon(src) {
  var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}

const signUpHtml = `<div class="signUp">
<br>
<h2 style="font-family: sans-serif;">Sign Up</h2>
<i class="fa fa-user signInlogo"></i>
<div><input class="text-input text-input--material signInEmail" placeholder="Enter full name"
        type="email" required>
</div><br><br>
<div><input class="text-input text-input--material signInEmail" placeholder="Enter e-mail"
        type="email" required></div>
<br /> <br>
<div><input class="text-input text-input--material signInPin" placeholder="Enter pin"
        type="number" required></div>
<br><br>

<div>Enter payment details</div><br><br>
<div><input class="text-input text-input--material signInPin"
        placeholder="IMPS beneficiary name" type="number" required></div><br><br>
<div><input class="text-input text-input--material signInPin" placeholder="MMID Number"
        type="number" required></div>
<br><br>
<div><input class="text-input text-input--material signInPin" placeholder="Bank Account"
        type="number" required></div>

<br><br>
<div><input class="text-input text-input--material signInPin" placeholder="IFSC code"
        type="number" required></div>

<br><br>

<div>Plan</div><br><br>
<div class="segment"
    style="width: 280px;margin: 0 auto;text-align: center;width: 80%;left: 0%;position: relative;margin-bottom: 25px;">
    <div class="segment__item">
        <input type="radio" class="segment__input" name="plan" value="250" checked="">
        <div class="segment__button">Retailer</div>
    </div>
    <div class="segment__item">
        <input type="radio" class="segment__input" value="500" name="plan" disabled="">
        <div class="segment__button" disabled="">Institution</div>
    </div>
</div>
<br><br>
<label class="checkbox checkbox--material">
  <input type="checkbox" class="checkbox__input checkbox--material__input" checked="checked">
  <div class="checkbox__checkmark checkbox--material__checkmark"></div>
  I agree the Terms and Conditions
</label><br> <br>
<label class="checkbox checkbox--material">
  <input type="checkbox" class="checkbox__input checkbox--material__input" checked="checked">
  <div class="checkbox__checkmark checkbox--material__checkmark"></div>
  I understand the risk involved
</label>
<br><br>
<button class="button--cta"
    onclick='ons.notification.alert("Enter valid details")''
    style="width: 60%; margin: 0 auto; background: rgb(0 118 255 / 0.8);">Submit</button>
<br><br>
<div onclick="$('login').html(signInHtml)">Already
    have
    an Account, <rb>Sign In</rb>
</div>
<div class="centerImage">
    <a href="https://binomo.com/" target="_blank">
        <div class="iconApp"></div>
    </a>
</div>
<br><br><br><br><br>
</div>`

const signInHtml = `<div class="signIn">
<br>
<h2 style="    font-family: sans-serif;">Sign In</h2>
<i class="fa fa-user signInlogo"></i>

<div><input class="text-input text-input--material signInEmailUN" placeholder="Enter e-mail" type="email"
        required>
</div>
<br /> <br>
<div><input class="text-input text-input--material signInPinUN" placeholder="Enter pin" type="password"
        required></div>
<br><br>

<button class="button--cta" onClick="signIn()"
    style="width: 60%; margin: 0 auto; background: rgb(0 118 255 / 0.8);">Submit</button>
<br><br>
<div onclick="$('login').html(signUpHtml);">Create new
    Account, <rb>Sign Up</rb>
</div>
<div class="centerImage">
    <a href="https://binomo.com/" target="_blank">
        <div class="iconApp"></div>
    </a>
</div>
<div style="
    display: block;
    position: relative;
    bottom: 20px;
    font-size: 14px;
    width: 80%;
    z-index: 100;
    background: #31a031;
    left: 10%;
    padding: 10px 16px;
    border-radius: 5px;
    color: #fff;
    max-width: 800px;
    line-height: 20px;
    letter-spacing: 0.1px;
    margin-left: -16px;
    margin-top: 50px;
">Earn a withdrawable cashback of ₹50 to ₹200 on your first deposit, offer valid till February 5, 2022
</div>
</div>`
