namespace backend_member.Models
{
    public class ResponseDto
    {
        public bool isSuccess { get; set; } = true;
        public string? message { get; set; } = string.Empty;
        public object? result { get; set; } = null;
    }
}
