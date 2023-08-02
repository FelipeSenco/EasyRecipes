using Domain.Factories.Interfaces;
using Domain.Models.BuildOrderModels;
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
        public async Task<List<BuildOrderProjection>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
        
            FilterDefinition<StormgateBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<StormgateBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<StormgateBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
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
            StormgateBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
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

        public Task<Guid> CreateBuildOrder(CreateBuildOrderData buildOrder)
        {
            throw new NotImplementedException();
        }
    }
}
