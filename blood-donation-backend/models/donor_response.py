from extensions import db
from datetime import datetime


class DonorResponse(db.Model):

    __tablename__ = "donor_responses"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    blood_request_id = db.Column(
        db.Integer,
        db.ForeignKey("blood_requests.id"),
        nullable=False
    )


    donor_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


    response = db.Column(
        db.String(20),
        nullable=False
    )


    feedback = db.Column(
        db.Text,
        nullable=True
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def to_dict(self):

        return {

            "id": self.id,

            "blood_request_id": self.blood_request_id,

            "donor_id": self.donor_id,

            "response": self.response,

            "feedback": self.feedback,

            "created_at": self.created_at

        }