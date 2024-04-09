using Microsoft.EntityFrameworkCore;
using Backend.DataAccess.Models;

namespace Backend.DataAccess.Seed
{
    public static class ModelSeeder
    {
        public static void ModelSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model>().HasData(
                new Model { Id = 1, Name = "Nexon", MakerId = 1 },
                new Model { Id = 2, Name = "Swift", MakerId = 2 },
                new Model { Id = 3, Name = "i20", MakerId = 3 },
                new Model { Id = 4, Name = "Magnite", MakerId = 4 },
                new Model { Id = 5, Name = "Aura", MakerId = 3 }
            );
        }
    }
}
