namespace Backend.Models
{
    using System.ComponentModel.DataAnnotations;

    public class LoginView
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

}
