from datetime import timedelta
from django.test import TestCase
from apps.automations.models import Automation, Run, Schedule, ScheduleFrequencyChoices
from django.core.management import call_command
from django.utils import timezone
from io import StringIO

class RunAutomationTest(TestCase):

    def test_run_automation(self):

        # out = StringIO()
        # call_command('run_automation', stdout=out)
        # self.assertIn("Command executed!", out.getvalue())
        schedule = Schedule.objects.create(
            frequency=ScheduleFrequencyChoices.DAILY, start_date=timezone.now()-timedelta(days=1)
        )

        automation = Automation.objects.create(name="Test Automation", schedule=schedule)
        
        call_command('run_automation', automation_id=str(automation.id))
        
        automation.refresh_from_db()

        self.assertIsNotNone(automation.runs)
        self.assertIsNotNone(automation.last_run)
        self.assertEqual(automation.runs.count(), 1)
        self.assertTrue(automation.last_run.timestamp <= timezone.now())
        self.assertTrue(automation.next_run > timezone.now())
        self.assertTrue(automation.last_run.status in [True, False])
        