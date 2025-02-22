﻿using Domain;
using Domain.Factories.Interfaces;
using Domain.Mocks;
using Domain.Models.BuildOrderModels;
using Domain.Repositories.Interfaces;
using Domain.Services.Implementations;
using Moq;
using Xunit;

namespace Tests
{
    public class StarcraftBuildOrdersServiceTests
    {
        private readonly Mock<IBuildOrdersRepository<StarcraftBuildOrder>> _mockRepository;
        private readonly Mock<IBuildOrdersRepositoryFactory> _mockFactory;

        public StarcraftBuildOrdersServiceTests()
        {
            _mockRepository = new Mock<IBuildOrdersRepository<StarcraftBuildOrder>>();
            var filters = Utility.GenerateFiltersForBuildOrders<StarcraftBuildOrder>(null, null, null, null, null);
            _mockRepository.Setup(repo => repo.GetBuildOrders(1, filters)).ReturnsAsync(StarcraftBuildOrdersMock.StarcraftOrdersMock);
            _mockRepository.Setup(repo => repo.GetBuildOrderById(Guid.Empty)).ReturnsAsync(StarcraftBuildOrdersMock.StarcraftOrdersMock.First());
            _mockFactory = new Mock<IBuildOrdersRepositoryFactory>();
            _mockFactory.Setup(factory => factory.Create<StarcraftBuildOrder>(It.IsAny<string>()))
                   .Returns(_mockRepository.Object);
        }

        [Fact]
        public async void GetBuildOrders_InvokeRepo()
        {
            var service = new StarcraftBuildOrdersService(_mockFactory.Object);
            var result = await service.GetBuildOrders(1, null, null, null, null, null);

            Assert.Equal(5, result.Count);
        }

        [Fact]
        public async void GetBuildOrderById_InvokeRepo()
        {
            var service = new StarcraftBuildOrdersService(_mockFactory.Object);
            var result = await service.GetBuildOrderById(Guid.Empty);

            Assert.Equal("Build Order 1", result.Name);
        }
    }
}
