const carParkMock = [
  {
    id: Math.random().toString(36).substr(2, 9),
    serviceId: '55xbco8br',
    brand: 'Ford',
    details: ['Коробка передач', 'Двигатель'],
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    serviceId: 'iyrl6h1jn',
    brand: 'DODGE',
    details: ['Коробка передач', 'Воздушный фильтр'],
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    serviceId: '55xbco8br',
    brand: 'Hyundai',
    details: ['Двигатель', 'Воздушный фильтр'],
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    serviceId: '55xbco8br',
    brand: 'Kia',
    details: ['Карданный вал', 'Компрессор', 'Коробка передач', 'Моторное масло', 'Воздушный фильтр'],
  },
];

export default carParkMock;
