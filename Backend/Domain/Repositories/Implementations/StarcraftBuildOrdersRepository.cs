using Domain.Mocks;
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Domain.Repositories.Implementations
{
    public class StarcraftBuildOrdersRepository : IBuildOrdersRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<StarcraftBuildOrder> _collection;
        public StarcraftBuildOrdersRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            var client = new MongoClient(_configuration.GetConnectionString("DefaultConnection"));
            var database = client.GetDatabase(_configuration.GetSection("MongoDB:DatabaseName").Value);
            _collection = database.GetCollection<StarcraftBuildOrder>(_configuration.GetSection("MongoDB:StarcraftBuildOrdersCollection").Value);
        }
        public async Task<List<IBuildOrder>> GetBuildOrders(int page)
        {
            FilterDefinition<StarcraftBuildOrder> filter = Builders<StarcraftBuildOrder>.Filter.Empty;
            List<StarcraftBuildOrder> buildOrders = await _collection.Find(filter).ToListAsync();
            if (buildOrders == null)
            {
                return new List<IBuildOrder>();
            }
            return buildOrders.Cast<IBuildOrder>().ToList();
        }
        public async Task<IBuildOrder> GetBuildOrderById(string id)
        {
            FilterDefinition<StarcraftBuildOrder> filter = Builders<StarcraftBuildOrder>.Filter.Eq("_id", id);
            StarcraftBuildOrder buildOrder = await _collection.Find(filter).FirstOrDefaultAsync();
            return buildOrder;
        }
    }
}
