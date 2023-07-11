using Domain.Factories.Interfaces;
using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;
using MongoDB.Driver;

namespace Domain.Services.Implementations
{
    public class WarcraftBuildOrdersService : IBuildOrdersService<WarcraftBuildOrder>
    {
        readonly IBuildOrdersRepository<WarcraftBuildOrder> _buildOrdersRepository;
        public WarcraftBuildOrdersService(IBuildOrdersRepositoryFactory repositoryFactory)
        {
            _buildOrdersRepository = repositoryFactory.Create<WarcraftBuildOrder>("MongoDB:WarcraftBuildOrdersCollection");
        }
        public async Task<List<WarcraftBuildOrder>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
            FilterDefinition<WarcraftBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<WarcraftBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<WarcraftBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
            return response;
        }       
        public async Task<WarcraftBuildOrder> GetBuildOrderById(string id)
        {
            WarcraftBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }
    }
}
