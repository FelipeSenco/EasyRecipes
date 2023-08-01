using Domain;
using Domain.Factories.Interfaces;
using Domain.Mocks;
using Domain.Models;
using Domain.Repositories.Interfaces;
using Domain.Services.Implementations;
using Moq;
using Xunit;

namespace Tests
{
    public class WarcraftBuildOrdersServiceTests
    {
        private readonly Mock<IBuildOrdersRepository<WarcraftBuildOrder>> _mockRepository;
        private readonly Mock<IBuildOrdersRepositoryFactory> _mockFactory;

        public WarcraftBuildOrdersServiceTests()
        {
            _mockRepository = new Mock<IBuildOrdersRepository<WarcraftBuildOrder>>();
            var filters = Utility.GenerateFiltersForBuildOrders<WarcraftBuildOrder>(null, null, null, null, null);
            _mockRepository.Setup(repo => repo.GetBuildOrders(1, filters)).ReturnsAsync(WarcraftBuildOrderMocks.WarcraftOrdersMock);
            _mockRepository.Setup(repo => repo.GetBuildOrderById(Guid.Empty)).ReturnsAsync(WarcraftBuildOrderMocks.WarcraftOrdersMock.First());
            _mockFactory = new Mock<IBuildOrdersRepositoryFactory>();
            _mockFactory.Setup(factory => factory.Create<WarcraftBuildOrder>(It.IsAny<string>()))
                   .Returns(_mockRepository.Object);
        }

        [Fact]
        public async void GetBuildOrders_InvokeRepo()
        {
            var service = new WarcraftBuildOrdersService(_mockFactory.Object);
            var result = await service.GetBuildOrders(1, null, null, null, null, null);

            Assert.Equal(5, result.Count);         
        }

        [Fact]
        public async void GetBuildOrderById_InvokeRepo()
        {
            var service = new WarcraftBuildOrdersService(_mockFactory.Object);
            var result = await service.GetBuildOrderById(Guid.Empty);

            Assert.Equal("Build Order 1", result.Name);
        }
    }
}
