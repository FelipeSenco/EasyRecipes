using Domain.Models;
using Domain.Models.Interfaces;

namespace Domain.Repositories.Interfaces
{
    public interface IBuildOrdersRepository
    {
       Task<List<IBuildOrder>> GetBuildOrders();
       Task<IBuildOrder> GetBuildOrderById(string id);
    }
}
