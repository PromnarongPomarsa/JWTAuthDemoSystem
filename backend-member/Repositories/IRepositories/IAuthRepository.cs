using backend_member.Models;

namespace backend_member.Repositories.IRepositories
{
    public interface IAuthRepository
    {
        Task<UMEMUser> GetByUsername(string username);
        Task AddAsync(UMEMUser entity);
        Task<int> SaveChangesAsync();
    }
}
