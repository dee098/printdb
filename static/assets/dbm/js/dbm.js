
  const CONFIG = {
    docsApiUrl: "https://mdbootstrap.com/api/docs"
  };

  const supportedLanguages = {
    en: {
      flag: 'united kingdom',
      name: 'English'
    },
    cn: {
      flag: 'china',
      name: '中文'
    }
  };

  function getSiteLanguage() {
    const [, language ] = location.pathname.split('/');
    switch (language) {
      case 'cn': return 'cn';
      case 'es': return 'cn';
      default: return 'en';
    }
  }

  function getCurrentTechnology(url) {
    const currentUrl = url || location.pathname;
    switch (true) {
      case (currentUrl.indexOf('/docs/standard') === 0): return 'standard';
      case (currentUrl.indexOf('/docs/angular') === 0): return 'b5-angular';
      case (currentUrl.indexOf('/docs/b5/angular') === 0): return 'b5-angular';
      case (currentUrl.indexOf('/docs/react') === 0): return 'b5-react';
      case (currentUrl.indexOf('/docs/b5/react') === 0): return 'b5-react';
      case (currentUrl.indexOf('/docs/b5/vue') === 0): return 'b5-vue';
      case (currentUrl.indexOf('/docs/b4/jquery') === 0): return 'jquery';
      case (currentUrl.indexOf('/docs/b4/angular') === 0): return 'angular';
      case (currentUrl.indexOf('/docs/b4/react') === 0): return 'react';
      case (currentUrl.indexOf('/docs/vue') === 0): return 'b5-vue';
      case (currentUrl.indexOf('/docs/b4/vue') === 0): return 'vue';
    }
  }

  function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  }



  (function ($) {
  'use strict';

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  
  $(function () {
    $("#mdb-lightbox-ui").load("assets/dbm/mdb-lightbox-ui.html");
  });

  $(document).ready(function () {
    $('.mdb-select').materialSelect();
    $("#license").addClass("mdb-select price-select");
    
    $("#license").hide();
    

    
    new WOW().init();

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    $(".button-collapse").sideNav();
    var el = document.querySelector('.custom-scrollbar');
    var ps = new PerfectScrollbar(el);
  });


  
  $('body').scrollspy({
    target: '#scrollspy'
  })

  $(function () {
    $(".sticky").sticky({
      topSpacing: 90,
      zIndex: 2,
      stopper: "#footer"
    });
    $('a[href="#docsTabsAPI"]').on('shown.bs.tab', function (e) {
      $(".sticky2").sticky({
        topSpacing: 90,
        zIndex: 2,
        stopper: "#footer"
      });
    });
    $('a[href="#docsTabsExamples"]').on('shown.bs.tab', function (e) {
      $(".sticky3").sticky({
        topSpacing: 90
        , zIndex: 2
        , stopper: "#footer"
      });
    });
  });

  $(function () {
    $(".sticky-long").sticky({
      topSpacing: 90,
      zIndex: 2,
      startScrolling: 'bottom',
      stopper: "#footer"
    });
  });

  $(document).ready(function () {
    var type = window.location.hash.substr(1);
    if (type==="docsTabsAPI") {
      if($("#docsTabsAPI").length) {
        $('[href="#docsTabsAPI"]').tab('show');
      }
      $('html, body').animate({scrollTop:0}, 'slow');
    } else if (type==="docsTabsOverview") {

      $('html, body').animate({scrollTop:0}, 'slow');
    }

    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-mtd a').not('#docs-tab-examples').click(function (e) {

      var scrollurl = $('body').scrollTop() || $('html').scrollTop();

      window.location.hash = this.hash;
      $('html, body').scrollTop(scrollurl);
    });
  })

  $(document).ready(function () {
    const searchInput = document.getElementById('mdw_serach');

    const searchDropdown = document.getElementById('mdw_serach_dropdown_wrapper');

    let searchJsonFile = 'assets/dbm/search-v4/';

    switch ("jquery") {
      case 'angular':
        searchJsonFile += 'search-angular.json'
        break;
      case 'react':
        searchJsonFile += 'search-react.json'
        break;
      case 'vue':
        searchJsonFile += 'search-vue.json'
        break;
      default:
        searchJsonFile += 'search.json'
        break;
    }

    const search = new Search(searchInput, searchDropdown, searchJsonFile);

    search.init();
  })
  

  
  
  
  
  
  
  
  

  
  $('#contactForm').on('show.bs.modal', function () {
    $('.wpcf7-select').materialSelect('destroy');
    $('.wpcf7-select').materialSelect();
  });

  
  $('#contactForm').on('hide.bs.modal', function () {
    $('.wpcf7-select').materialSelect('destroy');
  });

  
  

  
  $("#dynamicContentWrapper-Homepage").on("click", ".dc-panel-remove", function (e) {
    $("#dynamicContentWrapper-Homepage").remove();
  });

  $("div[class*='woocommerce-MyAccount']").on("click", "#get-invoice-request", function (e) {
    e.preventDefault();

    var self = $(this);

    var desination = $(this).attr("href");

    var orderId = $(this).attr("data-order-id");
    var data = {
      action: "requestInvoice",
      order_id: orderId
    };

    $.ajax({
      url: mdw_search_object.ajaxurl,
      method: "POST",
      data: data
    }).done(function (response) {
      console.log(response);
      response = JSON.parse(response);

      if (response.status == "sent") {
        $("p", self).text(response.message);
      } else {
        window.location.replace(desination);
      }

    }).fail(function (err) {
      console.log(err);
    });
  });

  $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-invoice", function (e) {
    e.preventDefault();

    var self = $(this);

    self.html("<i class='fa fa-spinner fa-spin'></i> Processing...");

    var orderId = $(this).attr("data-order-id");
    var data = {
      action: "approveInvoiceRequest",
      order_id: orderId
    };

    $.ajax({
      url: mdw_search_object.ajaxurl,
      method: "POST",
      data: data
    }).done(function (response) {
      console.log(response);

      self.html("<i class='fa fa-check'></i> Done").attr("class", "btn btn-success");
    }).fail(function (err) {
      console.log(err);

      try {

        err = JSON.stringify(err);
      } catch (ex) {}

      self.html("<i class='fa fa-times'></i> Error").attr("class", "btn btn-danger");
      self.after("<b>Error:</b> " + err);
    });
  });

  $("#invoice-forms").on("click", function (e) {
    e.preventDefault();

    $("nav[class*='woocommerce-MyAccount'] ul li").each(function () {
      $(this).removeClass("is-active");
    });

    $(this).parent().addClass("is-active");

    $(".woocommerce div[class*='woocommerce-MyAccount']").html("<table></table>");
    var invoiceRequestTable = $(".woocommerce div[class*='woocommerce-MyAccount'] table");

    invoiceRequestTable.attr("class", "shop_table shop_table_responsive");

    var thead = "<thead>" +
      "<tr>" +
      '<th><input placeholder="Order ID" id="toEditOrderIdInput" type="number" value=""></input><a id="confirm-edited-invoice" class="btn btn-primary" href="#">Confirm</a><a id="confirm-new-invoice" class="btn btn-primary" href="#">Blank</a></th>' +
      "</tr>" +
      "</thead>";
    var tbody = "<tbody>";
    tbody += "<tr><td>No new requests.</td><td></td></tr>";
    tbody += "</tbody>";

    invoiceRequestTable.append(thead);
    invoiceRequestTable.append(tbody);

  });

  $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-edited-invoice", function (e) {
    e.preventDefault();
    var order_id = $('#toEditOrderIdInput').val();
    var data = {
      action: "getInvoiceRequestForm",
      order_id: order_id
    };

    $.ajax({
      url: mdw_search_object.ajaxurl,
      method: "POST",
      data: data
    }).done(function (response) {
      response = JSON.parse(response);
      console.log(response);

      var requests = response.requests;

      var billing_invoice_checkbox = requests.meta_data.filter(function (o) {
        return o.key == '_billing_invoice_checkbox'
      });
      var billing_vat = requests.meta_data.filter(function (o) {
        return o.key == '_billing_vat'
      });
      var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");

      var tbody = "<tr><td id='invoiceDataToInsert'><p><label for='invoice_id'>Order ID</label><input value='" + requests.id + "' type='text' name='invoice_id' id='invoice_id' /></p>";
      if (billing_invoice_checkbox[0] !== undefined) {
        tbody += "<p><label for='billing_invoice_checkbox'>billing_invoice_checkbox</label><input value='" + billing_invoice_checkbox[0].value + "' type='text' name='billing_invoice_checkbox' id='billing_invoice_checkbox' /></p>"
      }
      tbody += "<p><label for='payment_method'>payment_method</label><input value='" + requests.payment_method + "' type='text' name='payment_method' id='payment_method' /></p>"

      if (billing_vat[0] !== undefined) {
        tbody += "<p><label for='billing_vat'>billing_vat</label><input value='" + billing_vat[0].value + "' type='text' name='billing_vat' id='billing_vat' /></p>"
      }
      tbody += "<p><label for='billing_company'>billing_company</label><input value='" + requests.billing.company + "' type='text' name='billing_company' id='billing_company' /></p>"
      tbody += "<p><label for='billing_address_1'>billing_address_1</label><input value='" + requests.billing.address_1 + "' type='text' name='billing_address_1' id='billing_address_1' /></p>"
      tbody += "<p><label for='billing_address_2'>billing_address_2</label><input value='" + requests.billing.address_2 + "' type='text' name='billing_address_2' id='billing_address_2' /></p>"
      tbody += "<p><label for='billing_city'>billing_city</label><input value='" + requests.billing.city + "' type='text' name='billing_city' id='billing_city' /></p>"
      tbody += "<p><label for='customer_id'>customer_id</label><input value='" + requests.customer_id + "' type='text' name='customer_id' id='customer_id' /></p>"
      tbody += "<a id='save-edited-invoice' class='btn btn-primary' href='#'>Save</a></td></tr>";

      invoiceRequestForm.empty();
      invoiceRequestForm.append(tbody);
    }).fail(function (err) {
      console.log(err);
    });
  });

  $("div[class*='woocommerce-MyAccount']").on("click", "table #confirm-new-invoice", function (e) {
    e.preventDefault();

    var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");

    var tbody = "<tr><td id='invoiceDataToInsert'><p><label for='invoice_id'>Order ID</label><input disabled value='new order' type='text' name='invoice_id' id='invoice_id' /></p>";
    tbody += "<p><label for='billing_invoice_checkbox'>billing_invoice_checkbox</label><input value='' type='text' name='billing_invoice_checkbox' id='billing_invoice_checkbox' /></p>"
    tbody += "<p><label for='payment_method'>payment_method</label><input value='' type='text' name='payment_method' id='payment_method' /></p>"

    tbody += "<p><label for='billing_vat'>billing_vat</label><input value='' type='text' name='billing_vat' id='billing_vat' /></p>"
    tbody += "<p><label for='billing_company'>billing_company</label><input value='' type='text' name='billing_company' id='billing_company' /></p>"
    tbody += "<p><label for='billing_address_1'>billing_address_1</label><input value='' type='text' name='billing_address_1' id='billing_address_1' /></p>"
    tbody += "<p><label for='billing_address_2'>billing_address_2</label><input value='' type='text' name='billing_address_2' id='billing_address_2' /></p>"
    tbody += "<p><label for='billing_city'>billing_city</label><input value='' type='text' name='billing_city' id='billing_city' /></p>"
    tbody += "<p><label for='customer_id'>customer_id</label><input value='' type='text' name='customer_id' id='customer_id' /></p>"
    tbody += "<a id='save-edited-invoice' class='btn btn-primary' href='#'>Save</a></td></tr>";

    invoiceRequestForm.empty();
    invoiceRequestForm.append(tbody);
  });

  $("div[class*='woocommerce-MyAccount']").on("click", "table #save-edited-invoice", function (e) {
    e.preventDefault();

    var new_order_meta_data = {
      _billing_invoice_checkbox: $('#billing_invoice_checkbox').val(),
      _billing_vat: $('#billing_vat').val()
    }
    var order_data = {
      payment_method: $('#payment_method').val(),
      billing_address_1: $('#billing_address_1').val(),
      billing_address_2: $('#billing_address_2').val(),
      billing_city: $('#billing_city').val(),
      billing_company: $('#billing_company').val()
    }
    var order_id = $('#invoice_id').val();
    var data = {
      action: "saveNewOrEditedOrder",
      order_id: order_id,
      new_order_meta_data: new_order_meta_data,
      order_data: order_data
    };

    $.ajax({
      url: mdw_search_object.ajaxurl,
      method: "POST",
      data: data
    }).done(function (response) {
      response = JSON.parse(response);
      console.log(response);
      var invoiceRequestForm = $("table.shop_table.shop_table_responsive tbody");
      invoiceRequestForm.empty();
    }).fail(function (err) {
      console.log(err);
    });

  })


  $("#invoice-requests-list").on("click", function (e) {
    e.preventDefault();

    $("nav[class*='woocommerce-MyAccount'] ul li").each(function () {
      $(this).removeClass("is-active");
    });

    $(this).parent().addClass("is-active");

    var data = {
      action: "getInvoiceRequests"
    };

    $.ajax({
      url: mdw_search_object.ajaxurl,
      method: "POST",
      data: data
    }).done(function (response) {
      response = JSON.parse(response);
      console.log(response);

      var requests = response.requests;

      $(".woocommerce div[class*='woocommerce-MyAccount']").html("<table></table>");
      var invoiceRequestsListTable = $(".woocommerce div[class*='woocommerce-MyAccount'] table");

      invoiceRequestsListTable.attr("class", "shop_table shop_table_responsive");

      var thead = "<thead>" +
        "<tr>" +
        "<th>Order</th>" +
        "<th>Actions</th>" +
        "</tr>" +
        "</thead>";


      var tbody = "<tbody>";

      if (requests.length === 0) {
        tbody += "<tr><td>No new requests.</td><td></td></tr>";
      } else {
        for (var i = 0; i < requests.length; i++) {
          var order = requests[i];

          tbody += "<tr>" +
            "<td>" +
            "<ul style='list-style-type:none;'>" +
            "<li><b>Order ID:</b> " + order.order_id + "</li>" +
            "<li><b>Invoice Date:</b> " + order.invoice_date + "</li>" +
            "<li><b>VAT Number:</b> " + order.vat_number + "</li>" +
            "<li><b>Buyer Name:</b> " + order.buyer_name + "</li>" +
            "<li><b>Country:</b> " + order.country + "</li>" +
            "<li><b>Tax:</b> " + order.tax + "</li>" +
            "<li><b>Netto:</b> " + order.netto + "</li>" +
            "<li><b>Brutto:</b> " + order.brutto + "</li>" +
            "<li><b>EU:</b> " + order.eu_valid + "</li>" +
            "</ul>" +
            "</td>" +
            "<td>" +
            "<a id='confirm-invoice' class='btn btn-primary' data-order-id='" + order.order_id + "' href='#'>Confirm</a>" +
            "</td>" +
            "</tr>";
        }
      }


      tbody += "</tbody>";

      invoiceRequestsListTable.append(thead);
      invoiceRequestsListTable.append(tbody);

    }).fail(function (err) {
      console.log(err);
    });
  });

  var commentsCounter = $('span.counter');
  commentsCounter.each(function () {
    if ($(this).text() === 0 || $(this).text() === '') {
      $(this).css('display', 'none');
    }
  })

  function init_media() {
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
      if (vidDefer[i].getAttribute('data-src')) {
        vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
      }
    }
    
    
    
    
    
    
  }
  window.onload = init_media;

  function saveUserFirstDownloadFreePackageDate( technology ) {

    var cookieName = 'mdb_free_download_date_' + technology + '=';
    var cookies = decodeURIComponent(document.cookie).split(';');
    var cookieExists = false;
    var cookieValue = '';

    for( var i = 0; i < cookies.length; i++ ) {
      var c = cookies[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) == 0) {
        cookieExists = true;
        cookieValue = c.substring(cookieName.length, c.length);
      }
    }

    if( !cookieExists ) {

      var currDate = new Date();
      var day = String(currDate.getDate()).padStart(2, '0');
      var month = String(currDate.getMonth() + 1).padStart(2, '0');
      var year = currDate.getFullYear();

      currDate = year + '-' + month + '-' + day;
      cookieValue = 'mdb_' + currDate;

      var expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime()+60*60*24*365);
      var expires = '; expires=' + expiresDate.toGMTString();

      document.cookie = 'mdb_free_download_date_' + technology + '=' + cookieValue + expires + '; path=/';
    }
  }

  $("#getStart-content-directDownload-jquery, #getStart-content-gitDownload-jquery").on("click", function () {
    saveUserFirstDownloadFreePackageDate( 'jq' );
  });
  $("#getStart-content-directDownload-angular, #getStart-content-gitDownload-angular").on("click", function () {
    saveUserFirstDownloadFreePackageDate( 'ng' );
  });
  $("#getStart-content-directDownload-react, #getStart-content-gitDownload-react").on("click", function () {
    saveUserFirstDownloadFreePackageDate( 're' );
  });
  $("#getStart-content-directDownload-vue, #getStart-content-gitDownload-vue").on("click", function () {
    saveUserFirstDownloadFreePackageDate( 'vu' );
  });

  
  
  
  
  
  
  
  
  
  
  
  
  

  
  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img[data-lazysrc]'));
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.lazysrc;
            lazyImage.removeAttribute('data-lazysrc');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  });

})(jQuery);


  document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelectorAll('#slide-out #side-menu li').forEach((menu)=>{
      menu.querySelectorAll('ul.sub-menu li').forEach((link)=>{
        var is_active = link.querySelector('a.collapsible-header').classList.contains('current-page');
        var collapseIcon = menu.querySelector('.rotate-icon');

        if (is_active && collapseIcon) {
          $(link).addClass('current-menu-item')
          $(link).parents('.collapsible-body').siblings().addClass('active')
          return false;
        }
      });
    });

    const setTransitionProperties = () => {
      const sidenav = document.getElementById('slide-out');
      const rotateIcons = sidenav.querySelectorAll('.rotate-icon');
      const collapse = sidenav.querySelectorAll('.collapsible-body');

      rotateIcons.forEach(icon => {
        icon.style.transitionProperty = 'transform'
      });

      collapse.forEach(collapse => {
        collapse.style.transitionProperty = 'height'
      });
    }

    setTimeout(setTransitionProperties, 1);
  });

  ! function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function (t) {
      return e(t, window, document)
    }) : "object" == typeof exports ? module.exports = function (t, a) {
      return t || (t = window), a || (a = "undefined" != typeof window ? require(
        "jquery") : require("jquery")(t)), e(
        a, t, t.document)
    } : e(jQuery, window, document)
  }(function (e, t, a, r) {
    "use strict";

    function A(t) {
      var r, n, a = "a aa ai ao as b fn i m o s ",
        i = {};
      e.each(t, function (e, l) {
        r = e.match(/^([^A-Z]+?)([A-Z])/), r && -1 !== a.indexOf(r[1] + " ") && (n =
          e.replace(r[0], r[2]
            .toLowerCase()), i[n] = e, "o" === r[1] && A(t[e]))
      }), t._hungarianMap = i
    }

    function F(t, a, n) {
      t._hungarianMap || A(t);
      var i;
      e.each(a, function (l, o) {
        i = t._hungarianMap[l], i === r || !n && a[i] !== r || ("o" === i.charAt(
          0) ? (a[i] || (a[i] = {}), e
            .extend(!0, a[i], a[l]), F(t[i], a[i], n)) : a[i] = a[l])
      })
    }

    function L(e) {
      var t = n.defaults.oLanguage,
        a = t.sDecimal;
      if (a && Xt(a), e) {
        var r = e.sZeroRecords;
        !e.sEmptyTable && r && "No data available in table" === t.sEmptyTable && ct(e,
            e, "sZeroRecords",
            "sEmptyTable"), !e.sLoadingRecords && r && "Loading..." === t
          .sLoadingRecords && ct(e, e, "sZeroRecords",
            "sLoadingRecords"), e.sInfoThousands && (e.sThousands = e.sInfoThousands);
        var i = e.sDecimal;
        i && a !== i && Xt(i)
      }
    }

    function R(e) {
      P(e, "ordering", "bSort"), P(e, "orderMulti", "bSortMulti"), P(e, "orderClasses",
          "bSortClasses"), P(e,
          "orderCellsTop", "bSortCellsTop"), P(e, "order", "aaSorting"), P(e,
          "orderFixed", "aaSortingFixed"), P(e,
          "paging", "bPaginate"), P(e, "pagingType", "sPaginationType"), P(e,
          "pageLength", "iDisplayLength"), P(e,
          "searching", "bFilter"), "boolean" == typeof e.sScrollX && (e.sScrollX = e
          .sScrollX ? "100%" : ""),
        "boolean" == typeof e.scrollX && (e.scrollX = e.scrollX ? "100%" : "");
      var t = e.aoSearchCols;
      if (t)
        for (var a = 0, r = t.length; r > a; a++) t[a] && F(n.models.oSearch, t[a])
    }

    function j(t) {
      P(t, "orderable", "bSortable"), P(t, "orderData", "aDataSort"), P(t,
        "orderSequence", "asSorting"), P(t,
        "orderDataType", "sortDataType");
      var a = t.aDataSort;
      "number" != typeof a || e.isArray(a) || (t.aDataSort = [a])
    }

    function N(a) {
      if (!n.__browser) {
        var r = {};
        n.__browser = r;
        var i = e("<div/>").css({
            position: "fixed",
            top: 0,
            left: -1 * e(t).scrollLeft(),
            height: 1,
            width: 1,
            overflow: "hidden"
          }).append(e("<div/>").css({
            position: "absolute",
            top: 1,
            left: 1,
            width: 100,
            overflow: "scroll"
          }).append(e("<div/>").css({
            width: "100%",
            height: 10
          }))).appendTo("body"),
          l = i.children(),
          o = l.children();
        r.barWidth = l[0].offsetWidth - l[0].clientWidth, r.bScrollOversize = 100 === o[
            0].offsetWidth && 100 !== l[0]
          .clientWidth, r.bScrollbarLeft = 1 !== Math.round(o.offset().left), r
          .bBounding = i[0]
          .getBoundingClientRect().width ? !0 : !1, i.remove()
      }
      e.extend(a.oBrowser, n.__browser), a.oScroll.iBarWidth = n.__browser.barWidth
    }

    function H(e, t, a, n, i, l) {
      var s, o = n,
        u = !1;
      for (a !== r && (s = a, u = !0); o !== i;) e.hasOwnProperty(o) && (s = u ? t(s, e[
          o], o, e) : e[o], u = !0, o +=
        l);
      return s
    }

    function k(t, r) {
      var i = n.defaults.column,
        l = t.aoColumns.length,
        o = e.extend({}, n.models.oColumn, i, {
          nTh: r ? r : a.createElement("th"),
          sTitle: i.sTitle ? i.sTitle : r ? r.innerHTML : "",
          aDataSort: i.aDataSort ? i.aDataSort : [l],
          mData: i.mData ? i.mData : l,
          idx: l
        });
      t.aoColumns.push(o);
      var s = t.aoPreSearchCols;
      s[l] = e.extend({}, n.models.oSearch, s[l]), O(t, l, e(r).data())
    }

    function O(t, a, i) {
      var l = t.aoColumns[a],
        o = t.oClasses,
        s = e(l.nTh);
      if (!l.sWidthOrig) {
        l.sWidthOrig = s.attr("width") || null;
        var u = (s.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
        u && (l.sWidthOrig = u[1])
      }
      i !== r && null !== i && (j(i), F(n.defaults.column, i), i.mDataProp === r || i
        .mData || (i.mData = i
          .mDataProp), i.sType && (l._sManualType = i.sType), i.className && !i
        .sClass && (i.sClass = i.className), i
        .sClass && s.addClass(i.sClass), e.extend(l, i), ct(l, i, "sWidth",
          "sWidthOrig"), i.iDataSort !== r && (l
          .aDataSort = [i.iDataSort]), ct(l, i, "aDataSort"));
      var f = l.mData,
        c = ee(f),
        d = l.mRender ? ee(l.mRender) : null,
        h = function (e) {
          return "string" == typeof e && -1 !== e.indexOf("@")
        };
      l._bAttrSrc = e.isPlainObject(f) && (h(f.sort) || h(f.type) || h(f.filter)), l
        ._setter = null, l.fnGetData =
        function (e, t, a) {
          var n = c(e, t, r, a);
          return d && t ? d(n, t, e, a) : n
        }, l.fnSetData = function (e, t, a) {
          return te(f)(e, t, a)
        }, "number" != typeof f && (t._rowReadObject = !0), t.oFeatures.bSort || (l
          .bSortable = !1, s.addClass(o
            .sSortableNone));
      var p = -1 !== e.inArray("asc", l.asSorting),
        v = -1 !== e.inArray("desc", l.asSorting);
      l.bSortable && (p || v) ? p && !v ? (l.sSortingClass = o.sSortableAsc, l
        .sSortingClassJUI = o
        .sSortJUIAscAllowed) : !p && v ? (l.sSortingClass = o.sSortableDesc, l
        .sSortingClassJUI = o
        .sSortJUIDescAllowed) : (l.sSortingClass = o.sSortable, l.sSortingClassJUI = o
        .sSortJUI) : (l
        .sSortingClass = o.sSortableNone, l.sSortingClassJUI = "")
    }

    function M(e) {
      if (e.oFeatures.bAutoWidth !== !1) {
        var t = e.aoColumns;
        $e(e);
        for (var a = 0, r = t.length; r > a; a++) t[a].nTh.style.width = t[a].sWidth
      }
      var n = e.oScroll;
      ("" !== n.sY || "" !== n.sX) && Je(e), vt(e, null, "column-sizing", [e])
    }

    function W(e, t) {
      var a = U(e, "bVisible");
      return "number" == typeof a[t] ? a[t] : null
    }

    function B(t, a) {
      var r = U(t, "bVisible"),
        n = e.inArray(a, r);
      return -1 !== n ? n : null
    }

    function E(t) {
      var a = 0;
      return e.each(t.aoColumns, function (t, r) {
        r.bVisible && "none" !== e(r.nTh).css("display") && a++
      }), a
    }

    function U(t, a) {
      var r = [];
      return e.map(t.aoColumns, function (e, t) {
        e[a] && r.push(t)
      }), r
    }

    function V(e) {
      var l, o, s, u, f, c, d, p, v, t = e.aoColumns,
        a = e.aoData,
        i = n.ext.type.detect;
      for (l = 0, o = t.length; o > l; l++)
        if (d = t[l], v = [], !d.sType && d._sManualType) d.sType = d._sManualType;
        else if (!d.sType) {
        for (s = 0, u = i.length; u > s; s++) {
          for (f = 0, c = a.length; c > f && (v[f] === r && (v[f] = z(e, f, l, "type")),
              p = i[s](v[f], e), p || s ===
              i.length - 1) && "html" !== p; f++);
          if (p) {
            d.sType = p;
            break
          }
        }
        d.sType || (d.sType = "string")
      }
    }

    function X(t, a, n, i) {
      var l, o, s, u, f, c, d, h = t.aoColumns;
      if (a)
        for (l = a.length - 1; l >= 0; l--) {
          d = a[l];
          var p = d.targets !== r ? d.targets : d.aTargets;
          for (e.isArray(p) || (p = [p]), s = 0, u = p.length; u > s; s++)
            if ("number" == typeof p[s] && p[s] >= 0) {
              for (; h.length <= p[s];) k(t);
              i(p[s], d)
            } else if ("number" == typeof p[s] && p[s] < 0) i(h.length + p[s], d);
          else if ("string" == typeof p[s])
            for (f = 0, c = h.length; c > f; f++)("_all" == p[s] || e(h[f].nTh)
              .hasClass(p[s])) && i(f, d)
        }
      if (n)
        for (l = 0, o = n.length; o > l; l++) i(l, n[l])
    }

    function J(t, a, i, l) {
      var o = t.aoData.length,
        s = e.extend(!0, {}, n.models.oRow, {
          src: i ? "dom" : "data",
          idx: o
        });
      s._aData = a, t.aoData.push(s);
      for (var c = t.aoColumns, d = 0, h = c.length; h > d; d++) c[d].sType = null;
      t.aiDisplayMaster.push(o);
      var p = t.rowIdFn(a);
      return p !== r && (t.aIds[p] = s), (i || !t.oFeatures.bDeferRender) && oe(t, o, i,
        l), o
    }

    function q(t, a) {
      var r;
      return a instanceof e || (a = e(a)), a.map(function (e, a) {
        return r = le(t, a), J(t, r.data, a, r.cells)
      })
    }

    function G(e, t) {
      return t._DT_RowIndex !== r ? t._DT_RowIndex : null
    }

    function $(t, a, r) {
      return e.inArray(r, t.aoData[a].anCells)
    }

    function z(e, t, a, n) {
      var i = e.iDraw,
        l = e.aoColumns[a],
        o = e.aoData[t]._aData,
        s = l.sDefaultContent,
        u = l.fnGetData(o, n, {
          settings: e,
          row: t,
          col: a
        });
      if (u === r) return e.iDrawError != i && null === s && (ft(e, 0,
          "Requested unknown parameter " + ("function" ==
            typeof l.mData ? "{function}" : "'" + l.mData + "'") + " for row " + t +
          ", column " + a, 4), e
        .iDrawError = i), s;
      if (u !== o && null !== u || null === s || n === r) {
        if ("function" == typeof u) return u.call(o)
      } else u = s;
      return null === u && "display" == n ? "" : u
    }

    function Y(e, t, a, r) {
      var n = e.aoColumns[a],
        i = e.aoData[t]._aData;
      n.fnSetData(i, r, {
        settings: e,
        row: t,
        col: a
      })
    }

    function K(t) {
      return e.map(t.match(/(\\.|[^\.])+/g) || [""], function (e) {
        return e.replace(/\\\./g, ".")
      })
    }

    function ee(t) {
      if (e.isPlainObject(t)) {
        var a = {};
        return e.each(t, function (e, t) {
            t && (a[e] = ee(t))
          }),
          function (e, t, n, i) {
            var l = a[t] || a._;
            return l !== r ? l(e, t, n, i) : e
          }
      }
      if (null === t) return function (e) {
        return e
      };
      if ("function" == typeof t) return function (e, a, r, n) {
        return t(e, a, r, n)
      };
      if ("string" != typeof t || -1 === t.indexOf(".") && -1 === t.indexOf("[") && -
        1 === t.indexOf("("))
        return function (e, a) {
          return e[t]
        };
      var n = function (t, a, i) {
        var l, o, s, u;
        if ("" !== i)
          for (var f = K(i), c = 0, d = f.length; d > c; c++) {
            if (l = f[c].match(Z), o = f[c].match(Q), l) {
              if (f[c] = f[c].replace(Z, ""), "" !== f[c] && (t = t[f[c]]), s = [], f
                .splice(0, c + 1), u = f.join(
                  "."), e.isArray(t))
                for (var h = 0, p = t.length; p > h; h++) s.push(n(t[h], a, u));
              var v = l[0].substring(1, l[0].length - 1);
              t = "" === v ? s : s.join(v);
              break
            }
            if (o) f[c] = f[c].replace(Q, ""), t = t[f[c]]();
            else {
              if (null === t || t[f[c]] === r) return r;
              t = t[f[c]]
            }
          }
        return t
      };
      return function (e, a) {
        return n(e, a, t)
      }
    }

    function te(t) {
      if (e.isPlainObject(t)) return te(t._);
      if (null === t) return function () {};
      if ("function" == typeof t) return function (e, a, r) {
        t(e, "set", a, r)
      };
      if ("string" != typeof t || -1 === t.indexOf(".") && -1 === t.indexOf("[") && -
        1 === t.indexOf("("))
        return function (e, a) {
          e[t] = a
        };
      var a = function (t, n, i) {
        for (var o, u, f, c, d, l = K(i), s = l[l.length - 1], h = 0, p = l.length -
          1; p > h; h++) {
          if (u = l[h].match(Z), f = l[h].match(Q), u) {
            if (l[h] = l[h].replace(Z, ""), t[l[h]] = [], o = l.slice(), o.splice(0,
                h + 1), d = o.join("."), e
              .isArray(n))
              for (var v = 0, g = n.length; g > v; v++) c = {}, a(c, n[v], d), t[l[h]]
                .push(c);
            else t[l[h]] = n;
            return
          }
          f && (l[h] = l[h].replace(Q, ""), t = t[l[h]](n)), (null === t[l[h]] || t[l[
              h]] === r) && (t[l[h]] = {}),
            t = t[l[h]]
        }
        s.match(Q) ? t = t[s.replace(Q, "")](n) : t[s.replace(Z, "")] = n
      };
      return function (e, r) {
        return a(e, r, t)
      }
    }

    function ae(e) {
      return y(e.aoData, "_aData")
    }

    function re(e) {
      e.aoData.length = 0, e.aiDisplayMaster.length = 0, e.aiDisplay.length = 0, e
        .aIds = {}
    }

    function ne(e, t, a) {
      for (var n = -1, i = 0, l = e.length; l > i; i++) e[i] == t ? n = i : e[i] > t &&
        e[i]--; - 1 != n && a === r &&
        e.splice(n, 1)
    }

    function ie(e, t, a, n) {
      var l, o, i = e.aoData[t],
        s = function (a, r) {
          for (; a.childNodes.length;) a.removeChild(a.firstChild);
          a.innerHTML = z(e, t, r, "display")
        };
      if ("dom" !== a && (a && "auto" !== a || "dom" !== i.src)) {
        var u = i.anCells;
        if (u)
          if (n !== r) s(u[n], n);
          else
            for (l = 0, o = u.length; o > l; l++) s(u[l], l)
      } else i._aData = le(e, i, n, n === r ? r : i._aData).data;
      i._aSortData = null, i._aFilterData = null;
      var f = e.aoColumns;
      if (n !== r) f[n].sType = null;
      else {
        for (l = 0, o = f.length; o > l; l++) f[l].sType = null;
        se(e, i)
      }
    }

    function le(t, a, n, i) {
      var s, u, d, l = [],
        o = a.firstChild,
        c = 0,
        h = t.aoColumns,
        p = t._rowReadObject;
      i = i !== r ? i : p ? {} : [];
      var v = function (e, t) {
          if ("string" == typeof e) {
            var a = e.indexOf("@");
            if (-1 !== a) {
              var r = e.substring(a + 1),
                n = te(e);
              n(i, t.getAttribute(r))
            }
          }
        },
        g = function (t) {
          if (n === r || n === c)
            if (u = h[c], d = e.trim(t.innerHTML), u && u._bAttrSrc) {
              var a = te(u.mData._);
              a(i, d), v(u.mData.sort, t), v(u.mData.type, t), v(u.mData.filter, t)
            } else p ? (u._setter || (u._setter = te(u.mData)), u._setter(i, d)) : i[
              c] = d;
          c++
        };
      if (o)
        for (; o;) s = o.nodeName.toUpperCase(), ("TD" == s || "TH" == s) && (g(o), l
          .push(o)), o = o.nextSibling;
      else {
        l = a.anCells;
        for (var b = 0, m = l.length; m > b; b++) g(l[b])
      }
      var S = a.firstChild ? a : a.nTr;
      if (S) {
        var D = S.getAttribute("id");
        D && te(t.rowId)(i, D)
      }
      return {
        data: i,
        cells: l
      }
    }

    function oe(t, r, n, i) {
      var u, f, c, d, h, l = t.aoData[r],
        o = l._aData,
        s = [];
      if (null === l.nTr) {
        for (u = n || a.createElement("tr"), l.nTr = u, l.anCells = s, u._DT_RowIndex =
          r, se(t, l), d = 0, h = t
          .aoColumns.length; h > d; d++) c = t.aoColumns[d], f = n ? i[d] : a
          .createElement(c.sCellType), f
          ._DT_CellIndex = {
            row: r,
            column: d
          }, s.push(f), n && !c.mRender && c.mData === d || e.isPlainObject(c.mData) &&
          c.mData._ === d +
          ".display" || (f.innerHTML = z(t, r, d, "display")), c.sClass && (f
            .className += " " + c.sClass), c
          .bVisible && !n ? u.appendChild(f) : !c.bVisible && n && f.parentNode
          .removeChild(f), c.fnCreatedCell && c
          .fnCreatedCell.call(t.oInstance, f, z(t, r, d), o, r, d);
        vt(t, "aoRowCreatedCallback", null, [u, o, r, s])
      }
      l.nTr.setAttribute("role", "row")
    }

    function se(t, a) {
      var r = a.nTr,
        n = a._aData;
      if (r) {
        var i = t.rowIdFn(n);
        if (i && (r.id = i), n.DT_RowClass) {
          var l = n.DT_RowClass.split(" ");
          a.__rowc = a.__rowc ? I(a.__rowc.concat(l)) : l, e(r).removeClass(a.__rowc
            .join(" ")).addClass(n
            .DT_RowClass)
        }
        n.DT_RowAttr && e(r).attr(n.DT_RowAttr), n.DT_RowData && e(r).data(n.DT_RowData)
      }
    }

    function ue(t) {
      var a, r, n, i, l, o = t.nTHead,
        s = t.nTFoot,
        u = 0 === e("th, td", o).length,
        f = t.oClasses,
        c = t.aoColumns;
      for (u && (i = e("<tr/>").appendTo(o)), a = 0, r = c.length; r > a; a++) l = c[a],
        n = e(l.nTh).addClass(l
          .sClass), u && n.appendTo(i), t.oFeatures.bSort && (n.addClass(l
          .sSortingClass), l.bSortable !== !1 && (n
          .attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId), nt(t, l
            .nTh, a))), l.sTitle != n[0]
        .innerHTML && n.html(l.sTitle), bt(t, "header")(t, n, l, f);
      if (u && pe(t.aoHeader, o), e(o).find(">tr").attr("role", "row"), e(o).find(
          ">tr>th, >tr>td").addClass(f
          .sHeaderTH), e(s).find(">tr>th, >tr>td").addClass(f.sFooterTH), null !== s) {
        var d = t.aoFooter[0];
        for (a = 0, r = d.length; r > a; a++) l = c[a], l.nTf = d[a].cell, l.sClass &&
          e(l.nTf).addClass(l.sClass)
      }
    }

    function fe(t, a, n) {
      var i, l, o, s, u, c, d, g, b, h = [],
        p = [],
        v = t.aoColumns.length;
      if (a) {
        for (n === r && (n = !1), i = 0, l = a.length; l > i; i++) {
          for (h[i] = a[i].slice(), h[i].nTr = a[i].nTr, o = v - 1; o >= 0; o--) t
            .aoColumns[o].bVisible || n || h[i]
            .splice(o, 1);
          p.push([])
        }
        for (i = 0, l = h.length; l > i; i++) {
          if (d = h[i].nTr)
            for (; c = d.firstChild;) d.removeChild(c);
          for (o = 0, s = h[i].length; s > o; o++)
            if (g = 1, b = 1, p[i][o] === r) {
              for (d.appendChild(h[i][o].cell), p[i][o] = 1; h[i + g] !== r && h[i][o]
                .cell == h[i + g][o].cell;) p[
                i + g][o] = 1, g++;
              for (; h[i][o + b] !== r && h[i][o].cell == h[i][o + b].cell;) {
                for (u = 0; g > u; u++) p[i + u][o + b] = 1;
                b++
              }
              e(h[i][o].cell).attr("rowspan", g).attr("colspan", b)
            }
        }
      }
    }

    function ce(t) {
      var a = vt(t, "aoPreDrawCallback", "preDraw", [t]);
      if (-1 !== e.inArray(!1, a)) return void Ve(t, !1);
      var o = [],
        s = 0,
        u = t.asStripeClasses,
        f = u.length,
        d = (t.aoOpenRows.length, t.oLanguage),
        h = t.iInitDisplayStart,
        p = "ssp" == mt(t),
        v = t.aiDisplay;
      t.bDrawing = !0, h !== r && -1 !== h && (t._iDisplayStart = p ? h : h >= t
        .fnRecordsDisplay() ? 0 : h, t
        .iInitDisplayStart = -1);
      var g = t._iDisplayStart,
        b = t.fnDisplayEnd();
      if (t.bDeferLoading) t.bDeferLoading = !1, t.iDraw++, Ve(t, !1);
      else if (p) {
        if (!t.bDestroying && !be(t)) return
      } else t.iDraw++;
      if (0 !== v.length)
        for (var m = p ? 0 : g, S = p ? t.aoData.length : b, D = m; S > D; D++) {
          var y = v[D],
            _ = t.aoData[y];
          null === _.nTr && oe(t, y);
          var w = _.nTr;
          if (0 !== f) {
            var T = u[s % f];
            _._sRowStripe != T && (e(w).removeClass(_._sRowStripe).addClass(T), _
              ._sRowStripe = T)
          }
          vt(t, "aoRowCallback", null, [w, _._aData, s, D, y]), o.push(w), s++
        } else {
          var C = d.sZeroRecords;
          1 == t.iDraw && "ajax" == mt(t) ? C = d.sLoadingRecords : d.sEmptyTable &&
            0 === t.fnRecordsTotal() && (C =
              d.sEmptyTable), o[0] = e("<tr/>", {
              "class": f ? u[0] : ""
            }).append(e("<td />", {
              valign: "top",
              colSpan: E(t),
              "class": t.oClasses.sRowEmpty
            }).html(C))[0]
        }
      vt(t, "aoHeaderCallback", "header", [e(t.nTHead).children("tr")[0], ae(t), g, b,
        v]), vt(t, "aoFooterCallback",
        "footer", [e(t.nTFoot).children("tr")[0], ae(t), g, b, v]);
      var x = e(t.nTBody);
      x.children().detach(), x.append(e(o)), vt(t, "aoDrawCallback", "draw", [t]), t
        .bSorted = !1, t.bFiltered = !1, t
        .bDrawing = !1
    }

    function de(e, t) {
      var a = e.oFeatures,
        r = a.bSort,
        n = a.bFilter;
      r && tt(e), n ? _e(e, e.oPreviousSearch) : e.aiDisplay = e.aiDisplayMaster
      .slice(), t !== !0 && (e
          ._iDisplayStart = 0), e._drawHold = t, ce(e), e._drawHold = !1
    }

    function he(t) {
      var a = t.oClasses,
        r = e(t.nTable),
        i = e("<div/>").insertBefore(r),
        l = t.oFeatures,
        o = e("<div/>", {
          id: t.sTableId + "_wrapper",
          "class": a.sWrapper + (t.nTFoot ? "" : " " + a.sNoFooter)
        });
      t.nHolding = i[0], t.nTableWrapper = o[0], t.nTableReinsertBefore = t.nTable
        .nextSibling;
      for (var u, f, c, d, h, p, s = t.sDom.split(""), v = 0; v < s.length; v++) {
        if (u = null, f = s[v], "<" == f) {
          if (c = e("<div/>")[0], d = s[v + 1], "'" == d || '"' == d) {
            for (h = "", p = 2; s[v + p] != d;) h += s[v + p], p++;
            if ("H" == h ? h = a.sJUIHeader : "F" == h && (h = a.sJUIFooter), -1 != h
              .indexOf(".")) {
              var g = h.split(".");
              c.id = g[0].substr(1, g[0].length - 1), c.className = g[1]
            } else "#" == h.charAt(0) ? c.id = h.substr(1, h.length - 1) : c.className =
              h;
            v += p
          }
          o.append(c), o = e(c)
        } else if (">" == f) o = o.parent();
        else if ("l" == f && l.bPaginate && l.bLengthChange) u = We(t);
        else if ("f" == f && l.bFilter) u = ye(t);
        else if ("r" == f && l.bProcessing) u = Ue(t);
        else if ("t" == f) u = Xe(t);
        else if ("i" == f && l.bInfo) u = je(t);
        else if ("p" == f && l.bPaginate) u = Be(t);
        else if (0 !== n.ext.feature.length)
          for (var b = n.ext.feature, m = 0, S = b.length; S > m; m++)
            if (f == b[m].cFeature) {
              u = b[m].fnInit(t);
              break
            } if (u) {
          var D = t.aanFeatures;
          D[f] || (D[f] = []), D[f].push(u), o.append(u)
        }
      }
      i.replaceWith(o), t.nHolding = null
    }

    function pe(t, a) {
      var n, i, l, o, s, u, c, d, h, p, v, r = e(a).children("tr"),
        g = function (e, t, a) {
          for (var r = e[t]; r[a];) a++;
          return a
        };
      for (t.splice(0, t.length), l = 0, u = r.length; u > l; l++) t.push([]);
      for (l = 0, u = r.length; u > l; l++)
        for (n = r[l], d = 0, i = n.firstChild; i;) {
          if ("TD" == i.nodeName.toUpperCase() || "TH" == i.nodeName.toUpperCase())
            for (h = 1 * i.getAttribute("colspan"), p = 1 * i.getAttribute("rowspan"),
              h = h && 0 !== h && 1 !== h ?
              h : 1, p = p && 0 !== p && 1 !== p ? p : 1, c = g(t, l, d), v = 1 === h ?
              !0 : !1, s = 0; h > s; s++)
              for (o = 0; p > o; o++) t[l + o][c + s] = {
                cell: i,
                unique: v
              }, t[l + o].nTr = n;
          i = i.nextSibling
        }
    }

    function ve(e, t, a) {
      var r = [];
      a || (a = e.aoHeader, t && (a = [], pe(a, t)));
      for (var n = 0, i = a.length; i > n; n++)
        for (var l = 0, o = a[n].length; o > l; l++) !a[n][l].unique || r[l] && e
          .bSortCellsTop || (r[l] = a[n][l]
            .cell);
      return r
    }

    function ge(t, a, r) {
      if (vt(t, "aoServerParams", "serverParams", [a]), a && e.isArray(a)) {
        var n = {},
          i = /(.*?)\[\]$/;
        e.each(a, function (e, t) {
          var a = t.name.match(i);
          if (a) {
            var r = a[0];
            n[r] || (n[r] = []), n[r].push(t.value)
          } else n[t.name] = t.value
        }), a = n
      }
      var l, o = t.ajax,
        s = t.oInstance,
        u = function (e) {
          vt(t, null, "xhr", [t, e, t.jqXHR]), r(e)
        };
      if (e.isPlainObject(o) && o.data) {
        l = o.data;
        var f = "function" == typeof l ? l(a, t) : l;
        a = "function" == typeof l && f ? f : e.extend(!0, a, f), delete o.data
      }
      var c = {
        data: a,
        success: function (e) {
          var a = e.error || e.sError;
          a && ft(t, 0, a), t.json = e, u(e)
        },
        dataType: "json",
        cache: !1,
        type: t.sServerMethod,
        error: function (a, r, n) {
          var i = vt(t, null, "xhr", [t, null, t.jqXHR]); - 1 === e.inArray(!0,
            i) && ("parsererror" == r ? ft(t,
              0, "Invalid JSON response", 1) : 4 === a.readyState && ft(t, 0,
              "Ajax error", 7)), Ve(t, !1)
        }
      };
      t.oAjaxData = a, vt(t, null, "preXhr", [t, a]), t.fnServerData ? t.fnServerData
        .call(s, t.sAjaxSource, e.map(a,
          function (e, t) {
            return {
              name: t,
              value: e
            }
          }), u, t) : t.sAjaxSource || "string" == typeof o ? t.jqXHR = e.ajax(e.extend(
          c, {
            url: o || t.sAjaxSource
          })) : "function" == typeof o ? t.jqXHR = o.call(s, a, u, t) : (t.jqXHR = e
          .ajax(e.extend(c, o)), o.data = l)
    }

    function be(e) {
      return e.bAjaxDataGet ? (e.iDraw++, Ve(e, !0), ge(e, me(e), function (t) {
        Se(e, t)
      }), !1) : !0
    }

    function me(t) {
      var s, f, c, d, a = t.aoColumns,
        r = a.length,
        i = t.oFeatures,
        l = t.oPreviousSearch,
        o = t.aoPreSearchCols,
        u = [],
        h = et(t),
        p = t._iDisplayStart,
        v = i.bPaginate !== !1 ? t._iDisplayLength : -1,
        g = function (e, t) {
          u.push({
            name: e,
            value: t
          })
        };
      g("sEcho", t.iDraw), g("iColumns", r), g("sColumns", y(a, "sName").join(",")), g(
        "iDisplayStart", p), g(
        "iDisplayLength", v);
      var b = {
        draw: t.iDraw,
        columns: [],
        order: [],
        start: p,
        length: v,
        search: {
          value: l.sSearch,
          regex: l.bRegex
        }
      };
      for (s = 0; r > s; s++) c = a[s], d = o[s], f = "function" == typeof c.mData ?
        "function" : c.mData, b.columns
        .push({
          data: f,
          name: c.sName,
          searchable: c.bSearchable,
          orderable: c.bSortable,
          search: {
            value: d.sSearch,
            regex: d.bRegex
          }
        }), g("mDataProp_" + s, f), i.bFilter && (g("sSearch_" + s, d.sSearch), g(
          "bRegex_" + s, d.bRegex), g(
          "bSearchable_" + s, c.bSearchable)), i.bSort && g("bSortable_" + s, c
          .bSortable);
      i.bFilter && (g("sSearch", l.sSearch), g("bRegex", l.bRegex)), i.bSort && (e.each(
        h,
        function (e, t) {
          b.order.push({
            column: t.col,
            dir: t.dir
          }), g("iSortCol_" + e, t.col), g("sSortDir_" + e, t.dir)
        }), g("iSortingCols", h.length));
      var m = n.ext.legacy.ajax;
      return null === m ? t.sAjaxSource ? u : b : m ? u : b
    }

    function Se(e, t) {
      var a = function (e, a) {
          return t[e] !== r ? t[e] : t[a]
        },
        n = De(e, t),
        i = a("sEcho", "draw"),
        l = a("iTotalRecords", "recordsTotal"),
        o = a("iTotalDisplayRecords", "recordsFiltered");
      if (i) {
        if (1 * i < e.iDraw) return;
        e.iDraw = 1 * i
      }
      re(e), e._iRecordsTotal = parseInt(l, 10), e._iRecordsDisplay = parseInt(o, 10);
      for (var s = 0, u = n.length; u > s; s++) J(e, n[s]);
      e.aiDisplay = e.aiDisplayMaster.slice(), e.bAjaxDataGet = !1, ce(e), e
        ._bInitComplete || Oe(e, t), e
        .bAjaxDataGet = !0, Ve(e, !1)
    }

    function De(t, a) {
      var n = e.isPlainObject(t.ajax) && t.ajax.dataSrc !== r ? t.ajax.dataSrc : t
        .sAjaxDataProp;
      return "data" === n ? a.aaData || a[n] : "" !== n ? ee(n)(a) : a
    }

    function ye(t) {
      var r = t.oClasses,
        n = t.sTableId,
        i = t.oLanguage,
        l = t.oPreviousSearch,
        o = t.aanFeatures,
        s = '<input type="search" class="' + r.sFilterInput + '"/>',
        u = i.sSearch;
      u = u.match(/_INPUT_/) ? u.replace("_INPUT_", s) : u + s;
      var f = e("<div/>", {
          id: o.f ? null : n + "_filter",
          "class": r.sFilter
        }).append(e("<label/>").append(u)),
        c = function () {
          var a = (o.f, this.value ? this.value : "");
          a != l.sSearch && (_e(t, {
            sSearch: a,
            bRegex: l.bRegex,
            bSmart: l.bSmart,
            bCaseInsensitive: l.bCaseInsensitive
          }), t._iDisplayStart = 0, ce(t))
        },
        d = null !== t.searchDelay ? t.searchDelay : "ssp" === mt(t) ? 400 : 0,
        h = e("input", f).val(l.sSearch).attr("placeholder", i.sSearchPlaceholder).on(
          "keyup.DT search.DT input.DT paste.DT cut.DT", d ? ze(c, d) : c).on(
          "keypress.DT",
          function (e) {
            return 13 == e.keyCode ? !1 : void 0
          }).attr("aria-controls", n);
      return e(t.nTable).on("search.dt.DT", function (e, r) {
        if (t === r) try {
          h[0] !== a.activeElement && h.val(l.sSearch)
        } catch (n) {}
      }), f[0]
    }

    function _e(e, t, a) {
      var n = e.oPreviousSearch,
        i = e.aoPreSearchCols,
        l = function (e) {
          n.sSearch = e.sSearch, n.bRegex = e.bRegex, n.bSmart = e.bSmart, n
            .bCaseInsensitive = e.bCaseInsensitive
        },
        o = function (e) {
          return e.bEscapeRegex !== r ? !e.bEscapeRegex : e.bRegex
        };
      if (V(e), "ssp" != mt(e)) {
        Ce(e, t.sSearch, a, o(t), t.bSmart, t.bCaseInsensitive), l(t);
        for (var s = 0; s < i.length; s++) Te(e, i[s].sSearch, s, o(i[s]), i[s].bSmart,
          i[s].bCaseInsensitive);
        we(e)
      } else l(t);
      e.bFiltered = !0, vt(e, null, "search", [e])
    }

    function we(t) {
      for (var i, l, a = n.ext.search, r = t.aiDisplay, o = 0, s = a.length; s >
        o; o++) {
        for (var u = [], f = 0, c = r.length; c > f; f++) l = r[f], i = t.aoData[l], a[
          o](t, i._aFilterData, l, i
          ._aData, f) && u.push(l);
        r.length = 0, e.merge(r, u)
      }
    }

    function Te(e, t, a, r, n, i) {
      if ("" !== t) {
        for (var l, o = [], s = e.aiDisplay, u = xe(t, r, n, i), f = 0; f < s
          .length; f++) l = e.aoData[s[f]]
          ._aFilterData[a], u.test(l) && o.push(s[f]);
        e.aiDisplay = o
      }
    }

    function Ce(e, t, a, r, i, l) {
      var f, c, d, o = xe(t, r, i, l),
        s = e.oPreviousSearch.sSearch,
        u = e.aiDisplayMaster,
        h = [];
      if (0 !== n.ext.search.length && (a = !0), c = Le(e), t.length <= 0) e.aiDisplay =
        u.slice();
      else {
        for ((c || a || s.length > t.length || 0 !== t.indexOf(s) || e.bSorted) && (e
            .aiDisplay = u.slice()), f = e
          .aiDisplay, d = 0; d < f.length; d++) o.test(e.aoData[f[d]]._sFilterRow) && h
          .push(f[d]);
        e.aiDisplay = h
      }
    }

    function xe(t, a, r, n) {
      if (t = a ? t : Ie(t), r) {
        var i = e.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function (e) {
          if ('"' === e.charAt(0)) {
            var t = e.match(/^"(.*)"$/);
            e = t ? t[1] : e
          }
          return e.replace('"', "")
        });
        t = "^(?=.*?" + i.join(")(?=.*?") + ").*$"
      }
      return new RegExp(t, n ? "i" : "")
    }

    function Le(e) {
      var a, r, i, l, o, s, u, f, t = e.aoColumns,
        c = n.ext.type.search,
        d = !1;
      for (r = 0, l = e.aoData.length; l > r; r++)
        if (f = e.aoData[r], !f._aFilterData) {
          for (s = [], i = 0, o = t.length; o > i; i++) a = t[i], a.bSearchable ? (u =
              z(e, r, i, "filter"), c[a
                .sType] && (u = c[a.sType](u)), null === u && (u = ""), "string" !=
              typeof u && u.toString && (u = u
                .toString())) : u = "", u.indexOf && -1 !== u.indexOf("&") && (Ae
              .innerHTML = u, u = Fe ? Ae
              .textContent : Ae.innerText), u.replace && (u = u.replace(/[\r\n]/g, "")),
            s.push(u);
          f._aFilterData = s, f._sFilterRow = s.join("  "), d = !0
        } return d
    }

    function Pe(e) {
      return {
        search: e.sSearch,
        smart: e.bSmart,
        regex: e.bRegex,
        caseInsensitive: e.bCaseInsensitive
      }
    }

    function Re(e) {
      return {
        sSearch: e.search,
        bSmart: e.smart,
        bRegex: e.regex,
        bCaseInsensitive: e.caseInsensitive
      }
    }

    function je(t) {
      var a = t.sTableId,
        r = t.aanFeatures.i,
        n = e("<div/>", {
          "class": t.oClasses.sInfo,
          id: r ? null : a + "_info"
        });
      return r || (t.aoDrawCallback.push({
          fn: Ne,
          sName: "information"
        }), n.attr("role", "status").attr("aria-live", "polite"), e(t.nTable).attr(
          "aria-describedby", a + "_info")),
        n[0]
    }

    function Ne(t) {
      var a = t.aanFeatures.i;
      if (0 !== a.length) {
        var r = t.oLanguage,
          n = t._iDisplayStart + 1,
          i = t.fnDisplayEnd(),
          l = t.fnRecordsTotal(),
          o = t.fnRecordsDisplay(),
          s = o ? r.sInfo : r.sInfoEmpty;
        o !== l && (s += " " + r.sInfoFiltered), s += r.sInfoPostFix, s = He(t, s);
        var u = r.fnInfoCallback;
        null !== u && (s = u.call(t.oInstance, t, n, i, l, o, s)), e(a).html(s)
      }
    }

    function He(e, t) {
      var a = e.fnFormatNumber,
        r = e._iDisplayStart + 1,
        n = e._iDisplayLength,
        i = e.fnRecordsDisplay(),
        l = -1 === n;
      return t.replace(/_START_/g, a.call(e, r)).replace(/_END_/g, a.call(e, e
        .fnDisplayEnd())).replace(/_MAX_/g, a
        .call(e, e.fnRecordsTotal())).replace(/_TOTAL_/g, a.call(e, i)).replace(
        /_PAGE_/g, a.call(e, l ? 1 : Math
          .ceil(r / n))).replace(/_PAGES_/g, a.call(e, l ? 1 : Math.ceil(i / n)))
    }

    function ke(e) {
      var t, a, i, r = e.iInitDisplayStart,
        n = e.aoColumns,
        l = e.oFeatures,
        o = e.bDeferLoading;
      if (!e.bInitialised) return void setTimeout(function () {
        ke(e)
      }, 200);
      for (he(e), ue(e), fe(e, e.aoHeader), fe(e, e.aoFooter), Ve(e, !0), l
        .bAutoWidth && $e(e), t = 0, a = n
        .length; a > t; t++) i = n[t], i.sWidth && (i.nTh.style.width = Ke(i.sWidth));
      vt(e, null, "preInit", [e]), de(e);
      var s = mt(e);
      ("ssp" != s || o) && ("ajax" == s ? ge(e, [], function (a) {
        var n = De(e, a);
        for (t = 0; t < n.length; t++) J(e, n[t]);
        e.iInitDisplayStart = r, de(e), Ve(e, !1), Oe(e, a)
      }, e) : (Ve(e, !1), Oe(e)))
    }

    function Oe(e, t) {
      e._bInitComplete = !0, (t || e.oInit.aaData) && M(e), vt(e, null, "plugin-init", [
        e, t
      ]), vt(e,
        "aoInitComplete", "init", [e, t])
    }

    function Me(e, t) {
      var a = parseInt(t, 10);
      e._iDisplayLength = a, gt(e), vt(e, null, "length", [e, a])
    }

    function We(t) {
      for (var a = t.oClasses, r = t.sTableId, n = t.aLengthMenu, i = e.isArray(n[0]),
          l = i ? n[0] : n, o = i ? n[
            1] : n, s = e("<select/>", {
            name: r + "_length",
            "aria-controls": r,
            "class": a.sLengthSelect
          }), u = 0, f = l.length; f > u; u++) s[0][u] = new Option("number" ==
        typeof o[u] ? t.fnFormatNumber(o[u]) :
        o[u], l[u]);
      var c = e("<div><label/></div>").addClass(a.sLength);
      return t.aanFeatures.l || (c[0].id = r + "_length"), c.children().append(t
        .oLanguage.sLengthMenu.replace(
          "_MENU_", s[0].outerHTML)), e("select", c).val(t._iDisplayLength).on(
        "change.DT",
        function (a) {
          Me(t, e(this).val()), ce(t)
        }), e(t.nTable).on("length.dt.DT", function (a, r, n) {
        t === r && e("select", c).val(n)
      }), c[0]
    }

    function Be(t) {
      var a = t.sPaginationType,
        r = n.ext.pager[a],
        i = "function" == typeof r,
        l = function (e) {
          ce(e)
        },
        o = e("<div/>").addClass(t.oClasses.sPaging + a)[0],
        s = t.aanFeatures;
      return i || r.fnInit(t, o, l), s.p || (o.id = t.sTableId + "_paginate", t
        .aoDrawCallback.push({
          fn: function (e) {
            if (i) {
              var d, h, t = e._iDisplayStart,
                a = e._iDisplayLength,
                n = e.fnRecordsDisplay(),
                o = -1 === a,
                u = o ? 0 : Math.ceil(t / a),
                f = o ? 1 : Math.ceil(n / a),
                c = r(u, f);
              for (d = 0, h = s.p.length; h > d; d++) bt(e, "pageButton")(e, s.p[
                d], d, c, u, f)
            } else r.fnUpdate(e, l)
          },
          sName: "pagination"
        })), o
    }

    function Ee(e, t, a) {
      var r = e._iDisplayStart,
        n = e._iDisplayLength,
        i = e.fnRecordsDisplay();
      0 === i || -1 === n ? r = 0 : "number" == typeof t ? (r = t * n, r > i && (r =
        0)) : "first" == t ? r = 0 :
        "previous" == t ? (r = n >= 0 ? r - n : 0, 0 > r && (r = 0)) : "next" == t ? i >
        r + n && (r += n) : "last" ==
        t ? r = Math.floor((i - 1) / n) * n : ft(e, 0, "Unknown paging action: " + t,
        5);
      var l = e._iDisplayStart !== r;
      return e._iDisplayStart = r, l && (vt(e, null, "page", [e]), a && ce(e)), l
    }

    function Ue(t) {
      return e("<div/>", {
        id: t.aanFeatures.r ? null : t.sTableId + "_processing",
        "class": t.oClasses.sProcessing
      }).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]
    }

    function Ve(t, a) {
      t.oFeatures.bProcessing && e(t.aanFeatures.r).css("display", a ? "block" :
        "none"), vt(t, null, "processing", [
          t, a
        ])
    }

    function Xe(t) {
      var a = e(t.nTable);
      a.attr("role", "grid");
      var r = t.oScroll;
      if ("" === r.sX && "" === r.sY) return t.nTable;
      var n = r.sX,
        i = r.sY,
        l = t.oClasses,
        o = a.children("caption"),
        s = o.length ? o[0]._captionSide : null,
        u = e(a[0].cloneNode(!1)),
        f = e(a[0].cloneNode(!1)),
        c = a.children("tfoot"),
        d = "<div/>",
        h = function (e) {
          return e ? Ke(e) : null
        };
      c.length || (c = null);
      var p = e(d, {
        "class": l.sScrollWrapper
      }).append(e(d, {
        "class": l.sScrollHead
      }).css({
        overflow: "hidden",
        position: "relative",
        border: 0,
        width: n ? h(n) : "100%"
      }).append(e(d, {
        "class": l.sScrollHeadInner
      }).css({
        "box-sizing": "content-box",
        width: r.sXInner || "100%"
      }).append(u.removeAttr("id").css("margin-left", 0).append("top" === s ? o :
        null).append(a.children(
        "thead"))))).append(e(d, {
        "class": l.sScrollBody
      }).css({
        position: "relative",
        overflow: "auto",
        width: h(n)
      }).append(a));
      c && p.append(e(d, {
        "class": l.sScrollFoot
      }).css({
        overflow: "hidden",
        border: 0,
        width: n ? h(n) : "100%"
      }).append(e(d, {
        "class": l.sScrollFootInner
      }).append(f.removeAttr("id").css("margin-left", 0).append("bottom" === s ?
        o : null).append(a.children(
        "tfoot")))));
      var v = p.children(),
        g = v[0],
        b = v[1],
        m = c ? v[2] : null;
      return n && e(b).on("scroll.DT", function (e) {
          var t = this.scrollLeft;
          g.scrollLeft = t, c && (m.scrollLeft = t)
        }), e(b).css(i && r.bCollapse ? "max-height" : "height", i), t.nScrollHead = g,
        t.nScrollBody = b, t
        .nScrollFoot = m, t.aoDrawCallback.push({
          fn: Je,
          sName: "scrolling"
        }), p[0]
    }

    function Je(t) {
      var A, F, L, P, R, j, B, E, U, a = t.oScroll,
        n = a.sX,
        i = a.sXInner,
        l = a.sY,
        o = a.iBarWidth,
        s = e(t.nScrollHead),
        u = s[0].style,
        f = s.children("div"),
        c = f[0].style,
        d = f.children("table"),
        h = t.nScrollBody,
        p = e(h),
        v = h.style,
        g = e(t.nScrollFoot),
        b = g.children("div"),
        m = b.children("table"),
        S = e(t.nTHead),
        D = e(t.nTable),
        _ = D[0],
        w = _.style,
        T = t.nTFoot ? e(t.nTFoot) : null,
        C = t.oBrowser,
        x = C.bScrollOversize,
        I = y(t.aoColumns, "nTh"),
        N = [],
        H = [],
        k = [],
        O = [],
        V = function (e) {
          var t = e.style;
          t.paddingTop = "0", t.paddingBottom = "0", t.borderTopWidth = "0", t
            .borderBottomWidth = "0", t.height = 0
        },
        X = h.scrollHeight > h.clientHeight;
      if (t.scrollBarVis !== X && t.scrollBarVis !== r) return t.scrollBarVis = X,
        void M(t);
      t.scrollBarVis = X, D.children("thead, tfoot").remove(), T && (j = T.clone()
          .prependTo(D), F = T.find("tr"), P =
          j.find("tr")), R = S.clone().prependTo(D), A = S.find("tr"), L = R.find("tr"),
        R.find("th, td").removeAttr(
          "tabindex"), n || (v.width = "100%", s[0].style.width = "100%"), e.each(ve(t,
          R), function (e, a) {
          B = W(t, e), a.style.width = t.aoColumns[B].sWidth
        }), T && qe(function (e) {
          e.style.width = ""
        }, P), U = D.outerWidth(), "" === n ? (w.width = "100%", x && (D.find("tbody")
            .height() > h.offsetHeight ||
            "scroll" == p.css("overflow-y")) && (w.width = Ke(D.outerWidth() - o)), U =
          D.outerWidth()) : "" !== i && (w
          .width = Ke(i), U = D.outerWidth()), qe(V, L), qe(function (t) {
          k.push(t.innerHTML), N.push(Ke(e(t).css("width")))
        }, L), qe(function (t, a) {
          -1 !== e.inArray(t, I) && (t.style.width = N[a])
        }, A), e(L).height(0), T && (qe(V, P), qe(function (t) {
          O.push(t.innerHTML), H.push(Ke(e(t).css("width")))
        }, P), qe(function (e, t) {
          e.style.width = H[t]
        }, F), e(P).height(0)), qe(function (e, t) {
          e.innerHTML = '<div class="dataTables_sizing">' + k[t] + "</div>", e
            .childNodes[0].style.height = "0", e
            .childNodes[0].style.overflow = "hidden", e.style.width = N[t]
        }, L), T && qe(function (e, t) {
          e.innerHTML = '<div class="dataTables_sizing">' + O[t] + "</div>", e
            .childNodes[0].style.height = "0", e
            .childNodes[0].style.overflow = "hidden", e.style.width = H[t]
        }, P), D.outerWidth() < U ? (E = h.scrollHeight > h.offsetHeight || "scroll" ==
          p.css("overflow-y") ? U + o :
          U, x && (h.scrollHeight > h.offsetHeight || "scroll" == p.css(
          "overflow-y")) && (w.width = Ke(E - o)), (
            "" === n || "" !== i) && ft(t, 1, "Possible column misalignment", 6)) : E =
        "100%", v.width = Ke(E), u
        .width = Ke(E), T && (t.nScrollFoot.style.width = Ke(E)), l || x && (v.height =
          Ke(_.offsetHeight + o));
      var J = D.outerWidth();
      d[0].style.width = Ke(J), c.width = Ke(J);
      var q = D.height() > h.clientHeight || "scroll" == p.css("overflow-y"),
        G = "padding" + (C.bScrollbarLeft ? "Left" : "Right");
      c[G] = q ? o + "px" : "0px", T && (m[0].style.width = Ke(J), b[0].style.width =
          Ke(J), b[0].style[G] = q ? o +
          "px" : "0px"), D.children("colgroup").insertBefore(D.children("thead")), p
        .scroll(), !t.bSorted && !t
        .bFiltered || t._drawHold || (h.scrollTop = 0)
    }

    function qe(e, t, a) {
      for (var l, o, r = 0, n = 0, i = t.length; i > n;) {
        for (l = t[n].firstChild, o = a ? a[n].firstChild : null; l;) 1 === l
          .nodeType && (a ? e(l, o, r) : e(l, r),
            r++), l = l.nextSibling, o = a ? o.nextSibling : null;
        n++
      }
    }

    function $e(a) {
      var v, g, b, r = a.nTable,
        n = a.aoColumns,
        i = a.oScroll,
        l = i.sY,
        o = i.sX,
        s = i.sXInner,
        u = n.length,
        f = U(a, "bVisible"),
        c = e("th", a.nTHead),
        d = r.getAttribute("width"),
        h = r.parentNode,
        p = !1,
        D = a.oBrowser,
        y = D.bScrollOversize,
        _ = r.style.width;
      for (_ && -1 !== _.indexOf("%") && (d = _), v = 0; v < f.length; v++) g = n[f[v]],
        null !== g.sWidth && (g
          .sWidth = Ye(g.sWidthOrig, h), p = !0);
      if (y || !p && !o && !l && u == E(a) && u == c.length)
        for (v = 0; u > v; v++) {
          var w = W(a, v);
          null !== w && (n[w].sWidth = Ke(c.eq(v).width()))
        } else {
          var T = e(r).clone().css("visibility", "hidden").removeAttr("id");
          T.find("tbody tr").remove();
          var C = e("<tr/>").appendTo(T.find("tbody"));
          for (T.find("thead, tfoot").remove(), T.append(e(a.nTHead).clone()).append(e(a
              .nTFoot).clone()), T.find(
              "tfoot th, tfoot td").css("width", ""), c = ve(a, T.find("thead")[0]), v =
            0; v < f.length; v++) g = n[
              f[v]], c[v].style.width = null !== g.sWidthOrig && "" !== g.sWidthOrig ?
            Ke(g.sWidthOrig) : "", g
            .sWidthOrig && o && e(c[v]).append(e("<div/>").css({
              width: g.sWidthOrig,
              margin: 0,
              padding: 0,
              border: 0,
              height: 1
            }));
          if (a.aoData.length)
            for (v = 0; v < f.length; v++) b = f[v], g = n[b], e(Ze(a, b)).clone(!1)
              .append(g.sContentPadding)
              .appendTo(C);
          e("[name]", T).removeAttr("name");
          var x = e("<div/>").css(o || l ? {
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            right: 0,
            overflow: "hidden"
          } : {}).append(T).appendTo(h);
          o && s ? T.width(s) : o ? (T.css("width", "auto"), T.removeAttr("width"), T
            .width() < h.clientWidth && d &&
            T.width(h.clientWidth)) : l ? T.width(h.clientWidth) : d && T.width(d);
          var I = 0;
          for (v = 0; v < f.length; v++) {
            var A = e(c[v]),
              F = A.outerWidth() - A.width(),
              L = D.bBounding ? Math.ceil(c[v].getBoundingClientRect().width) : A
              .outerWidth();
            I += L, n[f[v]].sWidth = Ke(L - F)
          }
          r.style.width = Ke(I), x.remove()
        }
      if (d && (r.style.width = Ke(d)), (d || o) && !a._reszEvt) {
        var P = function () {
          e(t).on("resize.DT-" + a.sInstance, ze(function () {
            M(a)
          }))
        };
        y ? setTimeout(P, 1e3) : P(), a._reszEvt = !0
      }
    }

    function Ye(t, r) {
      if (!t) return 0;
      var n = e("<div/>").css("width", Ke(t)).appendTo(r || a.body),
        i = n[0].offsetWidth;
      return n.remove(), i
    }

    function Ze(t, a) {
      var r = Qe(t, a);
      if (0 > r) return null;
      var n = t.aoData[r];
      return n.nTr ? n.anCells[a] : e("<td/>").html(z(t, r, a, "display"))[0]
    }

    function Qe(e, t) {
      for (var a, r = -1, n = -1, i = 0, l = e.aoData.length; l > i; i++) a = z(e, i, t,
          "display") + "", a = a
        .replace(Ge, ""), a = a.replace(/&nbsp;/g, " "), a.length > r && (r = a.length,
          n = i);
      return n
    }

    function Ke(e) {
      return null === e ? "0px" : "number" == typeof e ? 0 > e ? "0px" : e + "px" : e
        .match(/\d$/) ? e + "px" : e
    }

    function et(t) {
      var a, l, o, c, d, h, p, s = [],
        f = t.aoColumns,
        v = t.aaSortingFixed,
        g = e.isPlainObject(v),
        b = [],
        m = function (t) {
          t.length && !e.isArray(t[0]) ? b.push(t) : e.merge(b, t)
        };
      for (e.isArray(v) && m(v), g && v.pre && m(v.pre), m(t.aaSorting), g && v.post &&
        m(v.post), a = 0; a < b
        .length; a++)
        for (p = b[a][0], c = f[p].aDataSort, l = 0, o = c.length; o > l; l++) d = c[l],
          h = f[d].sType || "string",
          b[a]._idx === r && (b[a]._idx = e.inArray(b[a][1], f[d].asSorting)), s.push({
            src: p,
            col: d,
            dir: b[a][1],
            index: b[a]._idx,
            type: h,
            formatter: n.ext.type.order[h + "-pre"]
          });
      return s
    }

    function tt(e) {
      var t, a, r, y, w, c = [],
        d = n.ext.type.order,
        h = e.aoData,
        D = (e.aoColumns,
          0),
        _ = e.aiDisplayMaster;
      for (V(e), w = et(e), t = 0, a = w.length; a > t; t++) y = w[t], y.formatter &&
        D++, lt(e, y.col);
      if ("ssp" != mt(e) && 0 !== w.length) {
        for (t = 0, r = _.length; r > t; t++) c[_[t]] = t;
        D === w.length ? _.sort(function (e, t) {
          var a, r, n, i, l, o = w.length,
            s = h[e]._aSortData,
            u = h[t]._aSortData;
          for (n = 0; o > n; n++)
            if (l = w[n], a = s[l.col], r = u[l.col], i = r > a ? -1 : a > r ? 1 :
              0, 0 !== i) return "asc" === l
              .dir ? i : -i;
          return a = c[e], r = c[t], r > a ? -1 : a > r ? 1 : 0
        }) : _.sort(function (e, t) {
          var a, r, n, l, o, s, u = w.length,
            f = h[e]._aSortData,
            p = h[t]._aSortData;
          for (n = 0; u > n; n++)
            if (o = w[n], a = f[o.col], r = p[o.col], s = d[o.type + "-" + o.dir] ||
              d["string-" + o.dir], l = s(
                a, r), 0 !== l) return l;
          return a = c[e], r = c[t], r > a ? -1 : a > r ? 1 : 0
        })
      }
      e.bSorted = !0
    }

    function at(e) {
      for (var t, a, r = e.aoColumns, n = et(e), i = e.oLanguage.oAria, l = 0, o = r
          .length; o > l; l++) {
        var s = r[l],
          u = s.asSorting,
          f = s.sTitle.replace(/<.*?>/g, ""),
          c = s.nTh;
        c.removeAttribute("aria-sort"), s.bSortable ? (n.length > 0 && n[0].col == l ? (
            c.setAttribute("aria-sort",
              "asc" == n[0].dir ? "ascending" : "descending"), a = u[n[0].index +
            1] || u[0]) : a = u[0], t = f + (
            "asc" === a ? i.sSortAscending : i.sSortDescending)) : t = f, c
          .setAttribute("aria-label", t)
      }
    }

    function rt(t, a, n, i) {
      var u, l = t.aoColumns[a],
        o = t.aaSorting,
        s = l.asSorting,
        f = function (t, a) {
          var n = t._idx;
          return n === r && (n = e.inArray(t[1], s)), n + 1 < s.length ? n + 1 : a ?
            null : 0
        };
      if ("number" == typeof o[0] && (o = t.aaSorting = [o]), n && t.oFeatures
        .bSortMulti) {
        var c = e.inArray(a, y(o, "0")); - 1 !== c ? (u = f(o[c], !0), null === u &&
          1 === o.length && (u = 0),
          null === u ? o.splice(c, 1) : (o[c][1] = s[u], o[c]._idx = u)) : (o.push([a,
            s[0], 0
          ]), o[o.length - 1]
          ._idx = 0)
      } else o.length && o[0][0] == a ? (u = f(o[0]), o.length = 1, o[0][1] = s[u], o[0]
        ._idx = u) : (o.length = 0, o
        .push([a, s[0]]), o[0]._idx = 0);
      de(t), "function" == typeof i && i(t)
    }

    function nt(e, t, a, r) {
      var n = e.aoColumns[a];
      ht(t, {}, function (t) {
        n.bSortable !== !1 && (e.oFeatures.bProcessing ? (Ve(e, !0), setTimeout(
          function () {
            rt(e, a, t.shiftKey, r), "ssp" !== mt(e) && Ve(e, !1)
          }, 0)) : rt(e, a, t.shiftKey, r))
      })
    }

    function it(t) {
      var l, o, s, a = t.aLastSort,
        r = t.oClasses.sSortColumn,
        n = et(t),
        i = t.oFeatures;
      if (i.bSort && i.bSortClasses) {
        for (l = 0, o = a.length; o > l; l++) s = a[l].src, e(y(t.aoData, "anCells", s))
          .removeClass(r + (2 > l ? l +
            1 : 3));
        for (l = 0, o = n.length; o > l; l++) s = n[l].src, e(y(t.aoData, "anCells", s))
          .addClass(r + (2 > l ? l + 1 :
            3))
      }
      t.aLastSort = n
    }

    function lt(e, t) {
      var i, a = e.aoColumns[t],
        r = n.ext.order[a.sSortDataType];
      r && (i = r.call(e.oInstance, e, t, B(e, t)));
      for (var l, o, s = n.ext.type.order[a.sType + "-pre"], u = 0, f = e.aoData
        .length; f > u; u++) l = e.aoData[u],
        l._aSortData || (l._aSortData = []), (!l._aSortData[t] || r) && (o = r ? i[u] :
          z(e, u, t, "sort"), l
          ._aSortData[t] = s ? s(o) : o)
    }

    function ot(t) {
      if (t.oFeatures.bStateSave && !t.bDestroying) {
        var a = {
          time: +new Date,
          start: t._iDisplayStart,
          length: t._iDisplayLength,
          order: e.extend(!0, [], t.aaSorting),
          search: Pe(t.oPreviousSearch),
          columns: e.map(t.aoColumns, function (e, a) {
            return {
              visible: e.bVisible,
              search: Pe(t.aoPreSearchCols[a])
            }
          })
        };
        vt(t, "aoStateSaveParams", "stateSaveParams", [t, a]), t.oSavedState = a, t
          .fnStateSaveCallback.call(t
            .oInstance, t, a)
      }
    }

    function st(t, a, n) {
      var i, l, o = t.aoColumns,
        s = function (a) {
          if (!a || !a.time) return void n();
          var s = vt(t, "aoStateLoadParams", "stateLoadParams", [t, a]);
          if (-1 !== e.inArray(!1, s)) return void n();
          var u = t.iStateDuration;
          if (u > 0 && a.time < +new Date - 1e3 * u) return void n();
          if (a.columns && o.length !== a.columns.length) return void n();
          if (t.oLoadedState = e.extend(!0, {}, a), a.start !== r && (t._iDisplayStart =
              a.start, t
              .iInitDisplayStart = a.start), a.length !== r && (t._iDisplayLength = a
              .length), a.order !== r && (t
              .aaSorting = [], e.each(a.order, function (e, a) {
                t.aaSorting.push(a[0] >= o.length ? [0, a[1]] : a)
              })), a.search !== r && e.extend(t.oPreviousSearch, Re(a.search)), a
            .columns)
            for (i = 0, l = a.columns.length; l > i; i++) {
              var f = a.columns[i];
              f.visible !== r && (o[i].bVisible = f.visible), f.search !== r && e
                .extend(t.aoPreSearchCols[i], Re(f
                  .search))
            }
          vt(t, "aoStateLoaded", "stateLoaded", [t, a]), n()
        };
      if (!t.oFeatures.bStateSave) return void n();
      var u = t.fnStateLoadCallback.call(t.oInstance, t, s);
      u !== r && s(u)
    }

    function ut(t) {
      var a = n.settings,
        r = e.inArray(t, y(a, "nTable"));
      return -1 !== r ? a[r] : null
    }

    function ft(e, a, r, i) {
      if (r = "DataTables warning: " + (e ? "table id=" + e.sTableId + " - " : "") + r,
        i && (r +=
          ". For more information about this error, please see http://datatables.net/tn/" +
          i), a) t.console &&
        console.log && console.log(r);
      else {
        var l = n.ext,
          o = l.sErrMode || l.errMode;
        if (e && vt(e, null, "error", [e, i, r]), "alert" == o) alert(r);
        else {
          if ("throw" == o) throw new Error(r);
          "function" == typeof o && o(e, i, r)
        }
      }
    }

    function ct(t, a, n, i) {
      return e.isArray(n) ? void e.each(n, function (r, n) {
        e.isArray(n) ? ct(t, a, n[0], n[1]) : ct(t, a, n)
      }) : (i === r && (i = n), void(a[n] !== r && (t[i] = a[n])))
    }

    function dt(t, a, r) {
      var n;
      for (var i in a) a.hasOwnProperty(i) && (n = a[i], e.isPlainObject(n) ? (e
          .isPlainObject(t[i]) || (t[i] = {}), e
          .extend(!0, t[i], n)) : r && "data" !== i && "aaData" !== i && e.isArray(
        n) ? t[i] = n.slice() : t[i] = n);
      return t
    }

    function ht(t, a, r) {
      e(t).on("click.DT", a, function (a) {
        e(t).blur(), r(a)
      }).on("keypress.DT", a, function (e) {
        13 === e.which && (e.preventDefault(), r(e))
      }).on("selectstart.DT", function () {
        return !1
      })
    }

    function pt(e, t, a, r) {
      a && e[t].push({
        fn: a,
        sName: r
      })
    }

    function vt(t, a, r, n) {
      var i = [];
      if (a && (i = e.map(t[a].slice().reverse(), function (e, a) {
          return e.fn.apply(t.oInstance, n)
        })), null !== r) {
        var l = e.Event(r + ".dt");
        e(t.nTable).trigger(l, n), i.push(l.result)
      }
      return i
    }

    function gt(e) {
      var t = e._iDisplayStart,
        a = e.fnDisplayEnd(),
        r = e._iDisplayLength;
      t >= a && (t = a - r), t -= t % r, (-1 === r || 0 > t) && (t = 0), e
        ._iDisplayStart = t
    }

    function bt(t, a) {
      var r = t.renderer,
        i = n.ext.renderer[a];
      return e.isPlainObject(r) && r[a] ? i[r[a]] || i._ : "string" == typeof r ? i[
        r] || i._ : i._
    }

    function mt(e) {
      return e.oFeatures.bServerSide ? "ssp" : e.ajax || e.sAjaxSource ? "ajax" : "dom"
    }

    function Ut(e, t) {
      var a = [],
        r = Et.numbers_length,
        n = Math.floor(r / 2);
      return r >= t ? a = w(0, t) : n >= e ? (a = w(0, r - 2), a.push("ellipsis"), a
        .push(t - 1)) : e >= t - 1 - n ? (
        a = w(t - (r - 2), t), a.splice(0, 0, "ellipsis"), a.splice(0, 0, 0)) : (a =
        w(e - n + 2, e + n - 1), a
        .push("ellipsis"), a.push(t - 1), a.splice(0, 0, "ellipsis"), a.splice(0, 0,
          0)), a.DT_el = "span", a
    }

    function Xt(t) {
      e.each({
        num: function (e) {
          return Vt(e, t)
        },
        "num-fmt": function (e) {
          return Vt(e, t, p)
        },
        "html-num": function (e) {
          return Vt(e, t, c)
        },
        "html-num-fmt": function (e) {
          return Vt(e, t, c, p)
        }
      }, function (e, a) {
        i.type.order[e + t + "-pre"] = a, e.match(/^html\-/) && (i.type.search[e +
          t] = i.type.search.html)
      })
    }

    function qt(e) {
      return function () {
        var t = [ut(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(
          arguments));
        return n.ext.internal[e].apply(this, t)
      }
    }
    var i, l, o, s, n = function (t) {
        this.$ = function (e, t) {
          return this.api(!0).$(e, t)
        }, this._ = function (e, t) {
          return this.api(!0).rows(e, t).data()
        }, this.api = function (e) {
          return new l(e ? ut(this[i.iApiIndex]) : this)
        }, this.fnAddData = function (t, a) {
          var n = this.api(!0),
            i = e.isArray(t) && (e.isArray(t[0]) || e.isPlainObject(t[0])) ? n.rows
            .add(t) : n.row.add(t);
          return (a === r || a) && n.draw(), i.flatten().toArray()
        }, this.fnAdjustColumnSizing = function (e) {
          var t = this.api(!0).columns.adjust(),
            a = t.settings()[0],
            n = a.oScroll;
          e === r || e ? t.draw(!1) : ("" !== n.sX || "" !== n.sY) && Je(a)
        }, this.fnClearTable = function (e) {
          var t = this.api(!0).clear();
          (e === r || e) && t.draw()
        }, this.fnClose = function (e) {
          this.api(!0).row(e).child.hide()
        }, this.fnDeleteRow = function (e, t, a) {
          var n = this.api(!0),
            i = n.rows(e),
            l = i.settings()[0],
            o = l.aoData[i[0][0]];
          return i.remove(), t && t.call(this, l, o), (a === r || a) && n.draw(), o
        }, this.fnDestroy = function (e) {
          this.api(!0).destroy(e)
        }, this.fnDraw = function (e) {
          this.api(!0).draw(e)
        }, this.fnFilter = function (e, t, a, n, i, l) {
          var o = this.api(!0);
          null === t || t === r ? o.search(e, a, n, l) : o.column(t).search(e, a, n,
            l), o.draw()
        }, this.fnGetData = function (e, t) {
          var a = this.api(!0);
          if (e !== r) {
            var n = e.nodeName ? e.nodeName.toLowerCase() : "";
            return t !== r || "td" == n || "th" == n ? a.cell(e, t).data() : a.row(e)
              .data() || null
          }
          return a.data().toArray()
        }, this.fnGetNodes = function (e) {
          var t = this.api(!0);
          return e !== r ? t.row(e).node() : t.rows().nodes().flatten().toArray()
        }, this.fnGetPosition = function (e) {
          var t = this.api(!0),
            a = e.nodeName.toUpperCase();
          if ("TR" == a) return t.row(e).index();
          if ("TD" == a || "TH" == a) {
            var r = t.cell(e).index();
            return [r.row, r.columnVisible, r.column]
          }
          return null
        }, this.fnIsOpen = function (e) {
          return this.api(!0).row(e).child.isShown()
        }, this.fnOpen = function (e, t, a) {
          return this.api(!0).row(e).child(t, a).show().child()[0]
        }, this.fnPageChange = function (e, t) {
          var a = this.api(!0).page(e);
          (t === r || t) && a.draw(!1)
        }, this.fnSetColumnVis = function (e, t, a) {
          var n = this.api(!0).column(e).visible(t);
          (a === r || a) && n.columns.adjust().draw()
        }, this.fnSettings = function () {
          return ut(this[i.iApiIndex])
        }, this.fnSort = function (e) {
          this.api(!0).order(e).draw()
        }, this.fnSortListener = function (e, t, a) {
          this.api(!0).order.listener(e, t, a)
        }, this.fnUpdate = function (e, t, a, n, i) {
          var l = this.api(!0);
          return a === r || null === a ? l.row(t).data(e) : l.cell(t, a).data(e), (
              i === r || i) && l.columns
            .adjust(), (n === r || n) && l.draw(), 0
        }, this.fnVersionCheck = i.fnVersionCheck;
        var a = this,
          o = t === r,
          s = this.length;
        o && (t = {}), this.oApi = this.internal = i.internal;
        for (var u in n.ext.internal) u && (this[u] = qt(u));
        return this.each(function () {
          var f, i = {},
            l = s > 1 ? dt(i, t, !0) : t,
            u = 0,
            v = this.getAttribute("id"),
            g = !1,
            b = n.defaults,
            m = e(this);
          if ("table" != this.nodeName.toLowerCase()) return void ft(null, 0,
            "Non-table node initialisation (" +
            this.nodeName + ")", 2);
          R(b), j(b.column), F(b, b, !0), F(b.column, b.column, !0), F(b, e.extend(
            l, m.data()));
          var S = n.settings;
          for (u = 0, f = S.length; f > u; u++) {
            var D = S[u];
            if (D.nTable == this || D.nTHead && D.nTHead.parentNode == this || D
              .nTFoot && D.nTFoot.parentNode ==
              this) {
              var y = l.bRetrieve !== r ? l.bRetrieve : b.bRetrieve,
                _ = l.bDestroy !== r ? l.bDestroy : b.bDestroy;
              if (o || y) return D.oInstance;
              if (_) {
                D.oInstance.fnDestroy();
                break
              }
              return void ft(D, 0, "Cannot reinitialise DataTable", 3)
            }
            if (D.sTableId == this.id) {
              S.splice(u, 1);
              break
            }
          }(null === v || "" === v) && (v = "DataTables_Table_" + n.ext._unique++,
            this.id = v);
          var w = e.extend(!0, {}, n.models.oSettings, {
            sDestroyWidth: m[0].style.width,
            sInstance: v,
            sTableId: v
          });
          w.nTable = this, w.oApi = a.internal, w.oInit = l, S.push(w), w
            .oInstance = 1 === a.length ? a : m
            .dataTable(), R(l), L(l.oLanguage), l.aLengthMenu && !l
            .iDisplayLength && (l.iDisplayLength = e
              .isArray(l.aLengthMenu[0]) ? l.aLengthMenu[0][0] : l.aLengthMenu[0]),
            l = dt(e.extend(!0, {}, b),
              l), ct(w.oFeatures, l, ["bPaginate", "bLengthChange", "bFilter",
              "bSort", "bSortMulti", "bInfo",
              "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide",
              "bDeferRender"
            ]), ct(w, l, ["asStripeClasses", "ajax", "fnServerData",
              "fnFormatNumber", "sServerMethod",
              "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType",
              "sAjaxSource", "sAjaxDataProp",
              "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex",
              "fnStateLoadCallback",
              "fnStateSaveCallback", "renderer", "searchDelay", "rowId", [
                "iCookieDuration", "iStateDuration"
              ],
              ["oSearch", "oPreviousSearch"],
              ["aoSearchCols", "aoPreSearchCols"],
              ["iDisplayLength", "_iDisplayLength"]
            ]), ct(w.oScroll, l, [
              ["sScrollX", "sX"],
              ["sScrollXInner", "sXInner"],
              ["sScrollY", "sY"],
              ["bScrollCollapse", "bCollapse"]
            ]), ct(w.oLanguage, l, "fnInfoCallback"), pt(w, "aoDrawCallback", l
              .fnDrawCallback, "user"), pt(w,
              "aoServerParams", l.fnServerParams, "user"), pt(w,
              "aoStateSaveParams", l.fnStateSaveParams,
              "user"), pt(w, "aoStateLoadParams", l.fnStateLoadParams, "user"), pt(
              w, "aoStateLoaded", l
              .fnStateLoaded, "user"), pt(w, "aoRowCallback", l.fnRowCallback,
              "user"), pt(w,
              "aoRowCreatedCallback", l.fnCreatedRow, "user"), pt(w,
              "aoHeaderCallback", l.fnHeaderCallback,
              "user"), pt(w, "aoFooterCallback", l.fnFooterCallback, "user"), pt(w,
              "aoInitComplete", l
              .fnInitComplete, "user"), pt(w, "aoPreDrawCallback", l
              .fnPreDrawCallback, "user"), w.rowIdFn = ee(l
              .rowId), N(w);
          var T = w.oClasses;
          if (e.extend(T, n.ext.classes, l.oClasses), m.addClass(T.sTable), w
            .iInitDisplayStart === r && (w
              .iInitDisplayStart = l.iDisplayStart, w._iDisplayStart = l
              .iDisplayStart), null !== l
            .iDeferLoading) {
            w.bDeferLoading = !0;
            var C = e.isArray(l.iDeferLoading);
            w._iRecordsDisplay = C ? l.iDeferLoading[0] : l.iDeferLoading, w
              ._iRecordsTotal = C ? l.iDeferLoading[
                1] : l.iDeferLoading
          }
          var x = w.oLanguage;
          e.extend(!0, x, l.oLanguage), x.sUrl && (e.ajax({
            dataType: "json",
            url: x.sUrl,
            success: function (t) {
              L(t), F(b.oLanguage, t), e.extend(!0, x, t), ke(w)
            },
            error: function () {
              ke(w)
            }
          }), g = !0), null === l.asStripeClasses && (w.asStripeClasses = [T
            .sStripeOdd, T.sStripeEven
          ]);
          var I = w.asStripeClasses,
            A = m.children("tbody").find("tr").eq(0); - 1 !== e.inArray(!0, e.map(I,
            function (e, t) {
              return A.hasClass(e)
            })) && (e("tbody tr", this).removeClass(I.join(" ")), w
            .asDestroyStripes = I.slice());
          var H, P = [],
            M = this.getElementsByTagName("thead");
          if (0 !== M.length && (pe(w.aoHeader, M[0]), P = ve(w)), null === l
            .aoColumns)
            for (H = [], u = 0, f = P.length; f > u; u++) H.push(null);
          else H = l.aoColumns;
          for (u = 0, f = H.length; f > u; u++) k(w, P ? P[u] : null);
          if (X(w, l.aoColumnDefs, H, function (e, t) {
              O(w, e, t)
            }), A.length) {
            var W = function (e, t) {
              return null !== e.getAttribute("data-" + t) ? t : null
            };
            e(A[0]).children("th, td").each(function (e, t) {
              var a = w.aoColumns[e];
              if (a.mData === e) {
                var n = W(t, "sort") || W(t, "order"),
                  i = W(t, "filter") || W(t, "search");
                (null !== n || null !== i) && (a.mData = {
                  _: e + ".display",
                  sort: null !== n ? e + ".@data-" + n : r,
                  type: null !== n ? e + ".@data-" + n : r,
                  filter: null !== i ? e + ".@data-" + i : r
                }, O(w, e))
              }
            })
          }
          var B = w.oFeatures,
            E = function () {
              if (l.aaSorting === r) {
                var t = w.aaSorting;
                for (u = 0, f = t.length; f > u; u++) t[u][1] = w.aoColumns[u]
                  .asSorting[0]
              }
              it(w), B.bSort && pt(w, "aoDrawCallback", function () {
                if (w.bSorted) {
                  var t = et(w),
                    a = {};
                  e.each(t, function (e, t) {
                    a[t.src] = t.dir
                  }), vt(w, null, "order", [w, t, a]), at(w)
                }
              }), pt(w, "aoDrawCallback", function () {
                (w.bSorted || "ssp" === mt(w) || B.bDeferRender) && it(w)
              }, "sc");
              var a = m.children("caption").each(function () {
                  this._captionSide = e(this).css("caption-side")
                }),
                n = m.children("thead");
              0 === n.length && (n = e("<thead/>").appendTo(m)), w.nTHead = n[0];
              var i = m.children("tbody");
              0 === i.length && (i = e("<tbody/>").appendTo(m)), w.nTBody = i[0];
              var o = m.children("tfoot");
              if (0 === o.length && a.length > 0 && ("" !== w.oScroll.sX || "" !== w
                  .oScroll.sY) && (o = e(
                  "<tfoot/>").appendTo(m)), 0 === o.length || 0 === o.children()
                .length ? m.addClass(T
                  .sNoFooter) : o.length > 0 && (w.nTFoot = o[0], pe(w.aoFooter, w
                  .nTFoot)), l.aaData)
                for (u = 0; u < l.aaData.length; u++) J(w, l.aaData[u]);
              else(w.bDeferLoading || "dom" == mt(w)) && q(w, e(w.nTBody).children(
                "tr"));
              w.aiDisplay = w.aiDisplayMaster.slice(), w.bInitialised = !0, g === !
                1 && ke(w)
            };
          l.bStateSave ? (B.bStateSave = !0, pt(w, "aoDrawCallback", ot,
            "state_save"), st(w, l, E)) : E()
        }), a = null, this
      },
      u = {},
      f = /[\r\n]/g,
      c = /<.*?>/g,
      d =
      /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
      h = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{",
        "}", "\\", "$", "^", "-"
      ].join(
        "|\\") + ")", "g"),
      p = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
      v = function (e) {
        return e && e !== !0 && "-" !== e ? !1 : !0
      },
      g = function (e) {
        var t = parseInt(e, 10);
        return !isNaN(t) && isFinite(e) ? t : null
      },
      b = function (e, t) {
        return u[t] || (u[t] = new RegExp(Ie(t), "g")), "string" == typeof e && "." !==
          t ? e.replace(/\./g, "")
          .replace(u[t], ".") : e
      },
      m = function (e, t, a) {
        var r = "string" == typeof e;
        return v(e) ? !0 : (t && r && (e = b(e, t)), a && r && (e = e.replace(p, "")), !
          isNaN(parseFloat(e)) &&
          isFinite(e))
      },
      S = function (e) {
        return v(e) || "string" == typeof e
      },
      D = function (e, t, a) {
        if (v(e)) return !0;
        var r = S(e);
        return r && m(C(e), t, a) ? !0 : null
      },
      y = function (e, t, a) {
        var n = [],
          i = 0,
          l = e.length;
        if (a !== r)
          for (; l > i; i++) e[i] && e[i][t] && n.push(e[i][t][a]);
        else
          for (; l > i; i++) e[i] && n.push(e[i][t]);
        return n
      },
      _ = function (e, t, a, n) {
        var i = [],
          l = 0,
          o = t.length;
        if (n !== r)
          for (; o > l; l++) e[t[l]][a] && i.push(e[t[l]][a][n]);
        else
          for (; o > l; l++) i.push(e[t[l]][a]);
        return i
      },
      w = function (e, t) {
        var n, a = [];
        t === r ? (t = 0, n = e) : (n = t, t = e);
        for (var i = t; n > i; i++) a.push(i);
        return a
      },
      T = function (e) {
        for (var t = [], a = 0, r = e.length; r > a; a++) e[a] && t.push(e[a]);
        return t
      },
      C = function (e) {
        return e.replace(c, "")
      },
      x = function (e) {
        if (e.length < 2) return !0;
        for (var t = e.slice().sort(), a = t[0], r = 1, n = t.length; n > r; r++) {
          if (t[r] === a) return !1;
          a = t[r]
        }
        return !0
      },
      I = function (e) {
        if (x(e)) return e.slice();
        var a, r, i, t = [],
          n = e.length,
          l = 0;
        e: for (r = 0; n > r; r++) {
          for (a = e[r], i = 0; l > i; i++)
            if (t[i] === a) continue e;
          t.push(a), l++
        }
        return t
      };
    n.util = {
      throttle: function (e, t) {
        var n, i, a = t !== r ? t : 200;
        return function () {
          var t = this,
            l = +new Date,
            o = arguments;
          n && n + a > l ? (clearTimeout(i), i = setTimeout(function () {
            n = r, e.apply(t, o)
          }, a)) : (n = l, e.apply(t, o))
        }
      },
      escapeRegex: function (e) {
        return e.replace(h, "\\$1")
      }
    };
    var P = function (e, t, a) {
        e[t] !== r && (e[a] = e[t])
      },
      Z = /\[.*?\]$/,
      Q = /\(\)$/,
      Ie = n.util.escapeRegex,
      Ae = e("<div>")[0],
      Fe = Ae.textContent !== r,
      Ge = /<.*?>/g,
      ze = n.util.throttle,
      St = [],
      Dt = Array.prototype,
      yt = function (t) {
        var a, r, i = n.settings,
          l = e.map(i, function (e, t) {
            return e.nTable
          });
        return t ? t.nTable && t.oApi ? [t] : t.nodeName && "table" === t.nodeName
          .toLowerCase() ? (a = e.inArray(t,
            l), -1 !== a ? [i[a]] : null) : t && "function" == typeof t.settings ? t
          .settings().toArray() : (
            "string" == typeof t ? r = e(t) : t instanceof e && (r = t), r ? r.map(
              function (t) {
                return a = e.inArray(this, l), -1 !== a ? i[a] : null
              }).toArray() : void 0) : []
      };
    l = function (t, a) {
      if (!(this instanceof l)) return new l(t, a);
      var r = [],
        n = function (e) {
          var t = yt(e);
          t && (r = r.concat(t))
        };
      if (e.isArray(t))
        for (var i = 0, o = t.length; o > i; i++) n(t[i]);
      else n(t);
      this.context = I(r), a && e.merge(this, a), this.selector = {
        rows: null,
        cols: null,
        opts: null
      }, l.extend(this, this, St)
    }, n.Api = l, e.extend(l.prototype, {
      any: function () {
        return 0 !== this.count()
      },
      concat: Dt.concat,
      context: [],
      count: function () {
        return this.flatten().length
      },
      each: function (e) {
        for (var t = 0, a = this.length; a > t; t++) e.call(this, this[t], t,
          this);
        return this
      },
      eq: function (e) {
        var t = this.context;
        return t.length > e ? new l(t[e], this[e]) : null
      },
      filter: function (e) {
        var t = [];
        if (Dt.filter) t = Dt.filter.call(this, e, this);
        else
          for (var a = 0, r = this.length; r > a; a++) e.call(this, this[a], a,
            this) && t.push(this[a]);
        return new l(this.context, t)
      },
      flatten: function () {
        var e = [];
        return new l(this.context, e.concat.apply(e, this.toArray()))
      },
      join: Dt.join,
      indexOf: Dt.indexOf || function (e, t) {
        for (var a = t || 0, r = this.length; r > a; a++)
          if (this[a] === e) return a;
        return -1
      },
      iterator: function (e, t, a, n) {
        var o, s, u, f, c, h, p, v, i = [],
          d = this.context,
          g = this.selector;
        for ("string" == typeof e && (n = a, a = t, t = e, e = !1), s = 0, u = d
          .length; u > s; s++) {
          var b = new l(d[s]);
          if ("table" === t) o = a.call(b, d[s], s), o !== r && i.push(o);
          else if ("columns" === t || "rows" === t) o = a.call(b, d[s], this[s],
            s), o !== r && i.push(o);
          else if ("column" === t || "column-rows" === t || "row" === t ||
            "cell" === t)
            for (p = this[s], "column-rows" === t && (h = It(d[s], g.opts)), f =
              0, c = p.length; c > f; f++)
              v = p[f], o = "cell" === t ? a.call(b, d[s], v.row, v.column, s,
              f) : a.call(b, d[s], v, s, f, h),
              o !== r && i.push(o)
        }
        if (i.length || n) {
          var m = new l(d, e ? i.concat.apply([], i) : i),
            S = m.selector;
          return S.rows = g.rows, S.cols = g.cols, S.opts = g.opts, m
        }
        return this
      },
      lastIndexOf: Dt.lastIndexOf || function (e, t) {
        return this.indexOf.apply(this.toArray.reverse(), arguments)
      },
      length: 0,
      map: function (e) {
        var t = [];
        if (Dt.map) t = Dt.map.call(this, e, this);
        else
          for (var a = 0, r = this.length; r > a; a++) t.push(e.call(this, this[
            a], a));
        return new l(this.context, t)
      },
      pluck: function (e) {
        return this.map(function (t) {
          return t[e]
        })
      },
      pop: Dt.pop,
      push: Dt.push,
      reduce: Dt.reduce || function (e, t) {
        return H(this, e, t, 0, this.length, 1)
      },
      reduceRight: Dt.reduceRight || function (e, t) {
        return H(this, e, t, this.length - 1, -1, -1)
      },
      reverse: Dt.reverse,
      selector: null,
      shift: Dt.shift,
      slice: function () {
        return new l(this.context, this)
      },
      sort: Dt.sort,
      splice: Dt.splice,
      toArray: function () {
        return Dt.slice.call(this)
      },
      to$: function () {
        return e(this)
      },
      toJQuery: function () {
        return e(this)
      },
      unique: function () {
        return new l(this.context, I(this))
      },
      unshift: Dt.unshift
    }), l.extend = function (t, a, r) {
      if (r.length && a && (a instanceof l || a.__dt_wrapper)) {
        var n, i, u, c = function (e, t, a) {
          return function () {
            var r = t.apply(e, arguments);
            return l.extend(r, r, a.methodExt), r
          }
        };
        for (n = 0, i = r.length; i > n; n++) u = r[n], a[u.name] = "function" ==
          typeof u.val ? c(t, u.val, u) : e
          .isPlainObject(u.val) ? {} : u.val, a[u.name].__dt_wrapper = !0, l.extend(t,
            a[u.name], u.propExt)
      }
    }, l.register = o = function (t, a) {
      if (e.isArray(t))
        for (var r = 0, n = t.length; n > r; r++) l.register(t[r], a);
      else {
        var i, o, f, c, s = t.split("."),
          u = St,
          d = function (e, t) {
            for (var a = 0, r = e.length; r > a; a++)
              if (e[a].name === t) return e[a];
            return null
          };
        for (i = 0, o = s.length; o > i; i++) {
          c = -1 !== s[i].indexOf("()"), f = c ? s[i].replace("()", "") : s[i];
          var h = d(u, f);
          h || (h = {
            name: f,
            val: {},
            methodExt: [],
            propExt: []
          }, u.push(h)), i === o - 1 ? h.val = a : u = c ? h.methodExt : h.propExt
        }
      }
    }, l.registerPlural = s = function (t, a, n) {
      l.register(t, n), l.register(a, function () {
        var t = n.apply(this, arguments);
        return t === this ? this : t instanceof l ? t.length ? e.isArray(t[0]) ?
          new l(t.context, t[0]) : t[0] :
          r : t
      })
    };
    var _t = function (t, a) {
      if ("number" == typeof t) return [a[t]];
      var r = e.map(a, function (e, t) {
        return e.nTable
      });
      return e(r).filter(t).map(function (t) {
        var n = e.inArray(this, r);
        return a[n]
      }).toArray()
    };
    o("tables()", function (e) {
      return e ? new l(_t(e, this.context)) : this
    }), o("table()", function (e) {
      var t = this.tables(e),
        a = t.context;
      return a.length ? new l(a[0]) : t
    }), s("tables().nodes()", "table().node()", function () {
      return this.iterator("table", function (e) {
        return e.nTable
      }, 1)
    }), s("tables().body()", "table().body()", function () {
      return this.iterator("table", function (e) {
        return e.nTBody
      }, 1)
    }), s("tables().header()", "table().header()", function () {
      return this.iterator("table", function (e) {
        return e.nTHead
      }, 1)
    }), s("tables().footer()", "table().footer()", function () {
      return this.iterator("table", function (e) {
        return e.nTFoot
      }, 1)
    }), s("tables().containers()", "table().container()", function () {
      return this.iterator("table", function (e) {
        return e.nTableWrapper
      }, 1)
    }), o("draw()", function (e) {
      return this.iterator("table", function (t) {
        "page" === e ? ce(t) : ("string" == typeof e && (e = "full-hold" === e ?
          !1 : !0), de(t, e === !1))
      })
    }), o("page()", function (e) {
      return e === r ? this.page.info().page : this.iterator("table", function (t) {
        Ee(t, e)
      })
    }), o("page.info()", function (e) {
      if (0 === this.context.length) return r;
      var t = this.context[0],
        a = t._iDisplayStart,
        n = t.oFeatures.bPaginate ? t._iDisplayLength : -1,
        i = t.fnRecordsDisplay(),
        l = -1 === n;
      return {
        page: l ? 0 : Math.floor(a / n),
        pages: l ? 1 : Math.ceil(i / n),
        start: a,
        end: t.fnDisplayEnd(),
        length: n,
        recordsTotal: t.fnRecordsTotal(),
        recordsDisplay: i,
        serverSide: "ssp" === mt(t)
      }
    }), o("page.len()", function (e) {
      return e === r ? 0 !== this.context.length ? this.context[0]._iDisplayLength :
        r : this.iterator("table",
          function (t) {
            Me(t, e)
          })
    });
    var wt = function (e, t, a) {
      if (a) {
        var r = new l(e);
        r.one("draw", function () {
          a(r.ajax.json())
        })
      }
      if ("ssp" == mt(e)) de(e, t);
      else {
        Ve(e, !0);
        var n = e.jqXHR;
        n && 4 !== n.readyState && n.abort(), ge(e, [], function (a) {
          re(e);
          for (var r = De(e, a), n = 0, i = r.length; i > n; n++) J(e, r[n]);
          de(e, t), Ve(e, !1)
        })
      }
    };
    o("ajax.json()", function () {
      var e = this.context;
      return e.length > 0 ? e[0].json : void 0
    }), o("ajax.params()", function () {
      var e = this.context;
      return e.length > 0 ? e[0].oAjaxData : void 0
    }), o("ajax.reload()", function (e, t) {
      return this.iterator("table", function (a) {
        wt(a, t === !1, e)
      })
    }), o("ajax.url()", function (t) {
      var a = this.context;
      return t === r ? 0 === a.length ? r : (a = a[0], a.ajax ? e.isPlainObject(a
          .ajax) ? a.ajax.url : a.ajax : a
        .sAjaxSource) : this.iterator("table", function (a) {
        e.isPlainObject(a.ajax) ? a.ajax.url = t : a.ajax = t
      })
    }), o("ajax.url().load()", function (e, t) {
      return this.iterator("table", function (a) {
        wt(a, t === !1, e)
      })
    });
    var Tt = function (t, a, n, l, o) {
        var u, f, c, d, h, p, s = [],
          v = typeof a;
        for (a && "string" !== v && "function" !== v && a.length !== r || (a = [a]), c =
          0, d = a.length; d > c; c++)
          for (f = a[c] && a[c].split && !a[c].match(/[\[\(:]/) ? a[c].split(",") : [a[
              c]], h = 0, p = f.length; p >
            h; h++) u = n("string" == typeof f[h] ? e.trim(f[h]) : f[h]), u && u
            .length && (s = s.concat(u));
        var g = i.selector[t];
        if (g.length)
          for (c = 0, d = g.length; d > c; c++) s = g[c](l, o, s);
        return I(s)
      },
      Ct = function (t) {
        return t || (t = {}), t.filter && t.search === r && (t.search = t.filter), e
          .extend({
            search: "none",
            order: "current",
            page: "all"
          }, t)
      },
      xt = function (e) {
        for (var t = 0, a = e.length; a > t; t++)
          if (e[t].length > 0) return e[0] = e[t], e[0].length = 1, e.length = 1, e
            .context = [e.context[t]], e;
        return e.length = 0, e
      },
      It = function (t, a) {
        var r, n, i, l = [],
          o = t.aiDisplay,
          s = t.aiDisplayMaster,
          u = a.search,
          f = a.order,
          c = a.page;
        if ("ssp" == mt(t)) return "removed" === u ? [] : w(0, s.length);
        if ("current" == c)
          for (r = t._iDisplayStart, n = t.fnDisplayEnd(); n > r; r++) l.push(o[r]);
        else if ("current" == f || "applied" == f) {
          if ("none" == u) l = s.slice();
          else if ("applied" == u) l = o.slice();
          else if ("removed" == u) {
            for (var d = {}, r = 0, n = o.length; n > r; r++) d[o[r]] = null;
            l = e.map(s, function (e) {
              return d.hasOwnProperty(e) ? null : e
            })
          }
        } else if ("index" == f || "original" == f)
          for (r = 0, n = t.aoData.length; n > r; r++) "none" == u ? l.push(r) : (i = e
            .inArray(r, o), (-1 === i &&
              "removed" == u || i >= 0 && "applied" == u) && l.push(r));
        return l
      },
      At = function (t, a, n) {
        var i, l = function (a) {
          var l = g(a),
            u = t.aoData;
          if (null !== l && !n) return [l];
          if (i || (i = It(t, n)), null !== l && -1 !== e.inArray(l, i)) return [l];
          if (null === a || a === r || "" === a) return i;
          if ("function" == typeof a) return e.map(i, function (e) {
            var t = u[e];
            return a(e, t._aData, t.nTr) ? e : null
          });
          if (a.nodeName) {
            var f = a._DT_RowIndex,
              c = a._DT_CellIndex;
            if (f !== r) return u[f] && u[f].nTr === a ? [f] : [];
            if (c) return u[c.row] && u[c.row].nTr === a ? [c.row] : [];
            var d = e(a).closest("*[data-dt-row]");
            return d.length ? [d.data("dt-row")] : []
          }
          if ("string" == typeof a && "#" === a.charAt(0)) {
            var h = t.aIds[a.replace(/^#/, "")];
            if (h !== r) return [h.idx]
          }
          var p = T(_(t.aoData, i, "nTr"));
          return e(p).filter(a).map(function () {
            return this._DT_RowIndex
          }).toArray()
        };
        return Tt("row", a, l, t, n)
      };
    o("rows()", function (t, a) {
      t === r ? t = "" : e.isPlainObject(t) && (a = t, t = ""), a = Ct(a);
      var n = this.iterator("table", function (e) {
        return At(e, t, a)
      }, 1);
      return n.selector.rows = t, n.selector.opts = a, n
    }), o("rows().nodes()", function () {
      return this.iterator("row", function (e, t) {
        return e.aoData[t].nTr || r
      }, 1)
    }), o("rows().data()", function () {
      return this.iterator(!0, "rows", function (e, t) {
        return _(e.aoData, t, "_aData")
      }, 1)
    }), s("rows().cache()", "row().cache()", function (e) {
      return this.iterator("row", function (t, a) {
        var r = t.aoData[a];
        return "search" === e ? r._aFilterData : r._aSortData
      }, 1)
    }), s("rows().invalidate()", "row().invalidate()", function (e) {
      return this.iterator("row", function (t, a) {
        ie(t, a, e)
      })
    }), s("rows().indexes()", "row().index()", function () {
      return this.iterator("row", function (e, t) {
        return t
      }, 1)
    }), s("rows().ids()", "row().id()", function (e) {
      for (var t = [], a = this.context, r = 0, n = a.length; n > r; r++)
        for (var i = 0, o = this[r].length; o > i; i++) {
          var s = a[r].rowIdFn(a[r].aoData[this[r][i]]._aData);
          t.push((e === !0 ? "#" : "") + s)
        }
      return new l(a, t)
    }), s("rows().remove()", "row().remove()", function () {
      var e = this;
      return this.iterator("row", function (t, a, n) {
        var o, s, u, f, c, d, i = t.aoData,
          l = i[a];
        for (i.splice(a, 1), o = 0, s = i.length; s > o; o++)
          if (c = i[o], d = c.anCells, null !== c.nTr && (c.nTr._DT_RowIndex =
              o), null !== d)
            for (u = 0, f = d.length; f > u; u++) d[u]._DT_CellIndex.row = o;
        ne(t.aiDisplayMaster, a), ne(t.aiDisplay, a), ne(e[n], a, !1), t
          ._iRecordsDisplay > 0 && t
          ._iRecordsDisplay--, gt(t);
        var h = t.rowIdFn(l._aData);
        h !== r && delete t.aIds[h]
      }), this.iterator("table", function (e) {
        for (var t = 0, a = e.aoData.length; a > t; t++) e.aoData[t].idx = t
      }), this
    }), o("rows.add()", function (t) {
      var a = this.iterator("table", function (e) {
          var a, r, n, i = [];
          for (r = 0, n = t.length; n > r; r++) a = t[r], a.nodeName && "TR" === a
            .nodeName.toUpperCase() ? i
            .push(q(e, a)[0]) : i.push(J(e, a));
          return i
        }, 1),
        r = this.rows(-1);
      return r.pop(), e.merge(r, a), r
    }), o("row()", function (e, t) {
      return xt(this.rows(e, t))
    }), o("row().data()", function (t) {
      var a = this.context;
      if (t === r) return a.length && this.length ? a[0].aoData[this[0]]._aData : r;
      var n = a[0].aoData[this[0]];
      return n._aData = t, e.isArray(t) && n.nTr.id && te(a[0].rowId)(t, n.nTr.id),
        ie(a[0], this[0], "data"),
        this
    }), o("row().node()", function () {
      var e = this.context;
      return e.length && this.length ? e[0].aoData[this[0]].nTr || null : null
    }), o("row.add()", function (t) {
      t instanceof e && t.length && (t = t[0]);
      var a = this.iterator("table", function (e) {
        return t.nodeName && "TR" === t.nodeName.toUpperCase() ? q(e, t)[0] : J(
          e, t)
      });
      return this.row(a[0])
    });
    var Ft = function (t, a, r, n) {
        var i = [],
          l = function (a, r) {
            if (e.isArray(a) || a instanceof e)
              for (var n = 0, o = a.length; o > n; n++) l(a[n], r);
            else if (a.nodeName && "tr" === a.nodeName.toLowerCase()) i.push(a);
            else {
              var s = e("<tr><td/></tr>").addClass(r);
              e("td", s).addClass(r).html(a)[0].colSpan = E(t), i.push(s[0])
            }
          };
        l(r, n), a._details && a._details.detach(), a._details = e(i), a._detailsShow &&
          a._details.insertAfter(a.nTr)
      },
      Lt = function (e, t) {
        var a = e.context;
        if (a.length) {
          var n = a[0].aoData[t !== r ? t : e[0]];
          n && n._details && (n._details.remove(), n._detailsShow = r, n._details = r)
        }
      },
      Pt = function (e, t) {
        var a = e.context;
        if (a.length && e.length) {
          var r = a[0].aoData[e[0]];
          r._details && (r._detailsShow = t, t ? r._details.insertAfter(r.nTr) : r
            ._details.detach(), Rt(a[0]))
        }
      },
      Rt = function (e) {
        var t = new l(e),
          a = ".dt.DT_details",
          r = "draw" + a,
          n = "column-visibility" + a,
          i = "destroy" + a,
          o = e.aoData;
        t.off(r + " " + n + " " + i), y(o, "_details").length > 0 && (t.on(r, function (
          a, r) {
          e === r && t.rows({
            page: "current"
          }).eq(0).each(function (e) {
            var t = o[e];
            t._detailsShow && t._details.insertAfter(t.nTr)
          })
        }), t.on(n, function (t, a, r, n) {
          if (e === a)
            for (var i, l = E(a), s = 0, u = o.length; u > s; s++) i = o[s], i
              ._details && i._details.children(
                "td[colspan]").attr("colspan", l)
        }), t.on(i, function (a, r) {
          if (e === r)
            for (var n = 0, i = o.length; i > n; n++) o[n]._details && Lt(t, n)
        }))
      },
      jt = "",
      Nt = jt + "row().child",
      Ht = Nt + "()";
    o(Ht, function (e, t) {
      var a = this.context;
      return e === r ? a.length && this.length ? a[0].aoData[this[0]]._details : r :
        (e === !0 ? this.child
          .show() : e === !1 ? Lt(this) : a.length && this.length && Ft(a[0], a[0]
            .aoData[this[0]], e, t), this)
    }), o([Nt + ".show()", Ht + ".show()"], function (e) {
      return Pt(this, !0), this
    }), o([Nt + ".hide()", Ht + ".hide()"], function () {
      return Pt(this, !1), this
    }), o([Nt + ".remove()", Ht + ".remove()"], function () {
      return Lt(this), this
    }), o(Nt + ".isShown()", function () {
      var e = this.context;
      return e.length && this.length ? e[0].aoData[this[0]]._detailsShow || !1 : !1
    });
    var kt = /^([^:]+):(name|visIdx|visible)$/,
      Ot = function (e, t, a, r, n) {
        for (var i = [], l = 0, o = n.length; o > l; l++) i.push(z(e, n[l], t));
        return i
      },
      Mt = function (t, a, r) {
        var n = t.aoColumns,
          i = y(n, "sName"),
          l = y(n, "nTh"),
          o = function (a) {
            var o = g(a);
            if ("" === a) return w(n.length);
            if (null !== o) return [o >= 0 ? o : n.length + o];
            if ("function" == typeof a) {
              var s = It(t, r);
              return e.map(n, function (e, r) {
                return a(r, Ot(t, r, 0, 0, s), l[r]) ? r : null
              })
            }
            var u = "string" == typeof a ? a.match(kt) : "";
            if (u) switch (u[2]) {
              case "visIdx":
              case "visible":
                var f = parseInt(u[1], 10);
                if (0 > f) {
                  var c = e.map(n, function (e, t) {
                    return e.bVisible ? t : null
                  });
                  return [c[c.length + f]]
                }
                return [W(t, f)];
              case "name":
                return e.map(i, function (e, t) {
                  return e === u[1] ? t : null
                });
              default:
                return []
            }
            if (a.nodeName && a._DT_CellIndex) return [a._DT_CellIndex.column];
            var d = e(l).filter(a).map(function () {
              return e.inArray(this, l)
            }).toArray();
            if (d.length || !a.nodeName) return d;
            var h = e(a).closest("*[data-dt-column]");
            return h.length ? [h.data("dt-column")] : []
          };
        return Tt("column", a, o, t, r)
      },
      Wt = function (t, a, n) {
        var u, f, c, d, i = t.aoColumns,
          l = i[a],
          o = t.aoData;
        if (n === r) return l.bVisible;
        if (l.bVisible !== n) {
          if (n) {
            var h = e.inArray(!0, y(i, "bVisible"), a + 1);
            for (f = 0, c = o.length; c > f; f++) d = o[f].nTr, u = o[f].anCells, d && d
              .insertBefore(u[a], u[h] ||
                null)
          } else e(y(t.aoData, "anCells", a)).detach();
          l.bVisible = n, fe(t, t.aoHeader), fe(t, t.aoFooter), t.aiDisplay.length || e(
              t.nTBody).find("td[colspan]")
            .attr("colspan", E(t)), ot(t)
        }
      };
    o("columns()", function (t, a) {
      t === r ? t = "" : e.isPlainObject(t) && (a = t, t = ""), a = Ct(a);
      var n = this.iterator("table", function (e) {
        return Mt(e, t, a)
      }, 1);
      return n.selector.cols = t, n.selector.opts = a, n
    }), s("columns().header()", "column().header()", function (e, t) {
      return this.iterator("column", function (e, t) {
        return e.aoColumns[t].nTh
      }, 1)
    }), s("columns().footer()", "column().footer()", function (e, t) {
      return this.iterator("column", function (e, t) {
        return e.aoColumns[t].nTf
      }, 1)
    }), s("columns().data()", "column().data()", function () {
      return this.iterator("column-rows", Ot, 1)
    }), s("columns().dataSrc()", "column().dataSrc()", function () {
      return this.iterator("column", function (e, t) {
        return e.aoColumns[t].mData
      }, 1)
    }), s("columns().cache()", "column().cache()", function (e) {
      return this.iterator("column-rows", function (t, a, r, n, i) {
        return _(t.aoData, i, "search" === e ? "_aFilterData" : "_aSortData", a)
      }, 1)
    }), s("columns().nodes()", "column().nodes()", function () {
      return this.iterator("column-rows", function (e, t, a, r, n) {
        return _(e.aoData, n, "anCells", t)
      }, 1)
    }), s("columns().visible()", "column().visible()", function (e, t) {
      var a = this.iterator("column", function (t, a) {
        return e === r ? t.aoColumns[a].bVisible : void Wt(t, a, e)
      });
      return e !== r && (this.iterator("column", function (a, r) {
        vt(a, null, "column-visibility", [a, r, e, t])
      }), (t === r || t) && this.columns.adjust()), a
    }), s("columns().indexes()", "column().index()", function (e) {
      return this.iterator("column", function (t, a) {
        return "visible" === e ? B(t, a) : a
      }, 1)
    }), o("columns.adjust()", function () {
      return this.iterator("table", function (e) {
        M(e)
      }, 1)
    }), o("column.index()", function (e, t) {
      if (0 !== this.context.length) {
        var a = this.context[0];
        if ("fromVisible" === e || "toData" === e) return W(a, t);
        if ("fromData" === e || "toVisible" === e) return B(a, t)
      }
    }), o("column()", function (e, t) {
      return xt(this.columns(e, t))
    });
    var Bt = function (t, a, n) {
      var u, c, d, h, p, v, g, i = t.aoData,
        l = It(t, n),
        o = T(_(i, l, "anCells")),
        s = e([].concat.apply([], o)),
        f = t.aoColumns.length,
        b = function (a) {
          var n = "function" == typeof a;
          if (null === a || a === r || n) {
            for (c = [], d = 0, h = l.length; h > d; d++)
              for (u = l[d], p = 0; f > p; p++) v = {
                row: u,
                column: p
              }, n ? (g = i[u], a(v, z(t, u, p), g.anCells ? g.anCells[p] : null) &&
                c.push(v)) : c.push(v);
            return c
          }
          if (e.isPlainObject(a)) return a.column !== r && a.row !== r && -1 !== e
            .inArray(a.row, l) ? [a] : [];
          var o = s.filter(a).map(function (e, t) {
            return {
              row: t._DT_CellIndex.row,
              column: t._DT_CellIndex.column
            }
          }).toArray();
          return o.length || !a.nodeName ? o : (g = e(a).closest("*[data-dt-row]"), g
            .length ? [{
              row: g.data("dt-row"),
              column: g.data("dt-column")
            }] : [])
        };
      return Tt("cell", a, b, t, n)
    };
    o("cells()", function (t, a, n) {
      if (e.isPlainObject(t) && (t.row === r ? (n = t, t = null) : (n = a, a =
          null)), e.isPlainObject(a) && (n =
          a, a = null), null === a || a === r) return this.iterator("table",
        function (e) {
          return Bt(e, t, Ct(n))
        });
      var o, s, u, f, c, i = this.columns(a),
        l = this.rows(t);
      this.iterator("table", function (e, t) {
        for (o = [], s = 0, u = l[t].length; u > s; s++)
          for (f = 0, c = i[t].length; c > f; f++) o.push({
            row: l[t][s],
            column: i[t][f]
          })
      }, 1);
      var d = this.cells(o, n);
      return e.extend(d.selector, {
        cols: a,
        rows: t,
        opts: n
      }), d
    }), s("cells().nodes()", "cell().node()", function () {
      return this.iterator("cell", function (e, t, a) {
        var n = e.aoData[t];
        return n && n.anCells ? n.anCells[a] : r
      }, 1)
    }), o("cells().data()", function () {
      return this.iterator("cell", function (e, t, a) {
        return z(e, t, a)
      }, 1)
    }), s("cells().cache()", "cell().cache()", function (e) {
      return e = "search" === e ? "_aFilterData" : "_aSortData", this.iterator(
        "cell",
        function (t, a, r) {
          return t.aoData[a][e][r]
        }, 1)
    }), s("cells().render()", "cell().render()", function (e) {
      return this.iterator("cell", function (t, a, r) {
        return z(t, a, r, e)
      }, 1)
    }), s("cells().indexes()", "cell().index()", function () {
      return this.iterator("cell", function (e, t, a) {
        return {
          row: t,
          column: a,
          columnVisible: B(e, a)
        }
      }, 1)
    }), s("cells().invalidate()", "cell().invalidate()", function (e) {
      return this.iterator("cell", function (t, a, r) {
        ie(t, a, e, r)
      })
    }), o("cell()", function (e, t, a) {
      return xt(this.cells(e, t, a))
    }), o("cell().data()", function (e) {
      var t = this.context,
        a = this[0];
      return e === r ? t.length && a.length ? z(t[0], a[0].row, a[0].column) : r : (
        Y(t[0], a[0].row, a[0].column,
          e), ie(t[0], a[0].row, "data", a[0].column), this)
    }), o("order()", function (t, a) {
      var n = this.context;
      return t === r ? 0 !== n.length ? n[0].aaSorting : r : ("number" == typeof t ?
        t = [
          [t, a]
        ] : t.length && !e.isArray(t[0]) && (t = Array.prototype.slice.call(
          arguments)), this.iterator("table",
          function (e) {
            e.aaSorting = t.slice()
          }))
    }), o("order.listener()", function (e, t, a) {
      return this.iterator("table", function (r) {
        nt(r, e, t, a)
      })
    }), o("order.fixed()", function (t) {
      if (!t) {
        var a = this.context,
          n = a.length ? a[0].aaSortingFixed : r;
        return e.isArray(n) ? {
          pre: n
        } : n
      }
      return this.iterator("table", function (a) {
        a.aaSortingFixed = e.extend(!0, {}, t)
      })
    }), o(["columns().order()", "column().order()"], function (t) {
      var a = this;
      return this.iterator("table", function (r, n) {
        var i = [];
        e.each(a[n], function (e, a) {
          i.push([a, t])
        }), r.aaSorting = i
      })
    }), o("search()", function (t, a, n, i) {
      var l = this.context;
      return t === r ? 0 !== l.length ? l[0].oPreviousSearch.sSearch : r : this
        .iterator("table", function (r) {
          r.oFeatures.bFilter && _e(r, e.extend({}, r.oPreviousSearch, {
            sSearch: t + "",
            bRegex: null === a ? !1 : a,
            bSmart: null === n ? !0 : n,
            bCaseInsensitive: null === i ? !0 : i
          }), 1)
        })
    }), s("columns().search()", "column().search()", function (t, a, n, i) {
      return this.iterator("column", function (l, o) {
        var s = l.aoPreSearchCols;
        return t === r ? s[o].sSearch : void(l.oFeatures.bFilter && (e.extend(s[
          o], {
          sSearch: t + "",
          bRegex: null === a ? !1 : a,
          bSmart: null === n ? !0 : n,
          bCaseInsensitive: null === i ? !0 : i
        }), _e(l, l.oPreviousSearch, 1)))
      })
    }), o("state()", function () {
      return this.context.length ? this.context[0].oSavedState : null
    }), o("state.clear()", function () {
      return this.iterator("table", function (e) {
        e.fnStateSaveCallback.call(e.oInstance, e, {})
      })
    }), o("state.loaded()", function () {
      return this.context.length ? this.context[0].oLoadedState : null
    }), o("state.save()", function () {
      return this.iterator("table", function (e) {
        ot(e)
      })
    }), n.versionCheck = n.fnVersionCheck = function (e) {
      for (var r, i, t = n.version.split("."), a = e.split("."), l = 0, o = a
        .length; o > l; l++)
        if (r = parseInt(t[l], 10) || 0, i = parseInt(a[l], 10) || 0, r !== i)
        return r > i;
      return !0
    }, n.isDataTable = n.fnIsDataTable = function (t) {
      var a = e(t).get(0),
        r = !1;
      return t instanceof n.Api ? !0 : (e.each(n.settings, function (t, n) {
        var i = n.nScrollHead ? e("table", n.nScrollHead)[0] : null,
          l = n.nScrollFoot ? e("table", n.nScrollFoot)[0] : null;
        (n.nTable === a || i === a || l === a) && (r = !0)
      }), r)
    }, n.tables = n.fnTables = function (t) {
      var a = !1;
      e.isPlainObject(t) && (a = t.api, t = t.visible);
      var r = e.map(n.settings, function (a) {
        return !t || t && e(a.nTable).is(":visible") ? a.nTable : void 0
      });
      return a ? new l(r) : r
    }, n.camelToHungarian = F, o("$()", function (t, a) {
      var r = this.rows(a).nodes(),
        n = e(r);
      return e([].concat(n.filter(t).toArray(), n.find(t).toArray()))
    }), e.each(["on", "one", "off"], function (t, a) {
      o(a + "()", function () {
        var t = Array.prototype.slice.call(arguments);
        t[0] = e.map(t[0].split(/\s/), function (e) {
          return e.match(/\.dt\b/) ? e : e + ".dt"
        }).join(" ");
        var r = e(this.tables().nodes());
        return r[a].apply(r, t), this
      })
    }), o("clear()", function () {
      return this.iterator("table", function (e) {
        re(e)
      })
    }), o("settings()", function () {
      return new l(this.context, this.context)
    }), o("init()", function () {
      var e = this.context;
      return e.length ? e[0].oInit : null
    }), o("data()", function () {
      return this.iterator("table", function (e) {
        return y(e.aoData, "_aData")
      }).flatten()
    }), o("destroy()", function (a) {
      return a = a || !1, this.iterator("table", function (r) {
        var b, i = r.nTableWrapper.parentNode,
          o = r.oClasses,
          s = r.nTable,
          u = r.nTBody,
          f = r.nTHead,
          c = r.nTFoot,
          d = e(s),
          h = e(u),
          p = e(r.nTableWrapper),
          v = e.map(r.aoData, function (e) {
            return e.nTr
          });
        r.bDestroying = !0, vt(r, "aoDestroyCallback", "destroy", [r]), a ||
          new l(r).columns().visible(!0), p
          .off(".DT").find(":not(tbody *)").off(".DT"), e(t).off(".DT-" + r
            .sInstance), s != f.parentNode && (
            d.children("thead").detach(), d.append(f)), c && s != c
          .parentNode && (d.children("tfoot")
            .detach(), d.append(c)), r.aaSorting = [], r.aaSortingFixed = [],
          it(r), e(v).removeClass(r
            .asStripeClasses.join(" ")), e("th, td", f).removeClass(o
            .sSortable + " " + o.sSortableAsc + " " +
            o.sSortableDesc + " " + o.sSortableNone), h.children().detach(), h
          .append(v);
        var m = a ? "remove" : "detach";
        d[m](), p[m](), !a && i && (i.insertBefore(s, r.nTableReinsertBefore), d
          .css("width", r.sDestroyWidth)
          .removeClass(o.sTable), b = r.asDestroyStripes.length, b && h
          .children().each(function (t) {
            e(this).addClass(r.asDestroyStripes[t % b])
          }));
        var S = e.inArray(r, n.settings); - 1 !== S && n.settings.splice(S, 1)
      })
    }), e.each(["column", "row", "cell"], function (e, t) {
      o(t + "s().every()", function (e) {
        var a = this.selector.opts,
          n = this;
        return this.iterator(t, function (i, l, o, s, u) {
          e.call(n[t](l, "cell" === t ? o : a, "cell" === t ? a : r), l, o,
            s, u)
        })
      })
    }), o("i18n()", function (t, a, n) {
      var i = this.context[0],
        l = ee(t)(i.oLanguage);
      return l === r && (l = a), n !== r && e.isPlainObject(l) && (l = l[n] !== r ?
        l[n] : l._), l.replace("%d",
        n)
    }), n.version = "1.10.18", n.settings = [], n.models = {}, n.models.oSearch = {
      bCaseInsensitive: !0,
      sSearch: "",
      bRegex: !1,
      bSmart: !0
    }, n.models.oRow = {
      nTr: null,
      anCells: null,
      _aData: [],
      _aSortData: null,
      _aFilterData: null,
      _sFilterRow: null,
      _sRowStripe: "",
      src: null,
      idx: -1
    }, n.models.oColumn = {
      idx: null,
      aDataSort: null,
      asSorting: null,
      bSearchable: null,
      bSortable: null,
      bVisible: null,
      _sManualType: null,
      _bAttrSrc: !1,
      fnCreatedCell: null,
      fnGetData: null,
      fnSetData: null,
      mData: null,
      mRender: null,
      nTh: null,
      nTf: null,
      sClass: null,
      sContentPadding: null,
      sDefaultContent: null,
      sName: null,
      sSortDataType: "std",
      sSortingClass: null,
      sSortingClassJUI: null,
      sTitle: null,
      sType: null,
      sWidth: null,
      sWidthOrig: null
    }, n.defaults = {
      aaData: null,
      aaSorting: [
        [0, "asc"]
      ],
      aaSortingFixed: [],
      ajax: null,
      aLengthMenu: [10, 25, 50, 100],
      aoColumns: null,
      aoColumnDefs: null,
      aoSearchCols: [],
      asStripeClasses: null,
      bAutoWidth: !0,
      bDeferRender: !1,
      bDestroy: !1,
      bFilter: !0,
      bInfo: !0,
      bLengthChange: !0,
      bPaginate: !0,
      bProcessing: !1,
      bRetrieve: !1,
      bScrollCollapse: !1,
      bServerSide: !1,
      bSort: !0,
      bSortMulti: !0,
      bSortCellsTop: !1,
      bSortClasses: !0,
      bStateSave: !1,
      fnCreatedRow: null,
      fnDrawCallback: null,
      fnFooterCallback: null,
      fnFormatNumber: function (e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage
          .sThousands)
      },
      fnHeaderCallback: null,
      fnInfoCallback: null,
      fnInitComplete: null,
      fnPreDrawCallback: null,
      fnRowCallback: null,
      fnServerData: null,
      fnServerParams: null,
      fnStateLoadCallback: function (e) {
        try {
          return JSON.parse((-1 === e.iStateDuration ? sessionStorage :
            localStorage).getItem("DataTables_" + e
            .sInstance + "_" + location.pathname))
        } catch (t) {}
      },
      fnStateLoadParams: null,
      fnStateLoaded: null,
      fnStateSaveCallback: function (e, t) {
        try {
          (-1 === e.iStateDuration ? sessionStorage : localStorage).setItem(
            "DataTables_" + e.sInstance + "_" +
            location.pathname, JSON.stringify(t))
        } catch (a) {}
      },
      fnStateSaveParams: null,
      iStateDuration: 7200,
      iDeferLoading: null,
      iDisplayLength: 10,
      iDisplayStart: 0,
      iTabIndex: 0,
      oClasses: {},
      oLanguage: {
        oAria: {
          sSortAscending: ": activate to sort column ascending",
          sSortDescending: ": activate to sort column descending"
        },
        oPaginate: {
          sFirst: "First",
          sLast: "Last",
          sNext: "Next",
          sPrevious: "Previous"
        },
        sEmptyTable: "No data available in table",
        sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
        sInfoEmpty: "Showing 0 to 0 of 0 entries",
        sInfoFiltered: "(filtered from _MAX_ total entries)",
        sInfoPostFix: "",
        sDecimal: "",
        sThousands: ",",
        sLengthMenu: "Show _MENU_ entries",
        sLoadingRecords: "Loading...",
        sProcessing: "Processing...",
        sSearch: "Search:",
        sSearchPlaceholder: "",
        sUrl: "",
        sZeroRecords: "No matching records found"
      },
      oSearch: e.extend({}, n.models.oSearch),
      sAjaxDataProp: "data",
      sAjaxSource: null,
      sDom: "lfrtip",
      searchDelay: null,
      sPaginationType: "simple_numbers",
      sScrollX: "",
      sScrollXInner: "",
      sScrollY: "",
      sServerMethod: "GET",
      renderer: null,
      rowId: "DT_RowId"
    }, A(n.defaults), n.defaults.column = {
      aDataSort: null,
      iDataSort: -1,
      asSorting: ["asc", "desc"],
      bSearchable: !0,
      bSortable: !0,
      bVisible: !0,
      fnCreatedCell: null,
      mData: null,
      mRender: null,
      sCellType: "td",
      sClass: "",
      sContentPadding: "",
      sDefaultContent: null,
      sName: "",
      sSortDataType: "std",
      sTitle: null,
      sType: null,
      sWidth: null
    }, A(n.defaults.column), n.models.oSettings = {
      oFeatures: {
        bAutoWidth: null,
        bDeferRender: null,
        bFilter: null,
        bInfo: null,
        bLengthChange: null,
        bPaginate: null,
        bProcessing: null,
        bServerSide: null,
        bSort: null,
        bSortMulti: null,
        bSortClasses: null,
        bStateSave: null
      },
      oScroll: {
        bCollapse: null,
        iBarWidth: 0,
        sX: null,
        sXInner: null,
        sY: null
      },
      oLanguage: {
        fnInfoCallback: null
      },
      oBrowser: {
        bScrollOversize: !1,
        bScrollbarLeft: !1,
        bBounding: !1,
        barWidth: 0
      },
      ajax: null,
      aanFeatures: [],
      aoData: [],
      aiDisplay: [],
      aiDisplayMaster: [],
      aIds: {},
      aoColumns: [],
      aoHeader: [],
      aoFooter: [],
      oPreviousSearch: {},
      aoPreSearchCols: [],
      aaSorting: null,
      aaSortingFixed: [],
      asStripeClasses: null,
      asDestroyStripes: [],
      sDestroyWidth: 0,
      aoRowCallback: [],
      aoHeaderCallback: [],
      aoFooterCallback: [],
      aoDrawCallback: [],
      aoRowCreatedCallback: [],
      aoPreDrawCallback: [],
      aoInitComplete: [],
      aoStateSaveParams: [],
      aoStateLoadParams: [],
      aoStateLoaded: [],
      sTableId: "",
      nTable: null,
      nTHead: null,
      nTFoot: null,
      nTBody: null,
      nTableWrapper: null,
      bDeferLoading: !1,
      bInitialised: !1,
      aoOpenRows: [],
      sDom: null,
      searchDelay: null,
      sPaginationType: "two_button",
      iStateDuration: 0,
      aoStateSave: [],
      aoStateLoad: [],
      oSavedState: null,
      oLoadedState: null,
      sAjaxSource: null,
      sAjaxDataProp: null,
      bAjaxDataGet: !0,
      jqXHR: null,
      json: r,
      oAjaxData: r,
      fnServerData: null,
      aoServerParams: [],
      sServerMethod: null,
      fnFormatNumber: null,
      aLengthMenu: null,
      iDraw: 0,
      bDrawing: !1,
      iDrawError: -1,
      _iDisplayLength: 10,
      _iDisplayStart: 0,
      _iRecordsTotal: 0,
      _iRecordsDisplay: 0,
      oClasses: {},
      bFiltered: !1,
      bSorted: !1,
      bSortCellsTop: null,
      oInit: null,
      aoDestroyCallback: [],
      fnRecordsTotal: function () {
        return "ssp" == mt(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster
          .length
      },
      fnRecordsDisplay: function () {
        return "ssp" == mt(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
      },
      fnDisplayEnd: function () {
        var e = this._iDisplayLength,
          t = this._iDisplayStart,
          a = t + e,
          r = this.aiDisplay.length,
          n = this.oFeatures,
          i = n.bPaginate;
        return n.bServerSide ? i === !1 || -1 === e ? t + r : Math.min(t + e, this
            ._iRecordsDisplay) : !i || a >
          r || -1 === e ? r : a
      },
      oInstance: null,
      sInstance: null,
      iTabIndex: 0,
      nScrollHead: null,
      nScrollFoot: null,
      aLastSort: [],
      oPlugins: {},
      rowIdFn: null,
      rowId: null
    }, n.ext = i = {
      buttons: {},
      classes: {},
      build: "bs4/dt-1.10.18",
      errMode: "alert",
      feature: [],
      search: [],
      selector: {
        cell: [],
        column: [],
        row: []
      },
      internal: {},
      legacy: {
        ajax: null
      },
      pager: {},
      renderer: {
        pageButton: {},
        header: {}
      },
      order: {},
      type: {
        detect: [],
        search: {},
        order: {}
      },
      _unique: 0,
      fnVersionCheck: n.fnVersionCheck,
      iApiIndex: 0,
      oJUIClasses: {},
      sVersion: n.version
    }, e.extend(i, {
      afnFiltering: i.search,
      aTypes: i.type.detect,
      ofnSearch: i.type.search,
      oSort: i.type.order,
      afnSortData: i.order,
      aoFeatures: i.feature,
      oApi: i.internal,
      oStdClasses: i.classes,
      oPagination: i.pager
    }), e.extend(n.ext.classes, {
      sTable: "dataTable",
      sNoFooter: "no-footer",
      sPageButton: "paginate_button",
      sPageButtonActive: "current",
      sPageButtonDisabled: "disabled",
      sStripeOdd: "odd",
      sStripeEven: "even",
      sRowEmpty: "dataTables_empty",
      sWrapper: "dataTables_wrapper",
      sFilter: "dataTables_filter",
      sInfo: "dataTables_info",
      sPaging: "dataTables_paginate paging_",
      sLength: "dataTables_length",
      sProcessing: "dataTables_processing",
      sSortAsc: "sorting_asc",
      sSortDesc: "sorting_desc",
      sSortable: "sorting",
      sSortableAsc: "sorting_asc_disabled",
      sSortableDesc: "sorting_desc_disabled",
      sSortableNone: "sorting_disabled",
      sSortColumn: "sorting_",
      sFilterInput: "",
      sLengthSelect: "",
      sScrollWrapper: "dataTables_scroll",
      sScrollHead: "dataTables_scrollHead",
      sScrollHeadInner: "dataTables_scrollHeadInner",
      sScrollBody: "dataTables_scrollBody",
      sScrollFoot: "dataTables_scrollFoot",
      sScrollFootInner: "dataTables_scrollFootInner",
      sHeaderTH: "",
      sFooterTH: "",
      sSortJUIAsc: "",
      sSortJUIDesc: "",
      sSortJUI: "",
      sSortJUIAscAllowed: "",
      sSortJUIDescAllowed: "",
      sSortJUIWrapper: "",
      sSortIcon: "",
      sJUIHeader: "",
      sJUIFooter: ""
    });
    var Et = n.ext.pager;
    e.extend(Et, {
      simple: function (e, t) {
        return ["previous", "next"]
      },
      full: function (e, t) {
        return ["first", "previous", "next", "last"]
      },
      numbers: function (e, t) {
        return [Ut(e, t)]
      },
      simple_numbers: function (e, t) {
        return ["previous", Ut(e, t), "next"]
      },
      full_numbers: function (e, t) {
        return ["first", "previous", Ut(e, t), "next", "last"]
      },
      first_last_numbers: function (e, t) {
        return ["first", Ut(e, t), "last"]
      },
      _numbers: Ut,
      numbers_length: 7
    }), e.extend(!0, n.ext.renderer, {
      pageButton: {
        _: function (t, n, i, l, o, s) {
          var d, h, g, u = t.oClasses,
            f = t.oLanguage.oPaginate,
            c = t.oLanguage.oAria.paginate || {},
            p = 0,
            v = function (a, r) {
              var n, l, g, b, m = function (e) {
                Ee(t, e.data.action, !0)
              };
              for (n = 0, l = r.length; l > n; n++)
                if (b = r[n], e.isArray(b)) {
                  var S = e("<" + (b.DT_el || "div") + "/>").appendTo(a);
                  v(S, b)
                } else {
                  switch (d = null, h = "", b) {
                    case "ellipsis":
                      a.append('<span class="ellipsis">&#x2026;</span>');
                      break;
                    case "first":
                      d = f.sFirst, h = b + (o > 0 ? "" : " " + u
                        .sPageButtonDisabled);
                      break;
                    case "previous":
                      d = f.sPrevious, h = b + (o > 0 ? "" : " " + u
                        .sPageButtonDisabled);
                      break;
                    case "next":
                      d = f.sNext, h = b + (s - 1 > o ? "" : " " + u
                        .sPageButtonDisabled);
                      break;
                    case "last":
                      d = f.sLast, h = b + (s - 1 > o ? "" : " " + u
                        .sPageButtonDisabled);
                      break;
                    default:
                      d = b + 1, h = o === b ? u.sPageButtonActive : ""
                  }
                  null !== d && (g = e("<a>", {
                    "class": u.sPageButton + " " + h,
                    "aria-controls": t.sTableId,
                    "aria-label": c[b],
                    "data-dt-idx": p,
                    tabindex: t.iTabIndex,
                    id: 0 === i && "string" == typeof b ? t.sTableId + "_" +
                      b : null
                  }).html(d).appendTo(a), ht(g, {
                    action: b
                  }, m), p++)
                }
            };
          try {
            g = e(n).find(a.activeElement).data("dt-idx")
          } catch (b) {}
          v(e(n).empty(), l), g !== r && e(n).find("[data-dt-idx=" + g + "]")
            .focus()
        }
      }
    }), e.extend(n.ext.type.detect, [function (e, t) {
      var a = t.oLanguage.sDecimal;
      return m(e, a) ? "num" + a : null
    }, function (e, t) {
      if (e && !(e instanceof Date) && !d.test(e)) return null;
      var a = Date.parse(e);
      return null !== a && !isNaN(a) || v(e) ? "date" : null
    }, function (e, t) {
      var a = t.oLanguage.sDecimal;
      return m(e, a, !0) ? "num-fmt" + a : null
    }, function (e, t) {
      var a = t.oLanguage.sDecimal;
      return D(e, a) ? "html-num" + a : null
    }, function (e, t) {
      var a = t.oLanguage.sDecimal;
      return D(e, a, !0) ? "html-num-fmt" + a : null
    }, function (e, t) {
      return v(e) || "string" == typeof e && -1 !== e.indexOf("<") ? "html" : null
    }]), e.extend(n.ext.type.search, {
      html: function (e) {
        return v(e) ? e : "string" == typeof e ? e.replace(f, " ").replace(c,
          "") : ""
      },
      string: function (e) {
        return v(e) ? e : "string" == typeof e ? e.replace(f, " ") : e
      }
    });
    var Vt = function (e, t, a, r) {
      return 0 === e || e && "-" !== e ? (t && (e = b(e, t)), e.replace && (a && (e =
        e.replace(a, "")), r && (e = e
        .replace(r, ""))), 1 * e) : -(1 / 0)
    };
    e.extend(i.type.order, {
      "date-pre": function (e) {
        var t = Date.parse(e);
        return isNaN(t) ? -(1 / 0) : t
      },
      "html-pre": function (e) {
        return v(e) ? "" : e.replace ? e.replace(/<.*?>/g, "").toLowerCase() : e +
          ""
      },
      "string-pre": function (e) {
        return v(e) ? "" : "string" == typeof e ? e.toLowerCase() : e.toString ? e
          .toString() : ""
      },
      "string-asc": function (e, t) {
        return t > e ? -1 : e > t ? 1 : 0
      },
      "string-desc": function (e, t) {
        return t > e ? 1 : e > t ? -1 : 0
      }
    }), Xt(""), e.extend(!0, n.ext.renderer, {
      header: {
        _: function (t, a, r, n) {
          e(t.nTable).on("order.dt.DT", function (e, i, l, o) {
            if (t === i) {
              var s = r.idx;
              a.removeClass(r.sSortingClass + " " + n.sSortAsc + " " + n
                .sSortDesc).addClass("asc" == o[s] ?
                n.sSortAsc : "desc" == o[s] ? n.sSortDesc : r.sSortingClass)
            }
          })
        },
        jqueryui: function (t, a, r, n) {
          e("<div/>").addClass(n.sSortJUIWrapper).append(a.contents()).append(e(
            "<span/>").addClass(n
            .sSortIcon + " " + r.sSortingClassJUI)).appendTo(a), e(t.nTable).on(
            "order.dt.DT",
            function (e, i,
              l, o) {
              if (t === i) {
                var s = r.idx;
                a.removeClass(n.sSortAsc + " " + n.sSortDesc).addClass("asc" ==
                  o[s] ? n.sSortAsc : "desc" ==
                  o[s] ? n.sSortDesc : r.sSortingClass), a.find("span." + n
                  .sSortIcon).removeClass(n
                  .sSortJUIAsc + " " + n.sSortJUIDesc + " " + n.sSortJUI +
                  " " + n.sSortJUIAscAllowed +
                  " " + n.sSortJUIDescAllowed).addClass("asc" == o[s] ? n
                  .sSortJUIAsc : "desc" == o[s] ? n
                  .sSortJUIDesc : r.sSortingClassJUI)
              }
            })
        }
      }
    });
    var Jt = function (e) {
      return "string" == typeof e ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;") : e
    };
    return n.render = {
        number: function (e, t, a, r, n) {
          return {
            display: function (i) {
              if ("number" != typeof i && "string" != typeof i) return i;
              var l = 0 > i ? "-" : "",
                o = parseFloat(i);
              if (isNaN(o)) return Jt(i);
              o = o.toFixed(a), i = Math.abs(o);
              var s = parseInt(i, 10),
                u = a ? t + (i - s).toFixed(a).substring(2) : "";
              return l + (r || "") + s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                e) + u + (n || "")
            }
          }
        },
        text: function () {
          return {
            display: Jt
          }
        }
      }, e.extend(n.ext.internal, {
        _fnExternApiFunc: qt,
        _fnBuildAjax: ge,
        _fnAjaxUpdate: be,
        _fnAjaxParameters: me,
        _fnAjaxUpdateDraw: Se,
        _fnAjaxDataSrc: De,
        _fnAddColumn: k,
        _fnColumnOptions: O,
        _fnAdjustColumnSizing: M,
        _fnVisibleToColumnIndex: W,
        _fnColumnIndexToVisible: B,
        _fnVisbleColumns: E,
        _fnGetColumns: U,
        _fnColumnTypes: V,
        _fnApplyColumnDefs: X,
        _fnHungarianMap: A,
        _fnCamelToHungarian: F,
        _fnLanguageCompat: L,
        _fnBrowserDetect: N,
        _fnAddData: J,
        _fnAddTr: q,
        _fnNodeToDataIndex: G,
        _fnNodeToColumnIndex: $,
        _fnGetCellData: z,
        _fnSetCellData: Y,
        _fnSplitObjNotation: K,
        _fnGetObjectDataFn: ee,
        _fnSetObjectDataFn: te,
        _fnGetDataMaster: ae,
        _fnClearTable: re,
        _fnDeleteIndex: ne,
        _fnInvalidate: ie,
        _fnGetRowElements: le,
        _fnCreateTr: oe,
        _fnBuildHead: ue,
        _fnDrawHead: fe,
        _fnDraw: ce,
        _fnReDraw: de,
        _fnAddOptionsHtml: he,
        _fnDetectHeader: pe,
        _fnGetUniqueThs: ve,
        _fnFeatureHtmlFilter: ye,
        _fnFilterComplete: _e,
        _fnFilterCustom: we,
        _fnFilterColumn: Te,
        _fnFilter: Ce,
        _fnFilterCreateSearch: xe,
        _fnEscapeRegex: Ie,
        _fnFilterData: Le,
        _fnFeatureHtmlInfo: je,
        _fnUpdateInfo: Ne,
        _fnInfoMacros: He,
        _fnInitialise: ke,
        _fnInitComplete: Oe,
        _fnLengthChange: Me,
        _fnFeatureHtmlLength: We,
        _fnFeatureHtmlPaginate: Be,
        _fnPageChange: Ee,
        _fnFeatureHtmlProcessing: Ue,
        _fnProcessingDisplay: Ve,
        _fnFeatureHtmlTable: Xe,
        _fnScrollDraw: Je,
        _fnApplyToChildren: qe,
        _fnCalculateColumnWidths: $e,
        _fnThrottle: ze,
        _fnConvertToWidth: Ye,
        _fnGetWidestNode: Ze,
        _fnGetMaxLenString: Qe,
        _fnStringToCss: Ke,
        _fnSortFlatten: et,
        _fnSort: tt,
        _fnSortAria: at,
        _fnSortListener: rt,
        _fnSortAttachListener: nt,
        _fnSortingClasses: it,
        _fnSortData: lt,
        _fnSaveState: ot,
        _fnLoadState: st,
        _fnSettingsFromNode: ut,
        _fnLog: ft,
        _fnMap: ct,
        _fnBindAction: ht,
        _fnCallbackReg: pt,
        _fnCallbackFire: vt,
        _fnLengthOverflow: gt,
        _fnRenderer: bt,
        _fnDataSource: mt,
        _fnRowAttributes: se,
        _fnExtend: dt,
        _fnCalculateEnd: function () {}
      }), e.fn.dataTable = n, n.$ = e, e.fn.dataTableSettings = n.settings, e.fn
      .dataTableExt = n.ext, e.fn
      .DataTable = function (t) {
        return e(this).dataTable(t).api()
      }, e.each(n, function (t, a) {
        e.fn.DataTable[t] = a
      }), e.fn.dataTable
  }),
  function (e) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"],
      function (t) {
        return e(t, window, document)
      }) : "object" == typeof exports ? module.exports = function (t, a) {
      return t || (t = window), a && a.fn.dataTable || (a = require("datatables.net")(t,
        a).$), e(a, t, t.document)
    } : e(jQuery, window, document)
  }(function (e, t, a, r) {
    "use strict";
    var n = e.fn.dataTable;
    return e.extend(!0, n.defaults, {
      dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      renderer: "bootstrap"
    }), e.extend(n.ext.classes, {
      sWrapper: "dataTables_wrapper dt-bootstrap4",
      sFilterInput: "form-control form-control-sm",
      sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
      sProcessing: "dataTables_processing card",
      sPageButton: "paginate_button page-item"
    }), n.ext.renderer.pageButton.bootstrap = function (t, i, l, o, s, u) {
      var p, v, m, f = new n.Api(t),
        c = t.oClasses,
        d = t.oLanguage.oPaginate,
        h = t.oLanguage.oAria.paginate || {},
        g = 0,
        b = function (a, r) {
          var n, i, o, m, S = function (t) {
            t.preventDefault(), e(t.currentTarget).hasClass("disabled") || f
            .page() == t.data.action || f.page(t
                .data.action).draw("page")
          };
          for (n = 0, i = r.length; i > n; n++)
            if (m = r[n], e.isArray(m)) b(a, m);
            else {
              switch (p = "", v = "", m) {
                case "ellipsis":
                  p = "&#x2026;", v = "disabled";
                  break;
                case "first":
                  p = d.sFirst, v = m + (s > 0 ? "" : " disabled");
                  break;
                case "previous":
                  p = d.sPrevious, v = m + (s > 0 ? "" : " disabled");
                  break;
                case "next":
                  p = d.sNext, v = m + (u - 1 > s ? "" : " disabled");
                  break;
                case "last":
                  p = d.sLast, v = m + (u - 1 > s ? "" : " disabled");
                  break;
                default:
                  p = m + 1, v = s === m ? "active" : ""
              }
              p && (o = e("<li>", {
                "class": c.sPageButton + " " + v,
                id: 0 === l && "string" == typeof m ? t.sTableId + "_" + m :
                  null
              }).append(e("<a>", {
                href: "#",
                "aria-controls": t.sTableId,
                "aria-label": h[m],
                "data-dt-idx": g,
                tabindex: t.iTabIndex,
                "class": "page-link"
              }).html(p)).appendTo(a), t.oApi._fnBindAction(o, {
                action: m
              }, S), g++)
            }
        };
      try {
        m = e(i).find(a.activeElement).data("dt-idx")
      } catch (S) {}
      b(e(i).empty().html('<ul class="pagination"/>').children("ul"), o), m !== r &&
        e(i).find("[data-dt-idx=" + m +
          "]").focus()
    }, n
  });



