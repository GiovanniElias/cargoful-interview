from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from apps.automations.models import Automation, Schedule, Run
from datetime import timedelta

class AutomationCreateAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.now = timezone.now()
        self.url = "/api/automations/create/"

    def test_valid_creation(self):
        data = {
            "name": "Daily Backup",
            "status": True,
            "schedule": {"frequency": "Daily", "start_date": self.now}
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Automation.objects.count(), 1)
        self.assertEqual(Schedule.objects.count(), 1)
        self.assertEqual(response.data['name'], "Daily Backup")

    def test_missing_name(self):
        data = {"status": True, "schedule": {"frequency": "Daily", "start_date": self.now}}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_missing_schedule(self):
        data = {"name": "Report", "status": True}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('schedule', response.data)

    def test_invalid_frequency(self):
        data = {"name": "Report", "status": True, "schedule": {"frequency": "Yearly", "start_date": self.now}}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('schedule', response.data)

    def test_duplicate_schedule_reuse(self):
        schedule_data = {"frequency": "Daily", "start_date": self.now}
        data1 = {"name": "Task1", "status": True, "schedule": schedule_data}
        response1 = self.client.post(self.url, data1, format="json")
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        data2 = {"name": "Task2", "status": True, "schedule": schedule_data}
        response2 = self.client.post(self.url, data2, format="json")
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Schedule.objects.count(), 1)
        self.assertEqual(Automation.objects.count(), 2)

    def test_last_run_ignored_if_sent(self):
        data = {
            "name": "Daily Backup",
            "status": True,
            "schedule": {"frequency": "Daily", "start_date": self.now},
            "last_run": {"timestamp": self.now, "status": True}
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_schedule_is_in_the_past(self):
        pass


class AutomationReadAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/automations/"
        self.now = timezone.now()
        self.yesterday = self.now - timedelta(days=1)
        self.today_schedule = Schedule.objects.create(frequency="Daily", start_date=self.now)
        self.yesterday_schedule = Schedule.objects.create(frequency="Daily", start_date=self.yesterday)

        # Automations
        self.auto1 = Automation.objects.create(name="Auto Today", status=True, schedule=self.today_schedule)
        self.auto2 = Automation.objects.create(name="Auto Yesterday", status=True, schedule=self.yesterday_schedule)
        self.auto3 = Automation.objects.create(name="Auto No Run", status=False, schedule=self.today_schedule)

        # Runs
        self.run_yesterday = Run.objects.create(automation=self.auto2, timestamp=self.yesterday, status=True)
        self.auto2.save()

    def test_read_kpis(self):
        response = self.client.get(self.url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        kpi = response.data['kpi']
        self.assertEqual(kpi['total_number_of_automations'], 3)
        self.assertEqual(kpi['active_schedules'], 2)
        # Success rate: only auto2 has last_run=True, auto1 has no last_run
        self.assertEqual(kpi['success_rate'], "100.0%")

    def test_scheduled_runs_today(self):
        response = self.client.get(self.url, format="json")
        today_list = response.data['scheduled_runs']['today']
        self.assertEqual(len(today_list), 2)  # auto1 + auto3 scheduled today
        names = [a['name'] for a in today_list]
        self.assertIn("Auto Today", names)
        self.assertIn("Auto No Run", names)

    def test_scheduled_runs_yesterday(self):
        response = self.client.get(self.url, format="json")
        yesterday_list = response.data['scheduled_runs']['yesterday']
        self.assertEqual(len(yesterday_list), 1)
        self.assertEqual(yesterday_list[0]['name'], "Auto Yesterday")
        self.assertEqual(yesterday_list[0]['status'], "Completed")

    def test_all_automations_grid(self):
        response = self.client.get(self.url, format="json")
        all_autos = response.data['all_automations']
        self.assertEqual(len(all_autos), 3)
        # Check fields
        for auto in all_autos:
            self.assertIn('name', auto)
            self.assertIn('status', auto)
            self.assertIn('schedule', auto)
            self.assertIn('last_run', auto)
            self.assertIn('next_run', auto)
        # Check next_run logic: today scheduled automation should have next_run today/tomorrow
        next_runs = [a['next_run'] for a in all_autos]
        self.assertTrue(all(nr is not None for nr in next_runs))