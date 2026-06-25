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


    hospital = db.Column(
        db.String(150),
        nullable=False
    )


    blood_group = db.Column(
        db.String(10),
        nullable=False
    )


    donation_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )


    status = db.Column(
        db.String(20),
        default="Completed"
    )


    def to_dict(self):

        return {

            "id": self.id,

            "donor_id": self.donor_id,

            "hospital": self.hospital,

            "blood_group": self.blood_group,

            "donation_date": self.donation_date,

            "status": self.status

        }