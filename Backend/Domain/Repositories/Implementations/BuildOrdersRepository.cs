using Domain.Mocks;
using Domain.Models;
using Domain.Repositories.Interfaces;


namespace Domain.Repositories.Implementations
{
    public class BuildOrdersRepository : IBuildOrdersRepository
    {
        public Task<List<WarcraftBuildOrder>> GetWarcraftBuildOrders()
        {           
            return Task.FromResult(WarcraftBuildOrderMocks.WarcraftOrdersMock);
        }
    }
}
