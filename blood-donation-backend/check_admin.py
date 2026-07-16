
from app import app
from models.user import User
from werkzeug.security import check_password_hash

with app.app_context():
    print("\n===== USERS =====")

    users = User.query.all()

    for u in users:
        print(
            f"ID={u.id} | "
            f"Name={u.full_name} | "
            f"Email={u.email} | "
            f"Role={u.role} | "
            f"Phone={u.phone}"
        )

    print("\n===== ADMIN =====")

    admin = User.query.filter_by(email="admin@lifelink.com").first()

    if admin:
        print("Admin Found")
        print("Password 'admin123' valid:",
              check_password_hash(admin.password, "admin123"))
    else:
        print("Admin account not found")

