import { useState, useEffect, useRef } from 'react'
import { delay, motion } from 'framer-motion'
import * as blades from '../blades'

const bladesList = [
   {
     name: 'passwordGenerator', label: 'Password Generator',
     inputs: [{ key: 'length', type: 'number', default: 12 }, { key: 'uppercase', type: 'checkbox', default: true }, { key: 'lowercase', type: 'checkbox', default: true }, { key: 'numbers', type: 'checkbox', default: true }, { key: 'symbols', type: 'checkbox', default: true }],
     execute: (v) => blades.passwordGenerator(v)
   },
   {
      name: 'cookieClicker', label: 'Cookie Clicker',
      inputs: [], isInteractive: true,
      render: () => {
        const [cookies, setCookies] = useState(0);
        const [cpc, setCpc] = useState(1);
        const [cpcIncrement, setCpcIncrement] = useState(2);
        const [cpcCost, setCpcCost] = useState(50);
        const [grandmas, setGrandmas] = useState(0);
        const [grandmaIncrement, setGrandmaIncrement] = useState(1);
        const [farms, setFarms] = useState(0);
        const [farmIncrement, setFarmIncrement] = useState(5);
        const [factories, setFactories] = useState(0);
        const [factoryIncrement, setFactoryIncrement] = useState(20);
        const [mines, setMines] = useState(0);
        const [mineIncrement, setMineIncrement] = useState(100);
        const [grandmaCost, setGrandmaCost] = useState(100);
        const [farmCost, setFarmCost] = useState(500);
        const [factoryCost, setFactoryCost] = useState(2000);
        const [mineCost, setMineCost] = useState(10000);

        const autoCps = 
          grandmas * grandmaIncrement + 
          farms * farmIncrement + 
          factories * factoryIncrement + 
          mines * mineIncrement;

        const handleClick = () => setCookies(prev => prev + cpc);

        const buyUpgrade = (cost, effect, setCost, nextCost) => {
          if (cookies >= cost) {
            setCookies(prev => prev - cost);
            effect();
            setCost(nextCost);
          }
        };

        useEffect(() => {
          if (autoCps <= 0) return;
          const id = setInterval(() => setCookies(prev => prev + autoCps), 1000);
          return () => clearInterval(id);
        }, [autoCps]);

        return (
          <div className="flex flex-col items-center gap-4 p-2">
            <div className="text-2xl font-bold text-amber-800">🍪 Cookies: {cookies}</div>
            
            <div 
              onClick={handleClick}
              className="cursor-pointer hover:scale-105 active:scale-95 transition-transform select-none"
              style={{ fontSize: '120px', lineHeight: '1' }}
            >
              🍪
            </div>
            <p className="text-sm text-gray-600">Click power: +{cpc} per click</p>
            
            {autoCps > 0 && (
              <p className="text-sm text-gray-600">Auto Production: {autoCps}/s</p>
            )}
            
            <div className="flex flex-col gap-2 mt-2 w-full max-w-xs">
              <h4 className="font-medium text-gray-700">Upgrades</h4>
              
              <button
                onClick={() => buyUpgrade(cpcCost, () => { setCpc(prev => prev + cpcIncrement); setCpcIncrement(prev => prev + 2); setCpcCost(Math.round(cpcCost + (cpcCost / 10) * 2)); })}
                disabled={cookies < cpcCost}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add +{cpcIncrement} Click Power ({cpcCost} cookies, +{cpc}/click)
              </button>
              
              <button
                onClick={() => buyUpgrade(grandmaCost, () => { setGrandmas(prev => prev + grandmaIncrement); setGrandmaIncrement(prev => prev + 1); }, setGrandmaCost, Math.round(grandmaCost + (grandmaCost / 10) * 2))}
                disabled={cookies < grandmaCost}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Buy Grandma ({grandmaCost} cookies, +{grandmaIncrement}/s)
              </button>
              {grandmas > 0 && (
                <p className="text-xs text-gray-500">Grandmas: {grandmas} (+{grandmas}/s)</p>
              )}
              
              <button
                onClick={() => buyUpgrade(farmCost, () => { setFarms(prev => prev + farmIncrement); setFarmIncrement(prev => prev + 5); }, setFarmCost, Math.round(farmCost + (farmCost / 10) * 2))}
                disabled={cookies < farmCost}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Buy Farm ({farmCost} cookies, +{farmIncrement}/s)
              </button>
              {farms > 0 && (
                <p className="text-xs text-gray-500">Farms: {farms} (+{farms * 5}/s)</p>
              )}
              
              <button
                onClick={() => buyUpgrade(factoryCost, () => { setFactories(prev => prev + factoryIncrement); setFactoryIncrement(prev => prev + 20); }, setFactoryCost, Math.round(factoryCost + (factoryCost / 10) * 2))}
                disabled={cookies < factoryCost}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Buy Factory ({factoryCost} cookies, +{factoryIncrement}/s)
              </button>
              {factories > 0 && (
                <p className="text-xs text-gray-500">Factories: {factories} (+{factories * 20}/s)</p>
              )}
              
              <button
                onClick={() => buyUpgrade(mineCost, () => { setMines(prev => prev + mineIncrement); setMineIncrement(prev => prev + 100); }, setMineCost, Math.round(mineCost + (mineCost / 10) * 2))}
                disabled={cookies < mineCost}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Buy Mine ({mineCost} cookies, +{mineIncrement}/s)
              </button>
              {mines > 0 && (
                <p className="text-xs text-gray-500">Mines: {mines} (+{mines * 100}/s)</p>
              )}
            </div>
          </div>
        );
      }
    },
   {
     name: 'loremGenerator', label: 'Lorem Ipsum',
    inputs: [{ key: 'sentences', type: 'number', default: 3 }, { key: 'paragraphs', type: 'number', default: 0 }, { key: 'words', type: 'number', default: 0 }],
    execute: (v) => blades.loremGenerator(v)
  },
  {
    name: 'uuidGenerator', label: 'UUID v4',
    inputs: [], execute: () => blades.uuidGenerator()
  },
  {
    name: 'patternGenerator', label: 'CSS Pattern',
    inputs: [{ key: 'type', type: 'select', default: 'stripes', options: ['stripes', 'dots', 'grid', 'zigzag'] }, { key: 'color', type: 'text', default: '#000000' }, { key: 'backgroundColor', type: 'text', default: '#ffffff' }, { key: 'size', type: 'number', default: 20 }],
    execute: (v) => blades.patternGenerator(v)
  },
  {
    name: 'gradientGenerator', label: 'CSS Gradient',
    inputs: [{ key: 'type', type: 'select', default: 'linear', options: ['linear', 'radial'] }, { key: 'colors', type: 'text', default: '#FF5733, #33FF57' }, { key: 'angle', type: 'number', default: 135 }],
    execute: (v) => blades.gradientGenerator({ ...v, colors: v.colors.split(',').map(c => c.trim()) })
  },
  {
    name: 'boxShadowGenerator', label: 'CSS Box Shadow',
    inputs: [{ key: 'x', type: 'number', default: 4 }, { key: 'y', type: 'number', default: 6 }, { key: 'blur', type: 'number', default: 15 }, { key: 'spread', type: 'number', default: 0 }, { key: 'opacity', type: 'number', default: 0.1 }, { key: 'color', type: 'text', default: '#000000' }, { key: 'inset', type: 'checkbox', default: false }],
    execute: (v) => blades.boxShadowGenerator(v)
  },
  {
    name: 'currencyConverter', label: 'Currency',
    inputs: [{ key: 'amount', type: 'number', default: 100 }, { key: 'fromCurrency', type: 'currency', default: 'USD' }, { key: 'toCurrency', type: 'currency', default: 'EUR' }],
    execute: (v) => { const r = blades.currencyConverter(v.amount, v.fromCurrency, v.toCurrency); return `${v.amount} ${v.fromCurrency} = ${r.convertedAmount} ${v.toCurrency} (rate: ${r.rate})`; }
  },
  {
    name: 'temperatureConverter', label: 'Temperature',
    inputs: [{ key: 'value', type: 'number', default: 100 }, { key: 'fromUnit', type: 'select', default: 'celsius', options: ['celsius', 'fahrenheit', 'kelvin'] }, { key: 'toUnit', type: 'select', default: 'fahrenheit', options: ['celsius', 'fahrenheit', 'kelvin'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.temperatureConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'lengthConverter', label: 'Length',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'mile', options: ['meter', 'kilometer', 'mile', 'foot', 'inch', 'centimeter', 'millimeter', 'yard', 'nautical mile'] }, { key: 'toUnit', type: 'select', default: 'kilometer', options: ['meter', 'kilometer', 'mile', 'foot', 'inch', 'centimeter', 'millimeter', 'yard', 'nautical mile'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.lengthConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'weightConverter', label: 'Weight',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'kilogram', options: ['kilogram', 'gram', 'pound', 'ounce', 'milligram', 'metric ton', 'us ton'] }, { key: 'toUnit', type: 'select', default: 'pound', options: ['kilogram', 'gram', 'pound', 'ounce', 'milligram', 'metric ton', 'us ton'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.weightConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'speedConverter', label: 'Speed',
    inputs: [{ key: 'value', type: 'number', default: 100 }, { key: 'fromUnit', type: 'select', default: 'km/h', options: ['km/h', 'mph', 'm/s', 'knots', 'ft/s'] }, { key: 'toUnit', type: 'select', default: 'mph', options: ['km/h', 'mph', 'm/s', 'knots', 'ft/s'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.speedConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'timeConverter', label: 'Time',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'hours', options: ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'] }, { key: 'toUnit', type: 'select', default: 'minutes', options: ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.timeConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'dataSizeConverter', label: 'Data Size',
    inputs: [{ key: 'value', type: 'number', default: 1 }, { key: 'fromUnit', type: 'select', default: 'gigabytes', options: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes', 'bits', 'kilobits', 'megabits'] }, { key: 'toUnit', type: 'select', default: 'megabytes', options: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes', 'bits', 'kilobits', 'megabits'] }],
    execute: (v) => `${v.value} ${v.fromUnit} = ${blades.dataSizeConverter(v.value, v.fromUnit, v.toUnit)} ${v.toUnit}`
  },
  {
    name: 'numberBaseConverter', label: 'Number Base',
    inputs: [{ key: 'value', type: 'text', default: '255' }, { key: 'fromBase', type: 'select', default: 'decimal', options: ['binary', 'octal', 'decimal', 'hex'] }, { key: 'toBase', type: 'select', default: 'hex', options: ['binary', 'octal', 'decimal', 'hex'] }],
    execute: (v) => `${v.value} (${v.fromBase}) = ${blades.numberBaseConverter(v.value, v.fromBase, v.toBase)} (${v.toBase})`
  },
  {
    name: 'romanNumeralConverter', label: 'Roman Numerals',
    inputs: [{ key: 'value', type: 'text', default: '1994' }, { key: 'direction', type: 'select', default: 'toRoman', options: ['toRoman', 'fromRoman'] }],
    execute: (v) => {
      try {
        return v.direction === 'toRoman'
          ? blades.romanNumeralConverter(v.value, 'toRoman')
          : blades.romanNumeralConverter(v.value, 'fromRoman');
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }
  },
  {
    name: 'caseConverter', label: 'Case Converter',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'type', type: 'select', default: 'title', options: ['upper', 'lower', 'title', 'sentence'] }],
    execute: (v) => blades.caseConverter(v.text, v.type)
  },
  {
    name: 'wordCounter', label: 'Word Counter',
    inputs: [{ key: 'text', type: 'textarea', default: 'Hello world. How are you?' }],
    execute: (v) => JSON.stringify(blades.wordCounter(v.text), null, 2)
  },
  {
    name: 'textReverser', label: 'Text Reverser',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'mode', type: 'select', default: 'characters', options: ['characters', 'words'] }],
    execute: (v) => blades.textReverser(v.text, v.mode)
  },
  {
    name: 'slugify', label: 'Slugify',
    inputs: [{ key: 'text', type: 'text', default: 'Hello World — Café & Résumé' }, { key: 'separator', type: 'text', default: '-' }],
    execute: (v) => blades.slugify(v.text, { separator: v.separator })
  },
  {
    name: 'emailExtractor', label: 'Email Extractor',
    inputs: [{ key: 'text', type: 'textarea', default: 'Contact john@test.com or support@site.org' }],
    execute: (v) => blades.emailExtractor(v.text).join(', ') || 'No emails found'
  },
  {
    name: 'findReplace', label: 'Find & Replace',
    inputs: [{ key: 'text', type: 'textarea', default: 'Hello world, hello again' }, { key: 'find', type: 'text', default: 'hello' }, { key: 'replace', type: 'text', default: 'hi' }, { key: 'caseSensitive', type: 'checkbox', default: false }, { key: 'replaceAll', type: 'checkbox', default: true }],
    execute: (v) => { const r = blades.findReplace(v.text, v.find, v.replace, { caseSensitive: v.caseSensitive, replaceAll: v.replaceAll }); return `Result: "${r.result}"\nReplacements: ${r.count}`; }
  },
  {
    name: 'base64Encode', label: 'Base64',
    inputs: [{ key: 'text', type: 'text', default: 'Hello World' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.base64Encode(v.text, v.mode)
  },
  {
    name: 'hexConverter', label: 'Hex',
    inputs: [{ key: 'text', type: 'text', default: 'Hello' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.hexConverter(v.text, v.mode)
  },
  {
    name: 'binaryConverter', label: 'Binary',
    inputs: [{ key: 'text', type: 'text', default: 'Hi' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.binaryConverter(v.text, v.mode)
  },
  {
    name: 'morseCodeConverter', label: 'Morse Code',
    inputs: [{ key: 'text', type: 'text', default: 'SOS' }, { key: 'mode', type: 'select', default: 'encode', options: ['encode', 'decode'] }],
    execute: (v) => blades.morseCodeConverter(v.text, v.mode)
  },
  {
    name: 'bmiCalculator', label: 'BMI',
    inputs: [{ key: 'weightKg', type: 'number', default: 70 }, { key: 'heightCm', type: 'number', default: 175 }],
    execute: (v) => { const r = blades.bmiCalculator(v.weightKg, v.heightCm); return `BMI: ${r.bmi}\nCategory: ${r.category}`; }
  },
  {
    name: 'percentageCalculator', label: 'Percentage',
    inputs: [{ key: 'value', type: 'number', default: 25 }, { key: 'total', type: 'number', default: 200 }],
    execute: (v) => `${v.value} is ${blades.percentageCalculator(v.value, v.total)}% of ${v.total}`
  },
  {
    name: 'discountCalculator', label: 'Discount',
    inputs: [{ key: 'price', type: 'number', default: 100 }, { key: 'discountPercent', type: 'number', default: 25 }],
    execute: (v) => { const r = blades.discountCalculator(v.price, v.discountPercent); return `Final: $${r.finalPrice}\nSave: $${r.savings}`; }
  },
  {
    name: 'factorial', label: 'Factorial',
    inputs: [{ key: 'n', type: 'number', default: 10 }],
    execute: (v) => `${v.n}! = ${blades.factorial(v.n)}`
  },
  {
    name: 'fibonacci', label: 'Fibonacci',
    inputs: [{ key: 'n', type: 'number', default: 10 }],
    execute: (v) => blades.fibonacci(v.n).join(', ')
  },
  {
    name: 'primeChecker', label: 'Prime',
    inputs: [{ key: 'n', type: 'number', default: 17 }],
    execute: (v) => { const r = blades.primeChecker(v.n); return `Prime: ${r.isPrime}\nNearest: ${r.nearestPrime}\nFactors: ${r.factors.join(', ')}`; }
  },
  {
    name: 'gcdLcm', label: 'HCF & LCM',
    inputs: [{ key: 'a', type: 'number', default: 12 }, { key: 'b', type: 'number', default: 18 }],
    execute: (v) => { const r = blades.gcdLcm(v.a, v.b); return `HCF: ${r.gcd}\nLCM: ${r.lcm}`; }
  },
  {
    name: 'randomNumber', label: 'Random Number',
    inputs: [{ key: 'min', type: 'number', default: 1 }, { key: 'max', type: 'number', default: 100 }, { key: 'count', type: 'number', default: 1 }, { key: 'integer', type: 'checkbox', default: true }],
    execute: (v) => blades.randomNumber(v).toString()
  },
  {
    name: 'fileSizeFormatter', label: 'File Size',
    inputs: [{ key: 'bytes', type: 'number', default: 1048576 }],
    execute: (v) => blades.fileSizeFormatter(v.bytes)
  },
  {
    name: 'qrGenerator', label: 'QR Code',
    inputs: [{ key: 'text', type: 'text', default: 'https://example.com' }, { key: 'size', type: 'number', default: 330, max: 500 }],
    execute: (v) => 'SVG rendered below', isSvg: true
  },
  {
    name: 'colorConverter', label: 'Color Converter',
    inputs: [{ key: 'color', type: 'text', default: '#FF5733' }, { key: 'toFormat', type: 'select', default: 'rgb', options: ['rgb', 'hsl'] }],
    execute: (v) => JSON.stringify(blades.colorConverter(v.color, v.toFormat))
  },
  {
    name: 'randomColor', label: 'Random Color',
    inputs: [{ key: 'format', type: 'select', default: 'hex', options: ['hex', 'rgb', 'hsl'] }, { key: 'hue', type: 'select', default: 'random', options: ['random', 'warm', 'cool', 'pastel'] }],
    execute: (v) => blades.randomColor(v)
  },
  {
    name: 'dateDifference', label: 'Date Diff',
    inputs: [{ key: 'date1', type: 'date', default: '2020-01-01' }, { key: 'date2', type: 'date', default: '2025-06-15' }],
    execute: (v) => { const r = blades.dateDifference(v.date1, v.date2); return `${r.years}y ${r.months}m ${r.days}d\nTotal: ${r.totalDays} days`; }
  },
  {
    name: 'dateFormatter', label: 'Date Format',
    inputs: [{ key: 'date', type: 'date', default: '2025-04-09' }, { key: 'format', type: 'select', default: 'weekday', options: ['iso', 'us', 'eu', 'weekday', 'relative', 'unix'] }],
    execute: (v) => blades.dateFormatter(v.date, v.format)
  },
  {
    name: 'simpleHash', label: 'Hash',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }, { key: 'algorithm', type: 'select', default: 'djb2', options: ['djb2', 'sdbm', 'xor'] }],
    execute: (v) => blades.simpleHash(v.text, v.algorithm)
  },
  {
    name: 'checksumGenerator', label: 'Checksum',
    inputs: [{ key: 'text', type: 'text', default: 'hello world' }],
    execute: (v) => JSON.stringify(blades.checksumGenerator(v.text))
  },
  {
    name: 'textDiff', label: 'Text Diff',
    inputs: [{ key: 'text1', type: 'textarea', default: 'Hello world' }, { key: 'text2', type: 'textarea', default: 'Hello universe' }],
    execute: (v) => { const r = blades.textDiff(v.text1, v.text2); return `Added: ${r.added.join(', ')}\nRemoved: ${r.removed.join(', ')}`; }
  },
  {
    name: 'truncate', label: 'Truncate',
    inputs: [{ key: 'text', type: 'text', default: 'This is a very long sentence' }, { key: 'maxLength', type: 'number', default: 15 }],
    execute: (v) => blades.truncate(v.text, v.maxLength)
  },
  {
    name: 'initials', label: 'Initials',
    inputs: [{ key: 'name', type: 'text', default: 'John Fitzgerald Kennedy' }],
    execute: (v) => blades.initials(v.name)
  },
  {
    name: 'repeatText', label: 'Repeat',
    inputs: [{ key: 'text', type: 'text', default: 'Ha' }, { key: 'count', type: 'number', default: 5 }],
    execute: (v) => blades.repeatText(v.text, v.count)
  },
  {
    name: 'timezoneConverter', label: 'Time',
    inputs: [{ key: 'timezone', type: 'select', default: 'America/New_York', options: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney'] }],
    execute: (v) => new Date().toLocaleString('en-US', { timeZone: v.timezone })
  },
  {
    name: 'stopwatch', label: 'Stopwatch',
    inputs: [], isInteractive: true,
    render: () => {
      const [sw] = useState(() => blades.stopwatch())
      const [time, setTime] = useState(0)
      const [running, setRunning] = useState(false)
      useEffect(() => {
        if (!running) return
        const iv = setInterval(() => {
          if (!sw.isRunning()) { clearInterval(iv); setRunning(false); return; }
          setTime(sw.getTime())
        }, 30)
        return () => clearInterval(iv)
      }, [running, sw])
      return (
        <div>
          <div style={{ fontSize: 28, margin: '10px 0' }}>{(time / 1000).toFixed(3)}s</div>
          <button onClick={() => { sw.start(); setRunning(true) }} disabled={running} className=''>Start</button>{' '}
          <button onClick={() => { sw.stop(); setRunning(false) }} disabled={!running}>Stop</button>{' '}
          <button onClick={() => { sw.reset(); setTime(0); setRunning(false) }}>Reset</button>
        </div>
      )
    }
  },
  {
    name: 'timer', label: 'Timer',
    inputs: [{ key: 'duration', type: 'number', default: 0 }],
    isInteractive: true,
    className: 'col-start-2',
    render: (props) => {
      const dur = (props.duration || 5) * 1000
      const [time, setTime] = useState(dur)
      const [running, setRunning] = useState(false)
      const ivRef = useRef(null)
      useEffect(() => {
        if (!running) return
        ivRef.current = setInterval(() => {
          setTime(prev => {
            if (prev <= 50) { clearInterval(ivRef.current); setRunning(false); alert("DONE!!!"); return 0 }
            return prev - 50
          })
        }, 50)
        return () => clearInterval(ivRef.current)
      }, [running])
      const addTime = (ms) => setTime(p => p + ms)
      return (
        <div>
          <div style={{ fontSize: 28, margin: '10px 0' }}>{(time / 1000).toFixed(1)}s</div>
          <button onClick={() => { if (running || time <= 0) return; setRunning(true) }}>Start</button>{' '}
          <button onClick={() => { clearInterval(ivRef.current); setRunning(false) }} disabled={!running}>Pause</button>{' '}
          <button onClick={() => { clearInterval(ivRef.current); setRunning(false); setTime(dur) }}>Reset</button>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => addTime(1000)}>+1s</button>{' '}
            <button onClick={() => addTime(5000)}>+5s</button>{' '}
            <button onClick={() => addTime(10000)}>+10s</button>{' '}
            <button onClick={() => addTime(60000)}>+60s</button>{' '}
            <button onClick={() => time >= 1000 && addTime(-1000)}>-1s</button>{' '}
            <button onClick={() => time >= 5000 && addTime(-5000)}>-5s</button>{' '}
            <button onClick={() => time >= 10000 && addTime(-10000)}>-10s</button>
          </div>
        </div>
      )
     }
   }
 ]


const currencyCodes = [
  'USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'CHF', 'CAD', 'AUD', 'KRW', 
  'BRL', 'MXN', 'RUB', 'ZAR', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'NZD', 
  'THB', 'MYR', 'PHP', 'IDR', 'PLN', 'TRY', 'ILS', 'ARS', 'COP', 'VND', 
  'EGP', 'PKR', 'NGN', 'AED', 'SAR', 'CZK', 'HUF', 'CLP', 'PEN', 'BDT', 
  'KES', 'GHS', 'UAH', 'RON', 'BGN', 'ISK', 'TWD', 'LKR', 'MMK', 'MAD', 
  'JOD', 'QAR', 'KWD', 'BHD', 'OMR', 'UZS', 'TMT', 'AZN', 'GEL', 'AMD', 
  'KZT', 'BYN', 'MDL', 'RSD', 'ALL', 'MKD', 'BAM', 'TND', 'DZD', 'LYD', 
  'ANG', 'XCD', 'BBD', 'JMD', 'TTD', 'BZD', 'GTQ', 'HNL', 'NIO', 'CRC', 
  'PAB', 'DOP', 'UYU', 'PYG', 'BOB', 'SVC', 'GYD', 'SRD', 'FKP', 'GIP', 
  'SHP', 'JEP', 'GGP', 'IMP', 'AFN', 'IQD', 'IRR', 'KPW', 'LBP', 'MVR', 
  'NPR', 'SYP', 'YER', 'BTN', 'KGS', 'TJS', 'MNT', 'LAK', 'KHR', 'BND', 
  'MOP', 'NAD', 'BWP', 'MUR', 'SCR', 'MWK', 'ZMW', 'MZN', 'AOA', 'UGX', 
  'TZS', 'RWF', 'ETB', 'SOS', 'DJF', 'ERN', 'SDG', 'SSP', 'CDF', 'XOF', 
  'XAF', 'KMF', 'MGA', 'BIF', 'SLL', 'LRD', 'GMD', 'GNF', 'CVE', 'STN', 
  'SBD', 'TOP', 'WST', 'VUV', 'FJD', 'PGK', 'AWG', 'KYD', 'HTG', 'CUC', 
  'CUP', 'MRU', 'SZL', 'LSL', 'BSD', 'BMD', 'XPF', 'TVD', 'MRO', 'STD'
];
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

function BladeCard({ blade }) {
  const [values, setValues] = useState(() => {
    const init = {}
    blade.inputs.forEach(i => init[i.key] = i.default)
    return init
  })
  const [output, setOutput] = useState('')
  const [svgOutput, setSvgOutput] = useState('')

  const handleChange = (key, value) => setValues(prev => ({ ...prev, [key]: value }))

  const handleExecute = async () => {
    if (blade.isSvg) {
      setSvgOutput(blades.qrGenerator(values.text, values.size))
      setOutput('')
      return
    }
    setOutput(blade.execute(values))
    setSvgOutput('')
  }

  if (blade.isInteractive) {
    return (
      <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} className={`border border-gray-300 rounded-lg p-4 bg-white shadow-sm ${blade.className || ''}`}>
        <h3 className="text-lg font-semibold mb-3">{blade.label}</h3>
        {blade.render({ ...values, handleChange })}
      </motion.div>
    )
  }

  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} className={`flex flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-sm ${blade.className || ''}`}>
      <h3 className="text-lg font-semibold mb-3">{blade.label}</h3>
      
      <div className="flex-grow">
        {blade.inputs.map(input => (
          <div key={input.key} className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{input.key.replace(/([A-Z])/g, ' $1').trim()}</label>
            {input.type === 'select' ? (
              <select value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55,65,81)] focus:border-transparent transition-shadow">
                {input.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : input.type === 'currency' ? (
              <select value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55,65,81)] focus:border-transparent transition-shadow">
                {currencyCodes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : input.type === 'checkbox' ? (
              <input type="checkbox" checked={values[input.key]} onChange={e => handleChange(input.key, e.target.checked)} className="w-4 h-4 text-[rgb(55,65,81)] focus:ring-[rgb(55,65,81)] border-gray-300 rounded cursor-pointer" />
            ) : input.type === 'textarea' ? (
              <textarea value={values[input.key]} onChange={e => handleChange(input.key, e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55,65,81)] focus:border-transparent transition-shadow" />
            ) : (
              <input
                type={input.type}
                value={values[input.key]}
                onChange={e => handleChange(input.key, e.target.type === 'number' ? +e.target.value : e.target.value)}
                {...(input.max && { max: input.max })}
                {...(input.min && { min: input.min })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(55,65,81)] focus:border-transparent transition-shadow" />
            )}
          </div>
        ))}
      </div>

      {svgOutput && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
          <div dangerouslySetInnerHTML={{ __html: svgOutput }} className="flex justify-center bg-gray-50 p-4 rounded border border-gray-100" />
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const size = Math.min(parseInt(values.size) || 200, 500);
              const canvas = document.createElement('canvas');
              canvas.width = size;
              canvas.height = size;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, size, size);
              const svgStr = svgOutput.replace(/<svg[^>]*>/, `<svg xmlns="http://w3.org" width="${size}" height="${size}">`);
              const img = new Image();
              img.onload = () => {
                ctx.drawImage(img, 0, 0, size, size);
                const a = document.createElement('a');
                a.download = 'qrcode.png';
                a.href = canvas.toDataURL('image/png');
                a.click();
              };
              img.onerror = () => { alert('Error generating image'); };
              img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
            }} 
            className="mt-3 inline-block px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium shadow-sm"
          >
            Download PNG
          </motion.button>
        </motion.div>
      )}

      {!blade.isInteractive && (
        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExecute}
            className="w-full py-2 bg-[rgb(55,65,81)] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[rgb(55,65,81)]"
          >
            Execute
          </motion.button>

          {output && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono whitespace-pre-wrap break-all text-gray-800"
            >
              {output}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Blades() {
  const [search, setSearch] = useState('')
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  }

  const filteredBlades = bladesList.filter(blade =>
    blade.label.toLowerCase().includes(search.toLowerCase()) ||
    blade.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-10 font-mono">
      <div className='flex flex-col'>
        <motion.section
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25,
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-4xl mb-2"
          >
            Blades
            <span> </span>
            <span className='text-xl text-gray-600'>
              (a swiss army knife web app for all your utility needs)
            </span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="mb-4"
          >
            {filteredBlades.length} blades
          </motion.p>
          <input
            type="search"
            placeholder="Search blades..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-8 p-2 border border-gray-300 rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[rgb(55,65,81)] focus:border-transparent"
          />
        </motion.section>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredBlades.map(blade => (
          <BladeCard key={blade.name} blade={blade} />
        ))}
      </motion.div>
    </div>
  )
}