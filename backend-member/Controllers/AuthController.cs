using backend_member.Models;
using backend_member.Models.RequestDto;
using backend_member.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace backend_member.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ResponseDto _response;
        private readonly IAuthService _authService; 
        public AuthController(IAuthService authService)
        {
            _response = new ResponseDto();
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseDto>> Login([FromBody] AuthLoginRequestDto req)
        {

            ResponseDto resp = await _authService.Login(req);

            if (!resp.isSuccess)
            {
                return StatusCode(resp.statusCode, resp);
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,        
                Secure = true,          
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(7) 
            };

            Response.Cookies.Append("jwt", resp.result.ToString(), cookieOptions);

            return StatusCode(resp.statusCode, resp);
        }

        [HttpPost("register")]
        public async Task<ActionResult<ResponseDto>> Register([FromBody] AuthLoginRequestDto req)
        {
            ResponseDto resp = await _authService.Register(req);
            return StatusCode(resp.statusCode, resp);
        }

        [HttpPost("logout")]
        public ResponseDto Logout()
        {
            _response.message = "Logout Function";
            return _response;
        }
    }
}
