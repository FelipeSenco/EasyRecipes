
using Domain.Models.Interfaces;

namespace Domain.Services.Interfaces
{
    public interface IBuildOrdersService
    {
        Task<List<IBuildOrder>> GetBuildOrders();
        Task<IBuildOrder> GetBuildOrderById(string id);
    }
}
