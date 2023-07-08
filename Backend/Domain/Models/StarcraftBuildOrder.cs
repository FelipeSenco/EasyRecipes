using Domain.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Models
{
    public class StarcraftBuildOrder : IBuildOrder
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("game")]
        public Games Game { get; set; }

        [BsonElement("faction")]
        public int Faction { get; set; }

        [BsonElement("opponentFaction")]
        public int OpponentFaction { get; set; }

        [BsonElement("actions")]
        public List<BuildOrderAction> Actions { get; set; } = new();

        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        // Optional properties
        [BsonElement("patch")]
        public string Patch { get; set; }

        [BsonElement("videoUrl")]
        public string VideoUrl { get; set; }

        [BsonElement("considerations")]
        public string Considerations { get; set; }
    }
}
