$(function () {

    $('.tabWrap').each(function () {

        /*変数の設定*/
        var $tabNav = $(this).find('.tabNav'),
            $Anchors = $tabNav.find('a'),
            $tab = $(this).find('.tab');

        $tabNav.on('click', 'a', function (event) {

            event.preventDefault();
            var $this = $(this);

            if ($this.hasClass('active')) {
                return;
            }

            $Anchors.removeClass('active');
            $this.addClass('active');
            $tab.hide();
            $($this.attr('href')).show();

        });

        $Anchors.eq(0).trigger('click');

    });
    
});
