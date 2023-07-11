
using Domain.Models;
using Domain.Models.Interfaces;
using Domain.Repositories.Implementations;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;

public class BuildOrdersRepositoryFactory
{
    private readonly IConfiguration _configuration;

    public BuildOrdersRepositoryFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IBuildOrdersRepository<T> Create<T>(string collectionPath) where T : IBuildOrder, new()
    {
        return new BuildOrdersRepository<T>(_configuration, collectionPath);       
    }
}
