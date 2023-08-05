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
            if (response == null)
            {
                throw new Exception("No build order found for id");
            }
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

            StarcraftBuildOrder databaseBuildOrder = new StarcraftBuildOrder();

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
            StarcraftBuildOrder buildOrder = await _buildOrdersRepository.GetBuildOrderById(id);
            if (!Utility.ValidateBuildOrderOwner(buildOrder))
            {
                throw new Exception("No build order, or sufficient credentials found");
            }
            await _buildOrdersRepository.DeleteBuildOrder(id);
        }

        public async Task<Guid> EditBuildOrder(ApiBuildOrderData buildOrder)
        {
            StarcraftBuildOrder currentBuildOrder = await _buildOrdersRepository.GetBuildOrderById(buildOrder.Id ?? Guid.Empty);
            if (!Utility.ValidateBuildOrderOwner(currentBuildOrder))
            {
                throw new Exception("No build order, or sufficient credentials found");
            }
            StarcraftBuildOrder editedBuildOrder = new StarcraftBuildOrder();

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
