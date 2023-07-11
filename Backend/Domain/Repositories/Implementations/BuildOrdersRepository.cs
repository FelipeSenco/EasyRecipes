
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Domain.Repositories.Implementations
{
    public class BuildOrdersRepository<T> : IBuildOrdersRepository<T> where T : IBuildOrder 
    {
        private readonly int _pageSize;
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<T> _collection;
        public BuildOrdersRepository(IConfiguration configuration, string collectionPath)
        {
            _pageSize = 10;
            _configuration = configuration;
            var client = new MongoClient(_configuration.GetConnectionString("DefaultConnection"));
            var database = client.GetDatabase(_configuration.GetSection("MongoDB:DatabaseName").Value);     
            _collection = database.GetCollection<T>(_configuration.GetSection(collectionPath).Value);
        }        
        public async Task<List<T>> GetBuildOrders(int page, FilterDefinition<T> filter)
        {                 
            List<T> buildOrders = await _collection.Find(filter)
                                                                    .Skip((page - 1) * _pageSize)
                                                                    .Limit(_pageSize)
                                                                    .ToListAsync();
            if (buildOrders == null)
            {
                return new List<T>();
            }
            return buildOrders;
        }
        public async Task<T> GetBuildOrderById(string id)
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", id);
            T buildOrder = await _collection.Find(filter).FirstOrDefaultAsync();
            return buildOrder;
        }
      
    }
}
