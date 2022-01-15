function withdrawl() {
    ons.notification.prompt({
        message: "Enter amount to withdraw in rupees",
        cancelable: true,
    })
        .then(function (input) {
            if (input) {
                if (isNaN(parseInt(input))) {
                    ons.notification.alert("Enter a valid amount")
                    return;
                }
                if (typeof (parseInt(input)) == 'number') {
                    amount = parseInt(input);
                    if (amount > balance) {
                        ons.notification.alert("Insufficient Balance")
                    } else {
                        if (amount < 50) {
                            ons.notification.alert("Minimum withdrawl amount is ₹50")
                        } else {
                            $.ajax({
                                type: "POST",
                                url: withdrawUrl,
                                data: { 'user': user, 'pass': pass, 'amount': amount },
                                cache: false,
                                success: function (res) {
                                    console.log(res)
                                    if (res == "OK") {
                                        ons.notification.alert("Withdrawl request placed")
                                    } else {
                                        ons.notification.alert("Server Error, please try again after sometime")
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
}

function cancelWithdrawl() {
    $.ajax({
        type: "POST",
        url: withdrawCancelUrl,
        data: { 'user': user, 'pass': pass },
        cache: false,
        success: function (res) {
            console.log(res)
            if (res == "OK") {
                ons.notification.alert("Withdrawl request cancelled")
            } else {
                ons.notification.alert("Server Error, please try again after sometime")
            }
        }
    });
}

function depositShow() {
    deposit = true
}