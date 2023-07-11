
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Services.Implementations;
using Domain.Services.Interfaces;

public class BuildOrdersServiceFactory
{
    readonly BuildOrdersRepositoryFactory _repositoryFactory;

    public BuildOrdersServiceFactory(BuildOrdersRepositoryFactory repositoryFactory)
    {
        _repositoryFactory = repositoryFactory;
    }

    public IBuildOrdersService<WarcraftBuildOrder> CreateWarcraftBuildOrdersService()
    {
        return new WarcraftBuildOrdersService(_repositoryFactory);
    }

    public IBuildOrdersService<StarcraftBuildOrder> CreateStarcraftBuildOrdersService()
    {
        return new StarcraftBuildOrdersService(_repositoryFactory);
    }
}
