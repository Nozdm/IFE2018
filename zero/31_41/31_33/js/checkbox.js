var checkbox = {
  generateCheckBox : function(container, value){
    var frag = document.createDocumentFragment();
    for (var i=0; i<value.length; ++i) {
      var input = document.createElement('input');
      var label = document.createElement('label');
  
      for (j in value[i]){
        input.setAttribute(j, value[i][j]);  
      }
  
      label.setAttribute('for', value[i]['id']);
      label.innerText = value[i]['value'];
      frag.appendChild(input);
      frag.appendChild(label);
    }
    container.appendChild(frag);
  },
  checkBoxEventAgent: function(container){
    container.addEventListener('change', function(e){
      //e.preventDefault() 这个是阻止默认事件
      //e.stopPropagation(); 这个是阻止事件冒泡
      var checkboxAll = container.querySelector('input[checkbox-type="all"]');
        var checkboxChild = container.querySelectorAll('input[checkbox-type="child"]');
      var checkboxType = e.target.getAttribute('checkbox-type');
  
      if (checkboxType == 'all') {
        if (e.target.checked) {
          // 全选
          //console.log('全选')
          checkboxChild.forEach(function(item){
            item.checked = true;
          })
        } else {
          // 取消全选
          //console.log('取消全选');
          checkboxChild.forEach(function(item){
            item.checked = false;
          })
        }
      } else if (checkboxType == 'child'){
          var status = 0;
          checkboxChild.forEach(function(item){
            if (item.checked) status++;
          })
          if (status == 0)  e.target.checked = true;
          else if (status> 0 && status < checkboxChild.length ) checkboxAll.checked = false;
          else if (status == checkboxChild.length) checkboxAll.checked = true;
      }
      // 渲染数据
      table.renderTable( getdata.getData( getdata.getCheckedValue() ) );
    })
  }
}
