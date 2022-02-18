// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList'); //先找到siteList
var $lastli = $siteList.find('li.last'); //找到last
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);

var hashMap = xObject || [//parcel 默认在代码加上作用域 不能变成全局变量  要全局就window
{ logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'B', url: 'https://www.bilibili.com' }]; //有了哈希map之后呢就会发现 没有必要 预先把AC B写在那里 可以用哈希map生成这个结构
//removeX 会接收一个https：///www开头的东西 返回一个没有这个开头的东西
var simplifyUrl = function simplifyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除/开头的内容直到结尾
};

var render = function render() {
    //render 等于一个函数
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        var $li = $('<li>\n                    <div class="site">\n                    <div class="logo">' + node.logo + '</div>\n                    <div class="link">' + simplifyUrl(node.url) + '</div>\n                    <div class="close"><svg class="icon" >\n                    <use xlink:href="#icon-close"></use>\n                    </svg></div>\n                    </div>\n        </li>').insertBefore($lastli);
        //当li自己被点击的时候,打开URL
        $li.on('click', function () {
            window.open(node.url);
        });

        $li.on('click', '.close', function (e) {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};

render(); //声明了你得先调用一下
//  <li>
//                 <a href="https://www.acfun.cn/">
//                      <div class="site">
//                     <div class="logo">A</div>
//                     <div class="link">acfun.cn</div>
//                 </div>
//                 </a>
//             </li>
//             <li>
//                 <a href="https://www.bilibili.com/">
//                     <div class="site">
//                     <div class="logo">
//                         <img src="./imgs/bilibil.png" alt="">
//                     </div>
//                     <div class="link">bilibili.com</div>
//                 </div>
//                 </a>

//             </li>

console.log(jQuery);
$('.addButton').on('click', function () {
    var url = window.prompt('请输入你要添加的网址');
    if (url.indexOf('http') != 0) {
        /*如果第一个字符不是http */
        // alert('请输入http开头的网址')
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });

    render();
    //多行字符串 有上面那个这个就不要了
    // const $li = $(`<li>
    // <a href="${url}/">
    //              <div class="site">
    //             <div class="logo">${url [0]}</div>
    //             <div class="link">${url}</div>
    //         </div>
    //         </a>
    // </li>`).insertBefore($lastli)    //插入目标前面
});

window.onbeforeunload = function () {
    // console.log('页面要关闭了')
    var string = JSON.stringify(hashMap);
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    localStorage.setItem('x', string); //在本地存储里面设置一个X它的值就是string
};

$(document).on('keypress', function (e) {
    //const key = e.key//变量名和 后面的属性名一样可以简写成以下
    var key = e.key;
    //遍历hashMap 找到和logo一样的 打开网页

    for (var i = 0; i < hashMap.length; i++) {
        if ($("input").is(":focus") == true) {} else if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
});

//  window.onInputFocus = (z) => {
//      z.style.background = "red";

// }

// window.onInputBlur = (z) => {
//     z.style.background="yellow";

// }
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6c6ed924.map