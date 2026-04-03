using backend_member.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend_member.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ResponseDto _response;
        public AuthController()
        {
            _response = new ResponseDto();
        }

        [HttpPost("login")]
        public ResponseDto Login()
        {
            _response.message = "login Function";
            return _response;
        }

        [HttpPost("register")]
        public ResponseDto Register()
        {
            _response.message = "Register Function";
            return _response;
        }

        [HttpPost("logout")]
        public ResponseDto Logout()
        {
            _response.message = "Logout Function";
            return _response;
        }
    }
}
