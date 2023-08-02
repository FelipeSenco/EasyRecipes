using Api.Filters;
using Domain.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Models.BuildOrderModels
{
    public class WarcraftBuildOrder : IBuildOrder
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
       
        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("faction")]
        public int Faction { get; set; }

        [BsonElement("opponentFaction")]
        public int OpponentFaction { get; set; }

        [BsonElement("gameMode")]
        public int GameMode { get; set; }

        [BsonElement("actions")]
        public List<BuildOrderAction> Actions { get; set; }

        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        [BsonElement("userId")]
        public Guid UserId { get; set; }

        [BsonElement("considerations")]
        public string? Conclusion { get; set; }
    }
}
