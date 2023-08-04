using Domain.Models.BuildOrderModels;
using Domain.Models.Interfaces;

namespace Domain.Services.Interfaces
{
    public interface IBuildOrdersService
    {
        Task<Guid> CreateBuildOrder(ApiBuildOrderData buildOrder);
        Task<Guid> EditBuildOrder(ApiBuildOrderData buildOrder);
    }
    public interface IBuildOrdersService<T>: IBuildOrdersService where T : IBuildOrder
    {
        Task<List<BuildOrderProjection>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode);
        Task<BuildOrderProjection> GetBuildOrderById(Guid id);

        Task DeleteBuildOrder(Guid id);
    }   
}
