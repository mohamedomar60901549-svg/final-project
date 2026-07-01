from extensions import db


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    full_name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    phone = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(50),
        default="donor"
    )

    blood_group = db.Column(
        db.String(10)
    )

    location = db.Column(
        db.String(100)
    )

    availability = db.Column(
        db.String(50),
        default="Available"
    )

    last_donation_date = db.Column(
        db.Date,
        nullable=True
    )

    # ==========================
    # Password Reset Fields
    # ==========================

    reset_token = db.Column(
        db.String(255),
        nullable=True
    )

    reset_token_expiry = db.Column(
        db.DateTime,
        nullable=True
    )

    # ==========================
    # Email Verification Fields
    # ==========================

    is_verified = db.Column(
        db.Boolean,
        default=False
    )

    verification_token = db.Column(
        db.String(255),
        nullable=True
    )

    def to_dict(self):

        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "role": self.role,
            "blood_group": self.blood_group,
            "location": self.location,
            "availability": self.availability,
            "last_donation_date": (
                self.last_donation_date.isoformat()
                if self.last_donation_date
                else None
            ),
            "is_verified": self.is_verified
        }