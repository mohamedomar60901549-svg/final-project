from extensions import db


class Donation(db.Model):
    __tablename__ = "donations"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    donor_id = db.Column(
        db.Integer,
        nullable=False
    )

    blood_request_id = db.Column(
        db.Integer,
        nullable=False
    )

    donation_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "donor_id": self.donor_id,
            "blood_request_id": self.blood_request_id,
            "donation_date": self.donation_date,
            "status": self.status
        }