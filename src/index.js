class SmartCalculator {
  constructor(value) {
      this.q = [];
      this.q.push('add', value);
  }
  add(value) {
      this.q.push('add', value);
      return this;
  }
  subtract(value) {
      this.q.push('subtract', value);
      return this;
  }
  multiply(value) {
      this.q.push('multiply', value);
      return this;
  }
  devide(value) {
      this.q.push('divide', value);
      return this;
  }
  pow(value) {
      this.q.push('pow', value);
      return this;
  }
  valueOf() {
      let result = 0;
      let prevFunction = 0;
      let currFunction = 0;
      let currValue = 0;
      let nextFunction = 0;
      let nextValue = 0;

      for (var i = this.q.length - 1; i >= 0; i--) {
          if ('pow'.localeCompare(this.q[i]) == 0) {
              this.q[i - 1] = Math.pow(this.q[i - 1], this.q[i + 1]);
              this.q[i + 1] = 'a';
              this.q[i] = 'a';
          }
      }

      currFunction = this.q.shift();
      currValue = this.q.shift();
      prevFunction = currFunction;

      do {
        nextFunction = this.q.shift();
        nextValue = this.q.shift();

          if ('add'.localeCompare(nextFunction) == 0 ||
              'subtract'.localeCompare(nextFunction) == 0) {

              if ('add'.localeCompare(currFunction) == 0) {
                  result += currValue;
              }
              if ('subtract'.localeCompare(currFunction) == 0) {
                  result -= currValue;
              }

              prevFunction = nextFunction;
              currFunction = nextFunction;
              currValue = nextValue;

          } else {
              if ('multiply'.localeCompare(nextFunction) == 0) {
                  currValue = currValue * nextValue;
              }
              if ('divide'.localeCompare(nextFunction) == 0) {
                  currValue = currValue / nextValue;
              }
              if (this.q.length > 0) {
                  currFunction = prevFunction;
              }

          }

          if (this.q.length == 0) {
              if ('add'.localeCompare(currFunction) == 0) {
                  result += currValue;
              }
              if ('subtract'.localeCompare(currFunction) == 0) {
                  result -= currValue;
              }
              break;
          }
      } while (true);
      return result;
  }
}
module.exports = SmartCalculator;
