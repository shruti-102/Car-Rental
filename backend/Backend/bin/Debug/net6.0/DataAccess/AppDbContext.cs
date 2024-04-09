using Backend.DataAccess.Models;
using Backend.DataAccess.Seed;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Maker> Makers { get; set; }
        public DbSet<Model> Models { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.CarSeed();
            modelBuilder.BookingSeed();
            modelBuilder.MakerSeed();  // Call the Maker seed method
            modelBuilder.ModelSeed();  // Call the Model seed method

            modelBuilder.Entity<Maker>()
                .HasMany(maker => maker.Models)
                .WithOne(model => model.Maker)
                .HasForeignKey(model => model.MakerId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
