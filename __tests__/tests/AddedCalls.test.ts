import moment from 'moment';
import AppLogic from '../../src/lib/AppLogic';
import { CallType, Frequency } from '../../src/Types';
import { getCall, getNotifiedPeopleCount, getPerson } from '../Helpers';
import { PersonCallTestCase } from '../Types';

const addedCallsTestCases = [
  [
    new PersonCallTestCase(
      'Joe Serbus',
      '+3136385505',
      Frequency.onceEveryTwoWeeks,
      CallType.OUTGOING,
      5,
      -7,
      1,
      7,
    ),
    new PersonCallTestCase(
      'Gayle Serbus',
      '+8106385505',
      Frequency.onceEveryTwoWeeks,
      CallType.OUTGOING,
      5,
      -21,
      1,
      -7,
    ),
  ],
  [
    new PersonCallTestCase(
      'Joe Serbus',
      '+3136385505',
      Frequency.onceEveryTwoWeeks,
      CallType.OUTGOING,
      5,
      -21,
      2,
      -7,
    ),
    new PersonCallTestCase(
      'Gayle Serbus',
      '+8106385505',
      Frequency.onceEveryTwoWeeks,
      CallType.OUTGOING,
      5,
      -28,
      2,
      -14,
    ),
  ],
];

addedCallsTestCases.forEach((testCase, index) => {
  it(`added calls case #${index}`, () => {
    const now = moment();

    const firstCall = getCall(now)(
      testCase[0].phoneNumber,
      testCase[0].callType,
      testCase[0].daysDelta,
      testCase[0].callDurationSeconds,
    );

    const secondCall = getCall(now)(
      testCase[1].phoneNumber,
      testCase[1].callType,
      testCase[1].daysDelta,
      testCase[1].callDurationSeconds,
    );

    const testPeople = [
      getPerson(
        testCase[0].name,
        testCase[0].phoneNumber,
        testCase[0].frequency,
        [],
        [],
      ),
      getPerson(
        testCase[1].name,
        testCase[1].phoneNumber,
        testCase[1].frequency,
        [secondCall],
        [],
      ),
    ];

    const testLog = [firstCall];

    const checkedPeople = new AppLogic(now.clone()).checkCallLog(
      testPeople,
      testLog,
    );

    const sortedtestCases = testCase.sort((tc1, tc2) =>
      tc1.daysLeftTillCallNeeded < tc2.daysLeftTillCallNeeded ? -1 : 1,
    );

    expect(getNotifiedPeopleCount(checkedPeople)).toBe(
      sortedtestCases[0].notifyCount,
    );

    expect(checkedPeople[0].daysLeftTillCallNeeded).toBe(
      sortedtestCases[0].daysLeftTillCallNeeded,
    );

    expect(checkedPeople[1].daysLeftTillCallNeeded).toBe(
      sortedtestCases[1].daysLeftTillCallNeeded,
    );
  });
});
