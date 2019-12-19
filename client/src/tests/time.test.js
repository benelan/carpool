import { convertTime } from "../helpers"

it('convert times', () => {
    expect(convertTime("17:00")).toEqual("5:00 PM");
    expect(convertTime("00:30")).toEqual("12:30 AM");
    expect(convertTime("12:11")).toEqual("12:11 PM");
    expect(convertTime("03:01")).toEqual("3:01 AM");
  });