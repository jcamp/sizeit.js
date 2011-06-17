(function(window) {
    
    var config = {};
    var screenW = window.innerWidth || document.body.clientWidth;
    
    function update() {
        
        screenW = window.innerWidth || document.body.clientWidth;
        var newSize;
        
        for (var i = 0; i < config.settings.length;  i++) {
            
            var setting = config.settings[i];
            
            if (screenW < setting.max) {
                newSize = setting;
                break;
            } else if (!setting.max) {
                newSize =  setting;
            }
        }
        
        if (!config.size || newSize.name != config.size.name) {
            config.size = newSize;
        } else {
            newSize = null;
        }
        
        if (config.size.css && newSize) {
            
            // if there is a stylesheet, update it, otherwise make new
            if (config.css) {
                
                var links = document.getElementsByTagName("link");
                
                for (i = 0; i < links.length; i++) {
                    
                    if (links[i].getAttribute("title") == "sizeit") {
                        config.css.href = config.size.css;
                        break;
                    }
                }
            
            } else {
                
                config.css = window.document.createElement("link");
                config.css.href = config.size.css;
                config.css.type = "text/css";
                config.css.rel = "stylesheet";
                config.css.title = "sizeit";
                window.document.getElementsByTagName("head")[0].appendChild(config.css);
            }
        }      
    }
    
    window.sizeit = {
        
        configure : function() {
            
            config.settings = arguments;
            
            // sort by breakpoints, lowest to highest
            for (var i = 0; i < config.settings.length; i++)
            {
                for (var j = i + 1; j < config.settings.length; j++)
                {
                    if (config.settings[i].max > config.settings[j].max)
                    {
                        s = config.settings[j];	
                        config.settings[j] = config.settings[i];
                        config.settings[i] = s;
                    }
                }
            }
            
            update();
            
            if (window.addEventListener) {
                window.addEventListener("resize", update, false);
            } else if (window.attachEvent) {
                window.attachEvent("resize", update);
            } else {
                window.onresize = update;
            }
            
        },
        
        size : function() {
            return config.size.name;
        },
        
        width : function() {
            return screenW;
        }
    };
    
})(this);