import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import * as bootstrap from "https://cdn.skypack.dev/bootstrap@5.2.3";

const App = () => {
  const [output, setOutput] = React.useState("0");
  const [formula, setFormula] = React.useState("");
  const [limit, setLimit] = React.useState(false);
  const [limitFormula, setLimitFormula] = React.useState(false);

  return (
    <div class="container" id="shell">
      <div class="row">
        <Output
          limit={limit}
          setLimit={setLimit}
          output={output}
          formula={formula}
          setOutput={setOutput}
          setLimitFormula={setLimitFormula}
        />
      </div>
      <div class="row">
        <Buttons
          limit={limit}
          setLimit={setLimit}
          output={output}
          formula={formula}
          setFormula={setFormula}
          setOutput={setOutput}
          setLimitFormula={setLimitFormula}
          limitFormula={limitFormula}
        />
      </div>
    </div>
  );
};

const Buttons = (props) => {
  const handleAC = () => {
    props.setOutput(0);
    props.setFormula("");
    document.getElementById("display").style.fontSize = "4rem";
    document.getElementById("math").style.fontSize = "2rem";
    props.setLimit(false);
    props.setLimitFormula(false);
  };

  const handleNum = (event) => {
    if (/[=]/i.test(props.formula)) {
      props.setOutput(event.target.innerHTML);
    } else if (/[.]/i.test(props.output[props.output.length - 1])) {
      props.setOutput(props.output + event.target.innerHTML);
    } else if (
      /^[0+\-÷x]+$/i.test(props.output) ||
      /[+-/*]/i.test(props.formula[props.formula.length - 1])
    ) {
      props.setOutput(event.target.innerHTML);
    } else {
      props.setOutput(props.output + event.target.innerHTML);
    }

    if (props.formula == "") {
      props.setFormula(event.target.innerHTML);
    } else if (/[=]/i.test(props.formula)) {
      props.setFormula(event.target.innerHTML);
    } else {
      props.setFormula(props.formula + event.target.innerHTML);
    }
  };

  const handleDecimal = (event) => {
    for (let i = 0; i < props.output.length; i++) {
      if (props.output[i] === ".") {
        return;
      }
    }
    props.setFormula(props.formula + event.target.innerHTML);
    props.setOutput(props.output + event.target.innerHTML);
  };

  const handleZero = (event) => {
    if (props.formula != "") {
      for (let i = 0; i < props.formula.length; i++) {
        if (props.formula[i] != 0 || props.formula[i] != "") {
          props.setFormula(props.formula + event.target.innerHTML);
          break;
        }
      }
    }

    if (props.output == "0") {
    } else {
      props.setOutput(props.output + event.target.innerHTML);
    }
  };

  const handleSignChange = (event) => {
    if (props.formula != "" && props.formula != "0") {
      props.setFormula(
        props.formula.slice(0, props.formula.length - props.output.length) +
          -1 * parseFloat(props.output)
      );
    }

    if (props.output != "0" && props.output != "") {
      props.setOutput(-1 * parseFloat(props.output));
    }
  };

  const handleOperation = (operation) => {
    if (/[=]/i.test(props.formula)) {
      props.setFormula(props.output + operation);
    } else if (operation == "-") {
      if (/[-]/i.test(props.formula[props.formula.length - 1])) {
      } else {
        props.setFormula(props.formula + operation);
      }
    } else if (/[+/*-]/i.test(props.formula[props.formula.length - 1])) {
      if (/[+/*-]/i.test(props.formula[props.formula.length - 2])) {
        props.setFormula(
          props.formula.slice(0, props.formula.length - 2) + operation
        );
      } else {
        props.setFormula(
          props.formula.slice(0, props.formula.length - 1) + operation
        );
      }
    } else if (props.formula != "" && props.formula != "0") {
      props.setFormula(props.formula + operation);
    }

    if (props.output != "0" && props.output != "") {
      props.setLimit(false);
    }
  };

  const handleEquals = (event) => {
    if (props.output != "0" && props.output != "") {
      props.setOutput(eval(props.formula));
      props.setLimit(false);
    }

    if (props.formula != "" && props.formula != "0") {
      props.setFormula(
        props.formula + event.target.innerHTML + eval(props.formula)
      );
      props.setLimitFormula(false);
    }
  };

  return (
    <div class="col" id="button-box">
      <div class="row" id="row-1">
        <div class="col-6 rowOne d-flex justify-content-center align-items-center">
          <button
            onClick={handleAC}
            class="btn btn-white shadow-none"
            id="clear"
          >
            AC
          </button>
        </div>
        <div class="col-3 rowOne d-flex justify-content-center align-items-center">
          <button
            class="btn btn-white shadow-none"
            id="plus-minus"
            onClick={handleSignChange}
          >
            ±
          </button>
        </div>
        <div class="col-3 rowOne d-flex justify-content-center align-items-center">
          <button
            class="btn btn-orange shadow-none"
            id="divide"
            onClick={() => handleOperation("/")}
          >
            ÷
          </button>
        </div>
      </div>
      <div class="row" id="row-2">
        <div class="col-3 rowTwo d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="seven"
          >
            7
          </button>
        </div>
        <div class="col-3 rowTwo d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="eight"
          >
            8
          </button>
        </div>
        <div class="col-3 rowTwo d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="nine"
          >
            9
          </button>
        </div>
        <div class="col-3 rowTwo d-flex justify-content-center align-items-center">
          <button
            class="btn btn-orange shadow-none"
            id="multiply"
            onClick={() => handleOperation("*")}
          >
            x
          </button>
        </div>
      </div>
      <div class="row" id="row-3">
        <div class="col-3 rowThree d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="four"
          >
            4
          </button>
        </div>
        <div class="col-3 rowThree d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="five"
          >
            5
          </button>
        </div>
        <div class="col-3 rowThree d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="six"
          >
            6
          </button>
        </div>
        <div class="col-3 rowThree d-flex justify-content-center align-items-center">
          <button
            class="btn btn-orange shadow-none"
            id="subtract"
            onClick={() => handleOperation("-")}
          >
            -
          </button>
        </div>
      </div>
      <div class="row" id="row-4">
        <div class="col-3 rowFour d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="one"
          >
            1
          </button>
        </div>
        <div class="col-3 rowFour d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="two"
          >
            2
          </button>
        </div>
        <div class="col-3 rowFour d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            onClick={handleNum}
            class="btn btn-grey shadow-none"
            id="three"
          >
            3
          </button>
        </div>
        <div class="col-3 rowFour d-flex justify-content-center align-items-center">
          <button
            class="btn btn-orange shadow-none"
            id="add"
            onClick={() => handleOperation("+")}
          >
            +
          </button>
        </div>
      </div>
      <div class="row" id="row-5">
        <div class="col-6 rowFive d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            class="btn btn-grey shadow-none"
            id="zero"
            onClick={handleZero}
          >
            0
          </button>
        </div>
        <div class="col-3 rowFive d-flex justify-content-center align-items-center">
          <button
            disabled={props.limit || props.limitFormula}
            class="btn btn-grey shadow-none"
            id="decimal"
            onClick={handleDecimal}
          >
            .
          </button>
        </div>
        <div class="col-3 rowFive d-flex justify-content-center align-items-center">
          <button
            class="btn btn-orange shadow-none"
            id="equals"
            onClick={handleEquals}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

const Output = (props) => {
  React.useEffect(() => {
    let outputSize = 0;
    if (document.getElementById("display").offsetWidth > 250) {
      outputSize = parseInt(
        window.getComputedStyle(document.getElementById("display")).fontSize
      );
      outputSize -= 6;
      document.getElementById("display").style.fontSize = outputSize + "px";
    }
  }, [props.output]);

  React.useEffect(() => {
    if (props.output.toString().length >= 12) {
      props.setLimit(true);
    }
  }, [props.output]);

  React.useEffect(() => {
    if (props.formula.toString().length >= 26) {
      props.setLimitFormula(true);
    }
  }, [props.formula]);

  return (
    <div class="col">
      <div class="row">
        <div class="col display" id="formula">
          <p id="math">{props.formula}</p>
        </div>
      </div>
      <div class="row">
        <div class="col display" id="input">
          <p id="display">{props.output}</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("content"));
