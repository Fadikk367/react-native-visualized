const data1 = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
];

const data2 = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
];

const data3 = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
];

const data4 = [
  { x: 0, y: 0.6 },
  { x: 1, y: 0.9 },
  { x: 2, y: 1.7 },
  { x: 3, y: 2.2 },
  { x: 4, y: 2.9 },
];

const data5 = [
  { x: 0, y: 1.1 },
  { x: 1, y: 2.2 },
  { x: 2, y: 2.4 },
  { x: 3, y: 3.5 },
  { x: 4, y: 4.2 },
];

const data6 = [
  { x: 0, y: 1.1 },
  { x: 1, y: 1.2 },
  { x: 2, y: 1.3 },
  { x: 3, y: 2.9 },
  { x: 4, y: 3.9 },
];

const data7 = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
];

const data8 = [
  { x: 0, y: 0.9 },
  { x: 1, y: 1.2 },
  { x: 2, y: 1.3 },
  { x: 3, y: 2 },
  { x: 4, y: 2.5 },
];

const data9 = [
  { x: 0, y: 1.5 },
  { x: 1, y: 2.2 },
  { x: 2, y: 2.6 },
  { x: 3, y: 4 },
  { x: 4, y: 4.8 },
];

export const datasetA = [
  { id: 'seriesA', points: data1, color: '#d75454' },
  { id: 'seriesB', points: data2, color: '#67a0d8' },
  { id: 'seriesC', points: data3, color: '#e0e359' },
];

export const datasetB = [
  { id: 'seriesA', points: data4, color: '#d75454' },
  { id: 'seriesB', points: data5, color: '#67a0d8' },
  { id: 'seriesC', points: data6, color: '#e0e359' },
];

export const datasetC = [
  { id: 'seriesA', points: data7, color: '#d75454' },
  { id: 'seriesB', points: data8, color: '#67a0d8' },
  { id: 'seriesC', points: data9, color: '#e0e359' },
];

const gradient1 = {
  start: { x: 0, y: 150 },
  end: { x: 400, y: 300 },
  colors: ['#E893CF', '#F3BCC8', '#F6FFA6'],
};

const gradient2 = {
  start: { x: 0, y: 150 },
  end: { x: 400, y: 300 },
  colors: ['#00C4FF', '#FFE7A0', '#FFF5B8'],
};

const gradient3 = {
  start: { x: 0, y: 150 },
  end: { x: 400, y: 300 },
  colors: ['#F6FA70', '#00DFA2', '#0079FF'],
};

export const datasetD = [
  { id: 'seriesA', points: data1, color: 'blue', fill: gradient1 },
  { id: 'seriesB', points: data4, color: 'yellow', fill: gradient2 },
  { id: 'seriesC', points: data7, color: 'red', fill: gradient3 },
];
