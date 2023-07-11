
using MongoDB.Driver;
using MongoDB.Bson;
using Domain.Models.Interfaces;

namespace Domain
{
    public static class Utility
    {

        public static FilterDefinition<T> GenerateFiltersForBuildOrders<T>(string title, string faction,
                    string opponentFaction, string uploadedBy, string gameMode) where T : IBuildOrder
        {
            var builder = Builders<T>.Filter;
            var filter = builder.Empty;
          
            if (!string.IsNullOrEmpty(title))
            {
                filter &= builder.Regex(x => x.Name, new BsonRegularExpression("/" + title + "/i"));
            }

            if (!string.IsNullOrEmpty(faction))
            {
                if (int.TryParse(faction, out int factionId))
                {
                    filter &= builder.Eq("faction", factionId);
                }
            }

            if (!string.IsNullOrEmpty(opponentFaction))
            {
                if (int.TryParse(opponentFaction, out int opponentFactionId))
                {
                    filter &= builder.Eq("opponentFaction", opponentFactionId);
                }
            }

            if (!string.IsNullOrEmpty(uploadedBy))
            {
                filter &= builder.Regex(x => x.CreatedBy, new BsonRegularExpression("/" + uploadedBy + "/i"));
            }

            if (!string.IsNullOrEmpty(gameMode))
            {
                if (int.TryParse(gameMode, out int gameModeId))
                {
                    filter &= builder.Eq("gameMode", gameModeId);
                }
            }

            return filter;
        }

    }
}
