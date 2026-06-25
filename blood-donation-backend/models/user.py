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



    def to_dict(self):

        return {

            "id": self.id,

            "full_name": self.full_name,

            "email": self.email,

            "role": self.role,

            "blood_group": self.blood_group,

            "location": self.location,

            "availability": self.availability

        }