import os


class Config:

    SECRET_KEY = "blood_donation_secret_key"

    BASE_DIR = os.path.abspath(
        os.path.dirname(__file__)
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" +
        os.path.join(
            BASE_DIR,
            "instance",
            "blood_donation.db"
        )
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "lifelink_blood_donation_system_secret_key_2026_secure"


    # Email Configuration
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True

    MAIL_USERNAME = "lifelink.bloodsystem@gmail.com"
    MAIL_PASSWORD = "nisfzqecqorxbqos"