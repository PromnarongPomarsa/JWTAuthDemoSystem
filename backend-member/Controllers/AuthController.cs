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
        public ResponseDto Login()
        {
            _response.message = "login Function";
            return _response;
        }

        [HttpPost("register")]
        public async Task<ResponseDto> Register([FromBody] AuthLoginRequestDto req)
        {
            ResponseDto resp = await _authService.Register(req);
            return resp;
        }

        [HttpPost("logout")]
        public ResponseDto Logout()
        {
            _response.message = "Logout Function";
            return _response;
        }
    }
}
