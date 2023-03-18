using System.ComponentModel.DataAnnotations;

namespace AddressBookWebAPI.Model
{
    public class RetrieveAddress
    {
        
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$")]
        public string email { get; set; }

        public long phone { get; set; }

        public long landline { get; set; }
        public string website { get; set; }
        public string AddressDetails { get; set; }
    }
}
