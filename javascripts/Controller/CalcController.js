class CalcController {

  constructor() {
    this._displayHistEl = document.querySelector('#historic');
    this._displayCalcEl = document.querySelector('#result');
    this._operation = [];
    this._total = parseFloat();
    this._elementForm = this.elementForm;

    this.initialize();
    this.initClickButton();
    this.initKeyboard();

  }

  initialize() {
    this.displayCalc = 0;
    this.displayHistEl = 0;

  }


  //#########################################################
  //##### Functions calculator ##############################
  //#########################################################

  equal() {
    this._operation = [];
    this._operation[0] = this._total;

    this.setDisplayHistoric();
  }

  clearAll() {
    this._operation = [];
    this._total = [];

    this.displayCalc = 0;
    this.displayHistEl = 0;

  }

  cancelEntry() {
    this._operation.pop();
    this.setDisplayHistoric();

  }

  cancelLastEntry() {
    let newNumber = [];

    if (!this.isOperator(this.getLastOperation())) {
      newNumber = this._operation[this._operation.length - 1].split('');
      newNumber.pop();
      this._operation.pop();
    }

    if (newNumber.length != 0) {
      this.addOperation(newNumber.join(''));
    }

    if (this._operation.length == 0) {
      this.initialize();
    }else{
    this.setDisplayResult(this.result());
    this.setDisplayHistoric();
    }

  }

  result(){
    this.deleteEmpty();
    let total = this._operation;

    if (this.isOperator(this.getLastOperation())) {
      total.pop();
      return total = eval(total.join(''));
    } else {
      return total = eval(total.join(''));
    }

  }

  deleteEmpty() {
    if (this.getLastOperation() == '') {
      this._operation.pop();
    }

  }


  //#########################################################
  //##### Operations ########################################
  //#########################################################


  dot(){

    if(this._operation.length == 0){
      this._operation.push('0.');
      this.setDisplayHistoric();

    }else if(this.isOperator(this.getLastOperation())){
      this._operation.push('0.');
      this.setDisplayHistoric();

    }else if (this.getLastOperation().indexOf('.') == -1){
      this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1] + '.';
      this.setDisplayHistoric();

    }

  }

  isOperator(value) {
    return (['*', '-', '+', '%', '/'].indexOf(value) > -1);
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  calculator(value) {

    if (!this.isOperator(value)) {
      this._total = eval(this._operation.join(''));
      this.setDisplayResult(this._total);
    }

  }

  addOperation(value) {

    if (this.getLastOperation() == null) {
      console.log('é está vazio');
      this._operation.push(value)

    } else if (this.isOperator(value)) {

      if (this.isOperator(this.getLastOperation())) {
        this._operation[this._operation.length - 1] = value;
      } else {
        this._operation.push(value)
      }

    } else {

      if (this.isOperator(this.getLastOperation())) {
        this._operation.push(value);
      } else {

        this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1] + value;
      }

    }


    this.calculator(value)

    this.setDisplayHistoric();
    console.log(this._operation);
    console.log(this._operation[this._operation.length - 1]);

  }



  //#########################################################
  //##### Events ############################################
  //#########################################################


  addValorForm(){
    console.log(this._elementForm)
      document.querySelector(this._elementForm).value = this._total.toLocaleString('pt-br', {minimumFractionDigits: 2});
  }


  clickButton(value) {

    switch (value) {

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        this.addOperation(value);
        break;


      case 'X':
        this.addOperation('*');
        break;

      case '-':
        this.addOperation(value);
        break;

      case '+':
        this.addOperation(value);
        break;

      case "Add":
        this.addValorForm();
        break;

      case '÷':
        this.addOperation('/');
        break;

      case 'CE':
        this.cancelEntry();
        break;
      case 'C':
        this.clearAll();
        break;
      case '←':
        this.cancelLastEntry();
        break;
      case '=':
        this.equal();
        break;
      case ',':
        this.dot();
        break;

      default:
        console.log('caractere nao mapeado : ' + value);
        break;


    }

  }

  initKeyboard() {
    addEventListener('keyup', e=>{
      console.log(e.key);

          switch (e.key) {

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
              this.addOperation(e.key);
              break;


            case '*':
              this.addOperation('*');
              break;

            case '-':
              this.addOperation(e.key);
              break;

            case '+':
              this.addOperation(e.key);
              break;

            case '/':
              this.addOperation('/');
              break;

            case 'Delete':
              this.cancelEntry();
              break;
            case 'Escape':
              this.clearAll();
              break;
            case 'Backspace':
              this.cancelLastEntry();
              break;
            case 'Enter':
              this.equal();
              break;

            case ',':
              this.dot();
              break;

            default:
              console.log('caractere nao mapeado : ' + e.key);
              break;


          }
    });
  }

  initClickButton() {
    let buttons = document.querySelectorAll(".btn");


    buttons.forEach((btn, index) => {
      this.addEventListener(btn, 'click drag', e => {
        let button = btn.innerHTML;
        this.clickButton(button);

      });
    });
  }

  addEventListener(element, event, fn) {
    event.split(" ").forEach(event => {
      element.addEventListener(event, fn, false);
    });

  }


  //#########################################################
  //##### Display ###########################################
  //#########################################################



  setDisplayResult(value) {
    this.displayCalc = value;
    this.displayCalc;
  }

  setDisplayHistoric() {
    this.displayHistEl;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  set displayHistEl(value) {
    this._displayHistEl.innerHTML = value;
  }

  get displayHistEl() {
    this._displayHistEl.innerHTML = this._operation.join("");
  }

  set elementForm(value) {

    this._elementForm = value;
  }

  get elementForm(){
    return this._elementForm;
  }

}
