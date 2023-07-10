
using Domain.Models.Interfaces;

namespace Domain.Services.Interfaces
{
    public interface IBuildOrdersService
    {
        Task<List<IBuildOrder>> GetBuildOrders(int page);
        Task<IBuildOrder> GetBuildOrderById(string id);
    }
}
