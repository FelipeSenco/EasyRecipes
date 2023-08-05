using MongoDB.Bson;
using MongoDB.Driver;

public class Program
{
    public static async Task Main(string[] args)
    {
        MongoClient client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("RTSBuildOrderBuilder");
        var collection = database.GetCollection<BsonDocument>("StormgateBuildOrders");  

        // Fetch all documents from the collection
        var documents = collection.Find(new BsonDocument()).ToList();

        foreach (var document in documents)
        {
            // Extract the string ID and convert to Guid
            string oldIdString = document["_id"].AsString;
            Guid oldIdGuid;

            if (Guid.TryParse(oldIdString, out oldIdGuid))
            {
                // Copy the old document and remove the old _id
                var newDocument = document;
                newDocument.Remove("_id");

                // Convert old Guid _id to BsonBinaryData
                BsonBinaryData newId = new BsonBinaryData(oldIdGuid, GuidRepresentation.Standard);

                // Add the new _id
                newDocument.Add("_id", newId);

                // Insert the new document
                collection.InsertOne(newDocument);

                // Remove the old document
                collection.DeleteOne(new FilterDefinitionBuilder<BsonDocument>().Eq("_id", oldIdString));
            }
            else
            {
                Console.WriteLine($"Failed to parse Guid from ID: {oldIdString}");
            }
        }
    }
}