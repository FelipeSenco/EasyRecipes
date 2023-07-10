using Domain.Models;
using Domain.Models.Interfaces;

namespace Domain.Repositories.Interfaces
{
    public interface IBuildOrdersRepository
    {
       Task<List<IBuildOrder>> GetBuildOrders(int page);
       Task<IBuildOrder> GetBuildOrderById(string id);
    }
}
