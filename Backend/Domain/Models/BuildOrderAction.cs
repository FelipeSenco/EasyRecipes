

using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Models
{
    public class BuildOrderAction
    {      
        [BsonElement("clock")]
        public string Clock { get; set; }

        [BsonElement("supply")]
        public int Supply { get; set; }

        [BsonElement("instruction")]
        public string Instruction { get; set; }

    }
}
