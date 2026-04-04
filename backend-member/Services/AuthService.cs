using backend_member.Models;
using backend_member.Models.RequestDto;
using backend_member.Repositories.IRepositories;
using backend_member.Services.IServices;

namespace backend_member.Services
{
    public class AuthService : IAuthService
    {
        private readonly ResponseDto _response;
        private readonly IAuthRepository _authRepo;
        private readonly IJwtTokenGenerator _jwtService;
        public AuthService(IAuthRepository authRepo, IJwtTokenGenerator jwtService)
        {
            _response = new ResponseDto();
            _authRepo = authRepo;
            _jwtService = jwtService;
        }

        public async Task<ResponseDto> Register(AuthLoginRequestDto req)
        {
            try
            {

                UMEMUser existingUser = await _authRepo.GetByUsername(req.username);
                if (existingUser != null)
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: Username already exists";
                    _response.statusCode = StatusCodes.Status400BadRequest;
                    return _response;
                }

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(req.password);

                UMEMUser data = new UMEMUser
                {
                    username = req.username,
                    password_hash = passwordHash,
                    create_by = "System",
                    create_date = DateTime.UtcNow,
                };

                await _authRepo.AddAsync(data);
                await _authRepo.SaveChangesAsync();

                _response.message = "Success: Register success";

            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.message = ex.Message.ToString();
                _response.statusCode = StatusCodes.Status500InternalServerError;
            }
            return _response;
        }

        public async Task<ResponseDto> Login(AuthLoginRequestDto req)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.username) || string.IsNullOrWhiteSpace(req.password))
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: Invalid username or password";
                    _response.statusCode = StatusCodes.Status400BadRequest;
                    return _response;
                }

                UMEMUser user = await _authRepo.GetByUsername(req.username);

                if (user == null)
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: This email doen't exists";
                    _response.statusCode = StatusCodes.Status401Unauthorized;
                    return _response;
                }

                var isPasswordValid = BCrypt.Net.BCrypt.Verify(req.password, user.password_hash);

                if (!isPasswordValid)
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: Invalid password";
                    _response.statusCode = StatusCodes.Status401Unauthorized;
                    return _response;
                }

                GenerateTokenRequestDto data = new GenerateTokenRequestDto
                {
                    id = user.id.ToString(),
                    user_name = user.username,
                };

                string token = _jwtService.GenerateToken(data);

                _response.result = token;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.message = ex.Message.ToString();
                _response.statusCode = StatusCodes.Status500InternalServerError;
            }
            return _response;
        }
    }
}
