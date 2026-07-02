from werkzeug.security import generate_password_hash

from app import app
from extensions import db
from models.user import User


with app.app_context():

    print("\n======================================")
    print("LifeLink Admin Creator")
    print("======================================")

    print("Database:", db.engine.url)

    email = "admin@lifelink.com"

    existing = User.query.filter_by(email=email).first()

    if existing:

        print("\n✅ Admin already exists.")
        print("ID:", existing.id)
        print("Email:", existing.email)
        print("Role:", existing.role)

    else:

        admin = User(
            full_name="System Administrator",
            email=email,
            phone="0700000000",
            password=generate_password_hash("Admin@123"),
            role="admin",
            blood_group="O+",
            location="Nairobi",
            availability="Available",
            is_verified=True,
            verification_token=None
        )

        db.session.add(admin)
        db.session.commit()

        print("\n✅ Admin created successfully!")

    print("\n========== USERS IN DATABASE ==========")

    users = User.query.order_by(User.id).all()

    if not users:
        print("No users found.")
    else:
        for user in users:
            print(
                f"ID={user.id} | "
                f"EMAIL={user.email} | "
                f"ROLE={user.role} | "
                f"VERIFIED={user.is_verified}"
            )

    print("=======================================\n")