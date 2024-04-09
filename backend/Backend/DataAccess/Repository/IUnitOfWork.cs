namespace Backend.DataAccess.Repository
{
    public interface IUnitOfWork
    {
         ICarRepository CarRepository { get; }
    }
}
