namespace backend_member.Models
{
    public class ResponseDto
    {
        public bool? isSuccess { get; set; } = true;
        public string? message { get; set; } = "";
        public object? result { get; set; } = null;
    }
}
