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
        public async Task<WarcraftBuildOrder> GetBuildOrderById(Guid id)
        {
            WarcraftBuildOrder response = await _buildOrdersRepository.GetBuildOrderById(id);
            return response;
        }

        public async Task<Guid> CreateBuildOrder(CreateBuildOrderData buildOrder)
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
            databaseBuildOrder.UserId = buildOrder.UserId;
            databaseBuildOrder.CreatedBy = buildOrder.CreatedBy;
           
            Guid response = await _buildOrdersRepository.CreateBuildOrder(databaseBuildOrder);
            return response;


        }

        public Boolean ValidateBuildOrder(CreateBuildOrderData buildOrder)
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
