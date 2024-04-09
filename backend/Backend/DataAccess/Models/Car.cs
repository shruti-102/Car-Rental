namespace Backend.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public bool Status { get; set; }
        public string Image { get; set; }
        public List<Booking> Bookings { get; set; }
    }

}
