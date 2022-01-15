const App = {
    update: function () {
        app = this
        $.ajax({
            type: "POST",
            url: url,
            data: { 'user': user, 'pass': pass },
            cache: false,
            success: function (res) {
                app.do(res)
            }
        });
    },
    loop: function () {
        app = this
        setInterval(function () {
            app.update()
        }, updateTime)
    },
    do: function (response) {
        if (response == "WrongPassword") {
            ons.notification.alert('Wrong Password!');
            setTimeout(function () {
                window.location.reload()
            }, 200)
            return;
        }


        response = JSON.parse(response)
        console.log(response)

        balance = response.profile.balance

        $("balance").html("₹" + parseFloat(response.profile.balance).toFixed(2))
        $(".userNameProfile").html(response.profile.name)
        $(".profileEmail").html(response.profile.email)
        $(".profileNumber").html(response.profile["account-number"])
        $(".profileVerify").html(response.profile["verification-status"])
        $(".profileMethod").html(response.profile.method)
        $(".profilePlan").html(response.profile.subscription)

        html = ""
        for (position of response.positions) {
            totalSeconds = position.timeLeft;
            hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;
            change = parseFloat(position.value - position.amount);

            if (!display) {
                $("positionChart").html(`
                    <iframe class="posChart" scrolling="no" allowtransparency="true" frameborder="0"
                    frameborder="0" src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=in#%7B%22symbol%22%3A%22BINANCE%3A${position.symbol}USDT%22%2C%22width%22%3A350%2C%22height%22%3A200%2C%22dateRange%22%3A%221M%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%7D" ></iframe>
                    
                <div class="blockadeOne"></div>
                <div class="blockadetwo"></div>
                `);
                
            $("positionChart").css("display","block")
            }

            html += `<Position>
            <div class="positionName">${position.name}</div>
            <div class="positionBadge" style="background: ${(position.type == "long") ? `#31a031` : `#e43030`};">${position.type.toUpperCase()}</div>
            <div class="positionField">Lot Size</div>
            <div class="positionValue">₹${position.lotSize}</div>
            <div class="positionField">Quantity</div>
            <div class="positionValue">1.0</div>
            <div class="positionField">Fee</div>
            <div class="positionValue">₹${position.fee}</div>
            <br>
            <div class="positionField">Leverage</div>
            <div class="positionValue">${position.leverage}X</div>
            <div class="positionField">Expiry</div>
            <div class="positionValue">${minutes}m ${seconds}s</div>
            <br>
            <div class="positionField">Current Price</div>
            <div class="positionValue ${position.name}Price">₹0.00</div>
            <!-- <div class="positionField">Open Price</div>
            <div class="positionValue">₹${position.openPrice}</div> -->
            <div class="positionField">Change</div>
            <div class="positionValue changePer${position.name}">₹${position.openPrice}</div>
            <br>
            <div class="positionField">Security Value</div>
            <div class="positionValue">₹${parseFloat(position.value).toFixed(2)}</div>
            <div class="positionField">P&L</div>
            <div class="positionValue">${(position.type == "long") ? (change >= 0) ? `<g>+₹${change.toFixed(2)}</g>` : `<r>₹${change.toFixed(2)}</r>` : (change <= 0)? `<r>₹${change.toFixed(2)}</r>` : `<g>₹${change.toFixed(2)}</g>`}</div>
        </Position>`
            $(".secVal").html("₹" + parseFloat(position.value).toFixed(2))
            
            display = true;
        }

        if (response.positions.length === 0) {
            html = `<div class="noPositions"><h2>No Open Positions</h2></div>`
            $(".secVal").html("₹0.00")
            $("positionChart").html("")
            $("positionChart").css("display","none")
            display = false;
        } 

        $("Positions").html(html)
        $('.withdrawlMsgs').html("")

        html = ``
        if (deposit && !response.profile.withdrawl) {
            html += `<div class="toast">
                <div class="toast__message">${response.info.deposit}</div>
                <button class="toast__button" onclick="deposit = false">OK</button>
            </div>`
        }
        if (response.profile.withdrawl == true) {
            html += `<div class="toast">
            <div class="toast__message">
                Withdrawl of ₹${response.profile.withdrawlAmount} pending, 
                we generally process withdrawls within 3-4 business days, thanks for being patient, NOTE: deposits will be paused till the withdrawl is processed 
            </div>
            <button class="toast__button" onclick="cancelWithdrawl()">Cancel</button>
        </div>`
        }
        $('.withdrawlMsgs').html(html)

        html = ""
        for (contract of response.contracts) {
            change = parseFloat(contract.change);
            html += `<Contract onClick="openContract('${contract.name}','${contract.symbol}',${contract.expiry},${contract.price})">
            <img class="contractImage" src="https://media.wazirx.com/media/${contract.symbol}/84.png"/>
            <div class="contractName">${contract.name}</div>
            <div class="positionField ${contract.name}Price">₹${contract.price.toFixed(2)}</div>
            <div class="positionValue">${(change >= 0) ? `<g>+${change.toFixed(2)}%</g>` : `<r>${change.toFixed(2)}%</r>`}</div>
            <br>
            <div class="positionField">Min Lot Size: </div>
            <div class="positionValue">₹250</div>
            <div class="positionField">Expiry</div>
            <div class="positionValue">${contract.expiry} min</div>
        </Contract>`
            $(`.${contract.name}Price`).html("₹" + contract.price.toFixed(2))
            $(`.changePer${contract.name}`).html(`${(change >= 0) ? `<g>+${change.toFixed(2)}%</g>` : `<r>${change.toFixed(2)}%</r>`}`)
            Prices[contract.name] = parseFloat(contract.price.toFixed(2))
            if (response.positions.length != 0) {
                if ( response.positions[0].name == contract.name) {
                    if (change >=0 ) {
                        $(".posChart").css("filter","hue-rotate(265deg)")
                    } else {
                        $(".posChart").css("filter","hue-rotate(126deg)")
                    }
                }
            }
        }
        html+= `<br><br>`
        $("ContractsList").html(html)
    }
}