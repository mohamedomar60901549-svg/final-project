from flask_mail import Message
from extensions import mail


def send_email(to, subject, body):

    msg = Message(
        subject=subject,
        sender="lifelink.bloodsystem@gmail.com",
        recipients=[to]
    )

    msg.body = body

    mail.send(msg)