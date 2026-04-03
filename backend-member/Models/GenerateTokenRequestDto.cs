namespace backend_member.Models
{
    public class GenerateTokenRequestDto
    {
        public string id { get; set; }
        public string user_email { get; set; }
        public string user_code { get; set; }

    }
}
