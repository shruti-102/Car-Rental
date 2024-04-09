using Backend.DataAccess.Repository;

namespace Backend.DataAccess
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly AppDbContext appDb;
        private readonly IDataAccess dataAccess;
        //private ICarRepository CarRepository;

        public UnitOfWork(AppDbContext appDb, IDataAccess dataAccess) {
            this.appDb = appDb;
            this.dataAccess = dataAccess;
        }
        public ICarRepository CarRepository => new CarRepository(appDb,dataAccess);
 
    }
}
