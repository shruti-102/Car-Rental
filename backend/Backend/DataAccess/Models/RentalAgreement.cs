namespace Backend.Models
{
    public class RentalAgreement
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public int CarId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public bool Status { get; set; }
        public string Image { get; set; }
    }

}
