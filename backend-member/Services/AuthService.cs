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
        public AuthService(IAuthRepository authRepo)
        {
            _response = new ResponseDto();
            _authRepo = authRepo;
        }

        public async Task<ResponseDto> Register(AuthLoginRequestDto req)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.username) || string.IsNullOrWhiteSpace(req.password))
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: Invalid username or password";
                    return _response;
                }


                var existingUser = await _authRepo.GetByUsername(req.username);
                if (existingUser != null)
                {
                    _response.isSuccess = false;
                    _response.message = "Unable to process: Username already exists";
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
            }
            return _response;
        }
    }
}
