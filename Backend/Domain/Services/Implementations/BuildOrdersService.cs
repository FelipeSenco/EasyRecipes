using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services.Implementations
{
    public class BuildOrdersService : IBuildOrdersService
    {
        private readonly IBuildOrdersRepository _buildOrdersRepository;

        public BuildOrdersService(IBuildOrdersRepository buildOrdersRepository)
        {
            _buildOrdersRepository = buildOrdersRepository;
        }
        public async Task<List<WarcraftBuildOrder>> GetWarcraftBuildOrders()
        {
            List<WarcraftBuildOrder> response = await _buildOrdersRepository.GetWarcraftBuildOrders();
           return response;
        }
    }
}
