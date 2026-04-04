namespace backend_member.Models
{
    public class ResponseDto
    {
        public bool isSuccess { get; set; } = true;
        public int statusCode { get; set; } = StatusCodes.Status200OK;
        public string message { get; set; } = string.Empty;
        public object? result { get; set; } = null;
    }
}
