// CarSeeder.cs
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess.Seed
{
    public static class CarSeeder
    {
        public static void CarSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    Maker = "TATA",
                    Model = "Nexon",
                    Price = 2000,
                    Status = true,
                    Image = "https://media.zigcdn.com/media/model/2023/Sep/front-1-4-left-1008362956_930x620.jpg",
                },
                new Car
                {
                    Id = 2,
                    Maker = "Maruti Suzuki",
                    Model = "Swift",
                    Price = 1500,
                    Status = true,
                    Image = "https://media.zigcdn.com/media/model/2023/Feb/swift_930x620.jpg",
                },
                new Car
                {
                    Id = 3,
                    Maker = "Hyundai",
                    Model = "i20",
                    Price = 1700,
                    Status = true,
                    Image = "https://media.zigcdn.com/media/model/2023/Sep/i20_930x620.jpg",
                },
                new Car
                {
                    Id = 4,
                    Maker = "Nissan",
                    Model = "Magnite",
                    Price = 2500,
                    Status = true,
                    Image = "https://media.zigcdn.com/media/model/2020/Oct/magnite3_930x620.jpg",
                },
                new Car
                {
                    Id = 5,
                    Maker = "Hyundai",
                    Model = "Aura",
                    Price = 3000,
                    Status = true,
                    Image = "https://media.zigcdn.com/media/model/2023/Mar/front-1-4-left-1573690002_930x620.jpg",
                }
            );
        }
    }
}
