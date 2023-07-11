
using Domain.Factories.Interfaces;
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Services.Implementations;
using Domain.Services.Interfaces;

public class BuildOrdersServiceFactory
{
    private readonly IBuildOrdersRepositoryFactory _repositoryFactory;

    public BuildOrdersServiceFactory(IBuildOrdersRepositoryFactory repositoryFactory)
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
