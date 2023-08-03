using Domain.Factories.Interfaces;
using Domain.MockIdentity;
using Domain.Models;
using Domain.Models.BuildOrderModels;
using Domain.Models.Interfaces;
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
        public async Task<List<BuildOrderProjection>> GetBuildOrders(int page, string title, string faction,
            string opponentFaction, string uploadedBy, string gameMode)
        {
            FilterDefinition<WarcraftBuildOrder> filter = Utility.GenerateFiltersForBuildOrders<WarcraftBuildOrder>(title, faction, opponentFaction, uploadedBy, gameMode);
            List<WarcraftBuildOrder> response = await _buildOrdersRepository.GetBuildOrders(page, filter);
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
            WarcraftBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
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
                IsCreatedByCurrentUser =  MockIdentity.MockIdentity.User != null && response.UserId == MockIdentity.MockIdentity.User.Id
            };
            return projection;
        }

        public async Task<Guid> CreateBuildOrder(ApiBuildOrderData buildOrder)
        {
            if (!ValidateBuildOrder(buildOrder)) { return Guid.Empty; }
            WarcraftBuildOrder databaseBuildOrder = new WarcraftBuildOrder();

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
            ApplicationUser user = MockIdentity.MockIdentity.User;
            WarcraftBuildOrder buildOrder = await _buildOrdersRepository.GetBuildOrderById(id);
            if (buildOrder == null || (user.Id != buildOrder.UserId && user.Role != UserRole.ADMIN))
            {
                throw new Exception("No build order, or sufficient credentials found");
            }
            await _buildOrdersRepository.DeleteBuildOrder(id);
        }

        public Boolean ValidateBuildOrder(ApiBuildOrderData buildOrder)
        {         
            if (!Enum.IsDefined(typeof(WarcraftFactions), buildOrder.Faction) || buildOrder.Faction == 5)
            {
                return false;
            }

            if (!Enum.IsDefined(typeof(WarcraftFactions), buildOrder.OpponentFaction))
            {
                return false;
            }

            if (!Enum.IsDefined(typeof(WarcraftGameModes), buildOrder.GameMode))
            {
                return false;
            }

            return true;
        }
    
    }
}
