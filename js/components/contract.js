const openContract = function(contractName, contractSymbol, contractExpiry, contractPrice) {
    $("ContractsList").remove()
    html = `<ContractView>
    <div class="contractWindowName">${contractName}</div>
    <i class="fa fa-angle-left backArrow" onclick="showMarket()"></i>
    <iframe class="chart" scrolling="no" allowtransparency="true" frameborder="0"
        frameborder="0" src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=in#%7B%22symbol%22%3A%22BINANCE%3A${contractSymbol}USDT%22%2C%22width%22%3A350%2C%22height%22%3A200%2C%22dateRange%22%3A%221M%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%7D" ></iframe>
        <blockhide></blockhide>
    <div class="assestmovement">${contractSymbol.toUpperCase()} Price Chart</div>
    <iframe class="chartAnalysis1" scrolling="no" allowtransparency="true" frameborder="0"
     frameborder="0" src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=in#%7B%22symbol%22%3A%22BINANCE%3A${contractSymbol}USDT%22%2C%22width%22%3A350%2C%22height%22%3A200%2C%22dateRange%22%3A%221M%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%7D" ></iframe>
        
    <div class="contractmovement">${contractName} Price Chart</div>
    <div class="info">
        <div class="contractField">Contract</div>
        <div class="contractFieldValue">${contractName}</div>
        <div class="contractField">Underlying Asset</div>
        <div class="contractFieldValue">${contractSymbol.toUpperCase()}</div>
        <div class="contractField">Price</div>
        <div class="contractFieldValue ${contractName}Price">₹${contractPrice}</div>
        <div class="contractField">Min Lot Size</div>
        <div class="contractFieldValue">₹250</div>
        <div class="contractField">Leverage Upto</div>
        <div class="contractFieldValue">5X</div>
        <div class="contractField">Expiry</div>
        <div class="contractFieldValue">${contractExpiry} min</div>
    </div>
    <br>
    <h3 style="text-align: center;">Amount</h3>
    <div class="segment"
        style="width: 280px;margin: 0 auto;text-align: center;width: 90%;left: 5%;position: relative;margin-bottom: 25px;">
        <div class="segment__item">
            <input type="radio" class="segment__input" name="lotSize" value="250" checked>
            <div class="segment__button">₹250</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="500" name="lotSize">
            <div class="segment__button">₹500</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="1000" name="lotSize">
            <div class="segment__button">₹1000</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="2000" name="lotSize">
            <div class="segment__button">₹2000</div>
        </div>
    </div>
    <h3 style="text-align: center;">Leverage</h3>
    <div class="segment"
        style="width: 280px;margin: 0 auto;text-align: center;width: 90%;left: 5%;position: relative;margin-bottom: 25px;">
        <div class="segment__item">
            <input type="radio" class="segment__input" name="leverage" value="1" checked>
            <div class="segment__button">1X</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="2" name="leverage">
            <div class="segment__button">2X</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="3" name="leverage" disabled>
            <div class="segment__button disabled" >3X</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="4" name="leverage" disabled>
            <div class="segment__button disabled">4X</div>
        </div>
        <div class="segment__item">
            <input type="radio" class="segment__input" value="5" name="leverage" disabled>
            <div class="segment__button disabled">5X</div>
        </div>
    </div>

    <div class="contractField">Quantity</div>
    <div class="contractFieldValue qty">1</div>
    <div class="contractField">Position Fee</div>
    <div class="contractFieldValue feeCon">₹0.0</div>
    <div class="profileButtons">
        <button class="button--cta profileButton buyButton" onclick="openPosition('long','${contractName}','${contractSymbol}','${contractExpiry}','${contractPrice}')">LONG</button>
        <button class="button--cta profileButton sellButton" onclick="openPosition('short','${contractName}','${contractSymbol}','${contractExpiry}','${contractPrice}')">SHORT</button>
    </div>
    <br><br>
    <mirror></mirror>
    </ContractView>`
    $("market").html(html)
    window.location.hash = "contract"

    $('input[name="lotSize"]').on('click change', function(e) {
        $(".qty").html(parseInt($('input[name="lotSize"]:checked').val())/250)
        calculateFee()
    });
    $('input[name="leverage"]').on('click change', function(e) {
        calculateFee()
    });
    calculateFee()
}

function calculateFee() {
    amount = parseInt($('input[name="lotSize"]:checked').val())
    fee = (amount*1.5/100) * parseInt($('input[name="leverage"]:checked').val())
    $('.feeCon').html("₹"+fee)
}

const showMarket = function () {
    html = `<ContractsList>${Loader}</ContractsList>`
    $("market").html(html)
    window.location.hash = "home"
    //App.update()
}

