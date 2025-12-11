from django.test import TestCase
from apps.automations.models import Automation, Run, Schedule, ScheduleFrequencyChoices
from django.utils import timezone


class AutomationModelTest(TestCase):

    def test_automation_creation_with_schedule(self):
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.DAILY, start_date=timezone.now()
        )
        automation = Automation.objects.create(
            name="Backup", status=True, schedule=schedule
        )
        self.assertEqual(Automation.objects.count(), 1)
        self.assertEqual(Schedule.objects.count(), 1)
        self.assertEqual(automation.schedule, schedule)

    def test_last_run_relationship(self):
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.DAILY, start_date=timezone.now()
        )
        automation = Automation.objects.create(
            name="Backup", status=True, schedule=schedule
        )
        run = Run.objects.create(
            automation=automation, timestamp=timezone.now(), status=True
        )
        automation.save()
        self.assertEqual(automation.last_run, run)
        self.assertIn(run, automation.runs.all())

    def test_next_run_daily(self):
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.DAILY, start_date=timezone.now()
        )
        automation = Automation.objects.create(name="Daily Test", schedule=schedule)

        next_run = automation.next_run
        self.assertTrue(next_run > timezone.now())
        self.assertEqual(
            (next_run - schedule.start_date).days, 1
        )

    def test_next_run_weekly(self):
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.WEEKLY, start_date=timezone.now()
        )
        automation = Automation.objects.create(name="Weekly Test", schedule=schedule)

        next_run = automation.next_run
   
        self.assertTrue(next_run > timezone.now())
        self.assertEqual(
            (next_run - schedule.start_date).days % 7,
            0,
        )

    def test_next_run_monthly(self):
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.MONTHLY, start_date=timezone.now()
        )
        automation = Automation.objects.create(name="Monthly Test", schedule=schedule)

        next_run = automation.next_run

        self.assertTrue(next_run > timezone.now())
        self.assertTrue(
            (next_run - schedule.start_date).days >= 28
        )