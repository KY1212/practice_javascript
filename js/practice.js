$(function () {

  $(".wrapper").each(function (){
    //タブの処理
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

});

