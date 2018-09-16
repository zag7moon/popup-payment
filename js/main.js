var btc_code = "adafaf3424234sdfsf3r2";
var eth_code = "647c3913b21cb8bd66ab78811519fb125d87eefd";
var pay = {
  currency: "BTC",
  code: "adafaf3424234sdfsf3r2",
  count: {
    btc: 0,
    eth: 0
  }
};

let currency = {
  btc: 0.000157,
  eth: 0.0035
};

//<editor-fold defaultstate="collapsed" desc="Футболки женские">
let goods = [
  {
    title: "Briahin",
    desc: "Female T-short, model 1",
    price: 10,
    img: "img/goods/m1.png"
  },
  {
    title: "Ettest",
    desc: "Female T-short, model 2",
    price: 8,
    img: "img/goods/m2.jpg"
  },
  {
    title: "Ckani",
    desc: "Female T-short, model 3",
    price: 12,
    img: "img/goods/m3.jpg"
  },
  {
    title: "Nuel",
    desc: "Female T-short, model 4",
    price: 7,
    img: "img/goods/m4.jpg"
  },
  {
    title: "Kielemilow",
    desc: "Female T-short, model 5",
    price: 4,
    img: "img/goods/m5.jpg"
  },
  {
    title: "Xelizbi",
    desc: "Female T-short, model 6",
    price: 6,
    img: "img/goods/m6.jpg"
  }
];
//</editor-fold>

let cart = [];

$(function() {
  goods.forEach((item, i) => {
    $(`<div class='col-md-6 col-lg-4'` +
      `      <div class='card'>` +
      `        <div class='card-img-top'>` +
      `          <img src='${item.img}'/>` +
      `        </div>` +
      `        <div class='card-body'>` +
      `        <div class='card-title'>${item.title}</div>` +
      `          <div class='d-flex justify-content-between align-items-top'>` +
      `            <div style="padding-right: 1rem;"><small>${item.desc}</small></div>` +
      `            <span class='card-price'>$${item.price}</span>` +
      `          </div>` +
      `          <div class='text-right'>` +
      `            <button type='button' data-target="add-to-cart" data-value="${i}" class='btn btn-sm btn-outline-primary'>Add to cart</button>` +
      `          </div>` +
      `        </div>` +
      `      </div>` +
      `    </div>`).appendTo("#goods");

  });

  var timeout = 86400;
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
});

let usd2btc = (usd, count) => {
  return Math.round(usd * currency.btc * count * 10000000) / 10000000;
};

let usd2eth = (eth, count) => {
  return Math.round(eth * currency.eth * count * 1000000) / 1000000;
};


let reloadCart = () => {
  if(cart.length == 0) {
    $("#cart-items").html("Your shopping cart is empty");
    $("#cart-footer").addClass("d-none");
  } else {
    let total = {
      usd: 0,
      btc: 0,
      eth: 0
    };

    $("#cart-items").html("");
    $(".popup__goods").html("");

    cart.forEach((item) => {
      $(`<div class='d-flex justify-content-between align-items-center'>` +
        `<div><span>${item.count}</span> x <span>${item.title}</span></div>` +
        `<div class="card-price text-right">$${item.price * item.count}</div>` +
        `</div>`).appendTo("#cart-items");
      $(`<div class="popup__goods-item clearfix">
        <span class="popup__goods-name">${item.count} x ${item.title}</span>
        <div class="popup__goods-left">
          <span class="popup__goods-descr">${item.desc}</span>
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

    $("#total-cart").html(total.usd);
    $(".popup__order-price").html("$" + total.usd)
    $("#cart-footer").removeClass("d-none");
  }
};

$("#empty-cart").on("click", ()=>{
  cart = [];
  reloadCart();
});

function makeid() {
  var text = "";
  var possible = "abcdef0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$(document).on('click', '[data-target=add-to-cart]', (btn) => {
  let i = btn.target.getAttribute('data-value');
  if(goods[i]) {
    let add_to_cart = cart.every((item) => {
      if(item.item_id == i) {
        item.count += 1;
        return false;
      }
      return true;
    });
    if(add_to_cart) {
      let item = goods[i];
      item.item_id = i;
      item.count = 1;
      cart.push(item);
    }
  }
  reloadCart();
  $(".popup__right-link-center").attr("href", "track.html?key=" + makeid());
});


$('[data-fancybox]').fancybox({
	toolbar  : false,
	smallBtn : true,
	animationEffect: "zoom-in-out",
	animationDuration: 250,
	zoomOpacity: "auto",
	touch: false
});


function tabs() {
	var $wrap = $('.js-tabs-wrap');

	if ($wrap.length) {
		$wrap.each(function () {
			var $that = $(this),
			$tab = $that.find('.js-tab'),
			$content = $that.find('.js-tab-content');
      $tab.on('click touchstart', function (e) {
				e.preventDefault();
				var self = $(this),
				index = self.index();
				self.addClass('active').siblings().removeClass('active');
				$content.eq(index).addClass('active').siblings().removeClass('active');
				if(index == 0) {
          $(".popup__goods-price-btc").addClass("active");
          $(".popup__goods-price-eth").removeClass("active");
          pay.currency = "BTC";
          pay.code = btc_code;
          $(".pay_count").html(pay.count.btc);
        } else {
          $(".popup__goods-price-eth").addClass("active");
          $(".popup__goods-price-btc").removeClass("active");
          pay.currency = "ETH";
          pay.code = eth_code;
          $(".pay_count").html(pay.count.eth);
        }
        $(".pay_code").html(pay.code);
        $(".pay_currency").html(pay.currency);
			});
		});
	}
}

tabs();


function windowChange() {
	$('.js-window-two').on('click touchstart', function() {
		$('.js-two').addClass('active');
		$('.js-three').removeClass('active');
	})
	$('.js-back-window-one').on('click touchstart', function() {
		$('.js-two').removeClass('active');
	})

	$('.js-window-three').on('click touchstart', function() {
		$('.js-three').addClass('active');
	})

	$('.fancybox-close-small').on('click touchstart', function() {
		$('.js-two').removeClass('active');
		$('.js-three').removeClass('active');
	})
}

windowChange();

function clickRefresh() {
	$('.popup__right-loading svg').on('click', function(e) {
		$(this).css('transform', 'rotate(360deg)');
		e.preventDefault();
	});
}

// clickRefresh();



let element = document.getElementsByClassName('item-circle')[0];
let wrap = document.getElementsByClassName("popup__right-loading")[0];

let startDeg = 0;


let clickHandler = (event) => {
	let target = event.target;
	if (target.classList.contains('item-circle')) {
		startDeg+=360;
		target.style.transform = `rotate(${startDeg}deg)`;

	}
};

if (typeof wrap !== "undefined" && wrap !== null) {
	wrap.addEventListener('click', clickHandler);
}

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
