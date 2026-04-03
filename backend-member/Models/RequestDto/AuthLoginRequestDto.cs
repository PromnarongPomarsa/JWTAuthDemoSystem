namespace backend_member.Models.RequestDto
{
    public class AuthLoginRequestDto
    {
        public required string username { get; set; }
        public required string password { get; set; }
    }
}
