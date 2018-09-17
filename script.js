const me = document.currentScript

//
// Parsing data-* attributes
//
const merchantId = me.getAttribute('data-merchant-id')
const orderId = me.getAttribute('data-order-id')
const orderItems = JSON.parse(me.getAttribute('data-order-items'))

//
// Defining constants and data structures
//
const btc_code = "adafaf3424234sdfsf3r2";
const eth_code = "647c3913b21cb8bd66ab78811519fb125d87eefd";
const pay = {
  currency: "BTC",
  code: "adafaf3424234sdfsf3r2",
  count: {
    btc: 0,
    eth: 0
  }
};

const currency = {
  btc: 0.000157,
  eth: 0.0035
};


//
// Insert 'Checkout' button near script tag
//
me.parentElement.innerHTML += `<button id="checkout-btn" onclick="showPopup()">Checkout</button>`


const showPopup = () => {
  document.getElementById('popup-container').classList.add('is-active')
}

const hidePopup = () => {
  document.getElementById('popup').classList.add('popup--zoomout')
  setTimeout(() => {
    document.getElementById('popup').classList.remove('popup--zoomout')
    document.getElementById('popup-container').classList.remove('is-active')
  }, 300)
}


//
// Insert 'Checkout-Popup' to page body
//
document.body.innerHTML += `
  <div id="popup-container" class="popup-container">
    <div id="popup" class="popup clearfix">
      <div class="popup-close" onclick="hidePopup()"></div>
      <div class="popup__left">
        <div class="popup__invoice">
          Invoice will expire in <span class="popup_right-timeout">23:59:59</span>
        </div>
        <span class="popup__order-number">
        Order #${orderId}
        </span>
        <span class="popup__order-text">
        There are many variations of passages
        </span>
        <span class="popup__order-price">
        450 000 USD
        </span>
        <div class="popup__goods"></div>
      </div>
      <div class="popup__right">
        <div class="popup__right-one js-tabs-wrap">
          <div class="popup__right-content-wrapp clearfix">
            <div class="popup__right-content js-tab-content-btc active">
              <span class="popup__right-caption">Pay in Bitcoin</span>
              <span class="popup__right-text">
              Send exactly <span class="popup__right-total-btc blue"></span> to the address below.
              </span>
              <input class="popup__right-address" value="adafaf3424234sdfsf3r2" />
              <div class="popup__right-copy-wrapp">
                <span class="popup__right-copy">
                Copy address
                </span>
              </div>
              <div class="popup__right-qr">
                <img src="img/qr.png" alt="">
              </div>
            </div>
            <div class="popup__right-content js-tab-content-eth">
              <span class="popup__right-caption">Pay in Ethereum</span>
              <span class="popup__right-text">
              Send exactly <span class="popup__right-total-eth blue"></span> to the address below. Rate will expire in 00:24
              </span>
              <input class="popup__right-address" value="647c3913b21cb8bd66ab78811519fb125d87eefd" />
              <div class="popup__right-copy-wrapp">
                <span class="popup__right-copy">
                Copy address
                </span>
              </div>
              <div class="popup__right-qr">
                <img src="img/qr.png" alt="">
              </div>
            </div>
          </div>
          <div class="popup__right-bott clearfix">
            <div class="popup__right-currency">
              <span class="popup__right-text-pay">Pay in</span>
              <div class="popup__right-tab-wrapp">
                <span class="popup__right-tab js-tab-btc active">
                BTC
                </span>
                <span class="popup__right-tab js-tab-eth">ETH</span>
              </div>
            </div>
            <div class="popup__right-btn-wrapp">
              <a class="popup__right-btn js-window-three">I paid</a>
            </div>
          </div>
          <div class="popup__right-links-wrapp clearfix">
            <div class="popup__right-link-wrapp">
              <a href="mailto:pochta@mail.ru" class="popup__right-link-bott">Contact the merchant</a>
            </div>
            <div class="popup__right-link-wrapp">
              <a class="popup__right-link-bott js-window-two" style="color:black;">How to pay?</a>
            </div>
          </div>
        </div>
        <div class="popup__right-two js-two">
          <span class="popup__right-caption">How to pay?</span>
          <p class="popup__right-descr-text">
            Please send <span class="popup-bold"><span class="pay_count">0</span> <span class="pay_currency">BTC</span></span>
            to <span class="popup-bold pay_code"></span> (make sure the amount send is enough to cover the fees). You will
            have to initiate a payment using your software or online-wallet (eg. <a href="#">Blockchain.com</a>,
            <a href="#">MyEtherWallet</a>, <a href="">MetaMask</a>). We will send you an email when funds are received.
          </p>
          <p class="popup__right-descr-text">
            After payment, look at the status of your transaction on this page. Once the payment is confirmed several times
            (usually it takes 5-10 minutes) it will be completed and the seller will be notified. The status page will be
            available for the next 30 days.
          </p>
          <p class="popup__right-descr-text">
            If you sent out insufficient funds – do not worry. Simply send the missing part and we will combine these
            translations for you. You can also make transfers from several wallet / accounts.
          </p>
          <div class="popup__right-back js-back-window-one">Back</div>
        </div>
        <div class="popup__right-three js-three">
          <span class="popup__right-caption">Waiting for confirmation</span>
          <span class="popup__right-text-center">
          We expect confirmation of your payment, usually it takes a couple of minutes, you will receive an email
          notification, track your payment you can follow the link:
          </span>
          <div class="popup__right-wrapp-center">
            <a href="track.html" class="popup__right-link-center">payment tracking</a>
          </div>
          <div class="popup__right-continue">
            <button data-fancybox-close onclick="$('.js-three').removeClass('active');" class="popup__right-continue-btn" >Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`


