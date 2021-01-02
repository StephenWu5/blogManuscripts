### 支持给浏览器tab页加上number(eventpage.js)
### eventpage.js
```

var update = function(details) {
    var id = details.id;
    var index = details.index;
    var title = details.title;

    // hax
    var flag = ':';
    if (title && title.indexOf(flag) != -1 && title.indexOf(flag) < 4 ) { //各位,十位,(这里写4因为不可能是百位)
        title = title.substr(title.indexOf(flag)+1);
        //return;   //这一句可能解决了谷歌奔溃的问题
    }

    if(new RegExp("^http.*$").test(title) || new RegExp("^localhost.*$").test(title)){
        return
    }
    if(/^[\u3220-\uFA29]+$/.test(title)){
        return
    }
    title = (index + 1) + '' + flag + title;

    try {
        chrome.tabs.executeScript(
            id,
            {
                code : "document.title = '" + title + "';"
            }
        );
        console.log("executed: " + id);
    } catch(e) {}
};


function updateAll() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            update(tab);
        }
    });
}

chrome.tabs.onMoved.addListener(function(id) {
    updateAll();
});

chrome.tabs.onRemoved.addListener(function(id) {
    updateAll();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    update(tab);
    updateAll();
});

updateAll();

```

### manifest.json
``` 
{
"update_url":"http://clients2.google.com/service/update2/crx",

  "name": "Tab Number",

  "version" : "2",

  "permissions": [

    "tabs", "http://*/*", "https://*/*"

  ],

  "icons": {

    "16": "tabnum.png"

  },

  "manifest_version" : 2,

  "background": {

    "scripts": ["eventpage.js"],

    "persistent": false

  }

}


```

### 随便一个icon图片
