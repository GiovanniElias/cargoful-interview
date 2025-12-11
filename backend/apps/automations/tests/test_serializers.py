# automations/tests/test_serializers.py
from django.test import TestCase
from django.utils import timezone
from apps.automations.models import Automation, Schedule, Run
from apps.automations.serializers import AutomationSerializer


class AutomationSerializerTest(TestCase):

    def setUp(self):
        self.schedule_data = {
            "frequency": "Daily",
            "start_date": timezone.now()
        }

    def test_normal_serialization_no_last_run(self):
        schedule = Schedule.objects.create(**self.schedule_data)
        automation = Automation.objects.create(name="Backup", status=True, schedule=schedule)
        serializer = AutomationSerializer(automation)
        data = serializer.data
        self.assertEqual(data['name'], "Backup")
        self.assertEqual(data['schedule']['frequency'], "Daily")

    def test_serialization_with_last_run(self):
        schedule = Schedule.objects.create(**self.schedule_data)
        automation = Automation.objects.create(name="Backup", status=True, schedule=schedule)
        run = Run.objects.create(automation=automation, timestamp=timezone.now(), status=True)
        automation.save()
        serializer = AutomationSerializer(automation)
        data = serializer.data
        self.assertEqual(automation.last_run.status, True)

    def test_deserialization_create_nested_schedule(self):
        input_data = {"name": "Report", "status": True, "schedule": self.schedule_data}
        serializer = AutomationSerializer(data=input_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        automation = serializer.save()
        self.assertEqual(automation.schedule.frequency, "Daily")
        self.assertEqual(Automation.objects.count(), 1)
        self.assertEqual(Schedule.objects.count(), 1)

    def test_missing_name_invalid(self):
        input_data = {"name": "", "status": True, "schedule": self.schedule_data}
        serializer = AutomationSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_missing_schedule_invalid(self):
        input_data = {"name": "Report", "status": True}
        serializer = AutomationSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('schedule', serializer.errors)

    def test_duplicate_schedule_get_or_create(self):
        input_data1 = {"name": "Task1", "status": True, "schedule": self.schedule_data}
        input_data2 = {"name": "Task2", "status": True, "schedule": self.schedule_data}
        serializer1 = AutomationSerializer(data=input_data1)
        serializer1.is_valid(raise_exception=True)
        serializer1.save()
        serializer2 = AutomationSerializer(data=input_data2)
        serializer2.is_valid(raise_exception=True)
        serializer2.save()
        self.assertEqual(Schedule.objects.count(), 1)
        self.assertEqual(Automation.objects.count(), 2)