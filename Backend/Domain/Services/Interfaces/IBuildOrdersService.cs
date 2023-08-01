
using Domain.Models;
using Domain.Models.Interfaces;

namespace Domain.Services.Interfaces
{
    public interface IBuildOrdersService
    {
        Task<Guid> CreateBuildOrder(CreateBuildOrderData buildOrder);
    }
    public interface IBuildOrdersService<T>: IBuildOrdersService where T : IBuildOrder
    {
        Task<List<T>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode);
        Task<T> GetBuildOrderById(Guid id);    
    }   
}
