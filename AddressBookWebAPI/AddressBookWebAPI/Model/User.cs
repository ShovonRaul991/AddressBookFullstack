using System.ComponentModel.DataAnnotations;

namespace AddressBookWebAPI.Model
{
    public class User
    {
        [Key]
        public string username { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordKey { get; set; }
    }
}
