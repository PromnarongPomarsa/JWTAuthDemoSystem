using backend_member.Models;

namespace backend_member.Services.IServices
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(GenerateTokenRequestDto applicationUser);
    }
}
