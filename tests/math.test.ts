import { describe, expect, it } from 'vitest';
import { MyMath } from '../src/math/math';

describe.concurrent('MyMath', () => {
  it('MyMath.round', () => {
    const testNumbers: Array<number> = [0, 5, -5, 5.2165, -5.2165, 0.333333, -0.33333, 2.9999, -2.9999];

    const requiredNumbers: Array<number> = [0, 5, -5, 5.22, -5.22, 0.33, -0.33, 3, -3];
    const requiredNumbersWidthTree: Array<number> = [0, 5, -5, 5.216, -5.216, 0.333, -0.333, 3, -3];

    const endNumbers: Array<number> = testNumbers.map((testNumber) => MyMath.round(testNumber));
    const endNumbersWidthTree: Array<number> = testNumbers.map((testNumber) => MyMath.round(testNumber, 3));

    expect(endNumbers).toEqual(requiredNumbers);
    expect(endNumbersWidthTree).toEqual(requiredNumbersWidthTree);
  });
  it('MyMath.roundTo', () => {
    const testNumbers: Array<number> = [0, 5, -5, 5.2165, -5.2165, 0.333333, -0.33333, 2.9999, -2.9999];

    const requiredNumbers: Array<number> = [0, 10, -0, 10, -10, 0, -0, 0, -0];
    const requiredNumbersWidthTree: Array<number> = [0, 6, -6, 6, -6, 0, -0, 3, -3];

    const endNumbers: Array<number> = testNumbers.map((testNumber) => MyMath.roundTo(testNumber));
    const endNumbersWidthTree: Array<number> = testNumbers.map((testNumber) => MyMath.roundTo(testNumber, 3));

    expect(endNumbers).toEqual(requiredNumbers);
    expect(endNumbersWidthTree).toEqual(requiredNumbersWidthTree);
  });
  it('MyMath.toEText', () => {
    const testNumbers: Array<number> = [0, 5, 10, 121, 3515, 15611, 15984, 1532548, 1000000, 15615215];

    const requiredNumbers: Array<string> = [
      '0.00',
      '5.00',
      '10.0',
      '121',
      '3.52e+3',
      '1.56e+4',
      '1.60e+4',
      '1.53e+6',
      '1.00e+6',
      '1.56e+7',
    ];

    const endNumbers: Array<string> = testNumbers.map((testNumber) => MyMath.toEText(testNumber));

    expect(endNumbers).toEqual(requiredNumbers);
  });
  it('MyMath.toText', () => {
    const testNumbers: Array<number> = [0, 5, 10, 121, 3515, 15611, 15984, 1532548, 1000000, 15615215, 1651891651, 16519841651651, 1651984165];

    const requiredNumbers: Array<string> = [
		"0",
		"5",
		"10",
		"121",
		"3.5K",
		"15.6K",
		"16K",
		"1.5M",
		"1M",
		"15.6M",
		"1.7B",
		"16.5T",
		"1.7B",
    ];

    const endNumbers: Array<string> = testNumbers.map((testNumber) => MyMath.toText(testNumber));

    expect(endNumbers).toEqual(requiredNumbers);
  });
  it('MyMath.toTime', () => {
    const testNumbers: Array<number> = [0, 999, 1000, 3515, 15611, 15984, 1532548, 1000000, 15615215, 1651891651, 16519841365, 16519841651651];

    const requiredNumbers: Array<string> = [
		"0c",
		"0c",
		"1с. ",
		"3с. ",
		"15с. ",
		"15с. ",
		"25м. 32с. ",
		"16м. 40с. ",
		"4ч. 20м. 15с. ",
		"19д. 2ч. 51м. 31с. ",
		"191д. 4ч. 50м. 41с. ",
		"191201д. 20ч. 54м. 11с. ",
    ];

    const endNumbers: Array<string> = testNumbers.map((testNumber) => MyMath.toTime(testNumber));

    expect(endNumbers).toEqual(requiredNumbers);
  });
});
