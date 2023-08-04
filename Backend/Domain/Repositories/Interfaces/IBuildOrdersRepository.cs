using Domain.Models;
using Domain.Models.Interfaces;
using MongoDB.Driver;

namespace Domain.Repositories.Interfaces
{
    public interface IBuildOrdersRepository<T> where T: IBuildOrder
    {
       Task<List<T>> GetBuildOrders(int page, FilterDefinition<T> filter);
       Task<T> GetBuildOrderById(Guid id);
       Task<Guid> CreateBuildOrder(T buildOrder);
       Task<Guid> EditBuildOrder(T buildOrder);
       Task DeleteBuildOrder(Guid id);
    }
}
