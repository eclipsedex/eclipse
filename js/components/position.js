function openPosition(type,name,symbol,expiry, openPrice) {
    var leverage = parseInt($('input[name="leverage"]:checked').val())
    var amount = parseInt($('input[name="lotSize"]:checked').val())
    var lotSize = 250
    openPrice = Prices[name]
    var Position = {
        name: name,
        type: type,
        expiry: parseInt(expiry),
        expirySeconds: parseInt(expiry)*60,
        timeLeft: parseInt(expiry)*60,
        symbol: symbol,
        leverage: leverage,
        lotSize: lotSize,
        amount: amount,
        quantity: parseInt(amount/lotSize),
        value: amount,
        fee: fee,
        openPrice: parseInt(openPrice),
        time: Math.floor(Date.now() / 1000) + (parseInt(expiry)*60)
    }
    console.log(Position)

    if ((amount+fee) > balance) {
        ons.notification.alert(`Insufficient Balance, can not open a position of ₹${amount} and fee ₹${fee} with a balance of ₹${balance}`)
    } else {
        $.ajax({
            type: "POST",
            url: openPositionUrl,
            data: {
                position: Position,
                user: user,
                pass: pass
            },
            cache: false,
            success: function (res) {
                console.log(res)
                if (res == "PO") {
                    ons.notification.alert("Your plan does not allow multiple positions, close existing position to open new positions")
                } else {
                    if (res = "SU") {
                        ons.notification.alert(type.toUpperCase()+" Position successfully opened")
                    }
                }
            }
        });
    }
}