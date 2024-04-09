using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess.Seed
    {
        public static class BookingSeeder
        {
            public static void BookingSeed(this ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Booking>().HasData(
                    new Booking
                    {
                        Id = 1,
                        CarId = 1,  // Reference to the Car entity with Id 1
                        StartDate = new DateTime(2023, 10, 5),
                        EndDate = new DateTime(2023, 10, 7),
                    },
                    new Booking
                    {
                        Id = 2,
                        CarId = 2,  // Reference to the Car entity with Id 2
                        StartDate = new DateTime(2023, 10, 1),
                        EndDate = new DateTime(2023, 10, 5),
                    },
                    new Booking
                    {
                        Id = 3,
                        CarId = 3,  // Reference to the Car entity with Id 3
                        StartDate = new DateTime(2023, 9, 21),
                        EndDate = new DateTime(2023, 9, 25),
                    },
                    new Booking
                    {
                        Id = 4,
                        CarId = 4,  // Reference to the Car entity with Id 3
                        StartDate = new DateTime(2023, 9, 21),
                        EndDate = new DateTime(2023, 9, 25),
                    }
                );
            }
        }
    }

