getSomeJsonP = function () {
    var $jsonp = (function () {
        var that = {};
        that.send = function (src, options) {
                var callback_name = options.callbackName || 'callback',
                    on_success = options.onSuccess || function () {},
                    on_timeout = options.onTimeout || function () {},
                    timeout = options.timeout || 10; // sec
                //
                var timeout_trigger = window.setTimeout(function () {
                    window[callback_name] = function () {};
                    on_timeout();
                }, timeout * 1000);
                //
                window[callback_name] = function (data) {
                        window.clearTimeout(timeout_trigger);
                        on_success(data);
                    }
                    //
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = src;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //
        return that;
    })();
    $jsonp.send('your_jsonp_url', {
        callbackName: 'your_callback',
        onSuccess: function (json) {
            console.log('success!', json);
            //alert(json.podcasts[0].date);
            //
            var d, i;
            for (i = 0; i < json.podcasts.length; i++) {
                d = json.item[i];
                document.getElementById('your_div').innerHTML +=  //write html to the page per jsonp item in the loop
                'this is an item' + d.stuff;
            }
        },
        onTimeout: function () {
          //if there's a time out fetching the data
            console.log('oh no there was problem fetching the data');
        },
        timeout: 5
    });
}
getSomeJsonP();
