String.prototype.plus = function (numStr) {
    let result = "";
    let carry = 0;
    let i = this.length - 1;
    let j = numStr.length - 1;

    while (i >= 0 || j >= 0 || carry !== 0) {
        const digitA = i >= 0 ? Number(this[i]) : 0;
        const digitB = j >= 0 ? Number(numStr[j]) : 0;
        const sum = digitA + digitB + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return result;
};

String.prototype.minus = function (numStr) {
    if (this.length < numStr.length || (this.length === numStr.length && this < numStr)) {
        throw new Error("Result would be negative.");
    }

    let result = "";
    let borrow = 0;
    let i = this.length - 1;
    let j = numStr.length - 1;

    while (i >= 0 || j >= 0) {
        const digitA = i >= 0 ? Number(this[i]) : 0;
        const digitB = j >= 0 ? Number(numStr[j]) : 0;

        if (digitA < digitB + borrow) {
            const diff = 10 + digitA - digitB - borrow;
            result = diff + result;
            borrow = 1;
        } else {
            const diff = digitA - digitB - borrow;
            result = diff + result;
            borrow = 0;
        }

        i--;
        j--;
    }

    return result.replace(/^0+/, "")
};

String.prototype.divide = function (numStr) {
    const dividend = this.toString();
    const divisor = numStr.toString();
  
    if (divisor === "0") {
      throw new Error("Division by zero is not allowed.");
    }
  
    if (dividend === "0") {
      return "0";
    }
  
    let quotient = "";
    let remainder = "";
    let currentIndex = 0;
  
    while (currentIndex < dividend.length) {
      remainder += dividend[currentIndex];
      let currentDividend = remainder;
  
      let digitQuotient = 0;
      while (isGreaterOrEqual(currentDividend, divisor)) {
        currentDividend = subtractStrings(currentDividend, divisor);
        digitQuotient++;
      }
  
      quotient += digitQuotient;
      remainder = currentDividend;
  
      currentIndex++;
    }
  
    return quotient.replace(/^0+/, "");
  };
  
  function isGreaterOrEqual(a, b) {
    if (a.length !== b.length) {
      return a.length > b.length;
    }
    return a >= b;
  }
  
  function subtractStrings(a, b) {
    let result = "";
    let borrow = 0;
  
    for (let i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
      let digitA = Number(a[i]);
      let digitB = j >= 0 ? Number(b[j]) : 0;
  
      let diff = digitA - digitB - borrow;
  
      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
  
      result = diff.toString() + result;
    }
  
    return result.replace(/^0+/, "");
}

String.prototype.multiply = function (numStr) {
    const num1 = this.toString();
    const num2 = numStr.toString();

    if (num1 === "0" || num2 === "0") {
        return "0";
    }

    let result = "0";
    let num2Index = num2.length - 1;

    while (num2Index >= 0) {
        let currentResult = "";
        let carry = 0;
        let num1Index = num1.length - 1;

        while (num1Index >= 0 || carry !== 0) {
            const digit1 = num1Index >= 0 ? Number(num1[num1Index]) : 0;
            const digit2 = Number(num2[num2Index]);
            const product = digit1 * digit2 + carry;
            currentResult = (product % 10) + currentResult;
            carry = Math.floor(product / 10);
            num1Index--;
        }

        currentResult += "0".repeat(num2.length - num2Index - 1);
        result = result.plus(currentResult);
        num2Index--;
    }

    return result;
};

console.log("1237423432494729347243734924373492734234893243".plus("456472346675757456452743623476234823746234629343462942347"));
console.log("100034234234234234234246567567456564646456".minus("123453453534534534565645645345366"));
console.log("10006554654674547566965956454434346665686555785555000000".divide("16544354354567686555443436570"));
console.log("134556563434556847598345735897342".multiply("5457357436576353956345734547573563459785"));