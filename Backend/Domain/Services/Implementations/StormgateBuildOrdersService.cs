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

        public async Task<Guid> CreateBuildOrder(ApiBuildOrderData buildOrder)
        {
            if (!Utility.ValidateBuildOrderEnums<WarcraftFactions, WarcraftGameModes>(buildOrder))
            {
                throw new Exception("Invalid faction or game mode");
            }

            if (buildOrder.Id != null)
            {
                return await EditBuildOrder(buildOrder);
            }

            StormgateBuildOrder databaseBuildOrder = new StormgateBuildOrder();

            databaseBuildOrder.Id = Guid.NewGuid();
            databaseBuildOrder.Name = buildOrder.Name;
            databaseBuildOrder.Faction = buildOrder.Faction;
            databaseBuildOrder.OpponentFaction = buildOrder.OpponentFaction;
            databaseBuildOrder.GameMode = buildOrder.GameMode;
            databaseBuildOrder.Description = buildOrder.Description;
            databaseBuildOrder.Actions = buildOrder.Actions;
            databaseBuildOrder.Conclusion = buildOrder.Conclusion;
            databaseBuildOrder.UserId = MockIdentity.MockIdentity.User.Id;
            databaseBuildOrder.CreatedBy = buildOrder.CreatedBy;

            Guid response = await _buildOrdersRepository.CreateBuildOrder(databaseBuildOrder);
            return response;
        }

        public async Task DeleteBuildOrder(Guid id)
        {
            StormgateBuildOrder buildOrder = await _buildOrdersRepository.GetBuildOrderById(id);
            if (!Utility.ValidateBuildOrderOwner(buildOrder))
            {
                throw new Exception("No build order, or sufficient credentials found");
            }
            await _buildOrdersRepository.DeleteBuildOrder(id);
        }

        public async Task<Guid> EditBuildOrder(ApiBuildOrderData buildOrder)
        {
            StormgateBuildOrder currentBuildOrder = await _buildOrdersRepository.GetBuildOrderById(buildOrder.Id ?? Guid.Empty);
            if (!Utility.ValidateBuildOrderOwner(currentBuildOrder))
            {
                throw new Exception("No build order, or sufficient credentials found");
            }
            StormgateBuildOrder editedBuildOrder = new StormgateBuildOrder();

            editedBuildOrder.Id = buildOrder.Id ?? Guid.Empty;
            editedBuildOrder.Name = buildOrder.Name;
            editedBuildOrder.Faction = buildOrder.Faction;
            editedBuildOrder.OpponentFaction = buildOrder.OpponentFaction;
            editedBuildOrder.GameMode = buildOrder.GameMode;
            editedBuildOrder.Description = buildOrder.Description;
            editedBuildOrder.Actions = buildOrder.Actions;
            editedBuildOrder.Conclusion = buildOrder.Conclusion;
            editedBuildOrder.UserId = MockIdentity.MockIdentity.User.Id;
            editedBuildOrder.CreatedBy = buildOrder.CreatedBy;

            Guid response = await _buildOrdersRepository.EditBuildOrder(editedBuildOrder);
            return response;
        }
    }
}
