
using Domain.Models.Interfaces;

namespace Domain.Services.Interfaces
{
    public interface IBuildOrdersService
    {
        // methods that don't need the generic parameter
    }
    public interface IBuildOrdersService<T>: IBuildOrdersService where T : IBuildOrder
    {
        Task<List<T>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode);
        Task<T> GetBuildOrderById(string id);
    }
}
