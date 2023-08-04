
using MongoDB.Driver;
using MongoDB.Bson;
using Domain.Models.Interfaces;
using Domain.Models;
using Domain.Models.BuildOrderModels;

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

        public static Boolean ValidateBuildOrderOwner(IBuildOrder buildOrder)
        {
            ApplicationUser user = MockIdentity.MockIdentity.User;
            if (buildOrder == null || (user.Id != buildOrder.UserId && user.Role != UserRole.ADMIN))
            {
                return false;
            }
            return true;
        }

        public static Boolean ValidateBuildOrderEnums<T1, T2>(ApiBuildOrderData buildOrder)
        {
            if (!Enum.IsDefined(typeof(T1), buildOrder.Faction) || buildOrder.Faction == 5)
            {
                return false;
            }

            if (!Enum.IsDefined(typeof(T1), buildOrder.OpponentFaction))
            {
                return false;
            }

            if (!Enum.IsDefined(typeof(T2), buildOrder.GameMode))
            {
                return false;
            }

            return true;
        }

    }
}