//
// Handle content change on right side of popup based on btc/eth
//
document.querySelector('.js-tab-btc').onclick = () => {
  document.querySelector('.js-tab-btc').classList.add('active')
  document.querySelector('.js-tab-eth').classList.remove('active')

  document.querySelector('.js-tab-content-btc').classList.add('active')
  document.querySelector('.js-tab-content-eth').classList.remove('active')

  document.querySelectorAll('.popup__goods-price-btc').forEach(item => item.classList.add('active'))
  document.querySelectorAll('.popup__goods-price-eth').forEach(item => item.classList.remove('active'))
  pay.currency = "BTC";
  pay.code = btc_code;
  document.querySelector('.pay_count').innerHTML = pay.count.btc;

  document.querySelector('.pay_code').innerHTML = pay.code;
  document.querySelector('.pay_currency').innerHTML = pay.currency;
}

document.querySelector('.js-tab-eth').onclick = () => {
  document.querySelector('.js-tab-btc').classList.remove('active')
  document.querySelector('.js-tab-eth').classList.add('active')

  document.querySelector('.js-tab-content-btc').classList.remove('active')
  document.querySelector('.js-tab-content-eth').classList.add('active')

  document.querySelectorAll('.popup__goods-price-btc').forEach(item => item.classList.remove('active'))
  document.querySelectorAll('.popup__goods-price-eth').forEach(item => item.classList.add('active'))
  pay.currency = "ETH";
  pay.code = eth_code;
  document.querySelector('.pay_count').innerHTML = pay.count.eth;

  document.querySelector('.pay_code').innerHTML = pay.code;
  document.querySelector('.pay_currency').innerHTML = pay.currency;
}

//
// Handle content change on rigth side of popup based on requested content
//

document.querySelector('.js-window-two').addEventListener('click', () => {
  document.querySelector('.js-two').classList.add('active');
  document.querySelector('.js-three').classList.remove('active');
})
document.querySelector('.js-back-window-one').addEventListener('click', () => {
  document.querySelector('.js-two').classList.remove('active');
})

document.querySelector('.js-window-three').addEventListener('click', () => {
  document.querySelector('.js-three').classList.add('active');
})

//
// Copy address to clipboard on 'copy' button click
//
$(document).on('click', '.popup__right-copy', (link) => {
  let address = $(link.target).parents('.popup__right-content').find('.popup__right-address')[0];
  $(address).select();
  document.execCommand('copy');
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
});

//
// Initialize values
//
let timeout = 86400;
$("#checkout-btn").on("click", () => {
  pay.currency = "BTC";
  pay.code = btc_code;
  $(".pay_count").html(pay.count.btc);
  $(".pay_code").html("BTC");
  $(".pay_currency").html(btc_code);
  timeout = 86400;
});
setInterval(()=>{
  timeout--;
  let h = Math.floor(timeout / 3600);
  let m = Math.floor((timeout - h * 3600) / 60);
  let s = Math.floor(timeout - h * 3600 - m * 60);
  $(".popup_right-timeout").html(`${h}:${m}:${s}`);
}, 1000);


const usd2btc = (usd, count) => {
  return Math.round(usd * currency.btc * count * 10000000) / 10000000;
};

const usd2eth = (eth, count) => {
  return Math.round(eth * currency.eth * count * 1000000) / 1000000;
};

$(".popup__goods").html("");

const total = {
  usd: 0,
  btc: 0,
  eth: 0
};

orderItems.forEach((item) => {
  $(`<div class="popup__goods-item clearfix">
    <span class="popup__goods-name">${item.count} x ${item.title}</span>
    <div class="popup__goods-left">
      <span class="popup__goods-descr">${item.description}</span>
    </div>
    <div class="popup__goods-right clearfix">
      <span class="popup__goods-price">$${item.price * item.count}</span>
      <span class="popup__goods-price-btc active">BTC ${usd2btc(item.price, item.count)}</span>
      <span class="popup__goods-price-eth">ETH ${usd2eth(item.price, item.count)}</span>
    </div>
  </div>`).appendTo(".popup__goods");
  total.usd += item.price * item.count;
  total.btc += usd2btc(item.price, item.count);
  total.eth += usd2eth(item.price, item.count);
});
pay.count.btc = total.btc;
pay.count.eth = total.eth;

$(".popup__right-total-btc").html(total.btc);
$(".popup__right-total-eth").html(total.eth);
$(".popup__order-price").html("$" + total.usd);
