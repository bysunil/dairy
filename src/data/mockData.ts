export const MOCK_STATS = {
  totalPayout: 6450.00,
  totalMilk: 164.5,
  averageRate: 39.20,
  amShifts: 15,
  pmShifts: 14,
  avgFat: 6.8,
  avgWater: 0.0,
};

export const MOCK_FEED = [
  {
    date: '15 Oct',
    shift: 'Morning Shift',
    liters: 11.4,
    fat: 7.1,
    snf: 9.0,
    amount: 486,
  },
  {
    date: '14 Oct',
    shift: 'Evening Shift',
    liters: 10.8,
    fat: 6.9,
    snf: 8.9,
    amount: 450,
  }
];

export const MOCK_CYCLES = [
  { id: 1, name: '1–15 Oct 2026', type: '15-Day Bill', amount: 6450.00, status: 'current', milk: 184.5, fat: 7.4, rate: 34.95 },
  { id: 2, name: '16–30 Sep 2026', type: '15-Day Bill', amount: 7120.00, status: 'completed', milk: 201.0, fat: 7.6, rate: 35.42 },
  { id: 3, name: '1–15 Sep 2026', type: '15-Day Bill', amount: 6890.00, status: 'completed', milk: 192.8, fat: 7.5, rate: 35.73 },
];
