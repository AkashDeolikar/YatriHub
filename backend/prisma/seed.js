// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.room.createMany({
//     data: [
//       {
//         name: "Standard Room",
//         price: 100
//       },
//       {
//         name: "Deluxe Room",
//         price: 200
//       },
//       {
//         name: "Suite",
//         price: 350
//       }
//     ]
//   });

//   console.log("Rooms seeded successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  /*
  ======================================
  ROOM SEEDING
  ======================================
  */

  await prisma.room.createMany({
    data: [
      {
        name: "Standard Room",
        price: 100
      },
      {
        name: "Deluxe Room",
        price: 200
      },
      {
        name: "Suite",
        price: 350
      }
    ],
    skipDuplicates: true
  });

  console.log("Rooms seeded successfully!");

  /*
  ======================================
  BUS SEEDING
  ======================================
  */

  await prisma.bus.createMany({
    data: [
      {
        busNumber: "MH12 AB 1234",
        operator: "VRL Travels",
        fromCity: "Nagpur",
        toCity: "Pune",
        departureTime: new Date("2026-03-05T08:00:00"),
        arrivalTime: new Date("2026-03-05T18:00:00"),
        price: 1200,
        totalSeats: 40,
        availableSeats: 40
      },
      {
        busNumber: "MH14 CD 5678",
        operator: "RedBus Express",
        fromCity: "Nagpur",
        toCity: "Mumbai",
        departureTime: new Date("2026-03-05T07:00:00"),
        arrivalTime: new Date("2026-03-05T16:00:00"),
        price: 1500,
        totalSeats: 36,
        availableSeats: 36
      },
      {
        busNumber: "MH20 EF 9999",
        operator: "Orange Travels",
        fromCity: "Nagpur",
        toCity: "Hyderabad",
        departureTime: new Date("2026-03-05T09:30:00"),
        arrivalTime: new Date("2026-03-05T19:30:00"),
        price: 1300,
        totalSeats: 45,
        availableSeats: 45
      }
    ],
    skipDuplicates: true
  });

  console.log("Buses seeded successfully!");
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });