using Domain.Models;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Domain.Repositories.Implementations
{
    public class UsersRepository : IUsersRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<ApplicationUser> _collection;
        public UsersRepository(IConfiguration configuration)
        {         
            _configuration = configuration;
            var client = new MongoClient(_configuration.GetConnectionString("DefaultConnection"));
            var database = client.GetDatabase(_configuration.GetSection("MongoDB:DatabaseName").Value);      
            _collection = database.GetCollection<ApplicationUser>(_configuration.GetSection("MongoDB:ApplicationUsersCollection").Value);
        }       
        public async Task<ApplicationUser> GetUserById(Guid id)
        {
            FilterDefinition<ApplicationUser> filter = Builders<ApplicationUser>.Filter.Eq("_id", id);
            ApplicationUser appUser = await _collection.Find(filter).FirstOrDefaultAsync();
            return appUser;
        }
    }
}
