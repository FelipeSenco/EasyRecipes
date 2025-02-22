﻿using MongoDB.Bson.Serialization.Attributes;


namespace Domain.Models
{
    public enum UserRole
    {
        USER,
        ADMIN
    }
    public class ApplicationUser
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("role")]
        public UserRole Role { get; set; }
    }
}
