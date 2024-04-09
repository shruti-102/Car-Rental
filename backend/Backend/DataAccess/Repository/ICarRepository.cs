using Backend.DataAccess.Models;
using Backend.Models;

namespace Backend.DataAccess.Repository
{
    public interface ICarRepository
    {
        Task<IEnumerable<Car>> GetCarsAsync();

        Task<IEnumerable<Maker>> GetMakersAsync();
        Task<IEnumerable<Model>> GetModelsAsync(int makerId);
        
    }
}
