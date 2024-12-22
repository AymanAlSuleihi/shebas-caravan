import logging
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

# import emails
# from emails.template import JinjaTemplate
from jose import jwt

from app.core.config import settings


from jinja2 import Template

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import From, Mail


def send_email(
    email_to: str,
    subject: str = "",
    html_template: str = "",
    environment: Dict[str, Any] = {},
) -> None:
    message = Mail(
        from_email=From(settings.EMAILS_FROM_EMAIL, settings.EMAILS_FROM_NAME),
        to_emails=email_to,
        subject=subject,
        html_content=Template(html_template).render(environment),
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        response = e
    # assert settings.EMAILS_ENABLED, "no provided configuration for email variables"
    # message = emails.Message(
    #     subject=JinjaTemplate(subject_template),
    #     html=JinjaTemplate(html_template),
    #     mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    # )
    # smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    # if settings.SMTP_TLS:
    #     smtp_options["tls"] = True
    # if settings.SMTP_USER:
    #     smtp_options["user"] = settings.SMTP_USER
    # if settings.SMTP_PASSWORD:
    #     smtp_options["password"] = settings.SMTP_PASSWORD
    # response = message.send(to=email_to, render=environment, smtp=smtp_options)
    logging.info(f"send email result: {response}")
    return {"response": response}


def send_contact_form_email(name: str, email_from: str, message: str):
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "contact_form.html") as f:
        template_str = f.read()
    return send_email(
        email_to="contact@shebascaravan.com",
        subject="Contact Form",
        html_template=template_str,
        environment={
            "name": name,
            "email": email_from,
            "message": message,
        },
    )


def send_test_email(email_to: str) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Test email"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "new_order.html") as f:
        template_str = f.read()
    return send_email(
        email_to=email_to,
        subject=subject,
        html_template=template_str,
        environment={"project_name": settings.PROJECT_NAME, "email": email_to},
    )


def send_reset_password_email(email_to: str, email: str, token: str) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Password recovery for user {email}"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "reset_password.html") as f:
        template_str = f.read()
    server_host = settings.SERVER_HOST
    link = f"{server_host}/reset-password?token={token}"
    send_email(
        email_to=email_to,
        subject=subject,
        html_template=template_str,
        environment={
            "project_name": settings.PROJECT_NAME,
            "username": email,
            "email": email_to,
            "valid_hours": settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )


def send_new_account_email(email_to: str, username: str, password: str) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - New account for user {username}"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "new_account.html") as f:
        template_str = f.read()
    link = settings.SERVER_HOST
    send_email(
        email_to=email_to,
        subject=subject,
        html_template=template_str,
        environment={
            "project_name": settings.PROJECT_NAME,
            "username": username,
            "password": password,
            "email": email_to,
            "link": link,
        },
    )


def send_new_order_email(customer: dict, order: dict):
    subject = f"Order Placed #{order['id']}"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "new_order.html") as f:
        template_str = f.read()
    send_email(
        email_to=customer["email"],
        subject=subject,
        html_template=template_str,
        environment={
            "customer": customer,
            "order": order,
        },
    )
    return order


def send_order_dispatched_email(
    customer: dict,
    order: dict,
    shipments: dict,
    new_shipment_ids: List[int]
):
    subject = f"Order Dispatched #{order['id']}"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "order_dispatched.html") as f:
        template_str = f.read()
    send_email(
        email_to=customer["email"],
        subject=subject,
        html_template=template_str,
        environment={
            "customer": customer,
            "order": order,
            "shipments": shipments,
            "new_shipment_ids": new_shipment_ids,
        },
    )
    return order


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email}, settings.SECRET_KEY, algorithm="HS256",
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[str]:
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded_token["email"]
    except jwt.JWTError:
        return None
