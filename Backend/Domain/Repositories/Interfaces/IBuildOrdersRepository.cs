using Domain.Models;
namespace Domain.Repositories.Interfaces
{
    public interface IBuildOrdersRepository
    {
       Task<List<WarcraftBuildOrder>> GetWarcraftBuildOrders();
       Task<WarcraftBuildOrder> GetWarcraftBuildOrderById(string id);
    }
}
