using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services.Implementations
{
    public class WarcraftBuildOrdersService : IBuildOrdersService
    {
        private readonly IBuildOrdersRepository _buildOrdersRepository;

        public WarcraftBuildOrdersService(IBuildOrdersRepository buildOrdersRepository)
        {
            _buildOrdersRepository = buildOrdersRepository;
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
