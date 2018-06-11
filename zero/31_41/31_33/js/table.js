var table = {
  generatetable: function(tableHead, tableBody, regionNum,productNum ){
    var tableNode = document.createElement('table'); // 创建节点。
  // 创建表头;
  var tr = document.createElement('tr');
  for (var j=0; j<tableHead.length; ++j) {
    var th = document.createElement('th');
    th.innerText = tableHead[j];
    tr.appendChild(th);
  }
  tableNode.appendChild(tr); // 加入节点

  // 创建表身
  if (regionNum == 1 && productNum > regionNum){
    // 地区作为第一列 
    var tr= document.createElement('tr');
    var td = document.createElement('td');
    td.innerText = tableBody[0].region ;
    td.setAttribute('rowspan', productNum+1); // 跨商品行+1
    tr.appendChild(td);
    tableNode.appendChild(tr);

    for (var i=0; i<tableBody.length; ++i) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');

      td.innerText = tableBody[i].product;
      tr.appendChild(td);
      
      for (var j=0; j<tableBody[i].sale.length; ++j ){
        var td = document.createElement('td');
        td.innerText = tableBody[i].sale[j];
        tr.appendChild(td);
      };
      tableNode.appendChild(tr);
    }
  } else {
     // 商品作为第一列
     console.log(tableBody, regionNum, productNum)
     for (var i=0; i<productNum; ++i) {
       var frag = document.createDocumentFragment();
       var tr = document.createElement('tr');
       var td = document.createElement('td');
       td.innerText = tableBody[i*regionNum].product ;
       td.setAttribute('rowspan', regionNum+1);
       tr.appendChild(td);
      frag.appendChild(tr);

      var t = tableBody.slice(i*regionNum, (i+1)*regionNum);
      console.log(t);
      for (var j=0; j<t.length; ++j) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        td.innerText = t[j].region;
        tr.appendChild(td);
        frag.appendChild(tr);

        for (var k=0; k<t[j].sale.length; ++k ){
          var td = document.createElement('td');
          td.innerText = t[j].sale[k];
          tr.appendChild(td);
          frag.appendChild(tr);
        };
      }
      tableNode.appendChild(frag);
     }
  }
  return tableNode;
  },
  renderTable: function(data){
    var regionRadioWrapper = document.getElementById('region-radio-wrapper');
    var productRadioWraper = document.getElementById('product-radio-wrapper');
    var tableWrapper = document.getElementById('table-wrapper');
    var regionNode = regionRadioWrapper.querySelectorAll('input[checkbox-type="child"]');
    var productNode = productRadioWraper.querySelectorAll('input[checkbox-type="child"]');
    var regionNum = 0;
    var productNum = 0;
    regionNode.forEach(function(item){
      if (item.checked) regionNum++;
    })
    productNode.forEach(function(item){
      if (item.checked) productNum++;
    })
    console.log(regionNum, productNum);
    tableWrapper.innerHTML = '' // 清空节点信息
    if (regionNum > 0 && productNum> 0) {
      if (regionNum == 1 && productNum > regionNum){
      // 地区作为第一列 
      var tableHead = ['地区', '商品','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      tableWrapper.appendChild(this.generatetable(tableHead,data,regionNum,productNum));
      }else {
        // 商品作为第一列
        var tableHead = ['商品', '地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        var tableBody = [];
        tableWrapper.appendChild(this.generatetable(tableHead ,data, regionNum, productNum));
      }
    }
  }
}
