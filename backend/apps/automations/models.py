import uuid
from django.db import models


class Schedule(models.Model):
    FREQUENCY_CHOICES = [
        ("Daily", "Daily"),
        ("Weekly", "Weekly"),
        ("Monthly", "Monthly"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    frequency = models.CharField(max_length=50, choices=FREQUENCY_CHOICES)
    start_date = models.DateTimeField()


class Automation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="automations"
    )
    status = models.BooleanField(default=True)
    last_run = models.ForeignKey(
        "Run",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="latest_for_automation",
    )


class Run(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    automation = models.ForeignKey(
        Automation, on_delete=models.CASCADE, related_name="runs"
    )
    timestamp = models.DateTimeField()
    status = models.BooleanField()
