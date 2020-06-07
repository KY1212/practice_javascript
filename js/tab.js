$(function () {

    $('#tabWrapper').each(function () {

        /*変数の設定*/
        var $tabNav = $(this).find('.tabNav'),
            $Anchors = $tabNav.find('a'),
            $tab = $(this).find('.tab');

        $tabNav.on('click', 'a', function (event) {

            /*
            デフォルトの操作を発生させない
            aタグの遷移をさせない処理
            */
            event.preventDefault();
            var $this = $(this);
            //すでにactiveであれば以降の処理を中止
            if ($this.hasClass('active')) {
                return;
            }

            //activeになっているタブを解除
            $Anchors.removeClass('active');
            //クリックしたタブをactiveにする
            $this.addClass('active');
            //全てのタブを非表示
            $tab.hide();
            $($this.attr('href')).show();
        });

        //一番目のタブを選択状態にする
        $Anchors.eq(0).trigger('click');

    });

});
