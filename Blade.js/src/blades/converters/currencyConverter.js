/**
 * Converts currency using approximate exchange rates
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {{convertedAmount: number, rate: number}} Converted amount and exchange rate
 */
export default function currencyConverter(amount, fromCurrency, toCurrency) {
  const rates = {
  USD: 1, EUR: 0.93, GBP: 0.79, INR: 92.74, JPY: 159.65, CNY: 6.88, CHF: 0.80, CAD: 1.39, AUD: 1.51, KRW: 1365.20, BRL: 5.15, MXN: 17.89, RUB: 92.50, ZAR: 18.95, SGD: 1.35, HKD: 7.82, NOK: 10.85, SEK: 10.75, DKK: 6.94, NZD: 1.68, THB: 36.40, MYR: 4.75, PHP: 57.20, IDR: 16150, PLN: 4.02, TRY: 32.45, AED: 3.67, SAR: 3.75, CZK: 23.40, HUF: 365, ILS: 3.72, CLP: 945, ARS: 870, COP: 3910, PEN: 3.74, VND: 25420, EGP: 47.50, PKR: 278, NGN: 1150, BDT: 110, KES: 132, GHS: 13.50, UAH: 39.50, RON: 4.62, BGN: 1.82, ISK: 140, TWD: 32.40, LKR: 298, MMK: 2100, MAD: 10.05, JOD: 0.71, QAR: 3.64, KWD: 0.31, BHD: 0.377, OMR: 0.385, UZS: 12650, TMT: 3.50, AZN: 1.70, GEL: 2.68, AMD: 395, KZT: 445, BYN: 3.26, MDL: 17.75, RSD: 108.50, ALL: 94.20, MKD: 57.10, BAM: 1.81, TND: 3.12, DZD: 134.50, LYD: 4.84, ANG: 1.79, XCD: 2.70, BBD: 2.00, JMD: 156, TTD: 6.78, BZD: 2.01, GTQ: 7.80, HNL: 24.65, NIO: 36.65, CRC: 505, PAB: 1.00, DOP: 59.20, UYU: 38.80, PYG: 7420, BOB: 6.91, SVC: 8.75, GYD: 209.50, SRD: 36.20, FKP: 0.79, GIP: 0.79, SHP: 0.79, JEP: 0.79, GGP: 0.79, IMP: 0.79, AFN: 71.20, IQD: 1310, IRR: 42000, KPW: 900, LBP: 89500, MVR: 15.45, NPR: 133.20, SYP: 13000, YER: 250, BTN: 83.12, KGS: 89.40, TJS: 10.95, MNT: 3390, LAK: 21250, KHR: 4060, BND: 1.35, MOP: 8.06, NAD: 18.95, BWP: 13.75, MUR: 46.20, SCR: 13.40, MWK: 1750, ZMW: 24.80, MZN: 63.85, AOA: 835, UGX: 3795, TZS: 2580, RWF: 1290, ETB: 56.70, SOS: 570, DJF: 177.70, ERN: 15.00, SDG: 600, SSP: 130, CDF: 2780, XOF: 610, XAF: 610, KMF: 457, MGA: 4550, BIF: 2860, SLL: 22500, LRD: 192, GMD: 67.50, GNF: 8610, CVE: 102.50, STN: 22.80, SBD: 8.45, TOP: 2.38, WST: 2.75, VUV: 121, FJD: 2.26, PGK: 3.82, AWG: 1.79, KYD: 0.83, HTG: 132.50, CUC: 1.00, CUP: 24.00, MRU: 39.80, SZL: 18.95, LSL: 18.95, BSD: 1.00, BMD: 1.00, XPF: 111.50, TVD: 1.51, KGS: 89.40, TJS: 10.92, MRO: 39.80, STD: 22.80
  };

  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error(`Unsupported currency: ${!rates[fromCurrency] ? fromCurrency : toCurrency}`);
  }

  const rate = rates[toCurrency] / rates[fromCurrency];
  return {
    convertedAmount: parseFloat((amount * rate).toFixed(2)),
    rate: parseFloat(rate.toFixed(4))
  };
}
