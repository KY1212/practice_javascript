$(function () {

  var duration = 800;

  var menu = $(".menu");
  var menuList = $(".menuList");
  var close = $(".menuList>.menuHeading");

  menu.click(function(){
    menuList.toggleClass("open");
    if(menuList.hasClass("open")){
      menuList.stop(true).animate({
        left: "0px"
      },duration, "easeOutBounce");
    }
  });
  close.click(function(){
    menuList.toggleClass("open");
    if(!menuList.hasClass("open")){
    menuList.stop(true).animate({
      left: "-375px"
    },duration, "easeOutExpo");
  }
  });


  $(".wrapper").each(function (){
    //メインタブの処理
    var $tabNav = $(this).find(".tabNav"),
    $tabAnchors = $tabNav.find("a"),
    $tabPanel = $(this).find(".tab"),
    $genreNav= $(this).find(".genreNav"),
    $genreTabAnchors = $genreNav.find("a"),
    $genreTabs = $(this).find(".genreTabs"),
    $genrePanel = $(this).find(".genreTab");

    $tabNav.find("li a").click(function(){
      event.preventDefault();
      var $this = $(this);
      $tabAnchors.removeClass("active");
      $(".tabNav li").removeClass("active");
      if($this.hasClass("active")) {
        return;
      }
      $this.addClass("active");
      $tabPanel.hide();
      $($this.attr("href")).show();
    });

    //ジャンルのタブ
    $genreNav.find("li").click(function(){
      event.preventDefault();
      var $this = $(this);
      $genreTabAnchors.removeClass("active");
      $(".genreNav li").removeClass("active");
      if($this.hasClass("active")) {
        return;
      }
      $this.addClass("active");
      $genrePanel.hide();
      $($this.find("a").attr("href")).show();
    });
  });

  //jsonデータを入れるHTMLの生成
  $(document).ready(function () {
    $.getJSON("data/sample_data.json", function(data){
        for(var i in data){
          console.log(i);
          var recruiting=$("<div class=\"recruiting\"></div>");

          recruiting.append("<p class=\"station\">"+data[i].station+"</p>");
          recruiting.append("<p class=\"date\">"+data[i].date+"</p>");

          recruiting.append("<span class=\"role\">"+data[i].role+"</span>");
          recruiting.append("<span class=\"age\">"+data[i].age+"</span>");

          $("#genreTab0 > .wrapper > .recruitingWrap").append(recruiting);

          $('.recruiting>.station, .recruiting>.date').wrapAll("<div class=\"station_date\"></div>");
          $('.recruiting>span').wrapAll("<p class=\"conditions\"></p>");
        }
    });
});

    //カレンダー用の変数群
    var $window = $(window);
    var $year = $('#js-year');
    var $month = $('#js-month');
    var $tbody = $('#js-calendar-body');

    var today = new Date();
    var currentYear = today.getFullYear(),
        currentMonth = today.getMonth();

    $window.on('load',function(){
      calendarHeading(currentYear, currentMonth);
      calendarBody(currentYear, currentMonth, today);
    });

    //カレンダー
    function calendarBody(year, month, today){
      var todayYMFlag = today.getFullYear() === year && today.getMonth() === month ? true : false; // 本日の年と月が表示されるカレンダーと同じか判定
      var startDate = new Date(year, month, 1); // その月の最初の日の情報
      var endDate  = new Date(year, month + 1 , 0); // その月の最後の日の情報
      var startDay = startDate.getDay();// その月の最初の日の曜日を取得
      var endDay = endDate.getDate();// その月の最後の日の曜日を取得
      var textSkip = true; // 日にちを埋める用のフラグ
      var textDate = 1; // 日付(これがカウントアップされます)
      var tableBody =''; // テーブルのHTMLを格納する変数
      var getMonth = today.getMonth();
      getMonth+=1;//今月の月取得

      for (var row = 0; row < 6; row++){
        var tr = '<tr>';

        for (var col = 0; col < 7; col++) {
          if (row === 0 && startDay === col){
            textSkip = false;
          }
          if (textDate > endDay) {
            textSkip = true;
          }
          var addClass = todayYMFlag && textDate === today.getDate() ? 'is-today' : '';
          var textTd = textSkip ? ' ' : textDate++;
          var td = `<td class="${addClass}" id="${textTd}">`+textTd+'</td>';
          tr += td;
        }
        tr += '</tr>';
        tableBody += tr;
      }
      $tbody.html(tableBody);

      //カレンダーの日付をクリック、その日付を持ったjsonデータのみ表示
      $("#js-calendar-body").on("click",function(event){
        $(".recruiting").show();
        $(document).ready(function () {
          $.getJSON("data/sample_data.json", function(data){
            console.log(getMonth + "月" + event.target.id + "日");
            selectDate = `${year}/${getMonth}/${event.target.id}`;
            console.log(selectDate);
            for(var i in data){
              if(selectDate!=data[i].date){
                $(`.recruiting:nth(${i})`).hide();
              }else{
                continue;
              }
            }
          });
        });
      });
    }

    function calendarHeading(year, month){
      $year.text(year);
      $month.text(month + 1);
    }



});

