using MongoDB.Bson;
using MongoDB.Driver;

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("xxx");
        var collection = database.GetCollection<BsonDocument>("xxx");
   

       
    }
}