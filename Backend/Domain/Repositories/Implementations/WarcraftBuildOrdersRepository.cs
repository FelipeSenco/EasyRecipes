using Domain.Mocks;
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Domain.Repositories.Implementations
{
    public class WarcraftBuildOrdersRepository : IBuildOrdersRepository
    {
        private readonly int _pageSize;
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<WarcraftBuildOrder> _collection;
        public WarcraftBuildOrdersRepository(IConfiguration configuration)
        {
            _pageSize = 10;
            _configuration = configuration;
            var client = new MongoClient(_configuration.GetConnectionString("DefaultConnection"));
            var database = client.GetDatabase(_configuration.GetSection("MongoDB:DatabaseName").Value);     
            _collection = database.GetCollection<WarcraftBuildOrder>(_configuration.GetSection("MongoDB:WarcraftBuildOrdersCollection").Value);
        }        
        public async Task<List<IBuildOrder>> GetBuildOrders(int page)
        {      
            FilterDefinition<WarcraftBuildOrder> filter = Builders<WarcraftBuildOrder>.Filter.Empty;
            List<WarcraftBuildOrder> buildOrders = await _collection.Find(filter)
                                                                    .Skip((page - 1) * _pageSize)
                                                                    .Limit(_pageSize)
                                                                    .ToListAsync();
            if (buildOrders == null)
            {
                return new List<IBuildOrder>();
            }
            return buildOrders.Cast<IBuildOrder>().ToList();
        }
        public async Task<IBuildOrder> GetBuildOrderById(string id)
        {
            FilterDefinition<WarcraftBuildOrder> filter = Builders<WarcraftBuildOrder>.Filter.Eq("_id", id);
            WarcraftBuildOrder buildOrder = await _collection.Find(filter).FirstOrDefaultAsync();
            return buildOrder;
        }
    }
}
