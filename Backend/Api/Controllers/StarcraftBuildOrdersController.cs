using Domain.Filters;
using Domain.MockIdentity;
using Domain.Models.BuildOrderModels;
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService<StarcraftBuildOrder> _buildOrdersService;

    public StarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.CreateStarcraftBuildOrdersService();
    }

    [HttpGet]
    public async Task<IActionResult> GetStarcraftBuildOrders(
        [FromQuery] string? title,
        [FromQuery] string? faction,
        [FromQuery] string? opponentFaction,
        [FromQuery] string? uploadedBy,
        [FromQuery] string? gameMode,
        [FromQuery] int page = 1
        )
    {
        var response = await _buildOrdersService.GetBuildOrders(page, title, faction, opponentFaction, uploadedBy, gameMode);

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetStarcraftBuildOrderById([FromQuery] Guid id)
    {
        try
        {
            var response = await _buildOrdersService.GetBuildOrderById(id);
            return Ok(response);
        }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }

    [ServiceFilter(typeof(ValidateUserAndModelFilter))]
    [HttpPost("create")]
    public async Task<IActionResult> CreateStarcraftBuildOrder([FromBody] ApiBuildOrderData buildOrder)
    {
        try
        {
            Guid response = await _buildOrdersService.CreateBuildOrder(buildOrder);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteStarcraftBuildOrder([FromQuery] Guid id)
    {
        if (MockIdentity.User == null) { return BadRequest("No credentials"); }
        if (id == Guid.Empty) { return BadRequest("No build order id provided"); }
        try
        {
            await _buildOrdersService.DeleteBuildOrder(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
