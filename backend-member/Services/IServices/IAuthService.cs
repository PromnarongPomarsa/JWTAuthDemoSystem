using backend_member.Models;
using backend_member.Models.RequestDto;

namespace backend_member.Services.IServices
{
    public interface IAuthService
    {
        Task<ResponseDto> Register(AuthLoginRequestDto req);
    }
}
