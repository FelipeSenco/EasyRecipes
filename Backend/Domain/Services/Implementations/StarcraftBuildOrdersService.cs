using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services.Implementations
{
    public class StarcraftBuildOrdersService : IBuildOrdersService
    {
        readonly IBuildOrdersRepository _buildOrdersRepository;
        public StarcraftBuildOrdersService(BuildOrdersRepositoryFactory repositoryFactory)
        {
            _buildOrdersRepository = repositoryFactory.Create(Games.Starcraft_II);
        }


        public async Task<List<IBuildOrder>> GetBuildOrders()
        {
            List<IBuildOrder> response = await _buildOrdersRepository.GetBuildOrders();
            return response;
        }
        public async Task<IBuildOrder> GetBuildOrderById(string id)
        {
            IBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }
    }
}
