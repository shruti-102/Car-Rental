using Backend.DataAccess;
using Backend.DataAccess.Repository;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    { 
        readonly IDataAccess dataAccess;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly string DateFormat;
    
        private readonly IUnitOfWork unitOfWork;

        public RentalController(IDataAccess dataAccess, IConfiguration configuration,IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.dataAccess = dataAccess;
            DateFormat = configuration["Constants:DateFormat"];
        }

        [HttpGet("GetCarList")]
        public async Task<IActionResult> GetCarsList()
        {
            IEnumerable<Car> result = await unitOfWork.CarRepository.GetCarsAsync();
            return Ok(result);
        }

         
        [Route("api/makers")]
        [HttpGet]
        public async Task<IActionResult> GetMakers()
        {
            var makers = await unitOfWork.CarRepository.GetMakersAsync();
            return Ok(makers);
        }

        [Route("api/models")]
        [HttpGet]
        public async Task<IActionResult> GetModels(int makerId)
        {
            var models = await unitOfWork.CarRepository.GetModelsAsync(makerId);
            return Ok(models);
        }


        
        

    }
}
