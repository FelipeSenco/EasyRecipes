using Domain.MockIdentity;
using Domain.Models.BuildOrderModels;
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService<WarcraftBuildOrder> _buildOrdersService;

    public WarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.CreateWarcraftBuildOrdersService();
    }

    [HttpGet]    
    public async Task<IActionResult> GetWarcraftBuildOrders(        
        [FromQuery] string? title,
        [FromQuery] string? faction,
        [FromQuery] string? opponentFaction,
        [FromQuery] string? uploadedBy,
        [FromQuery] string? gameMode,
        [FromQuery] int page = 1
        )
    {      
        var response = await _buildOrdersService.GetBuildOrders(page, title, faction, 
            opponentFaction, uploadedBy, gameMode);        

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetWarcraftBuildOrderById([FromQuery] Guid id)
    {     
        var response = await _buildOrdersService.GetBuildOrderById(id);
        if (response == null)
        {
            return BadRequest("No build order found");
        }
        return Ok(response);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWarcraftBuildOrder([FromBody] CreateBuildOrderData buildOrder)
    {
        if (MockIdentity.User == null || buildOrder.UserId != MockIdentity.User.Id) { return Unauthorized(); }       

        if (!ModelState.IsValid) { return BadRequest(ModelState); }

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
}
