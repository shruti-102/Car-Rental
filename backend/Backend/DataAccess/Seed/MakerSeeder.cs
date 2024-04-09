using Backend.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess.Seed
{
    public static class MakerSeeder
    {
        public static void MakerSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Maker>().HasData(
                new Maker { Id = 1, Name = "TATA" },
                new Maker { Id = 2, Name = "Maruti Suzuki" },
                new Maker { Id = 3, Name = "Hyundai" },
                new Maker { Id = 4, Name = "Nissan" }
            );
        }
    }
}
