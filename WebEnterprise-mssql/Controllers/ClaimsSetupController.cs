using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebEnterprise_mssql.Data;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/claimssetup
    public class ClaimsSetupController : ControllerBase 
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApiDbContext context;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ILogger<ClaimsSetupController> logger;
        public ClaimsSetupController(ApiDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<ClaimsSetupController> logger)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClaimsAsync(string email) {
            
            //Check if the user exist
            var user = await userManager.FindByEmailAsync(email);

            if(user is null) {
                logger.LogInformation($"The user with email: {email} does NOT exist!!!");
                return BadRequest(new {error = "User not found"});
            }

            var userClaims = await userManager.GetClaimsAsync(user);
            return Ok(userClaims);
        }

        [HttpPost]
        [Route("AddClaimsToUser")]
        public async Task<IActionResult> AddClaimsToUserAsync(string email, string claimName, string claimValue) {
            var user = await userManager.FindByEmailAsync(email);

            if(user is null) {
                logger.LogInformation($"The user with email: {email} does NOT exist!!!");
                return BadRequest(new {error = "User not found"});
            }

            var userClaim = new Claim(claimName, claimValue);

            var result = await userManager.AddClaimAsync(user, userClaim);

            if(!result.Succeeded) {
                return BadRequest(new {
                    error = $"unable to add claim {claimName} to the user {user.Email}"
                });
            } else {
                return Ok(new {
                    result = $"user {user.Email} has been added with a claim: {claimName}"
                });
            }
        }
    }
}