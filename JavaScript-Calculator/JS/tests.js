import { Calculator } from "./classCalculator.js";

/*/ QUnit https://qunitjs.com/intro/
// https://api.qunitjs.com/QUnit/module/

// tests UI, needs work to re-style

loadStyle('https://code.jquery.com/qunit/qunit-2.20.0.css')
const script = loadScript('https://code.jquery.com/qunit/qunit-2.20.0.js')

script.onload = (event => {
    let div = document.createElement('div')
    div.setAttribute('id', 'qunit')
    document.body.appendChild(div)
    div = document.createElement('div')
    div.setAttribute('id', 'qunit-fixture')
    document.body.appendChild(div)

    QUnit.module('calculator', () => {
        // https://api.qunitjs.com/QUnit/test/
        QUnit.test('adds two numbers', assert => {
            // arrange
            const calc = new Calculator();
            calc.appendNumber('1')
            calc.chooseOperator('+')
            calc.appendNumber('2')
            const expected = ['13', '1+2']

            // act
            calc.calculate()
            const actual = calc.getCurrentState()

            // assert
            // https://api.qunitjs.com/assert/deepEqual/
            assert.deepEqual(actual, expected, 'adds two numbers')
        })
    })
})//*/



// just console, ad-hoc testing
// I want to be able to run stuff like
// calc.append(); calc.choose(); calc.append(); calc.calculate();
// actual = calc.getState(); if (actual[0] != expected[0] || ...) error; else success
// export because it's module
export function adHocTests() {
    const tests = [
        { name: 'add 1 and 2', cmds: '1+2=', expected: ['3', '1+2']},
        { name: 'add 1 and 2 BUT FAIL', cmds: '1+2=', expected: ['233', '1+2']},
    ]
    const counts = {
        success: 0,
        error: 0,
        messages: []
    }
    function runCommands(calc, str) {
        Array.from(str).forEach(key => {
            // the return is just to avoid "else" statements
            if ('0123456789.'.includes(key)) return calc.appendNumber(key)
            if ('+-/*'.includes(key)) return calc.chooseOperator(key)
            if ('=' == key) return calc.calculate(key)
            if ('_' == key) return calc.makeNumberNegative(key)
            if ('B' == key) return calc.delete(key) // Backspace
            if ('D' == key) return calc.clear(key) // Delete
        })
    }

    tests.forEach(({name, cmds, expected}) => {
        const calc = new Calculator()
        runCommands(calc, cmds)
        const [number, expression] = calc.getCurrentState()
        let message = ''
        if (number != expected[0]) {
            message += `result was expected ${number}, actual ${expected[0]}`
        }
        if (expression != expected[1]) {
            message += `expression was expected ${expression}, actual ${expected[1]}`
        }
        if (message === '') {
            counts.success ++
        } else {
            counts.error ++
            counts.messages.push(`${name}: ${message}`)
        }
    })

    console.log(`tests summary: ${counts.error} failed out of ${counts.error + counts.success}`)
    counts.messages.forEach(console.log)
    
}

adHocTests()//*/