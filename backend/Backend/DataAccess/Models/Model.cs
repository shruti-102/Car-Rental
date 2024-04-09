namespace Backend.DataAccess.Models
{
    public class Model
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MakerId { get; set; } // Foreign key to link the model to its maker.
        public Maker Maker { get; set; } // Navigation property to access the maker associated with this model.
    }
}
