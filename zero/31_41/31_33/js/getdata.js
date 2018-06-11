var getdata = {
  getCheckedValue: function(){
    var regionRadioWrapper = document.getElementById('region-radio-wrapper');
    var productRadioWraper = document.getElementById('product-radio-wrapper');
    var region = [];
    var product = [];
    var regionNode = regionRadioWrapper.querySelectorAll('input[checkbox-type="child"]');
    var productNode = productRadioWraper.querySelectorAll('input[checkbox-type="child"]');
    regionNode.forEach(function(item){
      if (item.checked){
        region.push(item.value);
      }
    })
    productNode.forEach(function(item){
      if (item.checked){
        product.push(item.value);
      }
  })
  //console.log([product,region] );
  return [product,region]
  },
  getData: function(checkedVlaue){
    var data = [];
    // 只有同时选择地区和商品，才得到数据  
    for (var i=0; i<checkedVlaue[0].length; ++i) {
      //console.log(checkedVlaue[0], checkedVlaue[0][i])
      for (var j=0; j < checkedVlaue[1].length;++j){
        for (var k=0; k< sourceData.length; ++k) {
          if (checkedVlaue[0][i] == sourceData[k].product && checkedVlaue[1][j] == sourceData[k].region){
            data.push(sourceData[k]);
          }
        }
      }
    }
    console.log(data);
    return data;
  }
}