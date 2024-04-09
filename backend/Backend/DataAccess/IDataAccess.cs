using Backend.DataAccess.Models;
using Backend.Models;
using System.Collections.Generic;

namespace Backend.DataAccess
{
    public interface IDataAccess
    {
        //IEnumerable<Car> GetCars();
       // IEnumerable<Maker> GetMakers();
        //IEnumerable<Model> GetModelsAsync(int makerId);
        Task<IEnumerable<Maker>> GetMakersAsync();
        Task<IEnumerable<Car>> GetCarsAsync();
        Task<IEnumerable<Model>> GetModelsAsync(int makerId);
    }
}
