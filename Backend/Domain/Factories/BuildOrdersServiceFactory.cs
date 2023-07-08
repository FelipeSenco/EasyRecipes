using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Interfaces;
using Domain.Services.Implementations;
using Domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;

public class BuildOrdersServiceFactory
{
    readonly BuildOrdersRepositoryFactory _repositoryFactory;
    public BuildOrdersServiceFactory(BuildOrdersRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }
    public IBuildOrdersService Create(Games game)
    {
        IBuildOrdersService buildOrdersService;

        return game switch
        {
            Games.Warcraft_III => new WarcraftBuildOrdersService(_repositoryFactory),
            Games.Starcraft_II => new StarcraftBuildOrdersService(_repositoryFactory),
            Games.Stormgate => throw new NotImplementedException($"not implemented"),
            _ => throw new ArgumentException($"Invalid game: {game}"),
        };
    }
}
