using Domain.Models.Interfaces;
using Domain.Repositories.Implementations;
using Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Factories.Interfaces
{
    public interface IBuildOrdersRepositoryFactory
    {
        public IBuildOrdersRepository<T> Create<T>(string collectionPath) where T : IBuildOrder;  
    }
}
