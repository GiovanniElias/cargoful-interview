from datetime import timedelta, timezone
from time import timezone
import uuid
from django.db import models

class ScheduleFrequencyChoices(models.TextChoices):
    DAILY = "Daily", "Daily"
    WEEKLY = "Weekly", "Weekly"
    MONTHLY = "Monthly", "Monthly"

class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    frequency = models.CharField(max_length=50, choices=ScheduleFrequencyChoices.choices)
    start_date = models.DateTimeField()


class Automation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="automations"
    )
    status = models.BooleanField(default=True)

    @property
    def last_run(self):
        return self.runs.order_by("-timestamp").first()
    
    @property
    def next_run(self):
        if self.schedule.frequency == ScheduleFrequencyChoices.DAILY:
            delta = timedelta(days=1)
        elif self.schedule.frequency == ScheduleFrequencyChoices.WEEKLY:
            delta = timedelta(weeks=1)
        elif self.schedule.frequency == ScheduleFrequencyChoices.MONTHLY:
            # TODO: fix monthly frequency logic
            delta = timedelta(days=30)
        next_run = self.schedule.start_date
        now = timezone.now()

        while next_run <= now:
            next_run += delta

        return next_run
    
class Run(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    automation = models.ForeignKey(
        Automation, on_delete=models.CASCADE, related_name="runs"
    )
    timestamp = models.DateTimeField()
    status = models.BooleanField()




