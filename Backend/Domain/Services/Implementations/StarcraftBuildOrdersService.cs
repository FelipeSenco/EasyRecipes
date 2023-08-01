using Domain.Factories.Interfaces;
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;
using MongoDB.Driver;

namespace Domain.Services.Implementations
{
    public class StarcraftBuildOrdersService : IBuildOrdersService<StarcraftBuildOrder>
    {
        readonly IBuildOrdersRepository<StarcraftBuildOrder> _buildOrdersRepository;
        public StarcraftBuildOrdersService(IBuildOrdersRepositoryFactory repositoryFactory)
        {
            _buildOrdersRepository = repositoryFactory.Create<StarcraftBuildOrder>("MongoDB:StarcraftBuildOrdersCollection");
        }
     
        public async Task<List<StarcraftBuildOrder>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
            FilterDefinition<StarcraftBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<StarcraftBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<StarcraftBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
            return response;
        }
        public async Task<StarcraftBuildOrder> GetBuildOrderById(Guid id)
        {
            StarcraftBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }

        public Task<Guid> CreateBuildOrder(CreateBuildOrderData buildOrder)
        {
            throw new NotImplementedException();
        }
    }
}
