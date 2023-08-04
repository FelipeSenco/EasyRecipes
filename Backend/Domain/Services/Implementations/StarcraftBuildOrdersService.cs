using Domain.Factories.Interfaces;
using Domain.Models.BuildOrderModels;
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
     
        public async Task<List<BuildOrderProjection>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
            FilterDefinition<StarcraftBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<StarcraftBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<StarcraftBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
            List<BuildOrderProjection> projections = new List<BuildOrderProjection>();

            response.ForEach(buildOrder =>
            {
                BuildOrderProjection projection = new()
                {
                    Id = buildOrder.Id,
                    Name = buildOrder.Name,
                    Actions = buildOrder.Actions,
                    Description = buildOrder.Description,
                    UserId = buildOrder.UserId,
                    Conclusion = buildOrder.Conclusion,
                    GameMode = buildOrder.GameMode,
                    Faction = buildOrder.Faction,
                    OpponentFaction = buildOrder.OpponentFaction,
                    CreatedBy = buildOrder.CreatedBy,
                    IsCreatedByCurrentUser = MockIdentity.MockIdentity.User != null && buildOrder.UserId == MockIdentity.MockIdentity.User.Id
                };
                projections.Add(projection);
            });
            return projections;
        }
        public async Task<BuildOrderProjection> GetBuildOrderById(Guid id)
        {
            StarcraftBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            BuildOrderProjection projection = new()
            {
                Id = response.Id,
                Name = response.Name,
                Actions = response.Actions,
                Description = response.Description,
                UserId = response.UserId,
                Conclusion = response.Conclusion,
                GameMode = response.GameMode,
                Faction = response.Faction,
                OpponentFaction = response.OpponentFaction,
                CreatedBy = response.CreatedBy,
                IsCreatedByCurrentUser = MockIdentity.MockIdentity.User != null && response.UserId == MockIdentity.MockIdentity.User.Id
            };
            return projection;
        }

        public Task<Guid> CreateBuildOrder(ApiBuildOrderData buildOrder)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteBuildOrder(Guid id)
        {
            await _buildOrdersRepository.DeleteBuildOrder(id);
        }

        public Task<Guid> EditBuildOrder(ApiBuildOrderData buildOrder)
        {
            throw new NotImplementedException();
        }
    }
}
