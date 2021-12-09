export const samples = [
  {
    _id: 1,
    info: {
      from: 'February 6th 2022',
      to: 'August 6th 2021'
    },
    duration: 6,
    current: 3,
    room_id: {
      user_id: [
        { _id: 1 },
        { _id: 2 },
        { _id: 5 },
      ]
    }
  },
  {
    _id: 2,
    info: {
      from: 'February 6th 2022',
      to: 'August 6th 2021'
    },
    duration: 5,
    current: 3,
    notify: true,
    room_id: {
      user_id: [
        { _id: 1 },
      ]
    }
  },
  {
    _id: 3,
    info: {
      from: 'February 6th 2022',
      to: 'August 6th 2021'
    },
    duration: 10,
    current: 3,
    room_id: {
      user_id: [
        { _id: 1 },
        { _id: 2 }
      ]
    }
  },
  {
    _id: 4,
    info: {
      from: 'February 6th 2022',
      to: 'August 6th 2021'
    },
    duration: 10,
    current: 3,
    room_id: {
      user_id: [
        { _id: 1 },
        { _id: 2 }
      ]
    }
  },
  {
    _id: 5,
    info: {
      from: 'February 6th 2022',
      to: 'August 6th 2021'
    },
    duration: 10,
    current: 3,
    room_id: {
      user_id: [
        { _id: 1 },
        { _id: 2 }
      ]
    }
  },
]

export const samples20 = [...samples, ...samples, ...samples, ...samples]
