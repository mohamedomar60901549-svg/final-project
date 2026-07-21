from datetime import datetime

from extensions import db


class DonationResponse(db.Model):
    __tablename__ = "donation_responses"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # =====================================
    # Relationships
    # =====================================

    request_id = db.Column(
        db.Integer,
        db.ForeignKey("blood_requests.id"),
        nullable=False
    )

    donor_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # =====================================
    # Donor Response
    # =====================================

    response = db.Column(
        db.String(20),
        nullable=False
    )
    # Accepted
    # Declined

    feedback = db.Column(
        db.Text,
        nullable=True
    )

    responded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # =====================================
    # Relationships
    # =====================================

    donor = db.relationship(
        "User",
        backref="donation_responses"
    )

    blood_request = db.relationship(
        "BloodRequest",
        backref="responses"
    )

    # =====================================
    # JSON
    # =====================================

    def to_dict(self):

        return {

            "id": self.id,

            "request_id": self.request_id,

            "donor_id": self.donor_id,

            "donor_name": self.donor.full_name,

            "donor_email": self.donor.email,

            "blood_group": self.donor.blood_group,

            "response": self.response,

            "feedback": self.feedback,

            "responded_at": (
                self.responded_at.isoformat()
                if self.responded_at
                else None
            )

        }