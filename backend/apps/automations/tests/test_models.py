from django.test import TestCase
from apps.automations.models import Automation, Run, Schedule
from django.utils import timezone


class AutomationModelTest(TestCase):

    def test_automation_creation_with_schedule(self):
        schedule = Schedule.objects.create(frequency="Daily", start_date=timezone.now())
        automation = Automation.objects.create(name="Backup", status=True, schedule=schedule)
        self.assertEqual(Automation.objects.count(), 1)
        self.assertEqual(Schedule.objects.count(), 1)
        self.assertEqual(automation.schedule, schedule)

    def test_last_run_relationship(self):
        schedule = Schedule.objects.create(frequency="Daily", start_date=timezone.now())
        automation = Automation.objects.create(name="Backup", status=True, schedule=schedule)
        run = Run.objects.create(automation=automation, timestamp=timezone.now(), status=True)
        automation.last_run = run
        automation.save()
        self.assertEqual(automation.last_run, run)
        self.assertIn(run, automation.runs.all())
    
