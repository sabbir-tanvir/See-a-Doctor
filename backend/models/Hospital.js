const mongoose = require("mongoose");
const slugify = require("slugify");

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    slug: String,
    location: {
      type: String,
      required: [true, "Please add location"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Please add specialty"],
      trim: true,
    },
    beds: {
      type: Number,
      required: [true, "Please add number of beds"],
      min: [0, "Beds can not be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "no-photo.jpg",
    },
    diagnosticPrices: {
      'CT Scan': Number,
      'Blood Tests': Number,
      'Endoscopy': Number,
      'Ultrasound': Number,
      'X-Ray': Number,
      'Microbiology': Number,
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create hospital slug from the name
HospitalSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Virtual field for doctor count
HospitalSchema.virtual('doctorCount', {
  ref: 'Doctor',
  localField: '_id',
  foreignField: 'hospital',
  justOne: false,
  count: true
});

// Calculate average rating from reviews
HospitalSchema.statics.getAverageRating = async function(hospitalId) {
  const obj = await this.aggregate([
    {
      $match: { hospital: hospitalId }
    },
    {
      $group: {
        _id: '$hospital',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    if (obj[0]) {
      await this.findByIdAndUpdate(hospitalId, {
        rating: obj[0].averageRating.toFixed(1)
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("Hospital", HospitalSchema); 