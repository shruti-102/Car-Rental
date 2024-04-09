using Backend.DataAccess.Models;
using Backend.Models;

namespace Backend.DataAccess.Repository
{
    public class CarRepository : ICarRepository
    { 

        private readonly IDataAccess dataAccess;
        private readonly AppDbContext appDb;
        public CarRepository(AppDbContext appDb, IDataAccess dataAccess)
        {
            this.appDb = appDb;
            this.dataAccess = dataAccess;
        }


        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            return await dataAccess.GetCarsAsync();
        }

        public async Task<IEnumerable<Maker>> GetMakersAsync()
        {
            return await dataAccess.GetMakersAsync();
        }

        public async Task<IEnumerable<Model>> GetModelsAsync(int makerId)
        {
            return await dataAccess.GetModelsAsync(makerId);
        }
    }
}
