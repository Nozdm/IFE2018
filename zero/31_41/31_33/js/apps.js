

var apps = {
  init : function(){
    var regionRadioWrapper = document.getElementById('region-radio-wrapper');
    var productRadioWraper = document.getElementById('product-radio-wrapper');
    var tableWrapper = document.getElementById('table-wrapper');
    // 生成容器中的内容， 即html的内容
    checkbox.generateCheckBox(regionRadioWrapper,[
      {'id': 'select-all-region', 'type': 'checkbox','checkbox-type': 'all', 'value':'全选' },
      {'id': 'hua-nan', 'type': 'checkbox', 'checkbox-type':'child', 'value': '华南'},
      {'id': 'hua-bei', 'type': 'checkbox', 'checkbox-type':'child', 'value': '华北'},
      {'id': 'hua-dong', 'type': 'checkbox', 'checkbox-type':'child', 'value': '华东'}
    ]);
    checkbox.generateCheckBox(productRadioWraper, [
      {'id': 'select-all-product', 'type': 'checkbox', 'checkbox-type': 'all', 'value':'全选'},
      {'id': 'mobile-phone','type': 'checkbox', 'checkbox-type': 'child', 'value':'手机'},
      {'id': 'notebook-pc', 'type': 'checkbox', 'checkbox-type': 'child', 'value': '笔记本'},
      {'id': 'speakers', 'type': 'checkbox', 'checkbox-type': 'child', 'value': '智能音箱'}
    ]);
    // 为checkbox 进行事件代理
    checkbox.checkBoxEventAgent(regionRadioWrapper);
    checkbox.checkBoxEventAgent(productRadioWraper);
  }

}
apps.init();