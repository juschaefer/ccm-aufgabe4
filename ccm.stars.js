{
    let component = {

        name: 'stars',
        ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        config: {
            html: {
                "stars": {
                    "class": "ccm-stars"
                },
                "filled": {
                    "tag": "span",
                    "class": "ccm-filled-star",
                    "inner": "&#9733;"
                },
                "blank": {
                    "tag": "span",
                    "class": "ccm-blank-star",
                    "inner": "&#9734;"
                }
            },
            css: ["ccm.load", 'resources/ccm-stars.css']
        },

        Instance: function () {

            /**
             * own reference for inner functions
             * @type {Instance}
             */
            const self = this;

            /**
             * shortcut to help functions
             * @type {Object.<string,function>}
             */
            let $;

            this.init = callback => {
                callback && callback();
            };
            this.ready = callback => {
                callback && callback();
            };
            this.render = callback => {
                callback && callback();
            };
            this.start = callback => {

                $ = self.ccm.helper;

                let count = 0;
                let filled = 0;

                if (self.count != undefined) {
                    count = self.count;
                }

                if (self.filled != undefined) {
                    filled = self.filled;
                }

                let blank = count - filled;

                console.log("Blank", blank);

                console.log("Count", count);
                console.log("Filled:", filled);

                const stars = $.html(self.html.stars);

                for (let index = 0; index < filled; index++) {
                    stars.appendChild($.html(self.html.filled));
                }

                for (let indexx = 0; indexx < blank; indexx++) {
                    stars.appendChild($.html(self.html.blank));
                }

                $.setContent(self.element, stars);

                callback && callback();
            };

        }

    }

    function p() {
        window.ccm[v].component(component)
    }

    const f = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[f]) window.ccm.files[f] = component; else {
        const n = window.ccm && window.ccm.components[component.name];
        n && n.ccm && (component.ccm = n.ccm), "string" == typeof component.ccm && (component.ccm = {url: component.ccm});
        var v = component.ccm.url.split("/").pop().split("-");
        if (v.length > 1 ? (v = v[1].split("."), v.pop(), "min" === v[v.length - 1] && v.pop(), v = v.join(".")) : v = "latest", window.ccm && window.ccm[v]) p(); else {
            const e = document.createElement("script");
            document.head.appendChild(e), component.ccm.integrity && e.setAttribute("integrity", component.ccm.integrity), component.ccm.crossorigin && e.setAttribute("crossorigin", component.ccm.crossorigin), e.onload = function () {
                p(), document.head.removeChild(e)
            }, e.src = component.ccm.url
        }
    }
}