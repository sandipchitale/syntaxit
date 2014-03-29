/**
 * jQuery Aliaser
 */
(function($) {
    /**
     * if jquery version is >= 1.9 add browser detection functionality from jquery-migrate
     */
    if (!jQuery.browser) {
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser : match[1] || "",
                version : match[2] || "0"
            };
        };
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        jQuery.browser = browser;
    }

    $.appendStylesheet = $.appendStylesheet ||
    function(url, overwrite) {
        // Check
        if (!(document.body || false)) {
            setTimeout(function() {
                $.appendStylesheet.apply($, [url, overwrite]);
            }, 500);
            // Chain
            return $;
        }

        // Prepare
        var id = 'stylesheet-' + url.replace(/[^a-zA-Z0-9]/g, '');
        ;
        var $old = $('#' + id);
        if ( typeof overwrite === 'undefined') {
            overwrite = false;
        }

        // Check
        if ($old.length === 1) {
            if (overwrite) {
                $old.remove();
            } else {
                // Chain
                return $;
            }
        }

        // Create
        var bodyEl = document.getElementsByTagName($.browser.safari ? 'head' : 'body')[0];
        var linkEl = document.createElement('link');
        linkEl.type = 'text/css';
        linkEl.rel = 'stylesheet';
        linkEl.media = 'screen';
        linkEl.href = url;
        linkEl.id = id;
        bodyEl.appendChild(linkEl);

        // Chain
        return $;
    };

    $.appendStylesheet = $.appendStylesheet ||
    function(url, overwrite) {
        // Check
        if (!(document.body || false)) {
            setTimeout(function() {
                $.appendStylesheet.apply($, [url, overwrite]);
            }, 500);
            // Chain
            return $;
        }

        // Prepare
        var id = 'stylesheet-' + url.replace(/[^a-zA-Z0-9]/g, '');
        ;
        var $old = $('#' + id);
        if ( typeof overwrite === 'undefined') {
            overwrite = false;
        }

        // Check
        if ($old.length === 1) {
            if (overwrite) {
                $old.remove();
            } else {
                // Chain
                return $;
            }
        }

        // Create
        var bodyEl = document.getElementsByTagName($.browser.safari ? 'head' : 'body')[0];
        var linkEl = document.createElement('link');
        linkEl.type = 'text/css';
        linkEl.rel = 'stylesheet';
        linkEl.media = 'screen';
        linkEl.href = url;
        linkEl.id = id;
        bodyEl.appendChild(linkEl);

        // Chain
        return $;
    };
})(jQuery);

$.appendStylesheet(chrome.extension.getURL('/style/prism.css'));

function syntaxit() {
    var pres = document.querySelectorAll("pre");
    if (pres && pres.length) {
        nextpre: for (var i = 0; i < pres.length; i++) {
            var pre = pres[i];
            var classes = pre.classList.toString().split(/\s+/);
            var foundLineNumbers = false;
            for (var j = 0; j < classes.length; j++) {
                var aClass = classes[j];
                if (aClass === 'line-numbers' || aClass === 'line-numbers' ) {
                    foundLineNumbers = true;
                } if ((/(public|protected|private|static|void|interface)\s/).test(pre.textContent)) {
                } else if (aClass.length > 0) {
                    continue nextpre;
                }
            }
            var maybeCode = pre.firstChild;
            if (maybeCode.nodeType === 1 && maybeCode.nodeName === 'CODE') {

            } else {
                var text = pre.textContent;
                pre.innerHTML = '<code></code>';
                maybeCode = pre.firstChild;
                maybeCode.textContent = text
            }
            var classes = maybeCode.classList.toString().split(/\s+/);
            var foundOtherClass = false;
            var foundLanguageClass = false;
            for (var j = 0; j < classes.length; j++) {
                var aClass = classes[j];
                if ((/\blang(?:uage)?-(?!\*)(\w+)\b/i).test(aClass)) {
                    foundLanguageClass = true;
                } else if (aClass.length > 0) {
                    foundOtherClass = true;
                }
            }
            if (!foundOtherClass) {
                if (!foundLanguageClass) {
                    var lang = 'javascript';
                    if ((/(public|protected|private|static|void|interface)\s/).test(pre.textContent)) {
                        lang = 'java';
                    }
                    maybeCode.classList.add('language-' + lang);
                }
                if (!foundLineNumbers) {
                    pre.classList.add('line-numbers');
                }
                Prism.highlightElement(maybeCode);
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.syntaxit) {
        syntaxit();
    }
});

//setTimeout(syntaxit, 0);
