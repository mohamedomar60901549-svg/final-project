from flask_mail import Message
from extensions import mail


def send_email(to, subject, body):
    try:
        msg = Message(
            subject=subject,
            sender=(
                "LifeLink Blood Donation System",
                "lifelink.bloodsystem@gmail.com"
            ),
            recipients=[to]
        )

        msg.body = body

        mail.send(msg)

        return True

    except Exception as e:
        print("Email sending failed:", e)
        return False