using backend_member.Models;
using backend_member.Repositories.IRepositories;
using backend_member.Data;
using Microsoft.EntityFrameworkCore;
namespace backend_member.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ResponseDto _response;
        private readonly AppDbContext _db;

        public AuthRepository(AppDbContext db)
        {
            _response = new ResponseDto();
            _db = db;
        }

        public async Task<UMEMUser> GetByUsername(string username)
        {
            return await _db.ume_m_user.FirstOrDefaultAsync(q => q.username == username);
        }

        public async Task AddAsync(UMEMUser entity)
        {
            try
            {
                _db.ChangeTracker.Clear();
                _db.ume_m_user.Add(entity);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                throw new Exception($"DB Error: {errorMessage}");
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            try
            {
                return await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                throw new Exception($"DB Error: {errorMessage}");
            }
        }

    }
}
