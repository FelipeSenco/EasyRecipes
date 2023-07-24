using MongoDB.Bson.Serialization.Attributes;


namespace Domain.Models
{
    public class ApplicationUser
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }        
    }
}
