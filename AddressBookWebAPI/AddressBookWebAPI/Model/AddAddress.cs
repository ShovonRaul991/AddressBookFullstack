using System.ComponentModel.DataAnnotations;

namespace AddressBookWebAPI.Model
{
    public class AddAddress
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$")]
        public string email { get; set; }

        [StringLength(10, ErrorMessage ="Enter 10 digits only!!")]
        public long phone { get; set; }

        [StringLength(10, ErrorMessage = "Enter 10 digits only!!")]
        public long landline { get; set; }
        public string website { get; set; }
        public string AddressDetails { get; set; }
    }
}
