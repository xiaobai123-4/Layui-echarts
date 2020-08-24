//获取真实的数据
$.get("http://api.tianapi.com/txapi/ncovcity/index?key=c63951bca4869d30b2081fdddd19923f",
  function (data, status) {
    var arr = [];
    // 遍历数组
    data.newslist.forEach(item => {
      // 向空数组中加入内容
      arr.push({
        name: item.provinceShortName, //省份
        value: item.confirmedCount, //累计确诊
        zx: item.currentConfirmedCount, //最新确诊
        zy: item.curedCount, //治愈人数
        sw: item.deadCount, //死亡人数
      });
    });
    arr.push({
      name: '南海诸岛', //省份
      value: '未统计', //累计确诊
      zx: '未统计', //最新确诊
      zy: '未统计', //治愈人数
      sw: '未统计', //死亡人数
    })
    // 完成所需的数据整理
    // console.log(arr)

    // 地图制作
    // 1.初始化
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 2.配置
    var option = {
      title: {
        text: '众志成城，抗击疫情',
        textStyle: {
          fontSize: 28
        },
        left: 'center',
        subtext: 'BY-小白',
        subtextStyle: {
          fontSize: 14
        }
      },
      series: [{
        type: 'map',
        map: 'china',
        data: arr,
        label: {
          show: true
        }
      }],
      tooltip: {
        formatter: function (params) {
          return `累计确诊:${params.data.value}</br>
          最新确诊:${params.data.zx}</br>
          治愈人数:${params.data.zy}</br>
          死亡人数:${params.data.sw}</br>`;
        }
      },
      visualMap: {
        type: 'continuous',
        // type: 'piecewise',
        // pieces: [{
        //     gt: 1500
        //   }, // (1500, Infinity]
        //   {
        //     gt: 900,
        //     lte: 1500
        //   }, // (900, 1500]
        //   {
        //     gt: 310,
        //     lte: 1000
        //   }, // (310, 1000]
        //   {
        //     gt: 200,
        //     lte: 300
        //   }, // (200, 300]
        //   {
        //     gt: 10,
        //     lte: 200,
        //     label: '10 到 200（自定义label）'
        //   }, // (10, 200]
        //   {
        //     value: 123,
        //     label: '123（自定义特殊颜色）',
        //     color: 'grey'
        //   }, // [123, 123]
        //   {
        //     lt: 5
        //   } // (-Infinity, 5)
        // ]
      }
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 数据表格显示
    layui.use('laytpl', function () {
      var laytpl = layui.laytpl;
      var getTpl = demo.innerHTML,
        view = document.getElementById('view');
      laytpl(getTpl).render(data, function (html) {
        view.innerHTML = html;
      });
    });
    //注意：折叠面板 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
      var element = layui.element;
    });
  });