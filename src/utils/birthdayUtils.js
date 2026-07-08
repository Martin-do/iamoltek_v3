const BIRTHDAY_MONTH = 7; // July
const BIRTHDAY_DAY = 8;    // 8th

export function isBirthdayPeriod() {
  const now = new Date();
  return (
    now.getMonth() + 1 === BIRTHDAY_MONTH &&
    now.getDate() === BIRTHDAY_DAY
  );
}
