
using Domain.Factories.Interfaces;
using Domain.Repositories.Implementations;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;

public class BuildOrdersRepositoryFactory : IBuildOrdersRepositoryFactory
{
    private readonly IConfiguration _configuration;

    public BuildOrdersRepositoryFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    IBuildOrdersRepository<T> IBuildOrdersRepositoryFactory.Create<T>(string collectionPath)
    {
        return new BuildOrdersRepository<T>(_configuration, collectionPath);       
    }
}
