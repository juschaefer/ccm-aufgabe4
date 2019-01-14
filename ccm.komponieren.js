{
    var component = {

        name: 'komponieren',
        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'resources/ccm.js',
        stars: ["ccm.component", 'ccm.stars.js'],
        config: {
            //html: ["ccm.load", 'tpl.card.html'],
            //html: ["ccm.load", 'card.json'],
            html: {
                "card_deck": {
                    "class": "card-deck"
                },
                "card": {
                    "class": "card",
                    "inner": [
                        {
                            "tag": "img",
                            "class": "card-img-top",
                            "src": "%img_src%",
                            "alt": "%img_alt%"
                        },
                        {
                            "class": "card-body",
                            "inner": [
                                {
                                    "tag": "h5",
                                    "class": "card-title",
                                    "inner": "%title%"
                                },
                                {
                                    "tag": "p",
                                    "class": "card-text",
                                    "inner": "%text%"
                                }
                            ]
                        },
                        {
                            "class": "card-footer",
                            "inner": {
                                "tag": "ccm-stars",
                                "count": 5,
                                "filled": "%stars%"
                            }
                        }
                    ]
                }
            },
            // Loading
            "jquery": [
                "ccm.load", {
                    "url": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
                    "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
                    "crossorigin": "anonymous"
                }
            ],

            "propper": [
                "ccm.load", {
                    "url": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
                    "integrity": "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
                    "crossorigin": "anonymous"
                }
            ],

            "bootstrap": [
                "ccm.load", {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                    "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
                    "crossorigin": "anonymous"
                }, {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                    "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                    "crossorigin": "anonymous"
                }
            ],
            style: ["ccm.load", 'resources/style.css']
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

                const card_deck = $.html(self.html.card_deck);

                const data = ccm.load({
                    url: "resources/cards.json",
                    type: "json"
                }, result => {

                    for (let value in result) {

                        card_deck.appendChild($.html(self.html.card, {
                            img_src: result[value].img_src,
                            img_alt: result[value].alt,
                            title: result[value].card_title,
                            text: result[value].card_text,
                            stars: result[value].star
                        }));
                    }

                });

                $.setContent(self.element, card_deck);

                /*$.setContent(self.element, $.html("<div class=\"card-deck\">\n" +
                    "  <div class=\"card\">\n" +
                    "    <img class=\"card-img-top\" src=\"card.svg\" alt=\"Card image cap\">\n" +
                    "    <div class=\"card-body\">\n" +
                    "      <h5 class=\"card-title\">Card title</h5>\n" +
                    "      <p class=\"card-text\">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\n" +
                    "    </div>\n" +
                    "    <div class=\"card-footer\">\n" +
                    "      <small class=\"text-muted\">Last updated 3 mins ago</small>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "  <div class=\"card\">\n" +
                    "    <img class=\"card-img-top\" src=\"card.svg\" alt=\"Card image cap\">\n" +
                    "    <div class=\"card-body\">\n" +
                    "      <h5 class=\"card-title\">Card title</h5>\n" +
                    "      <p class=\"card-text\">This card has supporting text below as a natural lead-in to additional content.</p>\n" +
                    "    </div>\n" +
                    "    <div class=\"card-footer\">\n" +
                    "      <small class=\"text-muted\">Last updated 3 mins ago</small>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "  <div class=\"card\">\n" +
                    "    <img class=\"card-img-top\" src=\"card.svg\" alt=\"Card image cap\">\n" +
                    "    <div class=\"card-body\">\n" +
                    "      <h5 class=\"card-title\">Card title</h5>\n" +
                    "      <p class=\"card-text\">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>\n" +
                    "    </div>\n" +
                    "    <div class=\"card-footer\">\n" +
                    "      <small class=\"text-muted\">Last updated 3 mins ago</small>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>"));*/

                //$.setContent(self.element, $.html("<h1>Hallo</h1>"));

                callback && callback();
            };

        }

    };

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