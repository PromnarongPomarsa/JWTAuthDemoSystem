namespace backend_member.Models
{
    public class UMEMUser
    {
        public int? id { get; set; }
        public string? username { get; set; }
        public string? password_hash { get; set; }
        public string? create_by { get; set; }
        public DateTime? create_date { get; set; }
    }
}
