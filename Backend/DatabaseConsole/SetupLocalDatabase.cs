using Domain.MockIdentity;
using Domain.Models;
using Domain.Models.BuildOrderModels;
using Domain.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text;


namespace DatabaseConsole
{
    public class SetupLocalDatabase
    {
        private readonly IMongoDatabase _database;             
        public SetupLocalDatabase(string dataBaseName)
        {          
            var client = new MongoClient("mongodb://localhost:27017");
            _database = client.GetDatabase(dataBaseName);         
        }


        public async Task SetupLocalDb()
        {         
            await CreateMockUsers();
                                            
            int warcraftFactionCount = Enum.GetValues(typeof(WarcraftFactions)).Length;
            await GenerateMockBuildOrdersIfEmpty<WarcraftBuildOrder>("WarcraftBuildOrders", warcraftFactionCount);

            int starcraftFactionCount = Enum.GetValues(typeof(StarcraftFactions)).Length;
            await GenerateMockBuildOrdersIfEmpty<StarcraftBuildOrder>("StarcraftBuildOrders", starcraftFactionCount);

            int stormgateFactionCount = Enum.GetValues(typeof(StormgateFactions)).Length;
            await GenerateMockBuildOrdersIfEmpty<StormgateBuildOrder>("StormgateBuildOrders", stormgateFactionCount);            
        }
        
        public async Task CreateMockUsers()
        {
            var collection = _database.GetCollection<ApplicationUser>("ApplicationUsers");

            List<ApplicationUser> mockUsers = GetMockUsers();

            foreach (var user in mockUsers)
            {
                var filter = Builders<ApplicationUser>.Filter.Eq(u => u.Id, user.Id);
                var existingUser = await collection.Find(filter).FirstOrDefaultAsync();
                if (existingUser == null)
                {
                    await collection.InsertOneAsync(user);
                }
            }
        }       

        private List<ApplicationUser> GetMockUsers()
        {
            var users = new List<ApplicationUser>();
            var mockUser1 = new ApplicationUser() { Id = MockIdentity.mockGuids[0], UserName = "Mystic Oracle", Role = UserRole.USER };
            var mockUser2 = new ApplicationUser() { Id = MockIdentity.mockGuids[1], UserName = "Frog Jumper", Role = UserRole.USER };
            var mockUser3 = new ApplicationUser() { Id = MockIdentity.mockGuids[2], UserName = "Selected Hero", Role = UserRole.USER };
            var mockUser4 = new ApplicationUser() { Id = MockIdentity.mockGuids[3], UserName = "Forest Admin", Role = UserRole.ADMIN };
            users.Add(mockUser1);
            users.Add(mockUser2);
            users.Add(mockUser3);
            users.Add(mockUser4);
            return users;
        }

        public async Task GenerateMockBuildOrdersIfEmpty<T>(
            string collectionName,
            int factionCount,
            int numberOfActions = 15,
            int numberOfItems = 25
            ) where T : IBuildOrder, new()
        {           
            var collection = _database.GetCollection<T>(collectionName);
            var isEmpty = await IsCollectionEmpty<T>(collection);
            if (!isEmpty)
            {
                return;
            }
            var users = GetMockUsers();
            Random rand = new Random();
            for (int i = 0; i < numberOfItems; i++) 
            {
                var randomMockUser = users[rand.Next(users.Count)];
                T buildOrder = new T()
                {
                    Id = new Guid(),
                    Name = GenerateRandomLorem(1, 4),
                    //use -1 here as "All" cannot be used for player faction choice, "All" is always the last option on the enums
                    Faction = rand.Next(factionCount - 1),
                    OpponentFaction = rand.Next(factionCount),
                    CreatedBy = randomMockUser.UserName,
                    Description = GenerateRandomLorem(),
                    Conclusion = GenerateRandomLorem(),
                    GameMode = 0,
                    UserId = randomMockUser.Id,
                    Actions = GenerateRandomActions(numberOfActions)
                };
                await collection.InsertOneAsync(buildOrder);
            }
           
        }

        private async Task<bool> IsCollectionEmpty<T>(IMongoCollection<T> collection) where T : IBuildOrder
        {          
            var document = await collection.Find(new BsonDocument()).FirstOrDefaultAsync();
            return document == null;
        }

        private string GenerateRandomLorem(int numberOfSentences = 5, int wordsPerSentence = 12)
        {
            List<string> loremIpsumWords = new List<string>
    {
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
        "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
        "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"
    };
            Random rand = new Random();
            StringBuilder loremIpsumBuilder = new StringBuilder();

            for (int s = 0; s < numberOfSentences; s++)
            {
                for (int w = 0; w < wordsPerSentence; w++)
                {
                    string randomWord = loremIpsumWords[rand.Next(loremIpsumWords.Count)];
                    loremIpsumBuilder.Append(randomWord + " ");
                }                                          
            }

            string result = loremIpsumBuilder.ToString();

            // Capitalize the first letter
            if (!string.IsNullOrEmpty(result))
            {
                result = char.ToUpper(result[0]) + result.Substring(1);
            }

            return result;
        }


        private List<BuildOrderAction> GenerateRandomActions(int numberOfActions = 15)
        {
            var buildOrderActions = new List<BuildOrderAction>();
            for (int i = 0; i < numberOfActions; i++)
            {
                BuildOrderAction action = new()
                {
                    Clock = null,
                    Supply = Math.Min(5 * i, 100),
                    Instruction = GenerateRandomLorem(1, 8)
                };
                buildOrderActions.Add(action);
            }
            return buildOrderActions;
        }
    }
}
