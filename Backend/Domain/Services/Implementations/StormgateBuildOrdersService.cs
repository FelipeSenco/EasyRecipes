using Domain.Factories.Interfaces;
using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;
using MongoDB.Driver;

namespace Domain.Services.Implementations
{
    public class StormgateBuildOrdersService : IBuildOrdersService<StormgateBuildOrder>
    {
        readonly IBuildOrdersRepository<StormgateBuildOrder> _buildOrdersRepository;
        public StormgateBuildOrdersService(IBuildOrdersRepositoryFactory repositoryFactory)
        {
            _buildOrdersRepository = repositoryFactory.Create<StormgateBuildOrder>("MongoDB:StormgateBuildOrdersCollection");
        }
        public async Task<List<StormgateBuildOrder>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
            FilterDefinition<StormgateBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<StormgateBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<StormgateBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
            return response;
        }
        public async Task<StormgateBuildOrder> GetBuildOrderById(Guid id)
        {
            StormgateBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }

        public Task<Guid> CreateBuildOrder(CreateBuildOrderData buildOrder)
        {
            throw new NotImplementedException();
        }
    }
}
