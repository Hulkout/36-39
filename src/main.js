const $siteList = $('.siteList')  //先找到siteList
const $lastli = $siteList.find('li.last')  //找到last
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)



const hashMap = xObject || [//parcel 默认在代码加上作用域 不能变成全局变量  要全局就window
    { logo: 'A',  url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }

];//有了哈希map之后呢就会发现 没有必要 预先把AC B写在那里 可以用哈希map生成这个结构
//removeX 会接收一个https：///www开头的东西 返回一个没有这个开头的东西
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '')
    .replace(/\/.*/,  '')  //删除/开头的内容直到结尾
}

const render = () => {//render 等于一个函数
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                    <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close"><svg class="icon" >
                    <use xlink:href="#icon-close"></use>
                    </svg></div>
                    </div>
        </li>`).insertBefore($lastli);
        //当li自己被点击的时候,打开URL
        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
        
    });
}

render()//声明了你得先调用一下
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

console.log(jQuery)
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入你要添加的网址')
        if (url.indexOf('http')!=0) {  /*如果第一个字符不是http */
                       // alert('请输入http开头的网址')
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        });
       


render()
        //多行字符串 有上面那个这个就不要了
        // const $li = $(`<li>
        // <a href="${url}/">
        //              <div class="site">
        //             <div class="logo">${url [0]}</div>
        //             <div class="link">${url}</div>
        //         </div>
        //         </a>
        // </li>`).insertBefore($lastli)    //插入目标前面
    })

   window.onbeforeunload = ()=> {
        // console.log('页面要关闭了')
       const string = JSON.stringify(hashMap)
        // console.log(typeof hashMap)
        // console.log(hashMap)
        // console.log(typeof string)
        // console.log(string)
       localStorage.setItem('x',string)//在本地存储里面设置一个X它的值就是string
};

       $(document).on('keypress', (e) => {
    //const key = e.key//变量名和 后面的属性名一样可以简写成以下
    const { key } = e
    //遍历hashMap 找到和logo一样的 打开网页
 
    for (let i = 0; i < hashMap.length; i++){
        if ($("input").is(":focus") == true) {
            
        }
            else if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
}) 
       



//  window.onInputFocus = (z) => {
//      z.style.background = "red";
    
// }

// window.onInputBlur = (z) => {
//     z.style.background="yellow";
    
// }



