from flask_mail import Message
from extensions import mail
from flask import render_template_string
import os

# ==================================================
# CONFIG
# ==================================================

APP_NAME = "LifeLink Blood Donation System"

SENDER_NAME = "LifeLink"
SENDER_EMAIL = os.getenv("MAIL_USERNAME", "lifelink.bloodsystem@gmail.com")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

PRIMARY_COLOR = "#dc2626"
TEXT_COLOR = "#374151"
BG_COLOR = "#f4f6f8"


# ==================================================
# CORE EMAIL SENDER
# ==================================================

def send_email(to, subject, text_body, html_body=None):
    """
    Sends email using Flask-Mail.
    """

    try:
        msg = Message(
            subject=subject,
            sender=(SENDER_NAME, SENDER_EMAIL),
            recipients=[to]
        )

        msg.body = text_body

        if html_body:
            msg.html = html_body

        mail.send(msg)
        return True

    except Exception as e:
        print("Email Error:", e)
        return False


# ==================================================
# BASE TEMPLATE
# ==================================================

def build_template(title, heading, message, button_text=None, button_link=None):

    button_html = ""

    if button_text and button_link:
        button_html = f"""
        <div style="text-align:center;margin:30px 0;">
            <a href="{button_link}"
               style="
                    background:{PRIMARY_COLOR};
                    color:white;
                    padding:14px 30px;
                    text-decoration:none;
                    border-radius:8px;
                    font-weight:bold;
                    display:inline-block;
               ">
                {button_text}
            </a>
        </div>
        """

    return f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>{title}</title>
</head>

<body style="margin:0;padding:0;background:{BG_COLOR};font-family:Arial,sans-serif;">

<div style="max-width:600px;margin:40px auto;background:white;border-radius:10px;overflow:hidden;">

    <div style="background:{PRIMARY_COLOR};padding:25px;text-align:center;color:white;">
        <h2 style="margin:0;">🩸 LifeLink</h2>
    </div>

    <div style="padding:30px;color:{TEXT_COLOR};line-height:1.6;">

        <h3 style="color:{PRIMARY_COLOR};margin-top:0;">{heading}</h3>

        {message}

        {button_html}

        <p style="font-size:13px;color:#888;margin-top:30px;">
            If the button doesn’t work, copy and paste the link below:
        </p>

        <p style="font-size:13px;color:{PRIMARY_COLOR};word-break:break-all;">
            {button_link or ""}
        </p>

    </div>

    <div style="background:#fafafa;text-align:center;padding:15px;font-size:12px;color:#777;">
        © 2026 LifeLink Blood Donation System
    </div>

</div>

</body>
</html>
"""


# ==================================================
# VERIFICATION EMAIL
# ==================================================

def send_verification_email(user):

    verify_link = f"{FRONTEND_URL}/verify-email/{user.verification_token}"

    html = build_template(
        title="Verify Email",
        heading=f"Welcome {user.full_name}",
        message="""
            <p>Thank you for registering on <b>LifeLink</b>.</p>
            <p>Please verify your email to activate your account.</p>
        """,
        button_text="Verify Email",
        button_link=verify_link
    )

    return send_email(
        to=user.email,
        subject="Verify Your LifeLink Account",
        text_body="Please verify your email to activate your account.",
        html_body=html
    )


# ==================================================
# PASSWORD RESET EMAIL
# ==================================================

def send_reset_email(user, token):

    reset_link = f"{FRONTEND_URL}/reset-password/{token}"

    html = build_template(
        title="Reset Password",
        heading="Password Reset Request",
        message="""
            <p>We received a request to reset your password.</p>
            <p>If this was you, click below to continue.</p>
        """,
        button_text="Reset Password",
        button_link=reset_link
    )

    return send_email(
        to=user.email,
        subject="Reset Your LifeLink Password",
        text_body="Reset your password using the link provided.",
        html_body=html
    )