using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services.Implementations
{
    public class WarcraftBuildOrdersService : IBuildOrdersService
    {
        readonly IBuildOrdersRepository _buildOrdersRepository;
        public WarcraftBuildOrdersService(BuildOrdersRepositoryFactory repositoryFactory)
        {
            _buildOrdersRepository = repositoryFactory.Create(Games.Warcraft_III);
        }
        public async Task<List<IBuildOrder>> GetBuildOrders(int page)
        {
            List<IBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page);
           return response;
        }
        public async Task<IBuildOrder> GetBuildOrderById(string id)
        {
            IBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }
    }
}
