from extensions import db


class BloodRequest(db.Model):

    __tablename__ = "blood_requests"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    # ===============================
    # OWNER OF REQUEST
    # ===============================

    patient_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


    patient_name = db.Column(
        db.String(100),
        nullable=False
    )


    blood_group = db.Column(
        db.String(10),
        nullable=False
    )


    units_needed = db.Column(
        db.Integer,
        nullable=False
    )


    hospital = db.Column(
        db.String(150),
        nullable=False
    )


    location = db.Column(
        db.String(100),
        nullable=False
    )


    status = db.Column(
        db.String(20),
        default="Pending"
    )


    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )


    # Relationship to user
    patient = db.relationship(
        "User",
        backref="blood_requests"
    )



    def to_dict(self):

        return {

            "id": self.id,

            "patient_id": self.patient_id,

            "patient_name": self.patient_name,

            "blood_group": self.blood_group,

            "units_needed": self.units_needed,

            "hospital": self.hospital,

            "location": self.location,

            "status": self.status,

            "created_at": self.created_at

        }