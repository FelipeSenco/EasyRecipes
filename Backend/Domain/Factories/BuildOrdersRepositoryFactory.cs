
using Domain.Repositories.Implementations;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;

public class BuildOrdersRepositoryFactory
{
    private readonly IConfiguration _configuration;

    public BuildOrdersRepositoryFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IBuildOrdersRepository Create(Games game)
    {
        return game switch
        {
            Games.Warcraft_III => new WarcraftBuildOrdersRepository(_configuration),
            Games.Starcraft_II => new StarcraftBuildOrdersRepository(_configuration),
            Games.Stormgate => throw new NotImplementedException($"not implemented"),
            _ => throw new ArgumentException($"Invalid game: {game}"),
        };
    }
}
