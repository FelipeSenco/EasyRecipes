using Domain.Filters;
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
        try
        {
            var response = await _buildOrdersService.GetBuildOrderById(id);
            return Ok(response);
        }
      catch (Exception ex) { return BadRequest(ex.Message); }
            
    }

    [ServiceFilter(typeof(ValidateUserAndModelFilter))]
    [HttpPost("create")]
    public async Task<IActionResult> CreateWarcraftBuildOrder([FromBody] ApiBuildOrderData buildOrder)
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
    public async Task<IActionResult> DeleteWarcraftBuildOrder([FromQuery] Guid id)
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
