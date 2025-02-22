﻿
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
        public async Task<T> GetBuildOrderById(Guid id)
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", id);
            T buildOrder = await _collection.Find(filter).FirstOrDefaultAsync();
            return buildOrder;
        }

        public async Task<Guid> CreateBuildOrder(T buildOrder)
        {
            await _collection.InsertOneAsync(buildOrder); 
            return buildOrder.Id;
        }

        public async Task<Guid> EditBuildOrder(T buildOrder)
        {
            if (buildOrder == null || buildOrder.Id == Guid.Empty)
                throw new ArgumentException("Build order or build order ID cannot be null");

            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", buildOrder.Id);

            var result = await _collection.ReplaceOneAsync(filter, buildOrder);

            return buildOrder.Id;
        }

        public async Task DeleteBuildOrder(Guid id)
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", id);
            await _collection.DeleteOneAsync(filter);
        }        
    }
}
