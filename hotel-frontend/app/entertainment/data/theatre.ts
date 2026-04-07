export const theatres = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Nagpur",
    screens: [
      {
        screenId: "pvr-screen-1",
        screenName: "Audi 1",
        shows: [
          {
            id: "pvr-1",
            movieSlug: "avengers-endgame",
            time: "10:00 AM",
            date: "2026-04-10",

            pricing: {
              economy: 180,
              premium: 250,
              vip: 350,
            },

            format: "IMAX",
          },
          {
            id: "pvr-2",
            movieSlug: "dune-part-two",
            time: "1:30 PM",
            date: "2026-04-10",
            pricing: {
              economy: 200,
              premium: 280,
              vip: 380,
            },
            format: "4DX",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "INOX",
    location: "Nagpur",
    screens: [
      {
        screenId: "inox-1",
        screenName: "Audi 2",
        shows: [
          {
            id: "inox-1",
            movieSlug: "oppenheimer",
            time: "11:00 AM",
            date: "2026-04-10",
            pricing: {
              economy: 200,
              premium: 280,
              vip: 360,
            },
            format: "Dolby Atmos",
          },
          {
            id: "inox-2",
            movieSlug: "kalki-2898-ad",
            time: "4:00 PM",
            date: "2026-04-10",
            pricing: {
              economy: 220,
              premium: 300,
              vip: 400,
            },
            format: "IMAX",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Cinepolis",
    location: "Nagpur",
    screens: [
      {
        screenId: "cine-1",
        screenName: "Screen 3",
        shows: [
          {
            id: "cine-1",
            movieSlug: "stree-2",
            time: "2:00 PM",
            date: "2026-04-10",
            pricing: {
              economy: 150,
              premium: 220,
              vip: 300,
            },
            format: "Standard",
          },
          {
            id: "cine-2",
            movieSlug: "fighter",
            time: "6:00 PM",
            date: "2026-04-10",
            pricing: {
              economy: 170,
              premium: 240,
              vip: 320,
            },
            format: "Dolby",
          },
        ],
      },
    ],
  },
];