```
const urlMap = {
    loginUserInfo: '/api/rbacUser/loginUserInfo', //获取首页个人信息
};
 
const services = {};
 
Object.keys(urlMap).forEach((methodName) = > {
    services[methodName] = function (params, async = true, type = 'GET') {
        var data = [];
        var promise = $.ajax({
            url: urlMap[methodName],
            data: params ? params : {},
            async: async,
            dataType: "json"
        });
        if (async) {
            return promise;
        } else {
            promise.done(({
                code, obj
            }) = > {
                (code === 0) && (data = obj)
            });
            return data;
        }
    };
});
 
export
default services;
```

```
 assignObj: function (vm, firstSource) {
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource && typeof nextSource !== "object")
                continue;
            for (var x in vm) {
                if (vm.hasOwnProperty(x) && nextSource.hasOwnProperty(x)) {
                    vm[x] = nextSource[x]
                }
            }
        }
        return vm
    },
```
