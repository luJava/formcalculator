var calculator = new CalcController();

$(document).ready(function () {
  calculator.elementForm = '#total';
    //formatCurrency();
});




function formatCurrency() {
  var element = document.querySelector('#total');
  var value = element.value;

  value = value + '';
  value = parseInt(value.replace(/[\D]+/g,''));
  value = value + '';
  value = value.replace(/([0-9]{2})$/g, ",$1");

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  element.value = value;
}
